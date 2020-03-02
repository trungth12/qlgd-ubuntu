- /**
  - * @jsx React.DOM
  - */
"use strict";

var React = require("react");
var DaotaoCalendar = React.createClass({
	displayName: "DaotaoCalendar",

	getInitialState: function () {
		return { data: [] };
	},
	loadData: function () {
		$.ajax({
			url: '/daotao/lops',
			success: (function (data) {
				this.setState({ data: data.t });
			}).bind(this)
		});
	},
	componentWillMount: function () {
		this.loadData();
	},
	componentDidUpdate: function () {
		var self = this;
		$("#timlopcalendar").select2({
			data: self.state.data
		});
	},
	onSearch: function () {
		var lop_id = $('#timlopcalendar').val();
		React.unmountAndReleaseReactRootNode(document.getElementById('cc'));
		React.renderComponent(React.createElement(CalendarComponent, { lop_id: lop_id }), document.getElementById('cc'));
	},
	render: function () {
		return React.createElement(
			"div",
			null,
			React.createElement("hr", null),
			React.createElement("input", { type: "hidden", id: "timlopcalendar", placeholder: "Lớp môn học", style: { width: "500px" }, "class": "input-xlarge" }),
			React.createElement(
				"button",
				{ "class": "btn btn-success", onClick: this.onSearch },
				"Tìm lớp"
			),
			React.createElement("hr", null),
			React.createElement("div", { id: "cc" })
		);
	}
});
var tdata = {
	tuans: [23, 24, 25, 30, 31, 32, 33],
	headers: [23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38]
};
var CalendarComponent = React.createClass({
	displayName: "CalendarComponent",

	getInitialState: function () {
		return { tuans: [], headers: [], calendars: [], giang_viens: [], phongs: [] };
	},
	loadData: function () {
		$.ajax({
			url: '/daotao/lop_mon_hocs/' + this.props.lop_id + '/calendars',
			success: (function (data) {
				this.setState({ tuans: data.tuans, headers: data.headers, calendars: data.calendars, giang_viens: data.giang_viens, phongs: data.phongs });
			}).bind(this)
		});
	},
	componentWillMount: function () {
		this.loadData();
	},
	handleDelete: function (d) {
		$.ajax({
			url: '/daotao/lop_mon_hocs/' + this.props.lop_id + '/calendars/delete',
			type: 'POST',
			data: d,
			success: (function (data) {
				this.setState({ tuans: data.tuans, headers: data.headers, calendars: data.calendars, giang_viens: data.giang_viens, phongs: data.phongs });
			}).bind(this)
		});
	},
	handleGenerate: function (d) {
		$.ajax({
			url: '/daotao/lop_mon_hocs/' + this.props.lop_id + '/calendars/generate',
			type: 'POST',
			data: d,
			success: (function (data) {
				this.setState({ tuans: data.tuans, headers: data.headers, calendars: data.calendars, giang_viens: data.giang_viens, phongs: data.phongs });
			}).bind(this)
		});
	},
	handleRestore: function (d) {
		$.ajax({
			url: '/daotao/lop_mon_hocs/' + this.props.lop_id + '/calendars/restore',
			type: 'POST',
			data: d,
			success: (function (data) {
				this.setState({ tuans: data.tuans, headers: data.headers, calendars: data.calendars, giang_viens: data.giang_viens, phongs: data.phongs });
			}).bind(this)
		});
	},
	handleAdd: function (d) {
		$.ajax({
			url: '/daotao/lop_mon_hocs/' + this.props.lop_id + '/calendars/add',
			type: 'POST',
			data: d,
			success: (function (data) {
				this.setState({ tuans: data.tuans, headers: data.headers, calendars: data.calendars, giang_viens: data.giang_viens, phongs: data.phongs });
			}).bind(this)
		});
	},
	handleDestroy: function (d) {
		$.ajax({
			url: '/daotao/lop_mon_hocs/' + this.props.lop_id + '/calendars/destroy',
			type: 'POST',
			data: d,
			success: (function (data) {
				this.setState({ tuans: data.tuans, headers: data.headers, calendars: data.calendars, giang_viens: data.giang_viens, phongs: data.phongs });
			}).bind(this)
		});
	},
	componentDidUpdate: function () {
		React.unmountAndReleaseReactRootNode(document.getElementById('tc'));
		React.renderComponent(React.createElement(TaoCalendar, { giang_viens: this.state.giang_viens, phongs: this.state.phongs, onAdd: this.handleAdd }), document.getElementById('tc'));
	},
	render: function () {
		var self = this;
		var headers = this.state.headers.map(function (d) {
			return React.createElement(
				"td",
				null,
				d
			);
		});
		var data = this.state.headers.map(function (d) {
			if (self.state.tuans.indexOf(d) >= 0) {
				return React.createElement(
					"td",
					{ "class": "success" },
					"H"
				);
			} else {
				return React.createElement(
					"td",
					null,
					"_"
				);
			}
		});
		var calendars = this.state.calendars.map(function (d) {
			return React.createElement(DaotaoCalendarRow, { onDestroy: self.handleDestroy, onDelete: self.handleDelete, onGenerate: self.handleGenerate, onRestore: self.handleRestore, data: d });
		});
		return React.createElement(
			"div",
			null,
			React.createElement(
				"h4",
				null,
				"Tạo thời khóa biểu"
			),
			React.createElement("div", { id: "tc" }),
			React.createElement("hr", null),
			React.createElement(
				"h4",
				null,
				"Thời khóa biểu"
			),
			React.createElement(
				"div",
				{ "class": "table-responsive" },
				React.createElement(
					"table",
					{ "class": "table tabled-bordered" },
					React.createElement(
						"thead",
						null,
						React.createElement(
							"tr",
							{ "class": "success" },
							React.createElement(
								"td",
								null,
								"Tuần học bắt đầu"
							),
							React.createElement(
								"td",
								null,
								"Số tuần"
							),
							React.createElement(
								"td",
								null,
								"Thứ"
							),
							React.createElement(
								"td",
								null,
								"Tiết bắt đầu"
							),
							React.createElement(
								"td",
								null,
								"Số tiết"
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
						calendars
					)
				)
			),
			React.createElement("hr", null),
			React.createElement(
				"div",
				{ "class": "table-responsive" },
				React.createElement(
					"table",
					{ "class": "table tabled-bordered" },
					React.createElement(
						"thead",
						null,
						React.createElement(
							"tr",
							{ "class": "danger" },
							headers
						)
					),
					React.createElement(
						"tbody",
						null,
						React.createElement(
							"tr",
							null,
							data
						)
					)
				)
			)
		);
	}
});
var TaoCalendar = React.createClass({
	displayName: "TaoCalendar",

	range: function (start, end) {
		var foo = [];
		for (var i = start; i <= end; i++) {
			foo.push(i);
		}
		return foo;
	},
	onAdd: function () {
		var tuan_hoc_bat_dau = this.refs.tuan_hoc_bat_dau.getDOMNode().value;
		var so_tuan = this.refs.so_tuan.getDOMNode().value;
		var thu = this.refs.thu.getDOMNode().value;
		var tiet_bat_dau = this.refs.tiet_bat_dau.getDOMNode().value;
		var so_tiet = this.refs.so_tiet.getDOMNode().value;
		var phong = this.refs.phong.getDOMNode().value;
		var giang_vien_id = this.refs.giang_vien.getDOMNode().value;
		var data = {
			tuan_hoc_bat_dau: tuan_hoc_bat_dau,
			so_tuan: so_tuan,
			thu: thu,
			tiet_bat_dau: tiet_bat_dau,
			so_tiet: so_tiet,
			phong: phong,
			giang_vien_id: giang_vien_id
		};
		this.props.onAdd(data);
	},
	render: function () {
		var tuans = this.range(23, 42);
		var sotuans = this.range(1, 16);
		var sotiets = this.range(1, 6);
		var ttuans = tuans.map(function (d) {
			return React.createElement(
				"option",
				{ value: d },
				d
			);
		});
		var tsotuans = sotuans.map(function (d) {
			return React.createElement(
				"option",
				{ value: d },
				d
			);
		});
		var tsotiets = sotiets.map(function (d) {
			return React.createElement(
				"option",
				{ value: d },
				d
			);
		});
		var giang_viens = this.props.giang_viens.map(function (d) {
			return React.createElement(
				"option",
				{ value: d.id },
				d.text
			);
		});
		var phongs = this.props.phongs.map(function (d) {
			return React.createElement(
				"option",
				{ value: d.id },
				d.text
			);
		});
		return React.createElement(
			"div",
			{ "class": "table-responsive" },
			React.createElement(
				"table",
				{ "class": "table tabled-bordered" },
				React.createElement(
					"thead",
					null,
					React.createElement(
						"tr",
						{ "class": "success" },
						React.createElement(
							"td",
							null,
							"Tuần học bắt đầu"
						),
						React.createElement(
							"td",
							null,
							"Số tuần"
						),
						React.createElement(
							"td",
							null,
							"Thứ"
						),
						React.createElement(
							"td",
							null,
							"Tiết bắt đầu"
						),
						React.createElement(
							"td",
							null,
							"Số tiết"
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
							React.createElement(
								"select",
								{ ref: "tuan_hoc_bat_dau", "class": "form-control input-sm" },
								ttuans
							)
						),
						React.createElement(
							"td",
							null,
							React.createElement(
								"select",
								{ ref: "so_tuan", "class": "form-control input-sm" },
								tsotuans
							)
						),
						React.createElement(
							"td",
							null,
							React.createElement(
								"select",
								{ ref: "thu", "class": "form-control input-sm" },
								React.createElement(
									"option",
									{ value: "2" },
									"Thứ hai"
								),
								React.createElement(
									"option",
									{ value: "3" },
									"Thứ ba"
								),
								React.createElement(
									"option",
									{ value: "4" },
									"Thứ tư"
								),
								React.createElement(
									"option",
									{ value: "5" },
									"Thứ năm"
								),
								React.createElement(
									"option",
									{ value: "6" },
									"Thứ sáu"
								),
								React.createElement(
									"option",
									{ value: "7" },
									"Thứ bảy"
								),
								React.createElement(
									"option",
									{ value: "8" },
									"Chủ nhật"
								)
							)
						),
						React.createElement(
							"td",
							null,
							React.createElement(
								"select",
								{ ref: "tiet_bat_dau", "class": "form-control input-sm" },
								React.createElement(
									"option",
									{ value: "1" },
									"1 (6h30)"
								),
								React.createElement(
									"option",
									{ value: "2" },
									"2 (7h20)"
								),
								React.createElement(
									"option",
									{ value: "3" },
									"3 (8h10)"
								),
								React.createElement(
									"option",
									{ value: "4" },
									"4 (9h05)"
								),
								React.createElement(
									"option",
									{ value: "5" },
									"5 (9h55)"
								),
								React.createElement(
									"option",
									{ value: "6" },
									"6 (10h45)"
								),
								React.createElement(
									"option",
									{ value: "7" },
									"7 (12h30)"
								),
								React.createElement(
									"option",
									{ value: "8" },
									"8 (13h20)"
								),
								React.createElement(
									"option",
									{ value: "9" },
									"9 (14h10)"
								),
								React.createElement(
									"option",
									{ value: "10" },
									"10 (15h05)"
								),
								React.createElement(
									"option",
									{ value: "11" },
									"11 (15h55)"
								),
								React.createElement(
									"option",
									{ value: "12" },
									"12 (16h45)"
								),
								React.createElement(
									"option",
									{ value: "13" },
									"13 (18h00)"
								),
								React.createElement(
									"option",
									{ value: "14" },
									"14 (18h50)"
								),
								React.createElement(
									"option",
									{ value: "15" },
									"15 (19h40)"
								),
								React.createElement(
									"option",
									{ value: "16" },
									"16 (20h30)"
								)
							)
						),
						React.createElement(
							"td",
							null,
							React.createElement(
								"select",
								{ ref: "so_tiet", "class": "form-control input-sm" },
								tsotiets
							)
						),
						React.createElement(
							"td",
							null,
							React.createElement(
								"select",
								{ ref: "phong", "class": "form-control input-sm" },
								phongs
							)
						),
						React.createElement(
							"td",
							null,
							React.createElement(
								"select",
								{ ref: "giang_vien", "class": "form-control input-sm" },
								giang_viens
							)
						)
					)
				)
			),
			React.createElement(
				"button",
				{ onClick: this.onAdd, "class": "btn btn-sm btn-success" },
				"Thêm"
			)
		);
	}
});
var DaotaoCalendarRow = React.createClass({
	displayName: "DaotaoCalendarRow",

	onDelete: function () {
		this.props.onDelete(this.props.data);
	},
	onGenerate: function () {
		this.props.onGenerate(this.props.data);
	},
	onRestore: function () {
		this.props.onRestore(this.props.data);
	},
	onDestroy: function () {
		this.props.onDestroy(this.props.data);
	},
	render: function () {
		return React.createElement(
			"tr",
			null,
			React.createElement(
				"td",
				null,
				this.props.data.tuan_hoc_bat_dau
			),
			React.createElement(
				"td",
				null,
				this.props.data.so_tuan
			),
			React.createElement(
				"td",
				null,
				this.props.data.thu
			),
			React.createElement(
				"td",
				null,
				this.props.data.tiet_bat_dau
			),
			React.createElement(
				"td",
				null,
				this.props.data.so_tiet
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
				this.props.data.state
			),
			React.createElement(
				"td",
				null,
				React.createElement(
					"button",
					{ style: { "display": this.props.data.can_generate === true ? '' : 'none' }, "class": "btn btn-sm btn-primary", onClick: this.onGenerate },
					"Duyệt thực hiện"
				),
				React.createElement(
					"button",
					{ style: { "display": this.props.data.can_remove === true ? '' : 'none' }, "class": "btn btn-sm btn-warning", onClick: this.onDelete },
					"Xóa"
				),
				React.createElement(
					"button",
					{ style: { "display": this.props.data.can_restore === true ? '' : 'none' }, "class": "btn btn-sm btn-default", onClick: this.onRestore },
					"Phục hồi"
				),
				React.createElement(
					"button",
					{ "class": "btn btn-sm btn-danger", onClick: this.onDestroy },
					"Xóa vĩnh viễn"
				)
			)
		);
	}
});