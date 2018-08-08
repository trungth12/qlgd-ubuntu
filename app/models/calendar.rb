#encoding: utf-8
class Calendar < ActiveRecord::Base
  include IceCube
  scope :generated, -> {where(state: :generated)}
 # attr_accessible :so_tiet, :so_tuan, :thu, :tiet_bat_dau, :tuan_hoc_bat_dau, :giang_vien_id, :phong, :lop_mon_hoc_id
  attr_reader :ngay_bat_dau, :ngay_ket_thuc, :schedule

  belongs_to :lop_mon_hoc
  belongs_to :giang_vien

  validates :so_tiet, :so_tuan, :thu, :tiet_bat_dau, :tuan_hoc_bat_dau, :lop_mon_hoc_id, :giang_vien_id, :presence => true

  validates :lop_mon_hoc, :presence => true
  validates :giang_vien, :presence => true
  validates :so_tiet, :so_tuan, :thu, :tiet_bat_dau, :tuan_hoc_bat_dau, numericality: {only_integer: true, greater_than: 0}

  TIET = {1 => [7,00], 2 => [7,55], 3 => [8,55],
          4 => [9,50], 5 => [10,45], 6 => [13,00],
          7 => [13,55], 8 => [14,55], 9 => [15,50],
          10 => [16,45], 11 => [17,55], 12 => [18,45],
          13 => [19, 0], 14 => [20,50], 15 => [21,55]}
  THU2 = {2 => "Thứ 2", 3 => "Thứ 3", 4 => "Thứ 4", 5 => "Thứ 5", 6 => "Thứ 6", 7 => "Thứ 7", 8 => "Chủ nhật"}
  THU = {2 => :monday, 3 => :tuesday, 4 => :wednesday, 5 => :thursday, 6 => :friday, 7 => :saturday, 8 => :sunday}

  state_machine :state, :initial => :pending do  
    event :generate do 
      transition [:pending, :generated] => :generated # da hoan thanh gio hoc
    end    
    event :remove do 
      transition all => :removed
    end
    event :restore do 
      transition :removed => :pending
    end
  end

  def destroy
    if self.lop_mon_hoc
      sch = self.schedule.map {|s| s.to_time}
      if sch.count > 0
        lichs = self.lop_mon_hoc.lich_trinh_giang_days.with_giang_vien(self.giang_vien.id).where(thoi_gian: sch)
        if lichs.count > 0
          LichTrinhGiangDay.destroy_all(["id IN (?) ", lichs.map(&:id)]) 
        end
      end
    end
    super
  end

  def remove
    if self.lop_mon_hoc
      sch = self.schedule.map {|s| s.to_time}
      if sch.count > 0
        lichs = self.lop_mon_hoc.lich_trinh_giang_days.with_giang_vien(self.giang_vien.id).where(thoi_gian: sch)
        if lichs.count > 0
          lichs.each do |l|
            l.dtremove! if l.can_dtremove?
          end
        end
      end
    end
    super
  end
  def restore
    if self.lop_mon_hoc
      sch = self.schedule.map {|s| s.to_time}
      if sch.count > 0
        lichs = self.lop_mon_hoc.lich_trinh_giang_days.with_giang_vien(self.giang_vien.id).where(thoi_gian: sch)
        if lichs.count > 0
          lichs.each do |l|
            l.dtrestore! if l.can_dtrestore?
          end
        end
      end
    end
    super
  end
  def generate    
    if self.lop_mon_hoc
      sch = self.schedule
      if sch.count > 0
        sch.each do |s|
          begin
            lich = self.lop_mon_hoc.lich_trinh_giang_days.with_giang_vien(self.giang_vien.id).where(thoi_gian: s.to_time, so_tiet: self.so_tiet, phong: self.phong).first
            unless lich 
              lich = self.lop_mon_hoc.lich_trinh_giang_days.with_giang_vien(self.giang_vien.id).normal.create!(thoi_gian: s.to_time, so_tiet: self.so_tiet, phong: self.phong, ltype: "lythuyet")                            
            end
            lich.accept! if lich.can_accept?     
          rescue Exception => e
            puts e
          end
        end
      end
    end
    super
  end

  def ngay_bat_dau
    get_ngay_bat_dau
  end

  def ngay_ket_thuc
    get_ngay_ket_thuc
  end

  def schedule
    get_schedule
  end

  private
  def get_schedule
    new_schedule = Schedule.new(ngay_bat_dau)
    new_schedule.add_recurrence_rule(Rule.daily.day(THU[thu]).hour_of_day(TIET[tiet_bat_dau][0]).minute_of_hour(TIET[tiet_bat_dau][1]).second_of_minute(0).until(ngay_ket_thuc))
    new_schedule.all_occurrences.to_a
  end
  def get_ngay_bat_dau
    t1 = Tuan.where(stt: tuan_hoc_bat_dau).first
    day = t1.tu_ngay + (thu - 2).days
    return Time.new(day.year, day.month, day.day)
  end
  def get_ngay_ket_thuc
    t2 = Tuan.where(stt: tuan_hoc_bat_dau + so_tuan - 1).first    
    if t2
      day = t2.den_ngay
      return Time.new(day.year, day.month, day.day)
    else
      return nil
    end
  end
end
