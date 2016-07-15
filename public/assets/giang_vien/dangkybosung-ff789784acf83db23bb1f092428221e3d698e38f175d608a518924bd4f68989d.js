- /**
  - * @jsx React.DOM
  - */
"use strict";

var React = require("react");

var MDATA = [{ id: 1, thoi_gian: '12/08/2013', tiet_bat_dau: 1, so_tiet: 3, phong: 'A101', thuc_hanh: false, status: 'waiting' }, { id: 2, thoi_gian: '19/08/2013', tiet_bat_dau: 2, so_tiet: 3, phong: 'A103', thuc_hanh: false, status: 'accepted' }, { id: 3, thoi_gian: '20/08/2013', tiet_bat_dau: 2, so_tiet: 3, phong: 'A203', thuc_hanh: false, status: 'dropped' }];

var Bosung = React.createClass({
	displayName: "Bosung",

	getInitialState: function () {
		return { data: [], add: 0 };
	},
	updateLich: function () {
		if (ENV.lich_id != null) {
			React.unmountAndReleaseReactRootNode(document.getElementById('main'));
			React.renderComponent(React.createElement(Lich, { lich: ENV.lich_id, lop: ENV.lop_id }), document.getElementById('main'));
		}
	},
	loadData: function () {
		$.ajax({
			url: "/teacher/lop/" + this.props.lop + "/lich_trinh_giang_days/bosung",
			success: (function (data) {
				this.setState({ data: data, add: 0 });
			}).bind(this)
		});
	},
	componentWillMount: function () {
		this.loadData();
	},
	onAdd: function () {
		this.setState({ add: 1 });
	},
	onSubmitAdd: function () {
		if (this.state.add == 1) {
			var tiet_bat_dau = this.refs.tiet_bat_dau.getDOMNode().value;
			var thoi_gian = this.refs.thoi_gian.getDOMNode().value;
			var phong = this.refs.phong.getDOMNode().value;
			var so_tiet = this.refs.so_tiet.getDOMNode().value;
			var ltype = this.refs.ltype.getDOMNode().value;
			var data = { thoi_gian: thoi_gian, tiet_bat_dau: tiet_bat_dau, phong: phong, so_tiet: so_tiet, ltype: ltype };
			$.ajax({
				url: "/teacher/lop/" + this.props.lop + "/lich_trinh_giang_days/create_bosung",
				type: 'POST',
				data: data,
				success: (function (data) {
					this.setState({ data: data, add: 0 });
					React.unmountAndReleaseReactRootNode(document.getElementById('calendar'));
					React.renderComponent(React.createElement(Calendar, { lop: this.props.lop }), document.getElementById('calendar'));
				}).bind(this)
			});
		}

		return false;
	},
	onCancelAdd: function () {
		this.setState({ add: 0 });
	},
	onUpdate: function (data) {
		data._method = "put";
		$.ajax({
			url: "/teacher/lop/" + this.props.lop + "/lich_trinh_giang_days/update_bosung",
			type: 'POST',
			data: data,
			success: (function (data) {
				this.setState({ data: data, add: 0 });
				React.unmountAndReleaseReactRootNode(document.getElementById('calendar'));
				React.renderComponent(React.createElement(Calendar, { lop: this.props.lop }), document.getElementById('calendar'));
				this.updateLich();
			}).bind(this)
		});
	},
	onRemove: function (data) {
		data._method = "delete";
		$.ajax({
			url: "/teacher/lop/" + this.props.lop + "/lich_trinh_giang_days/remove_bosung",
			type: 'POST',
			data: data,
			success: (function (data) {
				this.setState({ data: data, add: 0 });
				React.unmountAndReleaseReactRootNode(document.getElementById('calendar'));
				React.renderComponent(React.createElement(Calendar, { lop: this.props.lop }), document.getElementById('calendar'));
				this.updateLich();
			}).bind(this)
		});
	},
	onRestore: function (data) {
		$.ajax({
			url: "/teacher/lop/" + this.props.lop + "/lich_trinh_giang_days/restore_bosung",
			type: 'POST',
			data: data,
			success: (function (data) {
				this.setState({ data: data, add: 0 });
				React.unmountAndReleaseReactRootNode(document.getElementById('calendar'));
				React.renderComponent(React.createElement(Calendar, { lop: this.props.lop }), document.getElementById('calendar'));
				this.updateLich();
			}).bind(this)
		});
	},
	componentDidUpdate: function () {
		if (this.state.add == 1) {
			$('.input-append.date').datepicker({
				format: "dd/mm/yyyy",
				startDate: "11/8/2014",
				todayBtn: "linked",
				language: "vi",
				autoClose: true,
				todayHighlight: true
			});
		}
	},
	render: function () {
		var self = this;
		var x = this.state.data.map(function (d) {
			return React.createElement(Row2, { key: 'row2' + d.id, onUpdate: self.onUpdate, onRemove: self.onRemove, onRestore: self.onRestore, data: d });
		});
		if (this.state.add === 0) {
			return React.createElement(
				"div",
				null,
				React.createElement("br", null),
				React.createElement(
					"button",
					{ "class": "btn btn-sm btn-success curl-top-left", onClick: this.onAdd },
					"Đăng ký bổ sung"
				),
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
								"th",
								null,
								"Stt"
							),
							React.createElement(
								"th",
								null,
								"Thời gian"
							),
							React.createElement(
								"th",
								null,
								"Tiết bắt đầu"
							),
							React.createElement(
								"th",
								null,
								"Số tiết"
							),
							React.createElement(
								"th",
								null,
								"Phòng"
							),
							React.createElement(
								"th",
								null,
								"Loại"
							),
							React.createElement(
								"th",
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
				)
			);
		} else if (this.state.add === 1) {
			return React.createElement(
				"div",
				null,
				React.createElement("br", null),
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
								"th",
								null,
								"Thời gian"
							),
							React.createElement(
								"th",
								null,
								"Tiết bắt đầu"
							),
							React.createElement(
								"th",
								null,
								"Số tiết dạy"
							),
							React.createElement(
								"th",
								null,
								"Phòng"
							),
							React.createElement(
								"th",
								null,
								"Loại"
							),
							React.createElement(
								"th",
								null,
								"Thực hiện"
							)
						),
						React.createElement(
							"tbody",
							null,
							React.createElement(
								"td",
								null,
								React.createElement(
									"div",
									{ "class": "input-append date" },
									React.createElement("input", { ref: "thoi_gian", type: "text", "class": "span2" }),
									React.createElement(
										"span",
										{ "class": "add-on" },
										React.createElement("i", { "class": "icon-th" })
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
								React.createElement("input", { type: "text", ref: "so_tiet", placeholder: "Số tiết dạy", "class": "form-control input-sm" })
							),
							React.createElement(
								"td",
								null,
								React.createElement("input", { type: "text", placeholder: "Phòng", ref: "phong", "class": "form-control input-sm" })
							),
							React.createElement(
								"td",
								null,
								React.createElement(
									"select",
									{ ref: "ltype", "class": "form-control input-sm" },
									React.createElement(
										"option",
										{ value: "lythuyet" },
										"Lý thuyết"
									),
									React.createElement(
										"option",
										{ value: "thuchanh" },
										"Thực hành"
									),
									React.createElement(
										"option",
										{ value: "tuhoc" },
										"Tự học"
									),
									React.createElement(
										"option",
										{ value: "baitap" },
										"Bài tập"
									)
								)
							),
							React.createElement(
								"td",
								null,
								React.createElement(
									"button",
									{ "class": "btn btn-sm btn-success curl-top-left", onClick: this.onCancelAdd },
									"Hủy"
								),
								React.createElement(
									"button",
									{ "class": "btn btn-sm btn-success curl-top-left", onClick: this.onSubmitAdd },
									"Cập nhật"
								)
							)
						)
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
								"th",
								null,
								"Stt"
							),
							React.createElement(
								"th",
								null,
								"Thời gian"
							),
							React.createElement(
								"th",
								null,
								"Tiết bắt đầu"
							),
							React.createElement(
								"th",
								null,
								"Số tiết"
							),
							React.createElement(
								"th",
								null,
								"Phòng"
							),
							React.createElement(
								"th",
								null,
								"Loại"
							),
							React.createElement(
								"th",
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
				)
			);
		}
	}
});

