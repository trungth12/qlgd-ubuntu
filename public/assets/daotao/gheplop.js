var GhepLop=React.createClass({displayName:"GhepLop",getInitialState:function(){return{sinh_vien_id:-1,ma_lop_hanh_chinh:-1,lop_id:-1}},componentDidMount:function(){$("#lhc").select2({placeholder:"Tìm lớp hành chính",minimumInputLength:3,ajax:{url:"/daotao/lop_hanh_chinhs.json",quietMillis:100,data:function(t,n){return{q:t,page_limit:30,page:n}},results:function(t,n){var e=30*n<t.total;return{results:t.lop_hanh_chinhs,more:e}},text:function(t){return t},id:function(t){return t}}}),$("#lmh").select2({placeholder:"Tìm lớp môn học",minimumInputLength:3,ajax:{url:"/daotao/lop_mon_hocs.json",quietMillis:100,data:function(t,n){return{q:t,page_limit:30,page:n}},results:function(t,n){var e=30*n<t.total;return{results:t.lop_mon_hocs,more:e}},text:function(t){return t},id:function(t){return t}}}),$("#sv").select2({placeholder:"Tìm sinh viên",minimumInputLength:3,ajax:{url:"/daotao/sinh_viens.json",quietMillis:100,data:function(t,n){return{q:t,page_limit:30,page:n}},results:function(t,n){var e=30*n<t.total;return{results:t.sinh_viens,more:e}},text:function(t){return t},id:function(t){return t}}})},getLopHanhChinh:function(){var t=$("#lhc").val(),n=$("#lmh").val();null!=t&&null!=n?(this.setState({ma_lop_hanh_chinh:t,lop_id:n}),React.unmountAndReleaseReactRootNode(document.getElementById("kq")),React.renderComponent(LopHanhChinh({ma_lop_hanh_chinh:t,lop_id:n}),document.getElementById("kq"))):alert("Bạn phải chọn lớp hành chính, hoặc sinh viên, hoặc lớp môn học")},render:function(){return React.DOM.div(null,React.DOM.div({className:"row"},React.DOM.div({className:"col-md-5"},React.DOM.h4(null,"Chọn lớp hành chính"),React.DOM.input({type:"hidden",id:"lhc",style:{width:"70%"},className:"input-xlarge"})),React.DOM.div({className:"col-md-2"},React.DOM.br(null),React.DOM.br(null),React.DOM.button({onClick:this.getLopHanhChinh,className:"btn btn-success"},"Chọn")),React.DOM.div({className:"col-md-5"},React.DOM.h4(null,"Chọn lớp Môn học"),React.DOM.input({type:"hidden",id:"lmh",style:{width:"500px"},className:"input-xlarge"}))),React.DOM.div({className:"row",id:"kq"}))}}),LopHanhChinh=React.createClass({displayName:"LopHanhChinh",getInitialState:function(){return{data:[],checked:[]}},loadData:function(){$.ajax({url:"/daotao/lop_hanh_chinhs",type:"POST",data:{ma_lop_hanh_chinh:this.props.ma_lop_hanh_chinh},success:function(t){this.setState({data:t}),React.renderComponent(LopMonHoc({lop_id:this.props.lop_id}),document.getElementById("lop"))}.bind(this)})},componentWillMount:function(){this.loadData()},onMove:function(){var t=[];$("input[id^=svs]").each(function(n,e){e.checked===!0&&t.push(e.value)}),t.length>0&&$.ajax({url:"/daotao/move",type:"POST",data:{ma_lop_hanh_chinh:this.props.ma_lop_hanh_chinh,lop_id:this.props.lop_id,sinh_viens:t},success:function(){React.unmountAndReleaseReactRootNode(document.getElementById("lop")),React.renderComponent(LopMonHoc({lop_id:this.props.lop_id}),document.getElementById("lop"))}.bind(this)})},checkAll:function(){$("input[id^=svs]").each(function(t,n){n.checked=!n.checked})},render:function(){var t=this.state.data.map(function(t,n){return React.DOM.tr(null,React.DOM.td(null,n+1),React.DOM.td(null,t.code),React.DOM.td(null,t.hovaten),React.DOM.td(null,React.DOM.div({className:"checkbox"},React.DOM.label(null,React.DOM.input({id:"svs"+t.code,value:t.id,type:"checkbox"},"Chọn")))))});return React.DOM.div({className:"row"},React.DOM.div({className:"col-md-6 table-responsive"},React.DOM.button({onClick:this.onMove,className:"btn btn-primary"},"Chuyển"),React.DOM.hr(null),React.DOM.table({className:"table table-bordered"},React.DOM.thead(null,React.DOM.tr({className:"success"},React.DOM.td(null,"Stt"),React.DOM.td(null,"Mã sinh viên"),React.DOM.td(null,"Họ và tên"),React.DOM.td(null,React.DOM.div({className:"checkbox"},React.DOM.label(null,React.DOM.input({onClick:this.checkAll,type:"checkbox"},"Chọn tất cả")))))),React.DOM.tbody(null,t))),React.DOM.div({className:"col-md-6 table-responsive",id:"lop"}))}}),LopMonHoc=React.createClass({displayName:"LopMonHoc",getInitialState:function(){return{data:[]}},loadData:function(){$.ajax({url:"/daotao/lop_mon_hocs",type:"POST",data:{lop_id:this.props.lop_id},success:function(t){this.setState({data:t})}.bind(this)})},componentWillMount:function(){this.loadData()},onRemove:function(t){if(console.log(t.id+" - "+this.props.lop_id),confirm("Khi xóa sinh viên ra khỏi lớp, dữ liệu điểm danh sẽ bị xóa, bạn có chắc muốn xóa sinh viên ra khỏi lớp không?")){var t={lop_id:this.props.lop_id,enrollment_id:t.id,_method:"delete"};$.ajax({url:"/daotao/lop_mon_hocs",type:"POST",data:t,success:function(t){this.setState({data:t})}.bind(this)})}},render:function(){var t=this,n=this.state.data.map(function(n,e){return React.DOM.tr({className:n.bosung_status},React.DOM.td(null,e+1),React.DOM.td(null,n.code),React.DOM.td(null,n.name),React.DOM.td(null,n.tinchi_status),React.DOM.td(null,React.DOM.button({onClick:t.onRemove.bind(t,n),className:"btn btn-sm btn-danger"},"Xóa")))});return React.DOM.table({className:"table table-bordered table-striped"},React.DOM.thead(null,React.DOM.tr({className:"success"},React.DOM.td(null,"Stt"),React.DOM.td(null,"Mã sinh viên"),React.DOM.td(null,"Họ và tên"),React.DOM.td(null,"Tín chỉ?"),React.DOM.td(null,"Xóa"))),React.DOM.tbody(null,n))}});