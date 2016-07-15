- /**
  - * @jsx React.DOM
  - */
"use strict";

var React = require("react");
//= require react
//= require ./grade3
//= require ./grade2
//= require ./calendar
//= require ./lopsetting
//= require ./assignments
//= require ./lichgiangday
//= require ./dangkybosung

var DisabledEnrollment = React.createClass({
  displayName: "DisabledEnrollment",

  render: function () {
    return React.createElement(
      "tr",
      { "class": this.props.stt % 2 == 0 ? 'danger' : 'default' },
      React.createElement(
        "td",
        null,
        this.props.stt
      ),
      React.createElement(
        "td",
        null,
        this.props.enrollment.name,
        " (",
        this.props.enrollment.code,
        ")"
      ),
      React.createElement(
        "td",
        null,
        React.createElement(
          "div",
          { "class": "progress" },
          React.createElement(
            "div",
            { "class": "progress-bar progress-bar-success", style: { width: this.props.enrollment.dihoc_tinhhinh + "%" } },
            React.createElement(
              "span",
              null,
              this.props.enrollment.dihoc_tinhhinh + "%"
            )
          ),
          React.createElement(
            "div",
            { "class": "progress-bar progress-bar-danger", style: { width: this.props.enrollment.tinhhinh + "%" } },
            React.createElement(
              "span",
              null,
              this.props.enrollment.tinhhinh + "%"
            )
          )
        )
      ),
      React.createElement(
        "td",
        null,
        "x"
      ),
      React.createElement(
        "td",
        null,
        "x"
      ),
      React.createElement(
        "td",
        null,
        "x"
      ),
      React.createElement(
        "td",
        null,
        "x"
      ),
      React.createElement(
        "td",
        null,
        "x"
      )
    );
  }
});
var Enrollment = React.createClass({
  displayName: "Enrollment",

  getInitialState: function () {
    return { value: this.props.enrollment.note };
  },
  handleChange: function (event) {
    this.setState({ value: event.target.value });
    return false;
  },
  onmsubmit: function (event) {
    var self = this;
    this.props.ajax.loading = true;
    this.props.enrollment.note = this.state.value;
    this.forceUpdate();
    setTimeout(function () {
      self.props.on_note(self.props.enrollment, 'note');
    }, 1200);
    return false;
  },
  render: function () {
    var css = { "Đang học": "btn btn-success btn-sm btn-block",
      "Vắng": "btn btn-danger btn-sm btn-block",
      "Trễ": "btn btn-warning btn-sm btn-block",
      "x": "btn btn-default btn-sm btn-block" };
    var phep = { "Có": "btn btn-success btn-sm btn-block",
      "Không": "btn btn-danger btn-sm btn-block",
      "x": "btn btn-default btn-sm btn-block" };
    var idle = { "Có": "btn btn-success btn-sm btn-block",
      "Không": "btn btn-danger btn-sm btn-block" };
    var value = this.state.value;
    var plus = 'disabled';
    var minus = 'disabled';
    if (this.props.enrollment.idle_status === "Có" && parseInt(this.props.enrollment.so_tiet_vang) < parseInt(this.props.enrollment.max) && this.props.state === true && this.props.ajax.loading === false) {
      plus = '';
    }
    if (this.props.enrollment.idle_status === "Có" && parseInt(this.props.enrollment.so_tiet_vang) > 0 && this.props.state === true && this.props.ajax.loading === false) {
      minus = '';
    }
    return React.createElement(
      "tr",
      { "class": this.props.stt % 2 == 0 ? 'danger' : 'default' },
      React.createElement(
        "td",
        null,
        this.props.stt
      ),
      React.createElement(
        "td",
        null,
        this.props.enrollment.name,
        " (",
        this.props.enrollment.code,
        ")"
      ),
      React.createElement(
        "td",
        null,
        React.createElement(
          "div",
          { "class": "progress" },
          React.createElement(
            "div",
            { "class": "progress-bar progress-bar-success", style: { width: this.props.enrollment.dihoc_tinhhinh + "%" } },
            React.createElement(
              "span",
              null,
              this.props.enrollment.dihoc_tinhhinh + "%"
            )
          ),
          React.createElement(
            "div",
            { "class": "progress-bar progress-bar-danger", style: { width: this.props.enrollment.tinhhinh + "%" } },
            React.createElement(
              "span",
              null,
              this.props.enrollment.tinhhinh + "%"
            )
          )
        )
      ),
      React.createElement(
        "td",
        null,
        React.createElement(
          "button",
          { onClick: this.props.on_absent, disabled: this.props.enrollment.idle_status === "Không" || this.props.ajax.loading === true || this.props.enrollment.status === "Trễ" ? 'disabled' : '', "class": css[this.props.enrollment.status] + ' curl-top-left' },
          this.props.enrollment.status
        )
      ),
      React.createElement(
        "td",
        null,
        React.createElement(
          "button",
          { onClick: this.props.on_plus, "class": "btn btn-default btn-sm curl-top-left", disabled: plus === 'disabled' ? 'disabled' : '' },
          React.createElement("span", { "class": "glyphicon glyphicon-plus" })
        ),
        '   ',
        this.props.enrollment.so_tiet_vang,
        '   ',
        React.createElement(
          "button",
          { onClick: this.props.on_minus, "class": "btn btn-default btn-sm curl-top-left", disabled: minus === 'disabled' ? 'disabled' : '' },
          React.createElement("span", { "class": "glyphicon glyphicon-minus" })
        )
      ),
      React.createElement(
        "td",
        null,
        React.createElement(
          "button",
          { disabled: this.props.enrollment.idle_status === "Không" && (this.props.enrollment.so_tiet_vang === 0 && this.props.state === true || this.props.ajax.loading === true) ? 'disabled' : '', onClick: this.props.on_phep, "class": phep[this.props.enrollment.phep_status] + ' curl-top-left' },
          this.props.enrollment.phep_status
        )
      ),
      React.createElement(
        "td",
        null,
        React.createElement(
          "button",
          { onClick: this.props.on_idle, "class": idle[this.props.enrollment.idle_status] + ' curl-top-left' },
          this.props.enrollment.idle_status
        )
      ),
      React.createElement(
        "td",
        null,
        React.createElement("input", { type: "text", value: value, onChange: this.handleChange }),
        React.createElement(
          "button",
          { "class": "btn btn-primary btn-sm curl-top-left", onClick: this.onmsubmit, disabled: this.props.ajax.loading === true && this.props.state === true ? 'disabled' : '' },
          "Cập nhật ghi chú"
        )
      )
    );
  }
});
var Enrollments = React.createClass({
  displayName: "Enrollments",

  handleVang: function (e, s) {
    var self = this;
    this.props.loading = true;
    this.forceUpdate();
    self.props.on_vang(e, s);
    return false;
  },
  render: function () {
    var self = this;
    var enrollments = this.props.data.map(function (enrollment, i) {
      if (self.props.state === false) {
        return React.createElement(DisabledEnrollment, { stt: i + 1, key: enrollment.id, enrollment: enrollment });
      } else {
        return React.createElement(Enrollment, { state: self.props.state, stt: i + 1, key: enrollment.id, enrollment: enrollment, on_absent: self.handleVang.bind(self, enrollment, 'vang'), on_plus: self.handleVang.bind(self, enrollment, 'plus'), on_idle: self.handleVang.bind(self, enrollment, 'idle'), on_minus: self.handleVang.bind(self, enrollment, 'minus'), on_phep: self.handleVang.bind(self, enrollment, 'phep'), on_note: self.handleVang.bind(self, enrollment, 'note'), ajax: { loading: self.props.loading } });
      }
    });
    return React.createElement(
      "div",
      null,
      React.createElement(
        "h6",
        null,
        "Thông tin điểm danh:"
      ),
      React.createElement(
        "div",
        { "class": "table-responsive" },
        React.createElement(
          "table",
          { "class": "table table-bordered table-condensed table-striped" },
          React.createElement(
            "colgroup",
            null,
            React.createElement("col", { style: { width: "5%" } }),
            React.createElement("col", { style: { width: "15%" } }),
            React.createElement("col", { style: { width: "15%" } }),
            React.createElement("col", { style: { width: "10%" } }),
            React.createElement("col", { style: { width: "15%" } }),
            React.createElement("col", { style: { width: "10%" } }),
            React.createElement("col", { style: { width: "10%" } }),
            React.createElement("col", { style: { width: "20%" } })
          ),
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
                "Sinh viên"
              ),
              React.createElement(
                "td",
                null,
                "Tình hình đi học"
              ),
              React.createElement(
                "td",
                null,
                "Vắng"
              ),
              React.createElement(
                "td",
                null,
                "Số tiết vắng"
              ),
              React.createElement(
                "td",
                null,
                "Phép"
              ),
              React.createElement(
                "td",
                null,
                "Bắt buộc tham dự"
              ),
              React.createElement(
                "td",
                null,
                "Ghi chú"
              )
            )
          ),
          React.createElement(
            "tbody",
            null,
            enrollments
          )
        )
      )
    );
  }
});
var Lop = React.createClass({
  displayName: "Lop",

  componentDidMount: function () {
    React.renderComponent(React.createElement(Assignments, { giang_vien: ENV.giang_vien_id, lop: ENV.lop_id }), document.getElementById('assignment'));
    React.renderComponent(React.createElement(Bosung, { giang_vien: ENV.giang_vien_id, lop: ENV.lop_id }), document.getElementById('bosung'));
    React.renderComponent(React.createElement(Calendar, { giang_vien: ENV.giang_vien_id, lop: ENV.lop_id }), document.getElementById('calendar'));
    React.renderComponent(React.createElement(LopSetting, { giang_vien: ENV.giang_vien_id, lop: ENV.lop_id }), document.getElementById('thongso'));
  },
  render: function () {
    return React.createElement(
      "div",
      { "class": "panel-body" },
      React.createElement(
        "ul",
        { "class": "nav nav-tabs" },
        React.createElement(
          "li",
          { "class": "active" },
          React.createElement(
            "a",
            { href: "#home", "data-toggle": "tab" },
            "Thông tin chung"
          )
        ),
        React.createElement(
          "li",
          null,
          React.createElement(
            "a",
            { href: "#thongso1", "data-toggle": "tab" },
            "Thiết lập thông số"
          )
        ),
        React.createElement(
          "li",
          null,
          React.createElement(
            "a",
            { href: "#assignments", "data-toggle": "tab" },
            "Thiết lập nhóm điểm"
          )
        ),
        React.createElement(
          "li",
          null,
          React.createElement(
            "a",
            { href: "#bs", "data-toggle": "tab" },
            "Đăng ký bổ sung"
          )
        ),
        React.createElement(
          "li",
          null,
          React.createElement(
            "a",
            { href: "#calendar1", "data-toggle": "tab" },
            "Thời khóa biểu"
          )
        )
      ),
      React.createElement(
        "div",
        { "class": "tab-content" },
        React.createElement(
          "div",
          { "class": "tab-pane", id: "assignments" },
          React.createElement("br", null),
          React.createElement("div", { id: "assignment" })
        ),
        React.createElement(
          "div",
          { "class": "tab-pane", id: "calendar1" },
          React.createElement("br", null),
          React.createElement("div", { id: "calendar" })
        ),
        React.createElement(
          "div",
          { "class": "tab-pane", id: "thongso1" },
          React.createElement("div", { id: "thongso" })
        ),
        React.createElement(
          "div",
          { "class": "tab-pane active", id: "home" },
          React.createElement("br", null),
          React.createElement(
            "h6",
            null,
            "Thông tin lớp học:"
          ),
          React.createElement(
            "div",
            { "class": "table-responsive" },
            React.createElement(
              "table",
              { "class": "table table-bordered table-condensed" },
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
                    "Tên môn học"
                  ),
                  React.createElement(
                    "td",
                    null,
                    "Sĩ số"
                  ),
                  React.createElement(
                    "td",
                    null,
                    "Số tiết lý thuyết"
                  ),
                  React.createElement(
                    "td",
                    null,
                    "Số tiết thực hành"
                  ),
                  React.createElement(
                    "td",
                    null,
                    "Trạng thái"
                  )
                )
              ),
              React.createElement(
                "tbody",
                null,
                React.createElement(
                  "td",
                  null,
                  React.createElement(
                    "a",
                    { href: "/lop/" + this.props.lop.id },
                    this.props.lop.ma_lop
                  )
                ),
                React.createElement(
                  "td",
                  null,
                  this.props.lop.ten_mon_hoc
                ),
                React.createElement(
                  "td",
                  null,
                  this.props.lop.si_so
                ),
                React.createElement(
                  "td",
                  null,
                  this.props.lop.so_tiet_ly_thuyet
                ),
                React.createElement(
                  "td",
                  null,
                  this.props.lop.so_tiet_thuc_hanh
                ),
                React.createElement(
                  "td",
                  null,
                  this.props.lop.completed === true ? 'Đã hoàn thành' : 'Chưa kết thúc'
                )
              )
            )
          )
        ),
        React.createElement(
          "div",
          { "class": "tab-pane", id: "bs" },
          React.createElement("div", { id: "bosung" })
        )
      )
    );
  }
});
var DisabledEditor = React.createClass({
  displayName: "DisabledEditor",

  render: function () {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { id: "content-header" },
        React.createElement(
          "p",
          null,
          React.createElement("span", { dangerouslySetInnerHTML: { __html: this.props.lich.content_html } })
        )
      ),
      React.createElement(
        "h4",
        null,
        "Các buổi đã dạy"
      ),
      React.createElement(LichGiangDay, { giang_vien: this.props.giang_vien, lop: this.props.lop })
    );
  }
});
var Editor = React.createClass({
  displayName: "Editor",

  getInitialState: function () {
    return { content: '', edit: 0 };
  },
  loadData: function () {
    $.ajax({
      url: "/teacher/lich/" + this.props.lich + "/noidung.json",
      success: (function (data) {
        this.setState({ content: data.lich.content, edit: 0 });
      }).bind(this)
    });
  },
  componentWillMount: function () {
    this.loadData();
  },
  componentDidUpdate: function () {
    if (this.state.edit == 1) {
      this.refs.editor.getDOMNode().value = this.state.content;
    }
  },
  handleEdit: function (e) {
    this.setState({ edit: 1 });
  },
  handleUpdate: function (e) {
    var content = this.refs.editor.getDOMNode().value;
    var data = {
      id: this.props.lich,
      content: content
    };
    $.ajax({
      url: "/teacher/lich/noidung",
      type: 'POST',
      data: data,
      success: (function (data) {
        this.setState({ content: data.lich.content, edit: 0 });
      }).bind(this)
    });
  },
  handleCancel: function (e) {
    this.setState({ edit: 0 });
  },
  render: function () {
    if (this.state.edit === 0) {
      return React.createElement(
        "div",
        null,
        React.createElement(LichGiangDay, { giang_vien: this.props.giang_vien, lop: this.props.lop })
      );
    } else {
      return React.createElement(
        "div",
        null,
        React.createElement(LichGiangDay, { giang_vien: this.props.giang_vien, lop: ENV.lop_id })
      );
    }
  }
});

