- /**
  - * @jsx React.DOM
  - */
"use strict";

var React = require("react");

var mainData = [{ id: 1, category: 'A' }, { id: 2, category: 'B' }, { id: 3, category: 'A' }, { id: 4, category: 'C' }, { id: 5, category: 'A' }, { id: 6, category: 'B' }, { id: 7, category: 'B' }, { id: 8, category: 'C' }];

var DiemDanh = React.createClass({
  displayName: "DiemDanh",

  getInitialState: function () {
    return { data: [] };
  },
  componentWillMount: function () {
    this.setState({ data: mainData });
  },
  componentDidMount: function () {
    $('#container').mixItUp();
  },
  render: function () {
    var x = this.state.data.map(function (d) {
      return React.createElement(DiemDanhItem, { data: d });
    });
    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { "class": "controls" },
        React.createElement(
          "label",
          null,
          "Filter:"
        ),
        React.createElement(
          "button",
          { "class": "filter", "data-filter": "all" },
          "All"
        ),
        React.createElement(
          "button",
          { "class": "filter", "data-filter": ".A" },
          "A"
        ),
        React.createElement(
          "button",
          { "class": "filter active", "data-filter": ".B" },
          "B"
        ),
        React.createElement(
          "button",
          { "class": "filter active", "data-filter": ".C" },
          "C"
        ),
        React.createElement(
          "label",
          null,
          "Sort:"
        ),
        React.createElement(
          "button",
          { "class": "sort", "data-sort": "myorder:asc" },
          "Asc"
        ),
        React.createElement(
          "button",
          { "class": "sort", "data-sort": "myorder:desc" },
          "Desc"
        )
      ),
      React.createElement(
        "div",
        { id: "container", "class": "ctn" },
        x
      )
    );
  }
});

var DiemDanhItem = React.createClass({
  displayName: "DiemDanhItem",

  getInitialState: function () {
    return { data: this.props.data };
  },
  render: function () {
    return React.createElement("div", { "class": "mix " + this.state.data.category, "data-myorder": this.state.data.id });
  }
});
React.renderComponent(React.createElement(DiemDanh, null), document.getElementById('main'));