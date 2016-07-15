- /**
  - * @jsx React.DOM
  - */
"use strict";

var React = require("react");

var Calendar = React.createClass({
	displayName: "Calendar",

	getInitialState: function () {
		return { data: [] };
	},
	loadData: function () {
		$.ajax({
			url: "/teacher/lop/" + this.props.lop + "/lich_trinh_giang_days",
			success: (function (data) {
				this.setState({ data: data });
			}).bind(this)
		});
	},
	componentWillMount: function () {
		this.loadData();
	},
	// remove, restore, edit, nghiday, accept, unaccept
	/*loadData: function(){
 	/*var CDATA = [
 	{tuan: 1, thoi_gian: '6h30 12/08/2013', so_tiet: 3, phong: 'C201', thuc_hanh: false, ten_mon_hoc: 'mm1', state: 'normal', status: 'accepted', can_edit: false, can_restore: false, can_remove: false, can_nghiday: false, can_accept: false, can_unaccept: true, complete: 'Chưa hoàn thành'},
 	{tuan: 1, thoi_gian: '6h30 13/08/2013', so_tiet: 3, phong: 'C201', thuc_hanh: true, ten_mon_hoc: 'mm2', state: 'normal', status: 'waiting', can_edit: true, can_restore: false, can_remove: true, can_nghiday: true, can_accept: true, can_unaccept: false, complete: 'Đã hoàn thành'}
  ];
 		this.setState({data: CDATA});
 	console.log(this.state.data);
 },
 */
	updateLich: function () {
		if (ENV.lich_id != null) {
			React.unmountAndReleaseReactRootNode(document.getElementById('main'));
			React.renderComponent(React.createElement(Lich, { lich: ENV.lich_id, lop: ENV.lop_id }), document.getElementById('main'));
		}
	},
	handleNghiday: function (d) {
		d.lop_id = this.props.lop;
		$.ajax({
			url: "/teacher/lop/" + this.props.lop + "/lich_trinh_giang_days/nghiday",
			type: 'POST',
			data: d,
			success: (function (data) {
				this.setState({ data: data, add: 0 });
				this.updateLich();
			}).bind(this)
		});
	},
	handleUnNghiday: function (d) {
		d.lop_id = this.props.lop;
		$.ajax({
			url: "/teacher/lop/" + this.props.lop + "/lich_trinh_giang_days/unnghiday",
			type: 'POST',
			data: d,
			success: (function (data) {
				this.setState({ data: data, add: 0 });
				this.updateLich();
			}).bind(this)
		});
	},
	handleUncomplete: function (d) {
		d.lop_id = this.props.lop;
		$.ajax({
			url: "/teacher/lop/" + this.props.lop + "/lich_trinh_giang_days/uncomplete",
			type: 'POST',
			data: d,
			success: (function (data) {
				this.setState({ data: data, add: 0 });
				React.unmountAndReleaseReactRootNode(document.getElementById('bosung'));
				React.renderComponent(React.createElement(Bosung, { giang_vien: this.props.giang_vien, lop: this.props.lop }), document.getElementById('bosung'));
				this.updateLich();
			}).bind(this)
		});
	},
	handleRemove: function (d) {
		d.lop_id = this.props.lop;
		$.ajax({
			url: "/teacher/lop/" + this.props.lop + "/lich_trinh_giang_days/remove",
			type: 'POST',
			data: d,
			success: (function (data) {
				this.setState({ data: data, add: 0 });
				React.unmountAndReleaseReactRootNode(document.getElementById('bosung'));
				React.renderComponent(React.createElement(Bosung, { giang_vien: this.props.giang_vien, lop: this.props.lop }), document.getElementById('bosung'));
				this.updateLich();
			}).bind(this)
		});
	},
	handleRestore: function (d) {
		d.giang_vien = this.props.giang_vien;
		d.lop_id = this.props.lop;
		$.ajax({
			url: "/teacher/lop/" + this.props.lop + "/lich_trinh_giang_days/restore",
			type: 'POST',
			data: d,
			success: (function (data) {
				this.setState({ data: data, add: 0 });
				React.unmountAndReleaseReactRootNode(document.getElementById('bosung'));
				React.renderComponent(React.createElement(Bosung, { giang_vien: this.props.giang_vien, lop: this.props.lop }), document.getElementById('bosung'));
				this.updateLich();
			}).bind(this)
		});
	},
	handleUpdate: function (d) {
		d.giang_vien = this.props.giang_vien;
		d.lop_id = this.props.lop;
		$.ajax({
			url: "/teacher/lop/" + this.props.lop + "/lich_trinh_giang_days/update",
			type: 'POST',
			data: d,
			success: (function (data) {
				this.setState({ data: data, add: 0 });
				this.updateLich();
			}).bind(this)
		});
	},
	render: function () {
		var self = this;
		var x = this.state.data.map(function (d, index) {
			if (d.alias_state === 'Bổ sung') {
				return React.createElement(CalendarRowBosung, { color: (index + 1) % 2 === 0 ? 'danger' : 'default', key: 'bosung-' + d.id, onRemove: self.handleRemove, onRestore: self.handleRestore, onUncomplete: self.handleUncomplete, data: d });
			}
			if (d.alias_state === 'Nghỉ dạy') {
				return React.createElement(CalendarRowNghiday, { color: (index + 1) % 2 === 0 ? 'danger' : 'default', key: 'nghiday' + d.id, onRemove: self.handleRemove, onRestore: self.handleRestore, onUnNghiday: self.handleUnNghiday, data: d });
			}
			return React.createElement(CalendarRow, { color: (index + 1) % 2 === 0 ? 'danger' : 'default', key: 'normal' + d.id, onUpdate: self.handleUpdate, onRemove: self.handleRemove, onRestore: self.handleRestore, onComplete: self.handleComplete, onNghiday: self.handleNghiday, onUncomplete: self.handleUncomplete, data: d });
		});
		return React.createElement(
			"div",
			{ "class": "table-responsive" },
			React.createElement(
				"table",
				{ "class": "table table-bordered table-striped" },
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
							"Số tiết"
						),
						React.createElement(
							"td",
							null,
							"Loại"
						),
						React.createElement(
							"td",
							null,
							"Giờ học"
						),
						React.createElement(
							"td",
							null,
							"Trạng thái"
						),
						React.createElement(
							"td",
							null,
							"Lí do nghỉ dạy"
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
					x
				)
			)
		);
	}
});