var LichSetting = React.createClass({
  displayName: "LichSetting",

  handleComplete: function (e) {
    this.props.onComplete(this.props.lich);
  },
  render: function () {
    return React.createElement(
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
              "Phòng"
            ),
            React.createElement(
              "td",
              null,
              "Loại"
            ),
            React.createElement(
              "td",
              null,
              "Số tiết"
            ),
            React.createElement(
              "td",
              null,
              "Số sinh viên có mặt"
            ),
            React.createElement(
              "td",
              null,
              "Số sinh viên vắng"
            ),
            React.createElement(
              "td",
              null,
              "Giờ học"
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
          React.createElement(
            "tr",
            null,
            React.createElement(
              "td",
              null,
              this.props.lich.phong
            ),
            React.createElement(
              "td",
              null,
              this.props.lich.type_status
            ),
            React.createElement(
              "td",
              null,
              this.props.lich.so_tiet
            ),
            React.createElement(
              "td",
              null,
              this.props.lich.sv_co_mat
            ),
            React.createElement(
              "td",
              null,
              this.props.lich.sv_vang_mat
            ),
            React.createElement(
              "td",
              null,
              this.props.lich.alias_state
            ),
            React.createElement(
              "td",
              null,
              this.props.lich.alias_status
            ),
            React.createElement(
              "td",
              null,
              this.props.lich.updated ? React.createElement(
                "div",
                null,
                React.createElement(
                  "button",
                  { onClick: this.handleComplete, "class": "btn btn-sm btn-primary curl-top-left", title: "", "data-placement": "left", "data-toggle": "tooltip", type: "button", "data-original-title": "Nhấn vào hoàn thành để tính buổi dạy này vào khối lượng thực hiện giảng dạy" },
                  "Hoàn thành"
                )
              ) : ''
            )
          )
        )
      )
    );
  }
});

