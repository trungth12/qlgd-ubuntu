- /**
  - * @jsx React.DOM
  - */
"use strict";

var React = require("react");

//= require react
//= require ./grade_mobile

var DisabledEnrollment = React.createClass({
  displayName: "DisabledEnrollment",

  render: function () {
    return React.createElement(
      "tr",
      { "class": this.props.stt % 2 == 0 ? 'danger' : 'default' },
      React.createElement(
        "td",
        null,
        this.props.stt,
        ".",
        this.props.enrollment.name,
        " ",
        React.createElement("br", null),
        "(",
        this.props.enrollment.code,
        ")"
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
        this.props.stt,
        ".",
        this.props.enrollment.name,
        React.createElement("br", null),
        " (",
        React.createElement(
          "a",
          { href: '/sinh_viens/' + this.props.enrollment.sinh_vien_id },
          this.props.enrollment.code
        ),
        ")"
      ),
      React.createElement(
        "td",
        null,
        React.createElement(
          "button",
          { onClick: this.props.on_absent, disabled: this.props.enrollment.idle_status === "Không" || this.props.ajax.loading === true || this.props.enrollment.status === "Trễ" ? 'disabled' : '', "class": css[this.props.enrollment.status] },
          this.props.enrollment.status
        ),
        React.createElement("br", null),
        React.createElement(
          "button",
          { onClick: this.props.on_plus, "class": "btn btn-default btn-sm", disabled: plus === 'disabled' ? 'disabled' : '' },
          React.createElement("span", { "class": "glyphicon glyphicon-plus" })
        ),
        '   ',
        this.props.enrollment.so_tiet_vang,
        '   ',
        React.createElement(
          "button",
          { onClick: this.props.on_minus, "class": "btn btn-default btn-sm", disabled: minus === 'disabled' ? 'disabled' : '' },
          React.createElement("span", { "class": "glyphicon glyphicon-minus" })
        )
      ),
      React.createElement(
        "td",
        null,
        React.createElement(
          "button",
          { disabled: this.props.enrollment.idle_status === "Không" && (this.props.enrollment.so_tiet_vang === 0 && this.props.state === true || this.props.ajax.loading === true) ? 'disabled' : '', onClick: this.props.on_phep, "class": phep[this.props.enrollment.phep_status] },
          this.props.enrollment.phep_status
        )
      ),
      React.createElement(
        "td",
        null,
        React.createElement(
          "button",
          { onClick: this.props.on_idle, "class": idle[this.props.enrollment.idle_status] },
          this.props.enrollment.idle_status
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
        return React.createElement(Enrollment, { state: self.props.state, stt: i + 1, key: enrollment.id, enrollment: enrollment, on_absent: self.handleVang.bind(self, enrollment, 'vang'), on_plus: self.handleVang.bind(self, enrollment, 'plus'), on_idle: self.handleVang.bind(self, enrollment, 'idle'), on_minus: self.handleVang.bind(self, enrollment, 'minus'), on_phep: self.handleVang.bind(self, enrollment, 'phep'), ajax: { loading: self.props.loading } });
      }
    });
    return React.createElement(
      "div",
      null,
      React.createElement(
        "h4",
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
            React.createElement("col", { style: { width: "28%" } }),
            React.createElement("col", { style: { width: "24%" } }),
            React.createElement("col", { style: { width: "24%" } }),
            React.createElement("col", { style: { width: "24%" } })
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
                "Sinh viên"
              ),
              React.createElement(
                "td",
                null,
                "Vắng"
              ),
              React.createElement(
                "td",
                null,
                "Phép"
              ),
              React.createElement(
                "td",
                null,
                "Bắt buộc"
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
  getInitialState: function () {
    return { data: [], lich: {}, lop: {}, loading: false };
  },
  getInitialState: function () {
    return { data: [], lich: {}, lop: {}, loading: false };
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
      }).bind(this)
    });
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
      }).bind(this)
    });
    return false;
  },
  render: function () {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "ul",
        { "class": "nav nav-pills" },
        React.createElement(
          "li",
          { "class": "active" },
          React.createElement(
            "a",
            { href: "#tt", "data-toggle": "tab" },
            "Thông tin buổi học"
          )
        ),
        React.createElement(
          "li",
          null,
          React.createElement(
            "a",
            { href: "#diem", "data-toggle": "tab" },
            "Điểm"
          )
        )
      ),
      React.createElement(
        "div",
        { "class": "tab-content" },
        React.createElement(
          "div",
          { id: "tt", "class": "tab-pane fade in active" },
          React.createElement("hr", null),
          React.createElement(LichSetting, { lich: this.state.lich, onComplete: this.handleComplete }),
          React.createElement("hr", null),
          React.createElement(Editor, { lich_id: this.props.lich }),
          React.createElement("hr", null),
          React.createElement(Enrollments, { state: this.state.lich.can_diem_danh === true, data: this.state.data, on_vang: this.handleVang, loading: this.state.loading })
        ),
        React.createElement(
          "div",
          { id: "diem", "class": "tab-pane" },
          React.createElement("hr", null),
          React.createElement(Grade2, { lop: this.props.lop })
        )
      )
    );
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
              "Số có mặt"
            ),
            React.createElement(
              "td",
              null,
              "Số vắng"
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

var Editor = React.createClass({
  displayName: "Editor",

  getInitialState: function () {
    return { edit: 0, data: "" };
  },
  loadContent: function () {
    $.ajax({
      url: '/teacher/lich_trinh_giang_days/' + this.props.lich_id + '/mobile_content',
      success: (function (data) {
        this.setState({ edit: 0, data: data });
      }).bind(this)
    });
  },
  onEdit: function () {
    this.setState({ edit: 1 });
  },
  onCancel: function () {
    this.setState({ edit: 0 });
  },
  onUpdate: function () {
    var content = this.refs.noidung.getDOMNode().value;
    $.ajax({
      url: '/teacher/lich_trinh_giang_days/mobile_content',
      type: 'POST',
      data: { lich_id: this.props.lich_id, content: content },
      success: (function (data) {
        this.setState({ edit: 0, data: data });
      }).bind(this)
    });
  },
  componentWillMount: function () {
    this.loadContent();
  },
  componentDidUpdate: function () {
    if (this.state.edit === 1) {
      this.refs.noidung.getDOMNode().value = this.state.data.content;
    }
  },
  render: function () {
    if (this.state.edit === 0) {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "h4",
          null,
          "Nội dung giảng dạy"
        ),
        React.createElement("span", { dangerouslySetInnerHTML: { __html: this.state.data.content_html } }),
        React.createElement("br", null),
        React.createElement(
          "button",
          { onClick: this.onEdit, "class": "btn btn-sm btn-success" },
          "Sửa nội dung"
        )
      );
    } else {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "h4",
          null,
          "Nội dung giảng dạy"
        ),
        React.createElement("textarea", { style: { width: "100%" }, ref: "noidung" }),
        React.createElement("br", null),
        React.createElement(
          "button",
          { onClick: this.onCancel, "class": "btn btn-sm btn-warning" },
          "Hủy"
        ),
        React.createElement(
          "button",
          { onClick: this.onUpdate, "class": "btn btn-sm btn-primary" },
          "Cập nhật"
        )
      );
    }
  }
});

React.renderComponent(React.createElement(Lich, { lich: ENV.lich_id, lop: ENV.lop_id, giang_vien: ENV.giang_vien_id }), document.getElementById('main'));