var CalendarRowNghiday = React.createClass({
	displayName: "CalendarRowNghiday",

	getInitialState: function () {
		return { edit: 0 };
	},
	onUnNghiday: function (e) {
		this.props.onUnNghiday(this.props.data);
	},
	onRemove: function (e) {
		this.props.onRemove(this.props.data);
	},
	onRestore: function (e) {
		this.props.onRestore(this.props.data);
	},
	render: function () {
		var boldstyle = { 'font-weight': this.props.data.active === true ? 'bold' : '' };
		if (this.state.edit === 0) {
			return React.createElement(
				"tr",
				{ style: boldstyle, "class": this.props.color },
				React.createElement(
					"td",
					null,
					this.props.data.tuan
				),
				React.createElement(
					"td",
					null,
					React.createElement(
						"a",
						{ href: "/lich/" + this.props.data.id },
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
					this.props.data.phong
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
				),
				React.createElement(
					"td",
					null,
					this.props.data.note
				),
				React.createElement(
					"td",
					null,
					React.createElement(
						"button",
						{ onClick: this.onUnNghiday, style: { display: this.props.data.can_unnghiday === false ? 'none' : '' }, "class": "btn btn-sm btn-primary curl-top-left" },
						"Hủy đăng ký"
					),
					React.createElement(
						"button",
						{ onClick: this.onRemove, style: { display: this.props.data.can_remove === false ? 'none' : '' }, "class": "btn btn-sm btn-danger curl-top-left" },
						"Xóa"
					),
					React.createElement(
						"button",
						{ onClick: this.onRestore, style: { display: this.props.data.can_restore === false ? 'none' : '' }, "class": "btn btn-sm btn-default curl-top-left" },
						"Phục hồi"
					)
				)
			);
		}
	}
});
var CalendarRowBosung = React.createClass({
	displayName: "CalendarRowBosung",

	onUncomplete: function (e) {
		this.props.onUncomplete(this.props.data);
	},
	onRestore: function (e) {
		this.props.onRestore(this.props.data);
	},
	onRemove: function (e) {
		this.props.onRemove(this.props.data);
	},
	render: function () {
		var boldstyle = { 'font-weight': this.props.data.active === true ? 'bold' : '' };
		return React.createElement(
			"tr",
			{ style: boldstyle, "class": this.props.color },
			React.createElement(
				"td",
				null,
				this.props.data.tuan
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
				this.props.data.phong
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
			),
			React.createElement(
				"td",
				null,
				this.props.data.note
			),
			React.createElement(
				"td",
				null,
				React.createElement(
					"button",
					{ onClick: this.onRemove, style: { display: this.props.data.can_remove === false ? 'none' : '' }, "class": "btn btn-sm btn-danger curl-top-left" },
					"Xóa"
				),
				React.createElement(
					"button",
					{ onClick: this.onRestore, style: { display: this.props.data.can_restore === false ? 'none' : '' }, "class": "btn btn-sm btn-default curl-top-left" },
					"Phục hồi"
				),
				React.createElement(
					"button",
					{ onClick: this.onUncomplete, style: { display: this.props.data.can_uncomplete === false ? 'none' : '' }, "class": "btn btn-sm btn-primary curl-top-left" },
					"Hủy hoàn thành"
				)
			)
		);
	}
});
var CalendarRow = React.createClass({
	displayName: "CalendarRow",

	getInitialState: function () {
		return { edit: 0 };
	},
	onEdit: function (e) {
		this.setState({ edit: 1 });
	},
	onCancelEdit: function (e) {
		this.setState({ edit: 0 });
	},
	onUpdate: function (e) {
		var note = this.refs.note.getDOMNode().value;
		var so_tiet = this.refs.so_tiet.getDOMNode().value;
		var phong = this.refs.phong.getDOMNode().value;
		var ltype = this.refs.ltype.getDOMNode().value;
		var data = { id: this.props.data.id, so_tiet: so_tiet, phong: phong, ltype: ltype };
		this.setState({ edit: 0 });
		this.props.onUpdate(data);
	},
	onUncomplete: function (e) {
		this.props.onUncomplete(this.props.data);
	},
	onRestore: function (e) {
		this.props.onRestore(this.props.data);
	},
	onRemove: function (e) {
		this.props.onRemove(this.props.data);
	},
	onNghiday: function (e) {
		this.props.data.note = this.refs.note.getDOMNode().value;
		this.props.onNghiday(this.props.data);
	},
	componentDidUpdate: function (e) {
		this.refs.note.getDOMNode().value = this.props.data.note;
		if (this.state.edit === 1) {
			this.refs.so_tiet.getDOMNode().value = this.props.data.so_tiet;
			this.refs.phong.getDOMNode().value = this.props.data.phong;
			this.refs.ltype.getDOMNode().value = this.props.data.ltype;
		}
	},
	render: function () {
		var boldstyle = { 'font-weight': this.props.data.active === true ? 'bold' : '' };
		if (this.state.edit === 0) {
			return React.createElement(
				"tr",
				{ style: boldstyle, "class": this.props.color },
				React.createElement(
					"td",
					null,
					this.props.data.tuan
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
					this.props.data.phong
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
				),
				React.createElement(
					"td",
					null,
					React.createElement("input", { type: "text", ref: "note", placeholder: "Lí do nghỉ dạy" })
				),
				React.createElement(
					"td",
					null,
					React.createElement(
						"button",
						{ onClick: this.onNghiday, style: { display: this.props.data.can_nghiday === false ? 'none' : '' }, "class": "btn btn-sm btn-warning curl-top-left" },
						"Đăng ký nghỉ"
					),
					React.createElement(
						"button",
						{ onClick: this.onEdit, style: { display: this.props.data.can_edit === false ? 'none' : '' }, "class": "btn btn-sm btn-success curl-top-left" },
						"Sửa"
					),
					React.createElement(
						"button",
						{ onClick: this.onRemove, style: { display: this.props.data.can_remove === false ? 'none' : '' }, "class": "btn btn-sm btn-danger curl-top-left" },
						"Xóa"
					),
					React.createElement(
						"button",
						{ onClick: this.onRestore, style: { display: this.props.data.can_restore === false ? 'none' : '' }, "class": "btn btn-sm btn-default curl-top-left" },
						"Phục hồi"
					),
					React.createElement(
						"button",
						{ onClick: this.onUncomplete, style: { display: this.props.data.can_uncomplete === false ? 'none' : '' }, "class": "btn btn-sm btn-primary curl-top-left" },
						"Hủy hoàn thành"
					)
				)
			);
		} else {
			return React.createElement(
				"tr",
				{ style: boldstyle, "class": this.props.color },
				React.createElement(
					"td",
					null,
					this.props.data.tuan
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
					React.createElement("input", { type: "text", ref: "phong", "class": "form-control input-sm" })
				),
				React.createElement(
					"td",
					null,
					React.createElement("input", { type: "text", ref: "so_tiet", "class": "form-control input-sm" })
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
				),
				React.createElement(
					"td",
					null,
					React.createElement("input", { type: "text", ref: "note", placeholder: "Ghi chú buổi học" })
				),
				React.createElement(
					"td",
					null,
					React.createElement(
						"button",
						{ onClick: this.onCancelEdit, "class": "btn btn-sm btn-warning curl-top-left" },
						"Hủy"
					),
					React.createElement(
						"button",
						{ onClick: this.onUpdate, "class": "btn btn-sm btn-success curl-top-left" },
						"Cập nhật"
					)
				)
			);
		}
	}
});