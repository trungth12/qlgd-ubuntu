- /**
  - * @jsx React.DOM
  - */
"use strict";

var React = require("react");

var Enrollment = React.createClass({
  displayName: "Enrollment",

  render: function () {
    var css = { "Không vắng": "btn btn-success btn-sm",
      "Vắng": "btn btn-danger btn-sm",
      "Trễ": "btn btn-warning btn-sm",
      "Không học": "btn btn-primary btn-sm" };
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
        this.props.name
      ),
      React.createElement(
        "td",
        null,
        this.props.code
      ),
      React.createElement(
        "td",
        null,
        React.createElement(
          "button",
          { onClick: this.props.on_vang, "class": css[this.props.status] },
          'v'
        )
      ),
      React.createElement(
        "td",
        null,
        React.createElement(
          "button",
          { onClick: this.props.on_plus, "class": "btn btn-default btn-sm" },
          "+"
        ),
        '   ',
        this.props.so_tiet_vang,
        '   ',
        React.createElement(
          "button",
          { onClick: this.props.on_minus, "class": "btn btn-default btn-sm" },
          "-"
        )
      ),
      React.createElement(
        "td",
        null,
        this.props.phep
      )
    );
  }
});
var Enrollments = React.createClass({
  displayName: "Enrollments",

  loadEnrollmentsFromServer: function () {
    $.ajax({
      url: this.props.url,
      success: (function (data) {
        this.setState({ data: data });
      }).bind(this)
    });
  },
  componentWillMount: function () {
    this.loadEnrollmentsFromServer();
  },
  getInitialState: function () {
    return { data: [] };
  },
  handleVang: function (enrollment, lich_id) {
    //alert(comment.id + " - " + lich_id);
    var d = {
      lich_id: lich_id,
      enrollment: enrollment
    };
    $.ajax({
      url: this.props.url,
      type: 'POST',
      data: d,
      success: (function (data) {
        //var olddata = this.state;
        var r = this.state.data.filter(function (v) {
          return v.id === data.id;
        })[0];
        r.name = data.name;
        r.code = data.code;
        r.so_tiet_vang = data.so_tiet_vang;
        r.phep = data.phep;
        r.status = data.status;
        //this.setState({data: olddata});
        this.forceUpdate();
      }).bind(this)
    });
  },
  render: function () {
    var self = this;
    var enrollments = this.state.data.map(function (enrollment, i) {
      return React.createElement(Enrollment, { on_vang: self.handleVang.bind(self, enrollment, self.props.lich), stt: i, so_tiet_vang: enrollment.so_tiet_vang, phep: enrollment.phep, key: enrollment.id, name: enrollment.name, code: enrollment.code, status: enrollment.status });
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
        "table",
        { "class": "table table-bordered table-condensed" },
        React.createElement(
          "thead",
          null,
          React.createElement(
            "td",
            null,
            "Stt"
          ),
          React.createElement(
            "td",
            null,
            "Họ tên"
          ),
          React.createElement(
            "td",
            null,
            "Mã sinh viên"
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
          )
        ),
        React.createElement(
          "tbody",
          null,
          enrollments
        )
      )
    );
  }
});
var Lop = React.createClass({
  displayName: "Lop",

  loadLichsFromServer: function () {
    $.ajax({
      url: this.props.url,
      success: (function (data) {
        this.setState({ data: data });
      }).bind(this)
    });
  },
  componentWillMount: function () {
    this.loadLichsFromServer();
  },
  getInitialState: function () {
    return { data: [] };
  },
  render: function () {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "h6",
        null,
        "Thông tin lớp học"
      ),
      React.createElement(
        "table",
        { "class": "table table-bordered" },
        React.createElement(
          "thead",
          null,
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
            "Giảng viên"
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
              this.state.data.ma_lop
            ),
            React.createElement(
              "td",
              null,
              this.state.data.ten_mon_hoc
            ),
            React.createElement(
              "td",
              null,
              "GV"
            )
          )
        )
      )
    );
  }
});
var Lich = React.createClass({
  displayName: "Lich",

  loadLichFromServer: function () {
    $.ajax({
      url: this.props.url,
      success: (function (data) {
        this.setState({ data: data });
      }).bind(this)
    });
  },
  componentWillMount: function () {
    this.loadLichFromServer();
  },
  getInitialState: function () {
    return { data: [] };
  },
  render: function () {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "h6",
        null,
        "Thông tin buổi học"
      ),
      React.createElement(
        "table",
        { "class": "table table-bordered" },
        React.createElement(
          "thead",
          null,
          React.createElement(
            "td",
            null,
            "Phòng"
          ),
          React.createElement(
            "td",
            null,
            "Thực hành"
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
            "Trạng thái"
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
              this.state.data.phong
            ),
            React.createElement(
              "td",
              null,
              this.state.data.thuc_hanh
            ),
            React.createElement(
              "td",
              null,
              this.state.data.sv_co_mat
            ),
            React.createElement(
              "td",
              null,
              this.state.data.sv_vang_mat
            ),
            React.createElement(
              "td",
              null,
              "TT"
            )
          )
        )
      )
    );
  }
});
React.renderComponent(React.createElement(Lop, { url: "/lop/" + ENV.lop_id + "/info", lop: ENV.lop_id }), document.getElementById('lop'));
React.renderComponent(React.createElement(Lich, { url: "/lich/" + ENV.lich_id + "/info", lich: ENV.lich_id }), document.getElementById('lich'));
React.renderComponent(React.createElement(Enrollments, { url: "/lich/" + ENV.lich_id + "/enrollments.json", lich: ENV.lich_id }), document.getElementById('main'));