var Row2 = React.createClass({
	displayName: "Row2",

	getInitialState: function () {
		return { edit: 0 };
	},
	onClickEdit: function () {
		this.setState({ edit: 1 });
	},
	handleCancelEdit: function () {
		this.setState({ edit: 0 });
	},
	handleUpdate: function () {
		if (this.state.edit == 1) {
			var tiet_bat_dau = this.refs.tiet_bat_dau.getDOMNode().value;
			var thoi_gian = this.refs.thoi_gian.getDOMNode().value;
			var phong = this.refs.phong.getDOMNode().value;
			var so_tiet = this.refs.so_tiet.getDOMNode().value;
			var ltype = this.refs.ltype.getDOMNode().value;
			var data = {
				id: this.props.data.id,
				tiet_bat_dau: tiet_bat_dau,
				thoi_gian: thoi_gian,
				phong: phong,
				so_tiet: so_tiet,
				ltype: ltype
			};
			this.setState({ edit: 0 });
			this.props.onUpdate(data);
		}
	},
	componentDidUpdate: function () {
		if (this.state.edit == 1) {
			this.refs.thoi_gian.getDOMNode().value = this.props.data.thoi_gian;
			this.refs.tiet_bat_dau.getDOMNode().value = this.props.data.tiet_bat_dau;
			this.refs.so_tiet.getDOMNode().value = this.props.data.so_tiet;
			this.refs.phong.getDOMNode().value = this.props.data.phong;
			this.refs.ltype.getDOMNode().value = this.props.data.ltype;
			$('.input-append.date').datepicker({
				format: "dd/mm/yyyy",
				startDate: "11/8/2014",
				todayBtn: "linked",
				language: "vi",
				autoClose: true,
				todayHighlight: true
			});
		}
	},
	onRemove: function () {
		if (confirm('Đồng ý')) {
			this.props.onRemove(this.props.data);
		}
	},
	onRestore: function () {
		if (confirm('Đồng ý')) {
			this.props.onRestore(this.props.data);
		}
	},
	render: function () {
		if (this.state.edit === 0) {
			return React.createElement(
				"tr",
				null,
				React.createElement(
					"td",
					null,
					this.props.data.id
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
					this.props.data.type_status
				),
				React.createElement(
					"td",
					null,
					this.props.data.alias_status
				),
				React.createElement(
					"td",
					null,
					React.createElement(
						"button",
						{ "class": "btn btn-sm btn-success curl-top-left", onClick: this.onClickEdit, style: { display: this.props.data.can_edit === false ? 'none' : '' } },
						"Sửa"
					),
					React.createElement(
						"button",
						{ "class": "btn btn-sm btn-danger curl-top-left", onClick: this.onRemove, style: { display: this.props.data.can_remove === false ? 'none' : '' } },
						"Xóa"
					),
					React.createElement(
						"button",
						{ "class": "btn btn-sm btn-info curl-top-left", onClick: this.onRestore, style: { display: this.props.data.can_restore === false ? 'none' : '' } },
						"Phục hồi"
					)
				)
			);
		} else {
			return React.createElement(
				"tr",
				null,
				React.createElement(
					"td",
					null,
					this.props.data.id
				),
				React.createElement(
					"td",
					null,
					React.createElement(
						"div",
						{ "class": "input-append date" },
						React.createElement("input", { ref: "thoi_gian", type: "text", "class": "span2" }),
						React.createElement(
							"span",
							{ "class": "add-on" },
							React.createElement("i", { "class": "icon-th" })
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
					React.createElement("input", { type: "text", ref: "so_tiet", "class": "form-control input-sm" })
				),
				React.createElement(
					"td",
					null,
					React.createElement("input", { type: "text", ref: "phong", "class": "form-control input-sm" })
				),
				React.createElement(
					"td",
					null,
					React.createElement(
						"select",
						{ ref: "ltype", "class": "form-control input-sm" },
						React.createElement(
							"option",
							{ value: "lythuyet" },
							"Lý thuyết"
						),
						React.createElement(
							"option",
							{ value: "thuchanh" },
							"Thực hành"
						),
						React.createElement(
							"option",
							{ value: "tuhoc" },
							"Tự học"
						),
						React.createElement(
							"option",
							{ value: "baitap" },
							"Bài tập"
						)
					)
				),
				React.createElement(
					"td",
					null,
					this.props.data.alias_status
				),
				React.createElement(
					"td",
					null,
					React.createElement("input", { onClick: this.handleCancelEdit, "class": "btn btn-sm", type: "submit", value: "Cancel" }),
					React.createElement("input", { onClick: this.handleUpdate, "class": "btn btn-sm btn-primary", type: "submit", value: "Update" })
				)
			);
		}
	}
});