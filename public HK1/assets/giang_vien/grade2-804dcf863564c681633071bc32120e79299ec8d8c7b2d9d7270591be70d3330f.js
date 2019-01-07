- /**
  - * @jsx React.DOM
  - */
"use strict";

var React = require("react");

var Grade2 = React.createClass({
	displayName: "Grade2",

	getInitialState: function () {
		return { data: [], headers: [] };
	},
	loadData: function () {

		$.ajax({
			url: "/teacher/lop/" + this.props.lop + "/submissions2.json",
			success: (function (data) {
				this.setState({ data: data.results, headers: data.headers });
				React.unmountAndReleaseReactRootNode(document.getElementById('grades2'));
				React.renderComponent(React.createElement(GroupGrade, { lop: this.props.lop }), document.getElementById('grades2'));
			}).bind(this)
		});
	},
	onUpdate: function (d) {
		$.ajax({
			url: "/teacher/lop/" + this.props.lop + "/submissions2",
			type: 'POST',
			data: d,
			success: (function (data) {
				this.setState({ data: data.results, headers: data.headers });
				React.unmountAndReleaseReactRootNode(document.getElementById('assignment'));
				React.renderComponent(React.createElement(Assignments, { lop: this.props.lop }), document.getElementById('assignment'));
				React.unmountAndReleaseReactRootNode(document.getElementById('grades2'));
				React.renderComponent(React.createElement(GroupGrade, { lop: this.props.lop }), document.getElementById('grades2'));
			}).bind(this)
		});
		return false;
	},
	componentWillMount: function () {
		this.loadData();
	},
	render: function () {
		var self = this;
		var headers = this.state.headers.map(function (d) {
			return React.createElement(
				"td",
				null,
				d.assignment_name,
				" (",
				d.points,
				")"
			);
		});
		var x = this.state.data.map(function (d) {
			return React.createElement(GradeRow, { hovaten: d.hovaten, code: d.code, ma_lop_hanh_chinh: d.ma_lop_hanh_chinh, diem_qua_trinh: d.diem_qua_trinh, tinhhinh: d.tinhhinh, onUpdate: self.onUpdate, data: d.submissions });
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
							"Họ và tên"
						),
						React.createElement(
							"td",
							null,
							"Tình hình đi học"
						),
						headers,
						React.createElement(
							"td",
							null,
							"Điểm quá trình"
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

var GroupGrade = React.createClass({
	displayName: "GroupGrade",

	getInitialState: function () {
		return { data: [], headers: [] };
	},
	loadData: function () {
		$.ajax({
			url: '/teacher/lop/' + this.props.lop + '/group_submissions',
			success: (function (data) {
				this.setState({ data: data.results, headers: data.headers });
			}).bind(this)
		});
	},
	componentWillMount: function () {
		this.loadData();
	},
	render: function () {
		var headers = this.state.headers.map(function (d) {
			return React.createElement(
				"td",
				null,
				d.group_name,
				" (",
				d.weight,
				"%)"
			);
		});
		var x = this.state.data.map(function (d) {
			return React.createElement(GroupGradeRow, { hovaten: d.hovaten, code: d.code, tinhhinh: d.tinhhinh, ma_lop_hanh_chinh: d.ma_lop_hanh_chinh, diem_qua_trinh: d.diem_qua_trinh, data: d.group_submissions });
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
							"Họ và tên"
						),
						React.createElement(
							"td",
							null,
							"Tình hình đi học"
						),
						headers,
						React.createElement(
							"td",
							null,
							"Điểm quá trình"
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

var GroupGradeRow = React.createClass({
	displayName: "GroupGradeRow",

	render: function () {
		var x = this.props.data.map(function (d) {
			return React.createElement(GroupGradeCell, { data: d });
		});
		return React.createElement(
			"tr",
			null,
			React.createElement(
				"td",
				null,
				React.createElement(
					"div",
					null,
					this.props.hovaten,
					React.createElement("br", null),
					this.props.code,
					React.createElement("br", null),
					this.props.ma_lop_hanh_chinh
				)
			),
			React.createElement(
				"td",
				null,
				React.createElement(
					"div",
					{ "class": "progress" },
					React.createElement(
						"div",
						{ "class": "progress-bar progress-bar-success", style: { width: 100 - this.props.tinhhinh + "%" } },
						React.createElement(
							"span",
							null,
							100 - this.props.tinhhinh + "%"
						)
					),
					React.createElement(
						"div",
						{ "class": "progress-bar progress-bar-danger", style: { width: this.props.tinhhinh + "%" } },
						React.createElement(
							"span",
							null,
							this.props.tinhhinh + "%"
						)
					)
				)
			),
			x,
			React.createElement(
				"td",
				null,
				this.props.diem_qua_trinh
			)
		);
	}
});
var GroupGradeCell = React.createClass({
	displayName: "GroupGradeCell",

	render: function () {
		return React.createElement(
			"td",
			null,
			this.props.data.grade
		);
	}
});
var GradeRow = React.createClass({
	displayName: "GradeRow",

	render: function () {
		var self = this;
		var x = this.props.data.map(function (d) {
			return React.createElement(GradeCell, { onUpdate: self.props.onUpdate, data: d });
		});
		return React.createElement(
			"tr",
			null,
			React.createElement(
				"td",
				null,
				React.createElement(
					"div",
					null,
					this.props.hovaten,
					React.createElement("br", null),
					this.props.code,
					React.createElement("br", null),
					this.props.ma_lop_hanh_chinh
				)
			),
			React.createElement(
				"td",
				null,
				React.createElement(
					"div",
					{ "class": "progress" },
					React.createElement(
						"div",
						{ "class": "progress-bar progress-bar-success", style: { width: 100 - this.props.tinhhinh + "%" } },
						React.createElement(
							"span",
							null,
							100 - this.props.tinhhinh + "%"
						)
					),
					React.createElement(
						"div",
						{ "class": "progress-bar progress-bar-danger", style: { width: this.props.tinhhinh + "%" } },
						React.createElement(
							"span",
							null,
							this.props.tinhhinh + "%"
						)
					)
				)
			),
			x,
			React.createElement(
				"td",
				null,
				this.props.diem_qua_trinh
			)
		);
	}
});

var DisabledGradeCell = React.createClass({
	displayName: "DisabledGradeCell",

	render: function () {
		return React.createElement(
			"td",
			null,
			React.createElement(
				"div",
				null,
				this.props.data.grade
			),
			React.createElement(
				"button",
				{ "class": "btn btn-sm btn-primary", onClick: this.props.onEdit },
				"Sửa"
			),
			" "
		);
	}
});
var LiveGradeCell = React.createClass({
	displayName: "LiveGradeCell",

	onUpdate: function () {
		this.props.data.grade = this.refs.grade.getDOMNode().value;
		this.props.onUpdate(this.props.data);
	},
	render: function () {
		return React.createElement(
			"td",
			null,
			React.createElement("input", { type: "text", ref: "grade", id: "grade" }),
			React.createElement(
				"button",
				{ "class": "btn btn-danger", onClick: this.props.onCancel },
				"Hủy"
			),
			React.createElement(
				"button",
				{ "class": "btn btn-success", onClick: this.onUpdate },
				"Cập nhật"
			)
		);
	}
});
var GradeCell = React.createClass({
	displayName: "GradeCell",

	getInitialState: function () {
		return { edit: 0 };
	},
	onEdit: function () {
		this.setState({ edit: 1 });
	},
	onCancel: function () {
		this.setState({ edit: 0 });
	},
	onUpdate: function (d) {
		this.setState({ edit: 0 });
		this.props.onUpdate(d);
	},
	componentDidUpdate: function () {
		if (this.state.edit === 1) {
			$("#grade").focus();
			$("#grade").val(this.props.data.grade);
		}
	},
	render: function () {

		if (this.state.edit === 0) {
			return React.createElement(DisabledGradeCell, { data: this.props.data, onEdit: this.onEdit });
		} else {
			return React.createElement(LiveGradeCell, { data: this.props.data, onCancel: this.onCancel, onUpdate: this.onUpdate });
		}
	}
});