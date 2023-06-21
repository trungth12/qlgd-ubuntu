- /**
  - * @jsx React.DOM
  - */
"use strict";

var React = require("react");

var TaoLop = React.createClass({
  displayName: "TaoLop",

  getInitialState: function () {
    return { giang_viens: [], mon_hocs: [] };
  },
  loadData: function () {
    $.ajax({
      url: '/daotao/giang_viens',
      success: (function (data) {
        this.setState({ giang_viens: data.giang_viens, mon_hocs: data.mon_hocs });
        React.renderComponent(React.createElement(LopMonHoc2, { giang_viens: this.state.giang_viens }), document.getElementById('lop3'));
      }).bind(this)
    });
  },
  componentWillMount: function () {
    this.loadData();
  },
  onCreateMon: function () {
    var ma_mon_hoc = this.refs.ma_mon_hoc.getDOMNode().value;
    var ten_mon_hoc = this.refs.ten_mon_hoc.getDOMNode().value;
    var data = {
      ma_mon_hoc: ma_mon_hoc,
      ten_mon_hoc: ten_mon_hoc
    };
    $.ajax({
      url: '/daotao/mon_hocs/create',
      type: 'POST',
      data: data,
      success: (function (data) {
        this.setState({ giang_viens: data.giang_viens, mon_hocs: data.mon_hocs });
      }).bind(this)
    });
  },
  onCreate: function () {
    //alert($("#gv").val()+$("#mm").val()+this.refs.ma_lop.getDOMNode().value);
    var giang_vien_id = $('#gv4').val();
    var ma_mon_hoc = $('#mm').val();
    var ma_lop = this.refs.ma_lop.getDOMNode().value;
    var data = {
      giang_vien_id: giang_vien_id,
      mon_hoc: ma_mon_hoc,
      ma_lop: ma_lop
    };
    $.ajax({
      url: '/daotao/lop_mon_hocs/create',
      type: 'POST',
      data: data,
      success: (function (data) {
        if (data.error != null) {
          alert(data.error);
        }
        React.unmountAndReleaseReactRootNode(document.getElementById('lop3'));
        React.renderComponent(React.createElement(LopMonHoc2, { giang_viens: this.state.giang_viens }), document.getElementById('lop3'));
        React.unmountAndReleaseReactRootNode(document.getElementById('gheplop'));
        React.renderComponent(React.createElement(GhepLop, null), document.getElementById('gheplop'));
        React.unmountAndReleaseReactRootNode(document.getElementById('calendar2'));
        React.renderComponent(React.createElement(DaotaoCalendar, null), document.getElementById('calendar2'));
      }).bind(this)
    });
  },
  componentDidUpdate: function () {
    var self = this;
    $("#gv4").select2({
      data: self.state.giang_viens
    });
    $("#mm").select2({
      data: self.state.mon_hocs
    });
  },
  render: function () {
    return React.createElement(
      "div",
      null,
      React.createElement("hr", null),
      React.createElement(
        "h4",
        null,
        "Thêm môn học"
      ),
      React.createElement(
        "table",
        { "class": "table table-bordered" },
        React.createElement(
          "thead",
          null,
          React.createElement(
            "tr",
            { "class": "success" },
            React.createElement(
              "td",
              null,
              "Mã môn học"
            ),
            React.createElement(
              "td",
              null,
              "Tên môn học"
            ),
            React.createElement(
              "td",
              null,
              "Thao tác"
            )
          )
        ),
        React.createElement(
          "tbody",
          null,
          React.createElement(
            "tr",
            { "class": "danger" },
            React.createElement(
              "td",
              null,
              React.createElement("input", { type: "text", ref: "ma_mon_hoc", placeholder: "Mã môn học", style: { width: "100%" } }),
              React.createElement("br", null)
            ),
            React.createElement(
              "td",
              null,
              React.createElement("input", { type: "text", ref: "ten_mon_hoc", placeholder: "Tên môn học", style: { width: "100%" } }),
              React.createElement("br", null)
            ),
            React.createElement(
              "td",
              null,
              React.createElement(
                "button",
                { "class": "btn btn-success", onClick: this.onCreateMon },
                "Thêm môn"
              )
            )
          )
        )
      ),
      React.createElement("hr", null),
      React.createElement(
        "h4",
        null,
        "Tạo lớp"
      ),
      React.createElement(
        "table",
        { "class": "table table-bordered" },
        React.createElement(
          "thead",
          null,
          React.createElement(
            "tr",
            { "class": "success" },
            React.createElement(
              "td",
              null,
              "Mã lớp"
            ),
            React.createElement(
              "td",
              null,
              "Môn học"
            ),
            React.createElement(
              "td",
              null,
              "Giảng viên"
            ),
            React.createElement(
              "td",
              null,
              "Thao tác"
            )
          )
        ),
        React.createElement(
          "tbody",
          null,
          React.createElement(
            "tr",
            { "class": "danger" },
            React.createElement(
              "td",
              null,
              React.createElement("input", { type: "text", ref: "ma_lop", placeholder: "Mã lớp", style: { width: "100%" } })
            ),
            React.createElement(
              "td",
              null,
              React.createElement("input", { type: "hidden", id: "mm", placeholder: "Môn học", style: { width: "100%" } })
            ),
            React.createElement(
              "td",
              null,
              React.createElement("input", { type: "hidden", id: "gv4", placeholder: "Giảng viên", style: { width: "100%" }, "class": "input-xlarge" })
            ),
            React.createElement(
              "td",
              null,
              React.createElement(
                "button",
                { "class": "btn btn-success", onClick: this.onCreate },
                "Tạo lớp"
              )
            )
          )
        )
      ),
      React.createElement("hr", null),
      React.createElement("div", { id: "lop3" })
    );
  }
});
var LopMonHoc2 = React.createClass({
  displayName: "LopMonHoc2",

  getInitialState: function () {
    return { data: [], t: [] };
  },
  loadData: function () {
    $.ajax({
      url: '/daotao/lops',
      success: (function (data) {
        this.setState({ data: data.lops, t: data.t });
      }).bind(this)
    });
  },
  componentWillMount: function () {
    this.loadData();
  },
  componentDidMount: function () {
    var self = this;

    $('#mytable').dataTable({
      "sPaginationType": "bootstrap",
      "bAutoWidth": false,
      "bDestroy": true,
      "fnDrawCallback": function () {
        self.forceUpdate();
      }
    });
  },
  componentDidUpdate: function () {
    var self = this;
    $('#mytable').dataTable({
      "sPaginationType": "bootstrap",
      "bAutoWidth": false,
      "bDestroy": true
    });
    $("#timlop").select2({
      data: self.state.t
    });
  },
  handleStart: function (d) {
    $.ajax({
      url: '/daotao/lop_mon_hocs/start',
      type: 'POST',
      data: d,
      success: (function (data) {
        this.setState({ data: data.lops, t: data.t });
      }).bind(this)
    });
  },
  handleRemove: function (d) {
    $.ajax({
      url: '/daotao/lop_mon_hocs/remove',
      type: 'POST',
      data: d,
      success: (function (data) {
        this.setState({ data: data.lops, t: data.t });
      }).bind(this)
    });
  },
  handleRestore: function (d) {
    $.ajax({
      url: '/daotao/lop_mon_hocs/restore',
      type: 'POST',
      data: d,
      success: (function (data) {
        this.setState({ data: data.lops, t: data.t });
      }).bind(this)
    });
  },
  handleUpdate: function (d) {
    $.ajax({
      url: '/daotao/lop_mon_hocs/update',
      type: 'POST',
      data: d,
      success: (function (data) {
        this.setState({ data: data.lops, t: data.t });
      }).bind(this)
    });
  },
  onSearch: function () {
    var lop = $('#timlop').val();
    React.unmountAndReleaseReactRootNode(document.getElementById('assistant'));
    React.renderComponent(React.createElement(Assistant, { giang_viens: this.props.giang_viens, lop: lop }), document.getElementById('assistant'));
  },
  render: function () {
    var self = this;
    var x = this.state.data.map(function (d, index) {
      return React.createElement(LopRow, { onUpdate: self.handleUpdate, onStart: self.handleStart, onRemove: self.handleRemove, onRestore: self.handleRestore, stt: index + 1, data: d });
    });
    return React.createElement(
      "div",
      null,
      React.createElement(
        "h4",
        null,
        "Tìm lớp"
      ),
      React.createElement("input", { type: "hidden", id: "timlop", placeholder: "Lớp môn học", style: { width: "500px" }, "class": "input-xlarge" }),
      React.createElement(
        "button",
        { "class": "btn btn-success", onClick: this.onSearch },
        "Tìm lớp"
      ),
      React.createElement("div", { id: "assistant" }),
      React.createElement("hr", null),
      React.createElement(
        "h4",
        null,
        "Danh sách các lớp trong kỳ"
      ),
      React.createElement(
        "div",
        { "class": "table-responsive" },
        React.createElement(
          "table",
          { "class": "table table-bordered", id: "mytable" },
          React.createElement(
            "thead",
            null,
            React.createElement(
              "tr",
              { "class": "success" },
              React.createElement(
                "td",
                null,
                "Stt"
              ),
              React.createElement(
                "td",
                null,
                "Mã lớp"
              ),
              React.createElement(
                "td",
                null,
                "Tên môn học"
              ),
              React.createElement(
                "td",
                null,
                "Trạng thái"
              ),
              React.createElement(
                "td",
                null,
                "Thao tác"
              )
            )
          ),
          React.createElement(
            "tbody",
            null,
            x
          )
        )
      )
    );
  }
});

