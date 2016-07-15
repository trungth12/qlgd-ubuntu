- /**
  - * @jsx React.DOM
  - */
"use strict";

var React = require("react");
//= require react
//= require ./thongso
//= require ./assignments
//= require ./grade3
//= require ./grade2
//= require ./dangkybosung
//= require ./calendar
var Enrollment = React.createClass({
	displayName: "Enrollment",

	render: function () {

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
				this.props.enrollment.code
			),
			React.createElement(
				"td",
				null,
				this.props.enrollment.name
			),
			React.createElement(
				"td",
				null,
				this.props.enrollment.tong_vang
			)
		);
	}
});

var Enrollments = React.createClass({
	displayName: "Enrollments",

	render: function () {
		var enrollments = this.props.enrollments.map(function (enrollment, i) {
			return React.createElement(Enrollment, { key: enrollment.id, stt: i, enrollment: enrollment });
		});
		return React.createElement(
			"div",
			null,
			React.createElement(
				"h5",
				null,
				"Danh sách sinh viên"
			),
			React.createElement(
				"table",
				{ "class": "table table-bordered table-condensed table-striped" },
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
							"Tình hình"
						),
						"  "
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
var Setting = React.createClass({
	displayName: "Setting",

	render: function () {
		return React.createElement(
			"div",
			null,
			React.createElement(
				"h6",
				null,
				"Thông tin lớp học:"
			),
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
							"Ngôn ngữ"
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
						this.props.lop.ma_lop
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
						this.props.lop.language
					),
					React.createElement(
						"td",
						null,
						this.props.lop.completed === true ? 'Đã hoàn thành' : 'Chưa kết thúc'
					)
				)
			)
		);
	}
});
var Lop = React.createClass({
	displayName: "Lop",

	render: function () {
		return React.createElement(
			"div",
			null,
			React.createElement(Setting, { lop: this.props.data.lop }),
			React.createElement("div", { id: "grades2" })
		);
	}
});

var data = {};

React.renderComponent(React.createElement(ThongSo, { lop: ENV.lop_id }), document.getElementById('thongso'));

React.renderComponent(React.createElement(Assignments, { lop: ENV.lop_id }), document.getElementById('assignment'));
React.renderComponent(React.createElement(Grade2, { lop: ENV.lop_id }), document.getElementById("grades"));
React.renderComponent(React.createElement(Bosung, { lop: ENV.lop_id }), document.getElementById('bosung'));
React.renderComponent(React.createElement(Calendar, { lop: ENV.lop_id }), document.getElementById('calendar'));