var Search=React.createClass({displayName:"Search",onSearch:function(){{var e=this.refs.mtype.getDOMNode().selected;this.refs.query.getDOMNode().value}alert(e)},render:function(){return React.DOM.div({className:"container"},React.DOM.div({className:"form-group"},React.DOM.div({className:"col-sm-2"},React.DOM.select({ref:"mtype",className:"form-control",value:"1"},React.DOM.option({value:"1"},"Sinh viên"),React.DOM.option({value:"2"},"Lớp môn học"),React.DOM.option({value:"3"},"Lịch trình giảng dạy"))),React.DOM.div({className:"col-sm-6"},React.DOM.input({type:"text",ref:"query",className:"form-control",placeholder:"Thông tin tra cứu",name:"query"})),React.DOM.button({onClick:"onSearch",className:"btn btn-primary btn-default"},"Tra cứu")),React.DOM.div({id:"searchResult"}))}}),SinhVienSearchResult=React.createClass({displayName:"SinhVienSearchResult",render:function(){return React.DOM.div(null)}}),LopMonHocSearchResult=React.createClass({displayName:"LopMonHocSearchResult",render:function(){return React.DOM.div(null)}}),LichSearchResult=React.createClass({displayName:"LichSearchResult",render:function(){return React.DOM.div(null)}});React.renderComponent(Search(null),document.getElementById("main"));