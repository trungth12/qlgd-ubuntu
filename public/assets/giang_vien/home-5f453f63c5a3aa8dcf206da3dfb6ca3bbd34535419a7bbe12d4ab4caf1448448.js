- /**
  - * @jsx React.DOM
  - */
"use strict";

var React = require("react");
//= require ./thanhtra

var hdata = [{ tuan: 1, colapse: 'colapseOne', active: false, data: [{ id: 1, thoi_gian: '6h30 12/08/2013', phong: 'A103', so_tiet: 3, ma_lop: 'ml', ten_mon_hoc: 'tm', alias_state: 'Bình thường', alias_status: 'Đang chờ', color: 'warning' }, { id: 2, thoi_gian: '6h30 12/08/2013', phong: 'A103', so_tiet: 3, ma_lop: 'ml', ten_mon_hoc: 'tm', alias_state: 'Bình thường', alias_status: 'Được chấp nhận', color: 'info' }, { id: 3, thoi_gian: '6h30 12/08/2013', phong: 'A103', so_tiet: 3, ma_lop: 'ml', ten_mon_hoc: 'tm', alias_state: 'Bình thường', alias_status: 'Đang chờ' }] }, { tuan: 2, colapse: 'colapseTwo', active: true, data: [{ id: 4, thoi_gian: '6h30 12/08/2013', phong: 'A103', so_tiet: 3, ma_lop: 'ml', ten_mon_hoc: 'tm', alias_state: 'Bình thường', alias_status: 'Đang chờ' }, { id: 5, thoi_gian: '6h30 12/08/2013', phong: 'A103', so_tiet: 3, ma_lop: 'ml', ten_mon_hoc: 'tm', alias_state: 'Bình thường', alias_status: 'Đang chờ' }] }, { tuan: 3, colapse: 'colapseThree', active: false, data: [{ id: 6, thoi_gian: '6h30 12/08/2013', phong: 'A103', so_tiet: 3, ma_lop: 'ml', ten_mon_hoc: 'tm', alias_state: 'Bình thường', alias_status: 'Đang chờ' }] }];
var Home2 = React.createClass({
	displayName: "Home2",

	getInitialState: function () {
		return { data: [] };
	},
	loadData: function () {
		$.ajax({
			url: "/teacher/lich_trinh_giang_days",
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
		var x = this.state.data.map(function (d) {
			return React.createElement(Tuan, { colapse: d.colapse, active: d.active, key: d.tuan.id, tuan: d.tuan, data: d.data });
		});
		return React.createElement(
			"div",
			{ "class": "panel-group", id: "accordion" },
			x
		);
	}
});

var Tuan = React.createClass({
	displayName: "Tuan",

	render: function () {
		var x = this.props.data.map(function (d, index) {
			return React.createElement(TuanRow, { color: (index + 1) % 2 === 0 ? 'danger' : 'warning', data: d });
		});
		return React.createElement(
			"div",
			{ "class": "panel panel-default" },
			React.createElement(
				"div",
				{ "class": "panel-heading" },
				React.createElement(
					"h4",
					{ "class": "panel-title" },
					React.createElement(
						"a",
						{ "data-toggle": "collapse", "data-parent": "#accordion", href: "#" + this.props.colapse },
						"Tuần " + this.props.tuan.stt,
						" (",
						this.props.tuan.tu_ngay2,
						" - ",
						this.props.tuan.den_ngay2,
						")"
					)
				)
			),
			React.createElement(
				"div",
				{ id: this.props.colapse, "class": "panel-collapse collapse " + (this.props.active === true ? 'in' : '') },
				React.createElement(
					"div",
					{ "class": "panel-body" },
					React.createElement(
						"div",
						{ "class": "table-responsive" },
						React.createElement(
							"table",
							{ "class": "table table-bordered" },
							React.createElement(
								"thead",
								{ style: { "font-weight": "bold" } },
								React.createElement(
									"tr",
									{ "class": "success" },
									React.createElement(
										"td",
										null,
										"Thứ"
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
										"Số tiết"
									),
									React.createElement(
										"td",
										null,
										"Giờ học"
									),
									React.createElement(
										"td",
										null,
										"Phòng"
									),
									React.createElement(
										"td",
										null,
										"Mã lớp"
									),
									React.createElement(
										"td",
										null,
										"Môn"
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
				)
			)
		);
	}
});

var TuanRow = React.createClass({
	displayName: "TuanRow",

	render: function () {
		var boldstyle = { 'font-weight': this.props.data.active === true ? 'bold' : '' };
		return React.createElement(
			"tr",
			{ style: boldstyle, "class": this.props.color },
			React.createElement(
				"td",
				null,
				this.props.data.thu
			),
			React.createElement(
				"td",
				null,
				React.createElement(
					"a",
					{ href: '/lich/' + this.props.data.id },
					this.props.data.thoi_gian
				)
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
				this.props.data.type_status
			),
			React.createElement(
				"td",
				null,
				this.props.data.phong
			),
			React.createElement(
				"td",
				null,
				this.props.data.ma_lop
			),
			React.createElement(
				"td",
				null,
				this.props.data.ten_mon_hoc
			),
			React.createElement(
				"td",
				null,
				this.props.data.alias_state
			),
			React.createElement(
				"td",
				null,
				React.createElement(
					"span",
					{ "class": this.props.data.color_status },
					this.props.data.alias_status
				)
			)
		);
	}
});

var LopHome = React.createClass({
	displayName: "LopHome",

	getInitialState: function () {
		return { data: [] };
	},
	loadData: function () {
		$.ajax({
			url: "/teacher/lops",
			success: (function (data) {
				this.setState({ data: data });
			}).bind(this)
		});
	},
	componentWillMount: function () {
		this.loadData();
	},
	render: function () {
		var x = this.state.data.map(function (d) {
			return React.createElement(LopRow, { data: d });
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
						"Lớp"
					),
					React.createElement(
						"td",
						null,
						"Môn"
					),
					React.createElement(
						"td",
						null,
						"Khối lượng dự kiến"
					),
					React.createElement(
						"td",
						null,
						"Khối lượng thực hiện"
					),
					React.createElement(
						"td",
						null,
						"Sĩ số"
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
					x
				)
			)
		);
	}
});

var LopRow = React.createClass({
	displayName: "LopRow",

	render: function () {
		return React.createElement(
			"tr",
			null,
			React.createElement(
				"td",
				null,
				React.createElement(
					"a",
					{ href: "/lop/" + this.props.data.id },
					this.props.data.ma_lop
				)
			),
			React.createElement(
				"td",
				null,
				this.props.data.ten_mon_hoc
			),
			React.createElement(
				"td",
				null,
				this.props.data.khoi_luong_du_kien
			),
			React.createElement(
				"td",
				null,
				this.props.data.khoi_luong_thuc_hien
			),
			React.createElement(
				"td",
				null,
				this.props.data.si_so
			),
			React.createElement(
				"td",
				null,
				this.props.data.completed === false ? 'Chưa kết thúc' : 'Đã hoàn thành'
			)
		);
	}
});
React.renderComponent(React.createElement(Home2, null), document.getElementById('main'));
React.renderComponent(React.createElement(LopHome, null), document.getElementById('dslop'));
React.renderComponent(React.createElement(ThanhTra, null), document.getElementById('thanhtra'));