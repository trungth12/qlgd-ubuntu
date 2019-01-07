- /**
  - * @jsx React.DOM
  - */
"use strict";

var React = require("react");

var GhepLop = React.createClass({
  displayName: "GhepLop",

  getInitialState: function () {
    return { sinh_vien_id: -1, ma_lop_hanh_chinh: -1, lop_id: -1 };
  },
  componentDidMount: function () {
    $("#lhc").select2({
      placeholder: "Tìm lớp hành chính",
      minimumInputLength: 3,
      ajax: {
        url: "/daotao/lop_hanh_chinhs.json",
        quietMillis: 100,
        data: function (term, page) {
          return {
            q: term, //search term
            page_limit: 30, // page size
            page: page };
        },
        // page number                               
        results: function (data, page) {
          var more = page * 30 < data.total; // whether or not there are more results available

          // notice we return the value of more so Select2 knows if more results can be loaded
          return { results: data.lop_hanh_chinhs, more: more };
        },
        text: function (object) {
          return object;
        },
        id: function (object) {
          return object;
        }
      }
    });
    $("#lmh").select2({
      placeholder: "Tìm lớp môn học",
      minimumInputLength: 3,
      ajax: {
        url: "/daotao/lop_mon_hocs.json",
        quietMillis: 100,
        data: function (term, page) {
          return {
            q: term, //search term
            page_limit: 30, // page size
            page: page };
        },
        // page number                               
        results: function (data, page) {
          var more = page * 30 < data.total; // whether or not there are more results available

          // notice we return the value of more so Select2 knows if more results can be loaded
          return { results: data.lop_mon_hocs, more: more };
        },
        text: function (object) {
          return object;
        },
        id: function (object) {
          return object;
        }
      }
    });
    $("#sv").select2({
      placeholder: "Tìm sinh viên",
      minimumInputLength: 3,
      ajax: {
        url: "/daotao/sinh_viens.json",
        quietMillis: 100,
        data: function (term, page) {
          return {
            q: term, //search term
            page_limit: 30, // page size
            page: page };
        },
        // page number                               
        results: function (data, page) {
          var more = page * 30 < data.total; // whether or not there are more results available

          // notice we return the value of more so Select2 knows if more results can be loaded
          return { results: data.sinh_viens, more: more };
        },
        text: function (object) {
          return object;
        },
        id: function (object) {
          return object;
        }
      }
    });
  },
  getLopHanhChinh: function () {
    var lhc = $('#lhc').val();
    var lmh = $('#lmh').val();
    if (lhc != null && lmh != null) {
      this.setState({ ma_lop_hanh_chinh: lhc, lop_id: lmh });
      React.unmountAndReleaseReactRootNode(document.getElementById('kq'));
      React.renderComponent(React.createElement(LopHanhChinh, { ma_lop_hanh_chinh: lhc, lop_id: lmh }), document.getElementById('kq'));
    } else {
      alert('Bạn phải chọn lớp hành chính, hoặc sinh viên, hoặc lớp môn học');
    }
  },
  render: function () {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { "class": "row" },
        React.createElement(
          "div",
          { "class": "col-md-5" },
          React.createElement(
            "h4",
            null,
            "Chọn lớp hành chính"
          ),
          React.createElement("input", { type: "hidden", id: "lhc", style: { width: "70%" }, "class": "input-xlarge" })
        ),
        React.createElement(
          "div",
          { "class": "col-md-2" },
          React.createElement("br", null),
          React.createElement("br", null),
          React.createElement(
            "button",
            { onClick: this.getLopHanhChinh, "class": "btn btn-success" },
            "Chọn"
          )
        ),
        React.createElement(
          "div",
          { "class": "col-md-5" },
          React.createElement(
            "h4",
            null,
            "Chọn lớp Môn học"
          ),
          React.createElement("input", { type: "hidden", id: "lmh", style: { width: "500px" }, "class": "input-xlarge" })
        )
      ),
      React.createElement("div", { "class": "row", id: "kq" })
    );
  }
});

