- /**
  - * @jsx React.DOM
  - */
"use strict";

var React = require("react");

var Cell = React.createClass({
    displayName: "Cell",

    handleInput: function (e) {
        this.props.onInput1(this.props.data.index);
    },
    handleBlur: function (e) {
        var grade = this.refs.grade.getDOMNode().value;
        var data = { index: this.props.data.index, assignment_id: this.props.data.assignment_id, sinh_vien_id: this.props.data.sinh_vien_id, grade: grade };
        this.props.onEnter(data);
    },
    handleKey: function (e) {
        if (this.props.data.edit == 1) {
            var grade = this.refs.grade.getDOMNode().value;
            var data = { index: this.props.data.index, assignment_id: this.props.data.assignment_id, sinh_vien_id: this.props.data.sinh_vien_id, grade: grade };

            if (e.shiftKey && e.keyCode == 9) {
                // left                   
                e.preventDefault();
                this.props.onKeyPress(data, 'left');
            } else if (e.keyCode == 38) {
                e.preventDefault();
                this.props.onKeyPress(data, 'up');
            } else if (e.keyCode == 9 && !e.shiftKey) {
                e.preventDefault();
                this.props.onKeyPress(data, 'right');
            } else if (e.keyCode == 40) {
                e.preventDefault();
                this.props.onKeyPress(data, 'down');
            } else if (e.keyCode == 13 || e.keyCode == 27) {
                e.preventDefault();
                this.props.onEnter(data);
            }
        }
    },
    componentDidUpdate: function () {
        if (this.props.data.edit === 1) {
            $('#mi').focus();
            $('#mi').val(this.props.data.grade);
        }
    },
    render: function () {
        if (this.props.data.edit === 0) {
            return React.createElement(
                "div",
                { ref: "t", onClick: this.handleInput },
                this.props.data.grade,
                " / ",
                this.props.data.assignment_points
            );
        } else if (this.props.data.edit === 1) {
            return React.createElement(
                "span",
                null,
                React.createElement("input", { id: "mi", ref: "grade", onKeyDown: this.handleKey, onFocus: this.handleInput, onBlur: this.handleBlur, type: "text" }),
                "/ ",
                this.props.data.assignment_points
            );
        }
    }
});

var Row = React.createClass({
    displayName: "Row",

    render: function () {
        var self = this;
        var x = this.props.data.map(function (d) {
            return React.createElement(
                "td",
                null,
                React.createElement(Cell, { key: 'rowcell' + d.sinh_vien_id.toString() + '-' + d.assignment_id.toString(), onKeyPress: self.props.handleKeyPress, data: d, onBlur1: self.props.handleBlur, onChange1: self.props.handleChange, onInput1: self.props.handleInput, onEnter: self.props.handleEnter })
            );
        });
        return React.createElement(
            "tr",
            null,
            React.createElement(
                "td",
                null,
                this.props.name
            ),
            x
        );
    }
});

