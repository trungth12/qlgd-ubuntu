- /**
  - * @jsx React.DOM
  - */
"use strict";

var React = require("react");

var ThanhTra = React.createClass({
  displayName: "ThanhTra",

  getInitialState: function () {
    return { data: [], date: '' };
  },
  componentDidMount: function () {
    $('.input-append.date').datepicker({
      format: "dd/mm/yyyy",
      startDate: "13/1/2014",
      todayBtn: "linked",
      language: "vi",
      autoClose: true,
      todayHighlight: true
    });
  },
  handleDate: function () {
    var date = this.refs.thoi_gian.getDOMNode().value;
    $('.input-append.date').datepicker('hide');
    this.setState({ date: date });
    $.ajax({
      url: '/thanhtra/lich_trinh_giang_days',
      type: 'POST',
      data: { date: date },
      success: (function (data) {
        this.setState({ data: data });
      }).bind(this)
    });
  },
  componentDidUpdate: function () {
    $('.input-append.date').datepicker({
      format: "dd/mm/yyyy",
      startDate: "13/1/2014",
      todayBtn: "linked",
      language: "vi",
      autoClose: true,
      todayHighlight: true
    });
    this.refs.thoi_gian.getDOMNode().value = this.state.date;
  },
  handleDiMuon: function (d) {
    $.ajax({
      url: '/thanhtra/lich_trinh_giang_days/dimuon',
      type: 'POST',
      data: d,
      success: (function (data) {
        this.setState({ data: data });
      }).bind(this)
    });
  },
  handleBoTiet: function (d) {
    $.ajax({
      url: '/thanhtra/lich_trinh_giang_days/botiet',
      type: 'POST',
      data: d,
      success: (function (data) {
        this.setState({ data: data });
      }).bind(this)
    });
  },
  handleVeSom: function (d) {
    $.ajax({
      url: '/thanhtra/lich_trinh_giang_days/vesom',
      type: 'POST',
      data: d,
      success: (function (data) {
        this.setState({ data: data });
      }).bind(this)
    });
  },
  handleReport: function (d) {
    $.ajax({
      url: '/thanhtra/lich_trinh_giang_days/report',
      type: 'POST',
      data: d,
      success: (function (data) {
        this.setState({ data: data });
      }).bind(this)
    });
  },
  handleUnReport: function (d) {
    $.ajax({
      url: '/thanhtra/lich_trinh_giang_days/unreport',
      type: 'POST',
      data: d,
      success: (function (data) {
        this.setState({ data: data });
      }).bind(this)
    });
  },
  handleRemove: function (d) {
    $.ajax({
      url: '/thanhtra/lich_trinh_giang_days/remove',
      type: 'POST',
      data: d,
      success: (function (data) {
        this.setState({ data: data });
      }).bind(this)
    });
  },
  handleRestore: function (d) {
    $.ajax({
      url: '/thanhtra/lich_trinh_giang_days/restore',
      type: 'POST',
      data: d,
      success: (function (data) {
        this.setState({ data: data });
      }).bind(this)
    });
  },
  handleConfirm: function (d) {
    $.ajax({
      url: '/thanhtra/lich_trinh_giang_days/confirm',
      type: 'POST',
      data: d,
      success: (function (data) {
        this.setState({ data: data });
      }).bind(this)
    });
  },
  handleUpdate: function (d) {
    $.ajax({
      url: '/thanhtra/lich_trinh_giang_days/update',
      type: 'POST',
      data: d,
      success: (function (data) {
        this.setState({ data: data });
      }).bind(this)
    });
  },
  render: function () {
    var self = this;
    var x = this.state.data.map(function (d, index) {
      return React.createElement(ThanhTraRow, { date: self.state.date, onReport: self.handleReport, onUnReport: self.handleUnReport, onRemove: self.handleRemove, onConfirm: self.handleConfirm, onRestore: self.handleRestore, onUpdate: self.handleUpdate, onDiMuon: self.handleDiMuon, onVeSom: self.handleVeSom, onBoTiet: self.handleBoTiet, data: d, stt: index + 1, color: index % 2 === 0 ? 'danger' : 'warning' });
    });

    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { "class": "input-append date" },
        React.createElement("input", { ref: "thoi_gian", type: "text", "class": "span2" }),
        React.createElement(
          "span",
          { "class": "add-on" },
          React.createElement("i", { "class": "icon-th" })
        ),
        React.createElement(
          "button",
          { "class": "btn btn-sm btn-primary", onClick: this.handleDate },
          "Chọn ngày"
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
            "colgroup",
            null,
            React.createElement("col", { style: { width: "5%" } }),
            React.createElement("col", { style: { width: "30%" } }),
            React.createElement("col", { style: { width: "10%" } }),
            React.createElement("col", { style: { width: "15%" } }),
            React.createElement("col", { style: { width: "15%" } }),
            React.createElement("col", { style: { width: "15%" } }),
            React.createElement("col", { style: { width: "10%" } })
          ),
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
                "Giờ học"
              ),
              React.createElement(
                "td",
                null,
                "Báo lỗi"
              ),
              React.createElement(
                "td",
                null,
                "Note 1"
              ),
              React.createElement(
                "td",
                null,
                "Note 2"
              ),
              React.createElement(
                "td",
                null,
                "Note 3"
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
      )
    );
  }
});

