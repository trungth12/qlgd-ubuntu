require 'spec_helper'

describe UserGroup do
  it "belongs to user and group" do 
  	group = Groups.create(name: "bankiemdinh")
  	u = FactoryGirl.create(:user)
  	ug = UserGroups.create(group_id: group.id, user_id: u.id)
  	ug.group.name.should == "bankiemdinh"
  	u.group.pluck(:name).should include("bankiemdinh")
  end
end