var RowGroup = React.createClass({
    displayName: "RowGroup",

    render: function () {
        var self = this;
        var x = this.props.data.map(function (d) {
            return React.createElement(
                "td",
                null,
                d.diem_trung_binh
            );
        });
        return React.createElement(
            "tr",
            null,
            React.createElement(
                "td",
                null,
                this.props.name
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
var GRADE = {
    data: [[{ sinh_vien_id: 0, assignment_id: 0, grade: 0 }, { sinh_vien_id: 0, assignment_id: 1, grade: 1 }], [{ sinh_vien_id: 1, assignment_id: 0, grade: 0 }, { sinh_vien_id: 1, assignment_id: 1, grade: 1 }]] };

var Grade = React.createClass({
    displayName: "Grade",

    getInitialState: function () {
        return { names: [], data: [], group_names: [], group_data: [], active: -1, active2: -1 };
    },
    loadSubmissions: function () {
        $.ajax({
            url: "/teacher/lop/" + this.props.lop + "/submissions.json",
            success: (function (data) {
                this.setState({ names: data.names, group_names: data.group_names, data: data.results, group_data: data.group_results, active: -1 });
            }).bind(this)
        });
    },
    getStatus: function (d) {
        if (this.state.active === d.index) {
            return 1;
        } else {
            return 0;
        }
    },
    saveToServer: function (data, index) {
        var d = {
            assignment_id: data.assignment_id,
            sinh_vien_id: data.sinh_vien_id,
            grade: data.grade
        };
        $.ajax({
            url: "/teacher/lop/" + this.props.lop + "/submissions",
            type: 'POST',
            data: d,
            success: (function (data) {
                this.setState({ names: data.names, data: data.results, group_data: data.group_results, group_names: data.group_names, active: index });
                React.unmountAndReleaseReactRootNode(document.getElementById('assignment'));
                React.renderComponent(React.createElement(Assignments, { lop: this.props.lop }), document.getElementById('assignment'));
            }).bind(this)
        });
        return false;
    },
    handleEnter: function (data) {
        this.saveToServer(data, -1);
    },
    handleInput: function (obj) {
        this.setState({ active: obj });
    },
    handleBlur: function () {
        this.setState({ active: -1 });
    },
    handleKeyPress: function (data, stat) {
        if (stat == 'left') {
            this.saveToServer(data, data.index - 1);
        } else if (stat == 'up') {
            this.saveToServer(data, data.index - this.state.names.length);
        } else if (stat == 'down') {
            this.saveToServer(data, data.index + this.state.names.length);
        } else if (stat == 'right') {
            this.saveToServer(data, data.index + 1);
        }
    },
    componentWillMount: function () {
        this.loadSubmissions();
    },
    render: function () {
        var self = this;
        var header_name = React.createElement(
            "th",
            null,
            "Họ và tên"
        );
        var header_dqt = React.createElement(
            "th",
            null,
            "Điểm quá trình"
        );
        var headers = this.state.names.map(function (d) {
            return React.createElement(
                "th",
                null,
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "strong",
                        null,
                        d.name
                    )
                ),
                React.createElement(
                    "ul",
                    null,
                    React.createElement(
                        "li",
                        null,
                        "- Thang điểm ",
                        d.points
                    ),
                    React.createElement(
                        "li",
                        null,
                        "- Nhóm ",
                        d.group_name,
                        ", ",
                        d.group_weight,
                        " %"
                    )
                )
            );
        });
        var group_headers = this.state.group_names.map(function (d) {
            return React.createElement(
                "th",
                null,
                d.name,
                " - ",
                d.weight
            );
        });
        var y = this.state.data.map(function (d) {
            d.assignments.map(function (d2) {
                d2.edit = self.getStatus(d2);
                return d2;
            });
            return d;
        });
        var x = y.map(function (d) {
            return React.createElement(Row, { key: 'row' + d.id, name: d.name, handleKeyPress: self.handleKeyPress, handleEnter: self.handleEnter, handleInput: self.handleInput, handleBlur: self.handleBlur, data: d.assignments });
        });
        var z = this.state.group_data.map(function (d) {
            return React.createElement(RowGroup, { key: 'rowgroup' + d.id, name: d.name, diem_qua_trinh: d.diem_qua_trinh, data: d.assignment_groups });
        });

        return React.createElement(
            "div",
            { "class": "panel-group", id: "accordion-grade" },
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
                            { "data-toggle": "collapse", "data-parent": "#accordion-grade", href: "#collapseOne-grade" },
                            "Điểm chi tiết"
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { id: "collapseOne-grade", "class": "panel-collapse collapse in" },
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
                                    null,
                                    React.createElement(
                                        "tr",
                                        null,
                                        header_name,
                                        headers
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
                            { "data-toggle": "collapse", "data-parent": "#accordion-grade", href: "#collapseTwo-grade" },
                            "Điểm tổng hợp"
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { id: "collapseTwo-grade", "class": "panel-collapse collapse" },
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
                                    null,
                                    React.createElement(
                                        "tr",
                                        null,
                                        React.createElement(
                                            "th",
                                            null,
                                            "Họ và tên"
                                        ),
                                        group_headers,
                                        React.createElement(
                                            "th",
                                            null,
                                            "Điểm quá trình"
                                        )
                                    )
                                ),
                                React.createElement(
                                    "tbody",
                                    null,
                                    z
                                )
                            )
                        )
                    )
                )
            )
        );
    }
});