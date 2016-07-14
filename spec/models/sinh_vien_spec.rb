require 'spec_helper'

describe SinhVien do  
  it "should have a user" do
  	te = FactoryGirl.create(:tenant)
  	us = FactoryGirl.create(:user) 
  	sv = FactoryGirl.create(:sinh_vien)
  	sv.user = us
  	sv.user.should be_an(User)
  	us.imageable.should == sv
  end
end
