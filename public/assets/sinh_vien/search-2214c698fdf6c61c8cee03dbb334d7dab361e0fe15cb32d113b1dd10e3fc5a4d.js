- /**
  - * @jsx React.DOM
  - */
"use strict";

var React = require("react");

var Search = React.createClass({
	displayName: "Search",

	onSearch: function () {
		var type = this.refs.mtype.getDOMNode().selected;
		var query = this.refs.query.getDOMNode().value;
		alert(type);
	},
	render: function () {
		return React.createElement(
			"div",
			{ "class": "container" },
			React.createElement(
				"div",
				{ "class": "form-group" },
				React.createElement(
					"div",
					{ "class": "col-sm-2" },
					React.createElement(
						"select",
						{ ref: "mtype", "class": "form-control", value: "1" },
						React.createElement(
							"option",
							{ value: "1" },
							"Sinh viên"
						),
						React.createElement(
							"option",
							{ value: "2" },
							"Lớp môn học"
						),
						React.createElement(
							"option",
							{ value: "3" },
							"Lịch trình giảng dạy"
						)
					)
				),
				React.createElement(
					"div",
					{ "class": "col-sm-6" },
					React.createElement("input", { type: "text", ref: "query", "class": "form-control", placeholder: "Thông tin tra cứu", name: "query" })
				),
				React.createElement(
					"button",
					{ onClick: "onSearch", "class": "btn btn-primary btn-default" },
					"Tra cứu"
				)
			),
			React.createElement("div", { id: "searchResult" })
		);
	}
});

var SinhVienSearchResult = React.createClass({
	displayName: "SinhVienSearchResult",

	render: function () {
		return React.createElement("div", null);
	}
});
var LopMonHocSearchResult = React.createClass({
	displayName: "LopMonHocSearchResult",

	render: function () {
		return React.createElement("div", null);
	}
});
var LichSearchResult = React.createClass({
	displayName: "LichSearchResult",

	render: function () {
		return React.createElement("div", null);
	}
});

React.renderComponent(React.createElement(Search, null), document.getElementById("main"));