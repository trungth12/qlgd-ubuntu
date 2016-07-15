- /**
  - * @jsx React.DOM
  - */
"use strict";

var React = require("react");

var TKTinhHinh = React.createClass({
	displayName: "TKTinhHinh",

	getInitialState: function () {
		return { headers: [], data: [] };
	},
	componentWillMount: function () {
		this.loadData();
	},
	loadData: function () {
		$.ajax({
			url: '/truongkhoa/lop/' + this.props.lop_id + '/tinhhinh',
			method: 'GET',
			success: (function (data) {
				this.setState({ headers: data.headers, data: data.data });
			}).bind(this)
		});
	},
	render: function () {
		var headers = this.state.headers.map(function (d) {
			return React.createElement(
				"td",
				null,
				d.tuan
			);
		});
		var x = this.state.data.map(function (d, index) {
			var y = d.data.map(function (d2) {
				return React.createElement(
					"td",
					null,
					d2
				);
			});
			return React.createElement(
				"tr",
				{ "class": index % 2 === 0 ? 'danger' : 'warning' },
				React.createElement(
					"td",
					null,
					index + 1
				),
				React.createElement(
					"td",
					null,
					d.hovaten,
					React.createElement("br", null),
					d.code,
					React.createElement("br", null),
					d.ma_lop_hanh_chinh
				),
				y
			);
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
							"Sinh viên"
						),
						headers
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

var TKLichTrinh = React.createClass({
	displayName: "TKLichTrinh",

	getInitialState: function () {
		return { data: [] };
	},
	loadData: function () {
		$.ajax({
			url: '/truongkhoa/lop/' + this.props.lop_id + '/lichtrinh',
			method: 'GET',
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
		var x = this.state.data.map(function (d, index) {
			return React.createElement(
				"tr",
				{ "class": index % 2 === 0 ? 'danger' : 'warning' },
				React.createElement(
					"td",
					null,
					d.tuan
				),
				React.createElement(
					"td",
					null,
					React.createElement("span", { dangerouslySetInnerHTML: { __html: d.noi_dung } })
				),
				React.createElement(
					"td",
					null,
					d.so_tiet
				),
				React.createElement(
					"td",
					null,
					React.createElement("span", { dangerouslySetInnerHTML: { __html: d.thoi_gian } })
				)
			);
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
						"tr",
						{ "class": "success" },
						React.createElement(
							"td",
							null,
							"Tuần"
						),
						React.createElement(
							"td",
							null,
							"Nội dung"
						),
						React.createElement(
							"td",
							null,
							"Số tiết"
						),
						React.createElement(
							"td",
							null,
							"Thời gian"
						)
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

var Lop = React.createClass({
	displayName: "Lop",

	getInitialState: function () {
		return { data: {}, lichtrinhs: [] };
	},
	loadData: function () {
		$.ajax({
			url: '/truongkhoa/lop/' + this.props.lop_id,
			method: 'GET',
			success: (function (data) {
				this.setState({ data: data });
			}).bind(this)
		});
	},
	componentWillMount: function () {
		this.loadData();
	},
	updateInfo: function (type, action) {
		// 1: thong so, 2: lich trinh, 3: tinh hinh
		// action: true(approve), false(reject)
		$.ajax({
			url: '/truongkhoa/update',
			method: 'POST',
			data: { lop_id: this.props.lop_id, type: type, maction: action },
			success: (function (data) {
				this.setState({ data: data });
			}).bind(this)
		});
	},
	onApproveThongSo: function () {
		this.updateInfo(1, 1);
	},
	onRejectThongSo: function () {
		this.updateInfo(1, 0);
	},
	onApproveLichTrinh: function () {
		this.updateInfo(2, 1);
	},
	onRejectLichTrinh: function () {
		this.updateInfo(2, 0);
	},
	onApproveTinhHinh: function () {
		this.updateInfo(3, 1);
	},
	onRejectTinhHinh: function () {
		this.updateInfo(3, 0);
	},
	render: function () {
		return React.createElement(
			"div",
			null,
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
								"Giảng viên"
							),
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
								"Duyệt đề cương"
							),
							React.createElement(
								"td",
								null,
								"Duyệt lịch trình"
							),
							React.createElement(
								"td",
								null,
								"Duyệt tình hình"
							)
						)
					),
					React.createElement(
						"tbody",
						null,
						React.createElement(
							"tr",
							{ "class": "success" },
							React.createElement(
								"td",
								null,
								this.state.data.giang_viens
							),
							React.createElement(
								"td",
								null,
								this.state.data.ma_lop
							),
							React.createElement(
								"td",
								null,
								this.state.data.ten_mon_hoc
							),
							React.createElement(
								"td",
								null,
								this.state.data.duyet_thong_so_status
							),
							React.createElement(
								"td",
								null,
								this.state.data.duyet_lich_trinh_status
							),
							React.createElement(
								"td",
								null,
								this.state.data.duyet_tinh_hinh_status
							)
						)
					)
				)
			),
			React.createElement(
				"div",
				{ "class": "panel-group", id: "accordion" },
				React.createElement(
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
								{ "data-toggle": "collapse", "data-parent": "#accordion", href: "#dcct" },
								"Đề cương chi tiết"
							)
						)
					),
					React.createElement(
						"div",
						{ id: "dcct", "class": "panel-collapse collapse" },
						React.createElement(
							"div",
							{ "class": "panel-body" },
							React.createElement(
								"button",
								{ "class": "btn btn-sm btn-primary", style: { display: this.state.data.can_approve_thong_so === false ? 'none' : '' }, onClick: this.onApproveThongSo },
								"Duyệt"
							),
							React.createElement(
								"button",
								{ "class": "btn btn-sm btn-warning", style: { display: this.state.data.can_reject_thong_so === false ? 'none' : '' }, onClick: this.onRejectThongSo },
								"Không duyệt"
							),
							React.createElement("hr", null),
							React.createElement("span", { dangerouslySetInnerHTML: { __html: this.state.data.de_cuong_chi_tiet_html } })
						)
					)
				),
				React.createElement(
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
								{ "data-toggle": "collapse", "data-parent": "#accordion", href: "#ltth" },
								"Lịch trình thực hiện"
							)
						)
					),
					React.createElement(
						"div",
						{ id: "ltth", "class": "panel-collapse collapse" },
						React.createElement(
							"div",
							{ "class": "panel-body" },
							React.createElement(
								"button",
								{ "class": "btn btn-sm btn-primary", style: { display: this.state.data.can_approve_lich_trinh === false ? 'none' : '' }, onClick: this.onApproveLichTrinh },
								"Duyệt"
							),
							React.createElement(
								"button",
								{ "class": "btn btn-sm btn-warning", style: { display: this.state.data.can_reject_lich_trinh === false ? 'none' : '' }, onClick: this.onRejectLichTrinh },
								"Không duyệt"
							),
							React.createElement("hr", null),
							React.createElement(TKLichTrinh, { lop_id: this.props.lop_id })
						)
					)
				),
				React.createElement(
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
								{ "data-toggle": "collapse", "data-parent": "#accordion", href: "#thht" },
								"Tình hình học tập"
							)
						)
					),
					React.createElement(
						"div",
						{ id: "thht", "class": "panel-collapse collapse" },
						React.createElement(
							"div",
							{ "class": "panel-body" },
							React.createElement(
								"button",
								{ "class": "btn btn-sm btn-primary", style: { display: this.state.data.can_approve_tinh_hinh === false ? 'none' : '' }, onClick: this.onApproveTinhHinh },
								"Duyệt"
							),
							React.createElement(
								"button",
								{ "class": "btn btn-sm btn-warning", style: { display: this.state.data.can_reject_tinh_hinh === false ? 'none' : '' }, onClick: this.onRejectTinhHinh },
								"Không duyệt"
							),
							React.createElement("hr", null),
							React.createElement(TKTinhHinh, { lop_id: this.props.lop_id })
						)
					)
				)
			)
		);
	}
});
React.renderComponent(React.createElement(Lop, { lop_id: ENV.lop_id }), document.getElementById('tkmain'));