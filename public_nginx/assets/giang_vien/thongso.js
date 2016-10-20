var ThongSo=React.createClass({displayName:"ThongSo",getInitialState:function(){return{data:{},edit:0}},onEdit:function(){this.setState({edit:1})},onCancelEdit:function(){this.setState({edit:0})},handleSubmit:function(){var t=this.refs.lt.getDOMNode().value.trim(),e=this.refs.th.getDOMNode().value.trim(),a=this.refs.tuhoc.getDOMNode().value.trim(),l=this.refs.bt.getDOMNode().value.trim(),n=this.refs.lang.getDOMNode().value,c=$("#ltdk").code(),i=$("#dcct").code();if(!t||!e)return alert("Bạn cần nhập số tiết lý thuyết và số tiết thực hành"),!1;var d={id:this.state.data.id,lt:t,th:e,tuhoc:a,bt:l,lang:n,lichtrinh:c,decuong:i};return $.ajax({url:"/teacher/lop/settinglop",type:"POST",data:d,success:function(t){this.setState({data:t.lop,edit:0}),React.unmountAndReleaseReactRootNode("main"),React.renderComponent(Lop({data:t}),document.getElementById("main"))}.bind(this)}),!1},componentWillMount:function(){$.ajax({url:"/teacher/lop/"+this.props.lop+"/show.json",success:function(t){this.setState({data:t.lop}),React.renderComponent(Lop({data:t}),document.getElementById("main"))}.bind(this)})},componentDidUpdate:function(){1===this.state.edit&&($("#dcct").summernote({height:150}),$("#ltdk").summernote({height:150}),$("#ltdk").code(this.state.data.lich_trinh_du_kien),$("#dcct").code(this.state.data.de_cuong_chi_tiet)),$("#lang").val(this.state.data.language),$("#lt").val(this.state.data.so_tiet_ly_thuyet),$("#th").val(this.state.data.so_tiet_thuc_hanh),$("#tuhoc").val(this.state.data.so_tiet_tu_hoc),$("#bt").val(this.state.data.so_tiet_bai_tap)},render:function(){return 1===this.state.edit?React.DOM.div(null,React.DOM.br(null),React.DOM.form({onSubmit:this.handleSubmit},React.DOM.input({type:"submit",value:"Cập nhật",className:"btn btn-primary"}),React.DOM.button({onClick:this.onCancelEdit,className:"btn btn-sm btn-warning curl-top-left"},"Hủy"),React.DOM.table({className:"table table-bordered table-condensed table-striped"},React.DOM.thead(null,React.DOM.tr({className:"success"},React.DOM.td(null,"Thông số"),React.DOM.td(null,"Giá trị"))),React.DOM.tbody(null,React.DOM.tr(null,React.DOM.td(null,"Mã lớp:"),React.DOM.td(null,this.state.data.ma_lop)),React.DOM.tr(null,React.DOM.td(null,"Tên môn học"),React.DOM.td(null,this.state.data.ten_mon_hoc)),React.DOM.tr(null,React.DOM.td(null,"Sĩ số"),React.DOM.td(null,this.state.data.si_so)),React.DOM.tr(null,React.DOM.td(null,"Số tiết lý thuyết"),React.DOM.td(null,React.DOM.input({id:"lt",type:"text",ref:"lt"}))),React.DOM.tr(null,React.DOM.td(null,"Số tiết thực hành"),React.DOM.td(null,React.DOM.input({id:"th",type:"text",ref:"th"}))),React.DOM.tr(null,React.DOM.td(null,"Số tiết tự học"),React.DOM.td(null,React.DOM.input({id:"tuhoc",type:"text",ref:"tuhoc"}))),React.DOM.tr(null,React.DOM.td(null,"Số tiết bài tập"),React.DOM.td(null,React.DOM.input({id:"bt",type:"text",ref:"bt"}))),React.DOM.tr(null,React.DOM.td(null,"Ngôn ngữ"),React.DOM.td(null,React.DOM.select({id:"lang",ref:"lang"},React.DOM.option({value:"vietnamse"},"Tiếng Việt"),React.DOM.option({value:"english"},"Tiếng Anh"),React.DOM.option({value:"chinese"},"Tiếng Trung Quốc"),React.DOM.option({value:"japanese"},"Tiếng Nhật")))),React.DOM.tr(null,React.DOM.td(null,"Lịch trình dự kiến"),React.DOM.td(null,React.DOM.div({id:"ltdk",ref:"ltdk",style:{width:"80%"}}))),React.DOM.tr(null,React.DOM.td(null,"Đề cương chi tiết"),React.DOM.td(null,React.DOM.div({id:"dcct",ref:"dcct",style:{width:"80%"}}))))))):React.DOM.div(null,React.DOM.br(null),React.DOM.button({onClick:this.onEdit,className:"btn btn-sm btn-success curl-top-left"},"Sửa"),React.DOM.table({className:"table table-bordered table-condensed"},React.DOM.thead(null,React.DOM.td(null,"Thông số"),React.DOM.td(null,"Giá trị")),React.DOM.tbody(null,React.DOM.tr(null,React.DOM.td(null,"Mã lớp:"),React.DOM.td(null,this.state.data.ma_lop)),React.DOM.tr(null,React.DOM.td(null,"Tên môn học"),React.DOM.td(null,this.state.data.ten_mon_hoc)),React.DOM.tr(null,React.DOM.td(null,"Sĩ số"),React.DOM.td(null,this.state.data.si_so)),React.DOM.tr(null,React.DOM.td(null,"Số tiết lý thuyết"),React.DOM.td(null,this.state.data.so_tiet_ly_thuyet)),React.DOM.tr(null,React.DOM.td(null,"Số tiết thực hành"),React.DOM.td(null,this.state.data.so_tiet_thuc_hanh)),React.DOM.tr(null,React.DOM.td(null,"Số tiết tự học"),React.DOM.td(null,this.state.data.so_tiet_tu_hoc)),React.DOM.tr(null,React.DOM.td(null,"Số tiết bài tập"),React.DOM.td(null,this.state.data.so_tiet_bai_tap)),React.DOM.tr(null,React.DOM.td(null,"Ngôn ngữ"),React.DOM.td(null,this.state.data.language)),React.DOM.tr(null,React.DOM.td(null,"Lịch trình dự kiến"),React.DOM.td(null,React.DOM.p(null,React.DOM.span({dangerouslySetInnerHTML:{__html:this.state.data.lich_trinh_du_kien}})))),React.DOM.tr(null,React.DOM.td(null,"Đề cương chi tiết"),React.DOM.td(null,React.DOM.p(null,React.DOM.span({dangerouslySetInnerHTML:{__html:this.state.data.de_cuong_chi_tiet}})))))))}});