var Lich = React.createClass({
  displayName: "Lich",

  loadEnrollmentsFromServer: function () {
    $.ajax({
      url: "/teacher/lich/" + this.props.lich + "/attendances.json",
      success: (function (data2) {
        this.setState({ noidung: data2.info.lich.content, data: data2.enrollments, lich: data2.info.lich, lop: data2.info.lop, loading: false });
      }).bind(this)
    });
  },
  componentWillMount: function () {
    this.loadEnrollmentsFromServer();
  },
  componentDidMount: function () {
    React.renderComponent(React.createElement(Grade2, { lop: this.props.lop }), document.getElementById('grades'));

    React.renderComponent(React.createElement(Editor, { lich: this.props.lich, lop: this.props.lop, giang_vien: this.props.giang_vien }), document.getElementById('editor'));
  },
  getInitialState: function () {
    return { data: [], lich: {}, lop: {}, loading: false };
  },
  handleSettingLop: function (lop) {
    var d = {
      lich_id: this.state.lich.id,
      lop: lop
    };
    $.ajax({
      url: "/teacher/lich/" + this.props.lich + "/settinglop",
      type: 'POST',
      data: d,
      success: (function (data2) {
        this.setState({ noidung: data2.info.lich.content, data: data2.enrollments, lich: data2.info.lich, lop: data2.info.lop, loading: false });
        //alert(data.so_tiet_vang);
      }).bind(this)
    });
    return false;
  },
  handleVang: function (enrollment, stat) {
    var d = {
      stat: stat,
      lich_id: this.state.lich.id,
      enrollment: enrollment
    };
    $.ajax({
      url: "/teacher/lich/" + this.props.lich + "/attendances",
      type: 'POST',
      data: d,
      success: (function (data2) {
        this.setState({ noidung: data2.info.lich.content, data: data2.enrollments, lich: data2.info.lich, lop: data2.info.lop, loading: false });
        React.unmountAndReleaseReactRootNode(document.getElementById('grades'));
        React.renderComponent(React.createElement(Grade2, { lop: this.props.lop }), document.getElementById('grades'));
      }).bind(this)
    });
    return false;
  },
  handleChangeContent: function (e) {
    this.setState({ noidung: e.target.value });
    this.state.lich.content = this.state.noidung;
  },
  handleComplete: function (d) {
    d.giang_vien = this.props.giang_vien;
    d.lop_id = this.props.lop;
    $.ajax({
      url: "/teacher/lop/" + this.props.lop + "/lich_trinh_giang_days/complete",
      type: 'POST',
      data: d,
      success: (function (data2) {
        this.setState({ noidung: data2.info.lich.content, data: data2.enrollments, lich: data2.info.lich, lop: data2.info.lop, loading: false });
        React.unmountAndReleaseReactRootNode(document.getElementById('bosung'));
        React.renderComponent(React.createElement(Bosung, { giang_vien: ENV.giang_vien_id, lop: ENV.lop_id }), document.getElementById('bosung'));
        React.unmountAndReleaseReactRootNode(document.getElementById('calendar'));
        React.renderComponent(React.createElement(Calendar, { giang_vien: ENV.giang_vien_id, lop: ENV.lop_id }), document.getElementById('calendar'));
      }).bind(this)
    });
  },
  render: function () {

    return React.createElement(
      "div",
      { "class": "panel-group", id: "accordion" },
      React.createElement(
        "div",
        { "class": "panel panel-default" },
        React.createElement(
          "div",
          { "class": "panel-heading" },
          React.createElement(
            "h4",
            { "class": "panel-title" },
            React.createElement(
              "a",
              { "data-toggle": "collapse", "data-parent": "#accordion", href: "#collapseOne" },
              "Thông tin lớp học"
            )
          )
        ),
        React.createElement(
          "div",
          { id: "collapseOne", "class": "panel-collapse collapse" },
          React.createElement(
            "div",
            { "class": "panel-body" },
            React.createElement(Lop, { lop: this.state.lop, onSettingLop: this.handleSettingLop })
          )
        )
      ),
      React.createElement(
        "div",
        { "class": "panel panel-default" },
        React.createElement(
          "div",
          { "class": "panel-heading" },
          React.createElement(
            "h4",
            { "class": "panel-title" },
            React.createElement(
              "a",
              { "data-toggle": "collapse", "data-parent": "#accordion", href: "#collapseTwo" },
              "Điểm danh"
            )
          )
        ),
        React.createElement(
          "div",
          { id: "collapseTwo", "class": "panel-collapse collapse" },
          React.createElement(
            "div",
            { "class": "panel-body" },
            React.createElement(
              "ul",
              { "class": "nav nav-tabs" },
              React.createElement(
                "li",
                { "class": "active" },
                React.createElement(
                  "a",
                  { href: "#home2", "data-toggle": "tab" },
                  "Điểm danh"
                )
              ),
              React.createElement(
                "li",
                null,
                React.createElement(
                  "a",
                  { href: "#noidung", "data-toggle": "tab" },
                  "Nội dung giảng dạy"
                )
              ),
              React.createElement(
                "li",
                null,
                React.createElement(
                  "a",
                  { href: "#ltdk1", "data-toggle": "tab" },
                  "Lịch trình dự kiến"
                )
              ),
              React.createElement(
                "li",
                null,
                React.createElement(
                  "a",
                  { href: "#dcdk1", "data-toggle": "tab" },
                  "Đề cương dự kiến"
                )
              )
            ),
            React.createElement(
              "div",
              { "class": "tab-content" },
              React.createElement(
                "div",
                { "class": "tab-pane active", id: "home2" },
                React.createElement("br", null),
                React.createElement(
                  "h6",
                  null,
                  "Thông tin buổi học"
                ),
                React.createElement(LichSetting, { lich: this.state.lich, onComplete: this.handleComplete }),
                React.createElement("br", null),
                React.createElement(Enrollments, { state: this.state.lich.can_diem_danh === true, data: this.state.data, on_vang: this.handleVang, loading: this.state.loading })
              ),
              React.createElement(
                "div",
                { "class": "tab-pane", id: "noidung" },
                React.createElement("br", null),
                React.createElement(
                  "h6",
                  null,
                  "Thông tin buổi học"
                ),
                React.createElement(LichSetting, { lich: this.state.lich, onComplete: this.handleComplete }),
                React.createElement("br", null),
                React.createElement(
                  "div",
                  { "class": "row" },
                  React.createElement("hr", null),
                  React.createElement(
                    "p",
                    { "class": "text-center" },
                    React.createElement(
                      "h3",
                      null,
                      "Lịch trình thực hiện"
                    ),
                    " "
                  ),
                  React.createElement("div", { id: "editor" })
                )
              ),
              React.createElement(
                "div",
                { "class": "tab-pane", id: "ltdk1" },
                React.createElement(
                  "p",
                  { "class": "text-center" },
                  React.createElement(
                    "h3",
                    null,
                    "Lịch trình dự kiến"
                  )
                ),
                React.createElement("span", { dangerouslySetInnerHTML: { __html: this.state.lop.lich_trinh_du_kien } })
              ),
              React.createElement(
                "div",
                { "class": "tab-pane", id: "dcdk1" },
                React.createElement(
                  "p",
                  { "class": "text-center" },
                  React.createElement(
                    "h3",
                    null,
                    "Đề cương chi tiết"
                  )
                ),
                React.createElement("span", { dangerouslySetInnerHTML: { __html: this.state.lop.de_cuong_chi_tiet } })
              )
            )
          )
        )
      ),
      React.createElement(
        "div",
        { "class": "panel panel-default" },
        React.createElement(
          "div",
          { "class": "panel-heading" },
          React.createElement(
            "h4",
            { "class": "panel-title" },
            React.createElement(
              "a",
              { "data-toggle": "collapse", "data-parent": "#accordion", href: "#collapseThree" },
              "Điểm"
            )
          )
        ),
        React.createElement(
          "div",
          { id: "collapseThree", "class": "panel-collapse collapse" },
          React.createElement(
            "div",
            { "class": "panel-body" },
            React.createElement(
              "ul",
              { "class": "nav nav-tabs" },
              React.createElement(
                "li",
                { "class": "active" },
                React.createElement(
                  "a",
                  { href: "#dct", "data-toggle": "tab" },
                  "Điểm chi tiết"
                )
              ),
              React.createElement(
                "li",
                null,
                React.createElement(
                  "a",
                  { href: "#dn", "data-toggle": "tab" },
                  "Điểm nhóm"
                )
              )
            ),
            React.createElement(
              "div",
              { "class": "tab-content" },
              React.createElement(
                "div",
                { "class": "tab-pane active", id: "dct" },
                React.createElement("div", { id: "grades" })
              ),
              React.createElement(
                "div",
                { "class": "tab-pane", id: "dn" },
                React.createElement("div", { id: "grades2" })
              )
            )
          )
        )
      )
    );
  }
});

//var init = {"lich":{"id":1,"phong":null,"noi_dung":null,"state":"started","sv_co_mat":0,"sv_vang_mat":0,"so_tiet":3,"so_tiet_moi":3,"thuc_hanh":null},"enrollments":[{"id":1,"name":"ho1 dem1 ten1","code":"sv1","status":"Vắng","so_tiet_vang":3,"phep":null,"max":3},{"id":2,"name":"ho2 dem2 ten2","code":"sv2","status":"Vắng","so_tiet_vang":3,"phep":null,"max":3}]}
/*
$.ajax({
      url: "/lich/1/enrollments.json" ,
      success: function(data) {                      
        React.renderComponent(  
          <Lich lich={ENV.lich_id} lich={data} />,
          document.getElementById('main')
        );           
      }
});    
*/
React.initializeTouchEvents(true);
React.renderComponent(React.createElement(Lich, { lich: ENV.lich_id, lop: ENV.lop_id, giang_vien: ENV.giang_vien_id }), document.getElementById('main'));