var LopRow = React.createClass({
  displayName: "LopRow",

  getInitialState: function () {
    return { edit: 0 };
  },
  onStart: function () {
    this.props.onStart(this.props.data);
  },
  onRemove: function () {
    this.props.onRemove(this.props.data);
  },
  onRestore: function () {
    this.props.onRestore(this.props.data);
  },
  onEdit: function () {
    this.setState({ edit: 1 });
  },
  onCancel: function () {
    this.setState({ edit: 0 });
  },
  onUpdate: function () {
    var ma_lop = this.refs.ma_lop.getDOMNode().value;
    this.props.onUpdate({ id: this.props.data.id, ma_lop: ma_lop });
    this.setState({ edit: 0 });
  },
  componentDidUpdate: function () {
    if (this.state.edit === 1) {
      this.refs.ma_lop.getDOMNode().value = this.props.data.ma_lop;
    }
  },
  render: function () {
    if (this.state.edit === 0) {
      return React.createElement(
        "tr",
        null,
        React.createElement(
          "td",
          null,
          this.props.stt
        ),
        React.createElement(
          "td",
          null,
          this.props.data.ma_lop
        ),
        React.createElement(
          "td",
          null,
          this.props.data.ten_mon_hoc
        ),
        React.createElement(
          "td",
          null,
          this.props.data.state
        ),
        React.createElement(
          "td",
          null,
          React.createElement(
            "button",
            { "class": "btn btn-sm btn-warning", onClick: this.onEdit },
            "Sửa"
          ),
          React.createElement(
            "button",
            { "class": "btn btn-sm btn-success", onClick: this.onStart, style: { "display": this.props.data.can_start === true ? "" : "none" } },
            "Bắt đầu"
          ),
          React.createElement(
            "button",
            { "class": "btn btn-sm btn-danger", onClick: this.onRemove, style: { "display": this.props.data.can_remove === true ? "" : "none" } },
            "Hủy"
          ),
          React.createElement(
            "button",
            { "class": "btn btn-sm btn-default", onClick: this.onRestore, style: { "display": this.props.data.can_restore === true ? "" : "none" } },
            "Phục hồi"
          )
        )
      );
    } else {
      return React.createElement(
        "tr",
        null,
        React.createElement(
          "td",
          null,
          this.props.stt
        ),
        React.createElement(
          "td",
          null,
          React.createElement("input", { type: "text", ref: "ma_lop" })
        ),
        React.createElement(
          "td",
          null,
          this.props.data.ten_mon_hoc
        ),
        React.createElement(
          "td",
          null,
          this.props.data.state
        ),
        React.createElement(
          "td",
          null,
          React.createElement(
            "button",
            { "class": "btn btn-sm btn-default", onClick: this.onCancel },
            "Hủy"
          ),
          React.createElement(
            "button",
            { "class": "btn btn-sm btn-warning", onClick: this.onUpdate },
            "Cập nhật"
          ),
          React.createElement(
            "button",
            { "class": "btn btn-sm btn-success", onClick: this.onStart, style: { "display": this.props.data.can_start === true ? "" : "none" } },
            "Bắt đầu"
          ),
          React.createElement(
            "button",
            { "class": "btn btn-sm btn-danger", onClick: this.onRemove, style: { "display": this.props.data.can_remove === true ? "" : "none" } },
            "Hủy"
          ),
          React.createElement(
            "button",
            { "class": "btn btn-sm btn-default", onClick: this.onRestore, style: { "display": this.props.data.can_restore === true ? "" : "none" } },
            "Phục hồi"
          )
        )
      );
    }
  }
});

