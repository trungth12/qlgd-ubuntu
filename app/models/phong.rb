class Phong < ActiveRecord::Base
 # attr_accessible :loai, :ma_phong, :suc_chua_toi_da, :tang, :toa_nha
 searchable do
    	text :ma_phong, boost: 5.0
    end
end
