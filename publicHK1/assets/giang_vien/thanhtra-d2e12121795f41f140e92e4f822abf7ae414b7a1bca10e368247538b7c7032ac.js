- /**
  - * @jsx React.DOM
  - */
"use strict";

var React = require("react");

var ThanhTra = React.createClass({
  displayName: "ThanhTra",

  getInitialState: function () {
    return { data: [] };
  },
  loadData: function () {
    $.ajax({
      url: '/teacher/lich_trinh_giang_days/thanhtra',
      success: (function (data) {
        this.setState({ data: data });
      }).bind(this)
    });
  },
  handleUpdate: function (d) {
    $.ajax({
      url: '/teacher/lich_trinh_giang_days/thanhtraupdate',
      type: 'POST',
      data: d,
      success: (function (data) {
        this.setState({ data: data });
      }).bind(this)
    });
  },
  handleAccept: function (d) {
    $.ajax({
      url: '/teacher/lich_trinh_giang_days/accept',
      type: 'POST',
      data: d,
      success: (function (data) {
        this.setState({ data: data });
      }).bind(this)
    });
  },
  handleRequest: function (d) {
    $.ajax({
      url: '/teacher/lich_trinh_giang_days/request',
      type: 'POST',
      data: d,
      success: (function (data) {
        this.setState({ data: data });
      }).bind(this)
    });
  },
  componentWillMount: function () {
    this.loadData();
  },
  render: function () {
    var self = this;
    if (this.state.data.length > 0) {
      var x = this.state.data.map(function (d, index) {
        return React.createElement(ThanhTraRow, { date: self.state.date, onAccept: self.handleAccept, onRequest: self.handleRequest, onUpdate: self.handleUpdate, data: d, stt: index + 1, color: index % 2 === 0 ? 'danger' : 'warning' });
      });
      return React.createElement(
        "div",
        null,
        React.createElement("hr", null),
        React.createElement(
          "div",
          { "class": "table-responsive" },
          React.createElement(
            "table",
            { "class": "table table-bordered" },
            React.createElement(
              "colgroup",
              null,
              React.createElement("col", { style: { width: "5%" } }),
              React.createElement("col", { style: { width: "30%" } }),
              React.createElement("col", { style: { width: "10%" } }),
              React.createElement("col", { style: { width: "15%" } }),
              React.createElement("col", { style: { width: "15%" } }),
              React.createElement("col", { style: { width: "15%" } }),
              React.createElement("col", { style: { width: "10%" } })
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
                  "Giờ học"
                ),
                React.createElement(
                  "td",
                  null,
                  "Báo lỗi"
                ),
                React.createElement(
                  "td",
                  null,
                  "Note 1"
                ),
                React.createElement(
                  "td",
                  null,
                  "Note 2"
                ),
                React.createElement(
                  "td",
                  null,
                  "Note 3"
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
    } else {
      return React.createElement("div", null);
    }
  }
});

var ThanhTraRow = React.createClass({
  displayName: "ThanhTraRow",

  getInitialState: function () {
    return { edit: 0 };
  },
  onEdit: function () {
    this.setState({ edit: 1 });
  },
  onCancel: function () {
    this.setState({ edit: 0 });
  },
  onUpdate: function () {
    this.setState({ edit: 0 });
    var note2 = this.refs.note2.getDOMNode().value;
    this.props.onUpdate({ lich_id: this.props.data.id, note2: note2 });
  },
  onAccept: function () {
    this.props.onAccept({ lich_id: this.props.data.id });
  },
  onRequest: function () {
    this.props.onRequest({ lich_id: this.props.data.id });
  },
  componentDidUpdate: function () {
    if (this.state.edit === 1) {
      this.refs.note2.getDOMNode().value = this.props.data.note2;
    }
  },
  render: function () {
    if (this.state.edit === 0) {
      return React.createElement(
        "tr",
        { "class": this.props.color },
        React.createElement(
          "td",
          null,
          this.props.stt
        ),
        React.createElement(
          "td",
          null,
          React.createElement("span", { dangerouslySetInnerHTML: { __html: this.props.data.info } })
        ),
        React.createElement(
          "td",
          null,
          React.createElement(
            "span",
            { "class": this.props.data.di_muon_color },
            this.props.data.di_muon_alias
          ),
          React.createElement("br", null),
          React.createElement("br", null),
          React.createElement(
            "span",
            { "class": this.props.data.ve_som_color },
            this.props.data.ve_som_alias
          ),
          React.createElement("br", null),
          React.createElement("br", null),
          React.createElement(
            "span",
            { "class": this.props.data.bo_tiet_color },
            this.props.data.bo_tiet_alias
          )
        ),
        React.createElement(
          "td",
          null,
          React.createElement("span", { dangerouslySetInnerHTML: { __html: this.props.data.note1_html } })
        ),
        React.createElement(
          "td",
          null,
          React.createElement("span", { dangerouslySetInnerHTML: { __html: this.props.data.note2_html } })
        ),
        React.createElement(
          "td",
          null,
          React.createElement("span", { dangerouslySetInnerHTML: { __html: this.props.data.note3_html } })
        ),
        React.createElement(
          "td",
          null,
          React.createElement(
            "button",
            { style: { display: this.props.data.can_giang_vien_edit === true ? '' : 'none' }, onClick: this.onEdit, "class": "btn btn-sm btn-success" },
            "Edit"
          ),
          React.createElement(
            "button",
            { style: { display: this.props.data.can_accept === true ? '' : 'none' }, onClick: this.onAccept, "class": "btn btn-sm btn-primary" },
            "Chấp nhận"
          ),
          React.createElement(
            "button",
            { style: { display: this.props.data.can_request === true ? '' : 'none' }, onClick: this.onRequest, "class": "btn btn-sm btn-warning" },
            "Yêu cầu xác minh"
          )
        )
      );
    } else {
      return React.createElement(
        "tr",
        { "class": this.props.color },
        React.createElement(
          "td",
          null,
          this.props.stt
        ),
        React.createElement(
          "td",
          null,
          React.createElement("span", { dangerouslySetInnerHTML: { __html: this.props.data.info } })
        ),
        React.createElement(
          "td",
          null,
          React.createElement(
            "span",
            { "class": this.props.data.di_muon_color },
            this.props.data.di_muon_alias
          ),
          React.createElement("br", null),
          React.createElement("br", null),
          React.createElement(
            "span",
            { "class": this.props.data.ve_som_color },
            this.props.data.ve_som_alias
          ),
          React.createElement("br", null),
          React.createElement("br", null),
          React.createElement(
            "span",
            { "class": this.props.data.bo_tiet_color },
            this.props.data.bo_tiet_alias
          )
        ),
        React.createElement(
          "td",
          null,
          this.props.data.note1
        ),
        React.createElement(
          "td",
          null,
          React.createElement("textarea", { ref: "note2", style: { width: "100%", height: "200px" } })
        ),
        React.createElement(
          "td",
          null,
          this.props.data.note3
        ),
        React.createElement(
          "td",
          null,
          React.createElement(
            "button",
            { onClick: this.onCancel, "class": "btn btn-sm btn-default" },
            "Hủy"
          ),
          React.createElement(
            "button",
            { onClick: this.onUpdate, "class": "btn btn-sm btn-success" },
            "Cập nhật"
          ),
          React.createElement(
            "button",
            { style: { display: this.props.data.can_giang_vien_edit === true ? '' : 'none' }, onClick: this.onEdit, "class": "btn btn-sm btn-success" },
            "Edit"
          ),
          React.createElement(
            "button",
            { style: { display: this.props.data.can_accept === true ? '' : 'none' }, onClick: this.onAccept, "class": "btn btn-sm btn-primary" },
            "Chấp nhận"
          ),
          React.createElement(
            "button",
            { style: { display: this.props.data.can_request === true ? '' : 'none' }, onClick: this.onRequest, "class": "btn btn-sm btn-warning" },
            "Yêu cầu xác minh"
          )
        )
      );
    }
  }
});