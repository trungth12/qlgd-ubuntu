- /**
  - * @jsx React.DOM
  - */
"use strict";

var React = require("react");

var LopSetting = React.createClass({
	displayName: "LopSetting",

	getInitialState: function () {
		return { data: {}, edit: 0 };
	},
	onEdit: function () {
		this.setState({ edit: 1 });
	},
	onCancelEdit: function () {
		this.setState({ edit: 0 });
	},
	handleSubmit: function () {
		var lt = this.refs.lt.getDOMNode().value.trim();
		var th = this.refs.th.getDOMNode().value.trim();
		var tuhoc = this.refs.tuhoc.getDOMNode().value.trim();
		var bt = this.refs.bt.getDOMNode().value.trim();
		var lang = this.refs.lang.getDOMNode().value;
		var lichtrinh = $('#ltdk').code();
		var decuong = $('#dcct').code();
		if (!lt || !th) {
			alert("Bạn cần nhập số tiết lý thuyết và số tiết thực hành");
			return false;
		}
		var data = {
			id: this.state.data.id,
			lt: lt,
			th: th,
			tuhoc: tuhoc,
			bt: bt,
			lang: lang,
			lichtrinh: lichtrinh,
			decuong: decuong
		};
		$.ajax({
			url: "/teacher/lop/settinglop",
			type: 'POST',
			data: data,
			success: (function (data2) {
				this.setState({ data: data2.lop, edit: 0 });
				if (ENV.lich_id != null) {
					React.unmountAndReleaseReactRootNode(document.getElementById('main'));
					React.renderComponent(React.createElement(Lich, { lich: ENV.lich_id, lop: ENV.lop_id }), document.getElementById('main'));
				}
			}).bind(this)
		});
		return false;
	},
	componentWillMount: function () {
		$.ajax({
			url: "/teacher/lop/" + this.props.lop + "/show.json",
			success: (function (data) {
				this.setState({ data: data.lop });
			}).bind(this)
		});
	},
	componentDidUpdate: function () {
		$('#dcct').summernote({ height: 150 });
		$('#ltdk').summernote({ height: 150 });
		$('#lang').val(this.state.data.language);
		$('#lt').val(this.state.data.so_tiet_ly_thuyet);
		$('#th').val(this.state.data.so_tiet_thuc_hanh);
		$('#tuhoc').val(this.state.data.so_tiet_tu_hoc);
		$('#bt').val(this.state.data.so_tiet_bai_tap);
		$('#ltdk').html(this.state.data.lich_trinh_du_kien_html);
		$('#dcct').html(this.state.data.de_cuong_chi_tiet_html);
	},
	render: function () {

		if (this.state.edit === 1) {
			return React.createElement(
				"div",
				null,
				React.createElement("br", null),
				React.createElement(
					"form",
					{ onSubmit: this.handleSubmit },
					React.createElement("input", { type: "submit", value: "Cập nhật", "class": "btn btn-primary" }),
					React.createElement(
						"button",
						{ onClick: this.onCancelEdit, "class": "btn btn-sm btn-warning curl-top-left" },
						"Hủy"
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
									"Thông số"
								),
								React.createElement(
									"td",
									null,
									"Giá trị"
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
									"Mã lớp:"
								),
								React.createElement(
									"td",
									null,
									this.state.data.ma_lop
								)
							),
							React.createElement(
								"tr",
								null,
								React.createElement(
									"td",
									null,
									"Tên môn học"
								),
								React.createElement(
									"td",
									null,
									this.state.data.ten_mon_hoc
								)
							),
							React.createElement(
								"tr",
								null,
								React.createElement(
									"td",
									null,
									"Sĩ số"
								),
								React.createElement(
									"td",
									null,
									this.state.data.si_so
								)
							),
							React.createElement(
								"tr",
								null,
								React.createElement(
									"td",
									null,
									"Số tiết lý thuyết"
								),
								React.createElement(
									"td",
									null,
									React.createElement("input", { id: "lt", type: "text", ref: "lt" })
								)
							),
							React.createElement(
								"tr",
								null,
								React.createElement(
									"td",
									null,
									"Số tiết thực hành"
								),
								React.createElement(
									"td",
									null,
									React.createElement("input", { id: "th", type: "text", ref: "th" })
								)
							),
							React.createElement(
								"tr",
								null,
								React.createElement(
									"td",
									null,
									"Số tiết tự học"
								),
								React.createElement(
									"td",
									null,
									React.createElement("input", { id: "tuhoc", type: "text", ref: "tuhoc" })
								)
							),
							React.createElement(
								"tr",
								null,
								React.createElement(
									"td",
									null,
									"Số tiết bài tập"
								),
								React.createElement(
									"td",
									null,
									React.createElement("input", { id: "bt", type: "text", ref: "bt" })
								)
							),
							React.createElement(
								"tr",
								null,
								React.createElement(
									"td",
									null,
									"Ngôn ngữ"
								),
								React.createElement(
									"td",
									null,
									React.createElement(
										"select",
										{ id: "lang", ref: "lang" },
										React.createElement(
											"option",
											{ value: "vietnamse" },
											"Tiếng Việt"
										),
										React.createElement(
											"option",
											{ value: "english" },
											"Tiếng Anh"
										),
										React.createElement(
											"option",
											{ value: "chinese" },
											"Tiếng Trung Quốc"
										),
										React.createElement(
											"option",
											{ value: "japanese" },
											"Tiếng Nhật"
										)
									)
								)
							),
							React.createElement(
								"tr",
								null,
								React.createElement(
									"td",
									null,
									"Lịch trình dự kiến"
								),
								React.createElement(
									"td",
									null,
									React.createElement("textarea", { id: "ltdk", ref: "ltdk", style: { "width": "80%" } })
								)
							),
							React.createElement(
								"tr",
								null,
								React.createElement(
									"td",
									null,
									"Đề cương chi tiết"
								),
								React.createElement(
									"td",
									null,
									React.createElement("div", { id: "dcct", ref: "dcct", style: { "width": "80%" } })
								)
							)
						)
					)
				)
			);
		} else {
			return React.createElement(
				"div",
				null,
				React.createElement("br", null),
				React.createElement(
					"button",
					{ onClick: this.onEdit, "class": "btn btn-sm btn-success curl-top-left" },
					"Sửa"
				),
				React.createElement(
					"table",
					{ "class": "table table-bordered table-condensed" },
					React.createElement(
						"thead",
						null,
						React.createElement(
							"td",
							null,
							"Thông số"
						),
						React.createElement(
							"td",
							null,
							"Giá trị"
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
								"Mã lớp:"
							),
							React.createElement(
								"td",
								null,
								this.state.data.ma_lop
							)
						),
						React.createElement(
							"tr",
							null,
							React.createElement(
								"td",
								null,
								"Tên môn học"
							),
							React.createElement(
								"td",
								null,
								this.state.data.ten_mon_hoc
							)
						),
						React.createElement(
							"tr",
							null,
							React.createElement(
								"td",
								null,
								"Sĩ số"
							),
							React.createElement(
								"td",
								null,
								this.state.data.si_so
							)
						),
						React.createElement(
							"tr",
							null,
							React.createElement(
								"td",
								null,
								"Số tiết lý thuyết"
							),
							React.createElement(
								"td",
								null,
								this.state.data.so_tiet_ly_thuyet
							)
						),
						React.createElement(
							"tr",
							null,
							React.createElement(
								"td",
								null,
								"Số tiết thực hành"
							),
							React.createElement(
								"td",
								null,
								this.state.data.so_tiet_thuc_hanh
							)
						),
						React.createElement(
							"tr",
							null,
							React.createElement(
								"td",
								null,
								"Số tiết tự học"
							),
							React.createElement(
								"td",
								null,
								this.state.data.so_tiet_tu_hoc
							)
						),
						React.createElement(
							"tr",
							null,
							React.createElement(
								"td",
								null,
								"Số tiết bài tập"
							),
							React.createElement(
								"td",
								null,
								this.state.data.so_tiet_bai_tap
							)
						),
						React.createElement(
							"tr",
							null,
							React.createElement(
								"td",
								null,
								"Ngôn ngữ"
							),
							React.createElement(
								"td",
								null,
								this.state.data.language
							)
						),
						React.createElement(
							"tr",
							null,
							React.createElement(
								"td",
								null,
								"Lịch trình dự kiến"
							),
							React.createElement(
								"td",
								null,
								React.createElement(
									"p",
									null,
									React.createElement("span", { dangerouslySetInnerHTML: { __html: this.state.data.lich_trinh_du_kien_html } })
								)
							)
						),
						React.createElement(
							"tr",
							null,
							React.createElement(
								"td",
								null,
								"Đề cương chi tiết"
							),
							React.createElement(
								"td",
								null,
								React.createElement(
									"p",
									null,
									React.createElement("span", { dangerouslySetInnerHTML: { __html: this.state.data.de_cuong_chi_tiet_html } })
								)
							)
						)
					)
				)
			);
		}
	}
});