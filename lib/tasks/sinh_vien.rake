#encoding: utf-8
require 'hpu'
namespace :sinh_vien do    
  #10
  task check_lop_mon_hocs:  :environment do
    Tenant.all.each do |tenant|    
      Octopus.using(tenant.database) do 
        sv = SinhVien.where(code: "1412751070").first
        enrollments = Enrollment.where(:sinh_vien_id => sv.id).includes(:lop_mon_hoc)#.where("lop_mon_hocs.id IS NULL")#select {|en| en.lop_mon_hoc.nil?} 
        #lops = enrollments.map {|en| en.lop_mon_hoc if en.lop_mon_hoc and !en.lop_mon_hoc.removed? }.select {|l| !l.nil? }.uniq
        query= "SELECT lmh.id ,lmh.state ,lmh.ma_lop ,lmh.ma_mon_hoc ,lmh.ten_mon_hoc ,rtrim(gv.ho) || ' ' || CASE WHEN gv.dem IS NULL OR gv.dem = '' THEN '' ELSE rtrim(gv.dem) || ' ' END || rtrim(gv.ten) giang_vien ,erm.tinhhinh ,erm.diem_qua_trinh FROM enrollments erm JOIN sinh_viens sv ON erm.sinh_vien_id = sv.id JOIN lop_mon_hocs lmh ON erm.lop_mon_hoc_id = lmh.id JOIN assistants ast ON lmh.id = ast.lop_mon_hoc_id JOIN giang_viens gv ON ast.giang_vien_id = gv.id WHERE sv.code = '1412751070' ORDER BY lmh.ten_mon_hoc"      
        result = ActiveRecord::Base.connection.execute query
        puts result[0]["id"] + result[0]["state"]
        #enrollments.each do |en|

         # puts "NULL: #{en.lop_mon_hoc_id}" unless en.lop_mon_hoc
         # puts en.lop_mon_hoc.state if en.lop_mon_hoc
        #end
      end
    end
  end
end