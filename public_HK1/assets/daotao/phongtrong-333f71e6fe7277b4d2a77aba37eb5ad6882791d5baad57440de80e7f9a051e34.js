- /**
  - * @jsx React.DOM
  - */
"use strict";

var React = require("react");

var PhongTrong = React.createClass({
	displayName: "PhongTrong",

	getInitialState: function () {
		return { data: [], date: '' };
	},
	componentDidMount: function () {
		$('.input-append.date').datepicker({
			format: "dd/mm/yyyy",
			startDate: "11/8/2014",
			todayBtn: "linked",
			language: "vi",
			autoClose: true,
			todayHighlight: true
		});
	},
	handleDate: function () {
		var date = this.refs.thoi_gian.getDOMNode().value;
		$('.input-append.date').datepicker('hide');
		this.setState({ date: date });
		$.ajax({
			url: '/daotao/phongtrong',
			type: 'POST',
			data: { date: date },
			success: (function (data) {
				this.setState({ data: data });
			}).bind(this)
		});
	},
	componentDidUpdate: function () {

		$('.input-append.date').datepicker({
			format: "dd/mm/yyyy",
			startDate: "11/8/2014",
			todayBtn: "linked",
			language: "vi",
			autoClose: true,
			todayHighlight: true
		});
		this.refs.thoi_gian.getDOMNode().value = this.state.date;
	},
	render: function () {
		var x = this.state.data.map(function (d, index) {
			return React.createElement(PhongTrongItem, { stt: index + 1, data: d, key: d.phong });
		});
		return React.createElement(
			"div",
			null,
			React.createElement("br", null),
			React.createElement(
				"div",
				{ "class": "input-append date" },
				React.createElement("input", { ref: "thoi_gian", type: "text", "class": "span2" }),
				React.createElement(
					"span",
					{ "class": "add-on" },
					React.createElement("i", { "class": "icon-th" })
				),
				React.createElement(
					"button",
					{ "class": "btn btn-sm btn-primary", onClick: this.handleDate },
					"Chọn ngày"
				)
			),
			React.createElement("hr", null),
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
								"Phòng"
							),
							React.createElement(
								"td",
								null,
								"Ca 1"
							),
							React.createElement(
								"td",
								null,
								"Ca 2"
							),
							React.createElement(
								"td",
								null,
								"Ca 3"
							),
							React.createElement(
								"td",
								null,
								"Ca 4"
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
var PhongTrongItem = React.createClass({
	displayName: "PhongTrongItem",

	render: function () {
		var self = this;
		var y = [1, 2, 3, 4].map(function (item, index) {
			var temp = React.createElement("td", null);
			if (self.props.data.data.length > 0) {
				self.props.data.data.forEach(function (d) {
					if (d.ca === item) {
						temp = React.createElement(
							"td",
							null,
							React.createElement(
								"a",
								{ href: '/lich/' + d.id },
								d.ten_mon_hoc
							),
							React.createElement("br", null),
							d.giang_vien
						);
					}
				});
			}
			return temp;
		});

		return React.createElement(
			"tr",
			{ "class": this.props.stt % 2 === 0 ? 'danger' : 'warning' },
			React.createElement(
				"td",
				null,
				this.props.data.phong
			),
			y
		);
	}
});