var Assistant = React.createClass({
  displayName: "Assistant",

  getInitialState: function () {
    return { data: [], users: [] };
  },
  loadData: function () {
    $.ajax({
      url: '/daotao/lop_mon_hocs/' + this.props.lop + '/assistants',
      success: (function (data) {
        this.setState({ data: data });
      }).bind(this)
    });
    $.ajax({
      url: '/daotao/users',
      success: (function (data) {
        this.setState({ users: data });
      }).bind(this)
    });
  },
  componentWillMount: function () {
    this.loadData();
  },
  componentDidUpdate: function () {
    var self = this;
    $("#ast").select2({
      data: self.props.giang_viens
    });
  },
  handleDelete: function (d) {
    $.ajax({
      url: '/daotao/lop_mon_hocs/' + this.props.lop + '/assistants/delete',
      type: 'POST',
      data: d,
      success: (function (data) {
        this.setState({ data: data });
      }).bind(this)
    });
  },
  handleAdd: function () {
    var giang_vien_id = $('#ast').val();
    $.ajax({
      url: '/daotao/lop_mon_hocs/' + this.props.lop + '/assistants/create',
      type: 'POST',
      data: { giang_vien_id: giang_vien_id },
      success: (function (data) {
        this.setState({ data: data });
      }).bind(this)
    });
  },
  handleUpdate: function (d) {
    $.ajax({
      url: '/daotao/lop_mon_hocs/' + this.props.lop + '/assistants/update',
      type: 'POST',
      data: d,
      success: (function (data) {
        this.setState({ data: data });
      }).bind(this)
    });
  },
  render: function () {
    var self = this;
    var x = this.state.data.map(function (d, index) {
      return React.createElement(AssistantRow, { onDelete: self.handleDelete, onUpdate: self.handleUpdate, users: self.state.users, stt: index + 1, data: d });
    });
    return React.createElement(
      "div",
      null,
      React.createElement(
        "h4",
        null,
        "Thêm giảng viên:"
      ),
      React.createElement("input", { type: "hidden", id: "ast", placeholder: "Chọn giảng viên", style: { width: "500px" }, "class": "input-xlarge" }),
      React.createElement(
        "button",
        { "class": "btn btn-success", onClick: this.handleAdd },
        "Thêm giảng viên"
      ),
      React.createElement(
        "div",
        { "class": "table-responsive" },
        React.createElement(
          "table",
          { "class": "table table-bordered" },
          React.createElement(
            "thead",
            null,
            React.createElement(
              "tr",
              { "class": "success" },
              React.createElement(
                "td",
                null,
                "Stt"
              ),
              React.createElement(
                "td",
                null,
                "Sử dụng tài khoản"
              ),
              React.createElement(
                "td",
                null,
                "Giảng viên"
              ),
              React.createElement(
                "td",
                null,
                "Mã giảng viên"
              ),
              React.createElement(
                "td",
                null,
                "Trợ giảng?"
              ),
              React.createElement(
                "td",
                null,
                "Thao tác"
              )
            )
          ),
          React.createElement(
            "tbody",
            null,
            x
          )
        )
      )
    );
  }
});
var AssistantRow = React.createClass({
  displayName: "AssistantRow",

  getInitialState: function () {
    return { add: 0 };
  },
  onEdit: function () {
    this.setState({ add: 1 });
  },
  onCancel: function () {
    this.setState({ add: 0 });
  },
  onUpdate: function () {
    var username = $('#username').select2('data').text;
    var id = this.props.data.id;
    var trogiang = this.refs.trogiang.getDOMNode().checked;
    this.setState({ add: 0 });
    this.props.onUpdate({ username: username, id: id, trogiang: trogiang });
  },
  onDelete: function () {
    this.props.onDelete(this.props.data);
  },
  componentDidUpdate: function () {
    if (this.state.add === 1) {
      var self = this;
      $("#username").select2({
        data: self.props.users
      });
      $('#username').select2('data', { id: this.props.data.username, text: this.props.data.username });
    }
  },
  render: function () {
    if (this.state.add === 0) {
      return React.createElement(
        "tr",
        { "class": "danger" },
        React.createElement(
          "td",
          null,
          this.props.stt
        ),
        React.createElement(
          "td",
          null,
          this.props.data.username
        ),
        React.createElement(
          "td",
          null,
          this.props.data.hovaten
        ),
        React.createElement(
          "td",
          null,
          this.props.data.code
        ),
        React.createElement(
          "td",
          null,
          this.props.data.trogiang === true ? "Trợ giảng" : "Giảng viên chính"
        ),
        React.createElement(
          "td",
          null,
          React.createElement(
            "button",
            { "class": "btn btn-sm btn-danger", onClick: this.onDelete },
            "Xóa"
          ),
          React.createElement(
            "button",
            { "class": "btn btn-sm btn-primary", onClick: this.onEdit },
            "Sửa"
          )
        )
      );
    } else {
      return React.createElement(
        "tr",
        null,
        React.createElement(
          "td",
          null,
          this.props.stt
        ),
        React.createElement(
          "td",
          null,
          React.createElement("input", { ref: "username", type: "hidden", id: "username", style: { width: "100%" }, placeholder: "email" })
        ),
        React.createElement(
          "td",
          null,
          this.props.data.hovaten
        ),
        React.createElement(
          "td",
          null,
          this.props.data.code
        ),
        React.createElement(
          "td",
          null,
          React.createElement(
            "div",
            { "class": "checkbox" },
            React.createElement(
              "label",
              null,
              React.createElement(
                "input",
                { ref: "trogiang", value: this.props.trogiang, type: "checkbox" },
                "Trợ giảng"
              )
            )
          )
        ),
        React.createElement(
          "td",
          null,
          React.createElement(
            "button",
            { "class": "btn btn-sm btn-danger", onClick: this.onDelete },
            "Xóa"
          ),
          React.createElement(
            "button",
            { "class": "btn btn-sm btn-primary", onClick: this.onUpdate },
            "Cập nhật"
          ),
          React.createElement(
            "button",
            { "class": "btn btn-sm btn-warning", onClick: this.onCancel },
            "Hủy"
          )
        )
      );
    }
  }
});