var ThanhTraRow = React.createClass({
  displayName: "ThanhTraRow",

  getInitialState: function () {
    return { edit: 0 };
  },
  onDiMuon: function () {
    this.props.onDiMuon({ lich_id: this.props.data.id, date: this.props.date });
  },
  onVeSom: function () {
    this.props.onVeSom({ lich_id: this.props.data.id, date: this.props.date });
  },
  onBoTiet: function () {
    this.props.onBoTiet({ lich_id: this.props.data.id, date: this.props.date });
  },
  onEdit: function () {
    this.setState({ edit: 1 });
  },
  onCancel: function () {
    this.setState({ edit: 0 });
  },
  onUpdate: function () {
    this.setState({ edit: 0 });
    var note1 = this.refs.note1.getDOMNode().value;
    var note3 = this.refs.note3.getDOMNode().value;
    this.props.onUpdate({ lich_id: this.props.data.id, note1: note1, note3: note3, date: this.props.date });
  },
  onReport: function () {
    this.props.onReport({ lich_id: this.props.data.id, date: this.props.date });
  },
  onUnReport: function () {
    this.props.onUnReport({ lich_id: this.props.data.id, date: this.props.date });
  },
  onRemove: function () {
    this.props.onRemove({ lich_id: this.props.data.id, date: this.props.date });
  },
  onConfirm: function () {
    this.props.onConfirm({ lich_id: this.props.data.id, date: this.props.date });
  },
  onRestore: function () {
    this.props.onRestore({ lich_id: this.props.data.id, date: this.props.date });
  },
  componentDidUpdate: function () {
    if (this.state.edit === 1) {
      this.refs.note1.getDOMNode().value = this.props.data.note1;
      this.refs.note3.getDOMNode().value = this.props.data.note3;
    }
  },
  render: function () {
    if (this.state.edit === 0) {
      return React.createElement(
        "tr",
        { "class": this.props.color },
        React.createElement(
          "td",
          null,
          this.props.stt
        ),
        React.createElement(
          "td",
          null,
          React.createElement("span", { dangerouslySetInnerHTML: { __html: this.props.data.info } })
        ),
        React.createElement(
          "td",
          null,
          React.createElement(
            "button",
            { onClick: this.onDiMuon, "class": this.props.data.di_muon_color },
            this.props.data.di_muon_alias
          ),
          React.createElement("br", null),
          React.createElement("br", null),
          React.createElement(
            "button",
            { onClick: this.onVeSom, "class": this.props.data.ve_som_color },
            this.props.data.ve_som_alias
          ),
          React.createElement("br", null),
          React.createElement("br", null),
          React.createElement(
            "button",
            { onClick: this.onBoTiet, "class": this.props.data.bo_tiet_color },
            this.props.data.bo_tiet_alias
          )
        ),
        React.createElement(
          "td",
          null,
          React.createElement("span", { dangerouslySetInnerHTML: { __html: this.props.data.note1_html } })
        ),
        React.createElement(
          "td",
          null,
          React.createElement("span", { dangerouslySetInnerHTML: { __html: this.props.data.note2_html } })
        ),
        React.createElement(
          "td",
          null,
          React.createElement("span", { dangerouslySetInnerHTML: { __html: this.props.data.note3_html } })
        ),
        React.createElement(
          "td",
          null,
          React.createElement(
            "button",
            { style: { display: this.props.data.can_thanh_tra_edit === true ? '' : 'none' }, onClick: this.onEdit, "class": "btn btn-sm btn-success" },
            "Edit"
          ),
          React.createElement(
            "button",
            { style: { display: this.props.data.can_report === true ? '' : 'none' }, onClick: this.onReport, "class": "btn btn-sm btn-danger" },
            "Report"
          ),
          React.createElement(
            "button",
            { style: { display: this.props.data.can_unreport === true ? '' : 'none' }, onClick: this.onUnReport, "class": "btn btn-sm btn-danger" },
            "UnReport"
          ),
          React.createElement(
            "button",
            { style: { display: this.props.data.can_remove === true ? '' : 'none' }, onClick: this.onRemove, "class": "btn btn-sm btn-warning" },
            "Remove"
          ),
          React.createElement(
            "button",
            { style: { display: this.props.data.can_restore === true ? '' : 'none' }, onClick: this.onRestore, "class": "btn btn-sm btn-warning" },
            "Restore"
          ),
          React.createElement(
            "button",
            { style: { display: this.props.data.can_confirm === true ? '' : 'none' }, onClick: this.onConfirm, "class": "btn btn-sm btn-primary" },
            "Confirm"
          )
        )
      );
    } else {
      return React.createElement(
        "tr",
        { "class": this.props.color },
        React.createElement(
          "td",
          null,
          this.props.stt
        ),
        React.createElement(
          "td",
          null,
          React.createElement("span", { dangerouslySetInnerHTML: { __html: this.props.data.info } })
        ),
        React.createElement(
          "td",
          null,
          React.createElement(
            "button",
            { onClick: this.onDiMuon, "class": this.props.data.di_muon_color },
            this.props.data.di_muon_alias
          ),
          React.createElement("br", null),
          React.createElement("br", null),
          React.createElement(
            "button",
            { onClick: this.onVeSom, "class": this.props.data.ve_som_color },
            this.props.data.ve_som_alias
          ),
          React.createElement("br", null),
          React.createElement("br", null),
          React.createElement(
            "button",
            { onClick: this.onBoTiet, "class": this.props.data.bo_tiet_color },
            this.props.data.bo_tiet_alias
          )
        ),
        React.createElement(
          "td",
          null,
          React.createElement("textarea", { ref: "note1", style: { width: "100%", height: "200px" } })
        ),
        React.createElement(
          "td",
          null,
          this.props.data.note2
        ),
        React.createElement(
          "td",
          null,
          React.createElement("textarea", { ref: "note3", style: { width: "100%", height: "200px" } })
        ),
        React.createElement(
          "td",
          null,
          React.createElement(
            "button",
            { onClick: this.onCancel, "class": "btn btn-sm btn-default" },
            "Hủy"
          ),
          React.createElement(
            "button",
            { onClick: this.onUpdate, "class": "btn btn-sm btn-success" },
            "Cập nhật"
          ),
          React.createElement(
            "button",
            { style: { display: this.props.data.can_report === true ? '' : 'none' }, onClick: this.onReport, "class": "btn btn-sm btn-danger" },
            "Report"
          ),
          React.createElement(
            "button",
            { style: { display: this.props.data.can_unreport === true ? '' : 'none' }, onClick: this.onUnReport, "class": "btn btn-sm btn-danger" },
            "UnReport"
          ),
          React.createElement(
            "button",
            { style: { display: this.props.data.can_remove === true ? '' : 'none' }, onClick: this.onRemove, "class": "btn btn-sm btn-warning" },
            "Remove"
          ),
          React.createElement(
            "button",
            { style: { display: this.props.data.can_restore === true ? '' : 'none' }, onClick: this.onRestore, "class": "btn btn-sm btn-warning" },
            "Restore"
          ),
          React.createElement(
            "button",
            { style: { display: this.props.data.can_confirm === true ? '' : 'none' }, onClick: this.onConfirm, "class": "btn btn-sm btn-primary" },
            "Confirm"
          )
        )
      );
    }
  }
});