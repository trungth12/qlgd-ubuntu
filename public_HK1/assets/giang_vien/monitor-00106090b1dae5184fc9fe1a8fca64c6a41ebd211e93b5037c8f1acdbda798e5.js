- /**
  - * @jsx React.DOM
  - */
"use strict";

var React = require("react");

var Monitor = React.createClass({
	displayName: "Monitor",

	getInitialState: function () {
		return { data: [] };
	},
	componentWillMount: function () {
		this.loadData();
	},
	loadData: function () {
		$.ajax({
			url: '/teacher/monitor',
			success: (function (data) {
				this.setState({ data: data });
			}).bind(this)
		});
	},
	render: function () {
		var x = this.state.data.map(function (d) {
			return React.createElement(MonitorRow, { data: d });
		});
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
						"td",
						null,
						"Tuần"
					),
					React.createElement(
						"td",
						null,
						"Thời gian"
					),
					React.createElement(
						"td",
						null,
						"Tiết bắt đầu"
					),
					React.createElement(
						"td",
						null,
						"Phòng"
					),
					React.createElement(
						"td",
						null,
						"Giảng viên"
					),
					React.createElement(
						"td",
						null,
						"Số tiết"
					),
					React.createElement(
						"td",
						null,
						"Thực hành"
					),
					React.createElement(
						"td",
						null,
						"Loại"
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
				),
				React.createElement(
					"tbody",
					null,
					x
				)
			)
		);
	}
});

var MonitorRow = React.createClass({
	displayName: "MonitorRow",

	render: function () {
		return React.createElement(
			"tr",
			null,
			React.createElement(
				"td",
				null,
				this.props.data.tuan
			),
			React.createElement(
				"td",
				null,
				this.props.data.thoi_gian
			),
			React.createElement(
				"td",
				null,
				this.props.data.tiet_bat_dau
			),
			React.createElement(
				"td",
				null,
				this.props.data.phong
			),
			React.createElement(
				"td",
				null,
				this.props.data.giang_vien
			),
			React.createElement(
				"td",
				null,
				this.props.data.so_tiet
			),
			React.createElement(
				"td",
				null,
				this.props.data.thuc_hanh
			),
			React.createElement(
				"td",
				null,
				this.props.data.alias_state
			),
			React.createElement(
				"td",
				null,
				this.props.data.alias_status
			)
		);
	}
});