var ldata=[{id:1,tuan:1,thoi_gian:"6h30 12/08/2013",giang_vien:"gv1",phong:"phong",so_tiet:3,alias_state:"Nghỉ dạy",type_status:"Lý thuyết",note:"om"},{id:2,tuan:1,thoi_gian:"6h30 12/08/2013",giang_vien:"gv1",phong:"phong",so_tiet:3,alias_state:"Bổ sung",type_status:"Lý thuyết",note:""}],DuyetDangKy=React.createClass({displayName:"DuyetDangKy",getInitialState:function(){return{data:[],active:-1}},loadData:function(){$.ajax({url:"/daotao/lich_trinh_giang_days",success:function(t){this.setState({data:t,active:-1}),React.renderComponent(LichDaDuyet(null),document.getElementById("lichdaduyet"))}.bind(this)})},componentWillMount:function(){this.loadData()},handleAccept:function(t){$.ajax({url:"/daotao/lich_trinh_giang_days/accept",type:"POST",data:t,success:function(t){this.setState({data:t}),React.unmountAndReleaseReactRootNode(document.getElementById("lichdaduyet")),React.renderComponent(LichDaDuyet(null),document.getElementById("lichdaduyet"))}.bind(this)})},handleDrop:function(t){$.ajax({url:"/daotao/lich_trinh_giang_days/drop",type:"POST",data:t,success:function(t){this.setState({data:t}),React.unmountAndReleaseReactRootNode(document.getElementById("lichdaduyet")),React.renderComponent(LichDaDuyet(null),document.getElementById("lichdaduyet"))}.bind(this)})},handleCheck:function(t){this.setState({active:t.id}),React.unmountAndReleaseReactRootNode(document.getElementById("lichtrung")),React.renderComponent(LichTrung({id:t.id}),document.getElementById("lichtrung"))},render:function(){var t=this,a=this.state.data.map(function(a,e){return LichDuyet({key:a.id,active:t.state.active,onCheck:t.handleCheck,onAccept:t.handleAccept,onDrop:t.handleDrop,color:e%2===0?"warning":"danger",data:a})});return React.DOM.div(null,React.DOM.div({id:"lichtrung"}),React.DOM.div({className:"table-responsive"},React.DOM.h4(null,"Danh sách lịch đăng ký"),React.DOM.table({className:"table table-bordered table-striped"},React.DOM.thead(null,React.DOM.tr({className:"success"},React.DOM.td(null,"Tuần"),React.DOM.td(null,"Thời gian"),React.DOM.td(null,"Thông tin"),React.DOM.td(null,"Phòng"),React.DOM.td(null,"Số tiết"),React.DOM.td(null,"Loại"),React.DOM.td(null,"Giờ học"),React.DOM.td(null,"Lí do"),React.DOM.td(null,"Thao tác"))),React.DOM.tbody(null,a))),React.DOM.div({id:"lichdaduyet"}))}}),LichDuyet=React.createClass({displayName:"LichDuyet",onAccept:function(){if("Bổ sung"===this.props.data.alias_state){var t=this.refs.phong.getDOMNode().value;this.props.onAccept({id:this.props.data.id,phong:t})}else this.props.onAccept(this.props.data)},onDrop:function(){this.props.onDrop(this.props.data)},onCheck:function(){this.props.onCheck(this.props.data)},componentDidMount:function(){"Bổ sung"===this.props.data.alias_state&&(this.refs.phong.getDOMNode().value=this.props.data.phong)},render:function(){return React.DOM.tr({className:this.props.active===this.props.data.id?"default":this.props.color},React.DOM.td(null,this.props.data.tuan),React.DOM.td(null,this.props.data.thoi_gian),React.DOM.td(null,this.props.data.giang_vien,React.DOM.br(null),this.props.data.ma_lop,React.DOM.br(null),this.props.data.ten_mon_hoc),React.DOM.td(null,"Bổ sung"===this.props.data.alias_state?React.DOM.input({type:"text",ref:"phong"}):this.props.data.phong),React.DOM.td(null,this.props.data.so_tiet),React.DOM.td(null,this.props.data.alias_state),React.DOM.td(null,this.props.data.type_status),React.DOM.td(null,this.props.data.note),React.DOM.td(null,React.DOM.button({className:"btn btn-sm btn-danger",onClick:this.onDrop},"Không chấp nhận"),React.DOM.button({className:"btn btn-sm btn-primary",onClick:this.onAccept},"Chấp nhận"),React.DOM.button({style:{display:"Bổ sung"===this.props.data.alias_state?"":"none"},className:"btn btn-sm btn-warning",onClick:this.onCheck},"Kiểm tra")))}}),LichTrung=React.createClass({displayName:"LichTrung",getInitialState:function(){return{data:[],sinh_vien:[],loading:!1}},componentWillMount:function(){this.loadData()},loadData:function(){this.setState({loading:!0}),$.ajax({url:"/daotao/lich_trinh_giang_days/check",data:{id:this.props.id},type:"POST",success:function(t){this.setState({data:t.lich,sinh_vien:t.sinh_vien,loading:!1})}.bind(this)})},componentDidUpdate:function(){if(this.state.loading===!0){var t={lines:15,length:40,width:10,radius:22,corners:1,rotate:38,direction:1,color:"#000",speed:1.7,trail:81,shadow:!0,hwaccel:!0,className:"spinner",zIndex:2e9,top:"auto",left:"auto"},a=document.getElementById("foo"),e=new Spinner(t).spin(a);$(a).data("spinner",e)}else{var a=document.getElementById("foo"),e=new Spinner(t).stop(a);$("#foo").data("spinner").stop()}},componentDidMount:function(){if(this.state.loading===!0){var t={lines:15,length:40,width:10,radius:22,corners:1,rotate:38,direction:1,color:"#000",speed:1.7,trail:81,shadow:!0,hwaccel:!0,className:"spinner",zIndex:2e9,top:"auto",left:"auto"},a=document.getElementById("foo"),e=new Spinner(t).spin(a);$(a).data("spinner",e)}else $("#foo").data("spinner").stop()},render:function(){var t=this.state.data.map(function(t,a){return React.DOM.tr({className:a%2===0?"warning":"danger"},React.DOM.td(null,t.tuan),React.DOM.td(null,t.thoi_gian),React.DOM.td(null,t.giang_vien),React.DOM.td(null,t.phong),React.DOM.td(null,t.so_tiet),React.DOM.td(null,t.alias_state),React.DOM.td(null,t.type_status))}),a=this.state.sinh_vien.map(function(t,a){return React.DOM.tr({className:a%2===0?"warning":"danger"},React.DOM.td(null,a+1),React.DOM.td(null,t.code),React.DOM.td(null,t.hovaten),React.DOM.td(null,t.ma_lop_hanh_chinh))});return React.DOM.div(null,React.DOM.div({id:"foo"}),React.DOM.div({className:"table-responsive"},React.DOM.h4(null,"Danh sách lịch trùng"),React.DOM.table({className:"table table-bordered table-striped"},React.DOM.thead(null,React.DOM.tr({className:"success"},React.DOM.td(null,"Tuần"),React.DOM.td(null,"Thời gian"),React.DOM.td(null,"Giảng viên"),React.DOM.td(null,"Phòng"),React.DOM.td(null,"Số tiết"),React.DOM.td(null,"Loại"),React.DOM.td(null,"Giờ học"))),React.DOM.tbody(null,t))),React.DOM.div({className:"table-responsive"},React.DOM.h4(null,"Danh sách sinh viên trùng"),React.DOM.table({className:"table table-bordered table-striped"},React.DOM.thead(null,React.DOM.tr({className:"success"},React.DOM.td(null,"Stt"),React.DOM.td(null,"Mã sinh viên"),React.DOM.td(null,"Họ và tên"),React.DOM.td(null,"Mã lớp hành chính"))),React.DOM.tbody(null,a))))}}),LichDaDuyet=React.createClass({displayName:"LichDaDuyet",getInitialState:function(){return{data:[]}},componentWillMount:function(){this.loadData()},loadData:function(){$.ajax({url:"/daotao/lich_trinh_giang_days/daduyet",success:function(t){this.setState({data:t})}.bind(this)})},render:function(){var t=this.state.data.map(function(t,a){return React.DOM.tr({className:a%2===0?"warning":"danger"},React.DOM.td(null,t.tuan),React.DOM.td(null,t.thoi_gian),React.DOM.td(null,t.giang_vien),React.DOM.td(null,t.phong),React.DOM.td(null,t.so_tiet),React.DOM.td(null,t.alias_state),React.DOM.td(null,t.type_status),React.DOM.td(null,t.alias_status),React.DOM.td(null,t.updated_alias))});return React.DOM.div({className:"table-responsive"},React.DOM.h4(null,"Danh sách lịch đã duyệt"),React.DOM.table({className:"table table-bordered table-striped"},React.DOM.thead(null,React.DOM.tr({className:"success"},React.DOM.td(null,"Tuần"),React.DOM.td(null,"Thời gian"),React.DOM.td(null,"Giảng viên"),React.DOM.td(null,"Phòng"),React.DOM.td(null,"Số tiết"),React.DOM.td(null,"Loại"),React.DOM.td(null,"Giờ học"),React.DOM.td(null,"Trạng thái"),React.DOM.td(null,"Ngày duyệt"))),React.DOM.tbody(null,t)))}});