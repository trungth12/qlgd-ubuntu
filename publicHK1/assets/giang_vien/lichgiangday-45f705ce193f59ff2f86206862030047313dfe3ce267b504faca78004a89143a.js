- /**
  - * @jsx React.DOM
  - */
"use strict";

var React = require("react");

var ldata = [{ id: 1, tuan: 1, thoi_gian: '6h30 12/08/2013', content: 'just a test' }, { id: 2, tuan: 2, thoi_gian: '6h30 19/08/2013', content: 'just a test ' }];

var LichGiangDay = React.createClass({
  displayName: "LichGiangDay",

  getInitialState: function () {
    return { data: [] };
  },
  loadData: function () {
    $.ajax({
      url: "/teacher/lop/" + this.props.lop + "/lich_trinh_giang_days/content",
      success: (function (data) {
        this.setState({ data: data });
      }).bind(this)
    });
  },
  handleUpdate: function (data) {
    $.ajax({
      url: "/teacher/lop/" + this.props.lop + "/lich_trinh_giang_days/content",
      type: 'POST',
      data: data,
      success: (function (data) {
        this.setState({ data: data });
      }).bind(this)
    });
  },
  componentDidMount: function () {
    this.loadData();
  },
  render: function () {
    var self = this;
    var x = this.state.data.map(function (d) {
      if (d.updated === true) {
        return React.createElement(RowLichGiangDay, { onUpdate: self.handleUpdate, data: d });
      } else {
        return React.createElement(DisabledRowLichGiangDay, { data: d });
      }
    });
    return React.createElement(
      "ul",
      null,
      x
    );
  }
});
var DisabledRowLichGiangDay = React.createClass({
  displayName: "DisabledRowLichGiangDay",

  render: function () {
    return React.createElement(
      "li",
      null,
      React.createElement(
        "a",
        { href: "/lich/" + this.props.data.id },
        React.createElement(
          "strong",
          null,
          "Tuần: ",
          this.props.data.tuan,
          ", ",
          this.props.data.thoi_gian
        )
      ),
      React.createElement(
        "div",
        null,
        React.createElement("span", { dangerouslySetInnerHTML: { __html: this.props.data.content_html } })
      ),
      React.createElement("hr", null)
    );
  }
});
var RowLichGiangDay = React.createClass({
  displayName: "RowLichGiangDay",

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
    var content = this.refs.content.getDOMNode().value;
    this.setState({ edit: 0 });
    this.props.data.content = content;
    this.props.onUpdate(this.props.data);
  },
  componentDidUpdate: function () {
    if (this.state.edit === 1) {
      this.refs.content.getDOMNode().value = this.props.data.content;
    }
  },
  render: function () {

    if (this.state.edit === 0) {
      return React.createElement(
        "li",
        null,
        React.createElement(
          "a",
          { href: "/lich/" + this.props.data.id },
          React.createElement(
            "strong",
            null,
            "Tuần: ",
            this.props.data.tuan,
            ", ",
            this.props.data.thoi_gian,
            " "
          )
        ),
        React.createElement(
          "div",
          null,
          React.createElement("span", { dangerouslySetInnerHTML: { __html: this.props.data.content_html } })
        ),
        React.createElement(
          "button",
          { onClick: this.onEdit, "class": "btn btn-sm btn-default curl-top-left" },
          "Sửa nội dung"
        ),
        React.createElement("hr", null)
      );
    } else {
      return React.createElement(
        "li",
        null,
        React.createElement(
          "a",
          { href: "/lich/" + this.props.data.id },
          React.createElement(
            "strong",
            null,
            "Tuần: ",
            this.props.data.tuan,
            ", ",
            this.props.data.thoi_gian
          )
        ),
        React.createElement(
          "div",
          null,
          React.createElement("textarea", { ref: "content", className: "expanding", placeholder: "Nội dung buổi học...", style: { width: '100%', minHeight: 200 } })
        ),
        React.createElement(
          "button",
          { onClick: this.onCancel, "class": "btn btn-sm btn-default curl-top-left" },
          "Hủy"
        ),
        React.createElement(
          "button",
          { onClick: this.onUpdate, "class": "btn btn-sm btn-primary curl-top-left" },
          "Cập nhật"
        ),
        React.createElement("hr", null)
      );
    }
  }
});