var LopHanhChinh = React.createClass({
  displayName: "LopHanhChinh",

  getInitialState: function () {
    return { data: [], checked: [] };
  },
  loadData: function () {
    $.ajax({
      url: "/daotao/lop_hanh_chinhs",
      type: 'POST',
      data: { ma_lop_hanh_chinh: this.props.ma_lop_hanh_chinh },
      success: (function (data) {
        this.setState({ data: data });
        React.renderComponent(React.createElement(LopMonHoc, { lop_id: this.props.lop_id }), document.getElementById('lop'));
      }).bind(this)
    });
  },
  componentWillMount: function () {
    this.loadData();
  },
  onMove: function () {
    var results = [];
    $('input[id^=svs]').each(function (i, obj) {
      if (obj.checked === true) {
        results.push(obj.value);
      }
    });
    if (results.length > 0) {
      $.ajax({
        url: "/daotao/move",
        type: 'POST',
        data: { ma_lop_hanh_chinh: this.props.ma_lop_hanh_chinh, lop_id: this.props.lop_id, sinh_viens: results },
        success: (function (data) {
          React.unmountAndReleaseReactRootNode(document.getElementById('lop'));
          React.renderComponent(React.createElement(LopMonHoc, { lop_id: this.props.lop_id }), document.getElementById('lop'));
        }).bind(this)
      });
    }
  },
  checkAll: function () {
    $('input[id^=svs]').each(function (i, obj) {
      obj.checked = !obj.checked;
    });
  },
  render: function () {
    var self = this;
    var x = this.state.data.map(function (d, index) {
      return React.createElement(
        "tr",
        null,
        React.createElement(
          "td",
          null,
          index + 1
        ),
        React.createElement(
          "td",
          null,
          d.code
        ),
        React.createElement(
          "td",
          null,
          d.hovaten
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
                { id: 'svs' + d.code, value: d.id, type: "checkbox" },
                "Chọn"
              )
            )
          )
        )
      );
    });
    return React.createElement(
      "div",
      { "class": "row" },
      React.createElement(
        "div",
        { "class": "col-md-6 table-responsive" },
        React.createElement(
          "button",
          { onClick: this.onMove, "class": "btn btn-primary" },
          "Chuyển"
        ),
        React.createElement("hr", null),
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
                "Mã sinh viên"
              ),
              React.createElement(
                "td",
                null,
                "Họ và tên"
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
                      { onClick: this.checkAll, type: "checkbox" },
                      "Chọn tất cả"
                    )
                  )
                )
              )
            )
          ),
          React.createElement(
            "tbody",
            null,
            x
          )
        )
      ),
      React.createElement("div", { "class": "col-md-6 table-responsive", id: "lop" })
    );
  }
});
var LopMonHoc = React.createClass({
  displayName: "LopMonHoc",

  getInitialState: function () {
    return { data: [] };
  },
  loadData: function () {
    $.ajax({
      url: "/daotao/lop_mon_hocs",
      type: 'POST',
      data: { lop_id: this.props.lop_id },
      success: (function (data) {
        this.setState({ data: data });
      }).bind(this)
    });
  },
  componentWillMount: function () {
    this.loadData();
  },
  onRemove: function (d) {
    console.log(d.id + ' - ' + this.props.lop_id);
    if (confirm("Khi xóa sinh viên ra khỏi lớp, dữ liệu điểm danh sẽ bị xóa, bạn có chắc muốn xóa sinh viên ra khỏi lớp không?")) {
      var d = {
        "lop_id": this.props.lop_id,
        "enrollment_id": d.id,
        "_method": "delete"
      };
      $.ajax({
        url: "/daotao/lop_mon_hocs",
        type: 'POST',
        data: d,
        success: (function (data) {
          this.setState({ data: data });
        }).bind(this)
      });
    }
  },
  render: function () {
    var self = this;
    var x = this.state.data.map(function (d, index) {
      return React.createElement(
        "tr",
        { "class": d.bosung_status },
        React.createElement(
          "td",
          null,
          index + 1
        ),
        React.createElement(
          "td",
          null,
          d.code
        ),
        React.createElement(
          "td",
          null,
          d.name
        ),
        React.createElement(
          "td",
          null,
          d.tinchi_status
        ),
        React.createElement(
          "td",
          null,
          React.createElement(
            "button",
            { onClick: self.onRemove.bind(self, d), "class": "btn btn-sm btn-danger" },
            "Xóa"
          )
        )
      );
    });
    return React.createElement(
      "table",
      { "class": "table table-bordered table-striped" },
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
            "Mã sinh viên"
          ),
          React.createElement(
            "td",
            null,
            "Họ và tên"
          ),
          React.createElement(
            "td",
            null,
            "Tín chỉ?"
          ),
          React.createElement(
            "td",
            null,
            "Xóa"
          )
        )
      ),
      React.createElement(
        "tbody",
        null,
        x
      )
    );
  }
});