- /**
  - * @jsx React.DOM
  - */
"use strict";

var React = require("react");

var ldata = [{ id: 1, tuan: 1, thoi_gian: '6h30 12/08/2013', giang_vien: 'gv1', phong: 'phong', so_tiet: 3, alias_state: 'Nghỉ dạy', type_status: 'Lý thuyết', note: 'om' }, { id: 2, tuan: 1, thoi_gian: '6h30 12/08/2013', giang_vien: 'gv1', phong: 'phong', so_tiet: 3, alias_state: 'Bổ sung', type_status: 'Lý thuyết', note: '' }];

var DuyetDangKy = React.createClass({
  displayName: "DuyetDangKy",

  getInitialState: function () {
    return { data: [], active: -1 };
  },
  loadData: function () {
    //this.setState({data: ldata});
    $.ajax({
      url: '/daotao/lich_trinh_giang_days',
      success: (function (data) {
        this.setState({ data: data, active: -1 });
        React.renderComponent(React.createElement(LichDaDuyet, null), document.getElementById('lichdaduyet'));
      }).bind(this)
    });
  },
  componentWillMount: function () {
    this.loadData();
  },
  handleAccept: function (d) {
    $.ajax({
      url: "/daotao/lich_trinh_giang_days/accept",
      type: 'POST',
      data: d,
      success: (function (data) {
        this.setState({ data: data });
        React.unmountAndReleaseReactRootNode(document.getElementById('lichdaduyet'));
        React.renderComponent(React.createElement(LichDaDuyet, null), document.getElementById('lichdaduyet'));
      }).bind(this)
    });
  },
  handleDrop: function (d) {
    $.ajax({
      url: "/daotao/lich_trinh_giang_days/drop",
      type: 'POST',
      data: d,
      success: (function (data) {
        this.setState({ data: data });
        React.unmountAndReleaseReactRootNode(document.getElementById('lichdaduyet'));
        React.renderComponent(React.createElement(LichDaDuyet, null), document.getElementById('lichdaduyet'));
      }).bind(this)
    });
  },
  handleCheck: function (d) {
    this.setState({ active: d.id });
    React.unmountAndReleaseReactRootNode(document.getElementById('lichtrung'));
    React.renderComponent(React.createElement(LichTrung, { id: d.id }), document.getElementById('lichtrung'));
  },
  render: function () {
    var self = this;
    var x = this.state.data.map(function (d, index) {
      return React.createElement(LichDuyet, { key: d.id, active: self.state.active, onCheck: self.handleCheck, onAccept: self.handleAccept, onDrop: self.handleDrop, color: index % 2 === 0 ? 'warning' : 'danger', data: d });
    });
    return React.createElement(
      "div",
      null,
      React.createElement("div", { id: "lichtrung" }),
      React.createElement(
        "div",
        { "class": "table-responsive" },
        React.createElement(
          "h4",
          null,
          "Danh sách lịch đăng ký"
        ),
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
                "Thông tin"
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
                "Lí do"
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
      ),
      React.createElement("div", { id: "lichdaduyet" })
    );
  }
});

var LichDuyet = React.createClass({
  displayName: "LichDuyet",

  onAccept: function () {
    if (this.props.data.alias_state === 'Bổ sung') {
      var phong = this.refs.phong.getDOMNode().value;
      this.props.onAccept({ id: this.props.data.id, phong: phong });
    } else {
      this.props.onAccept(this.props.data);
    }
  },
  onDrop: function () {
    this.props.onDrop(this.props.data);
  },
  onCheck: function () {
    this.props.onCheck(this.props.data);
  },
  componentDidMount: function () {
    if (this.props.data.alias_state === 'Bổ sung') {
      this.refs.phong.getDOMNode().value = this.props.data.phong;
    }
  },
  render: function () {
    return React.createElement(
      "tr",
      { "class": this.props.active === this.props.data.id ? 'default' : this.props.color },
      React.createElement(
        "td",
        null,
        this.props.data.tuan
      ),
      React.createElement(
        "td",
        null,
        this.props.data.thoi_gian
      ),
      React.createElement(
        "td",
        null,
        this.props.data.giang_vien,
        React.createElement("br", null),
        this.props.data.ma_lop,
        React.createElement("br", null),
        this.props.data.ten_mon_hoc
      ),
      React.createElement(
        "td",
        null,
        this.props.data.alias_state === 'Bổ sung' ? React.createElement("input", { type: "text", ref: "phong" }) : this.props.data.phong
      ),
      React.createElement(
        "td",
        null,
        this.props.data.so_tiet
      ),
      React.createElement(
        "td",
        null,
        this.props.data.alias_state
      ),
      React.createElement(
        "td",
        null,
        this.props.data.type_status
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
          { "class": "btn btn-sm btn-danger", onClick: this.onDrop },
          "Không chấp nhận"
        ),
        React.createElement(
          "button",
          { "class": "btn btn-sm btn-primary", onClick: this.onAccept },
          "Chấp nhận"
        ),
        React.createElement(
          "button",
          { style: { display: this.props.data.alias_state === 'Bổ sung' ? '' : 'none' }, "class": "btn btn-sm btn-warning", onClick: this.onCheck },
          "Kiểm tra"
        )
      )
    );
  }
});

var LichTrung = React.createClass({
  displayName: "LichTrung",

  getInitialState: function () {
    return { data: [], sinh_vien: [], loading: false };
  },
  componentWillMount: function () {
    this.loadData();
  },
  loadData: function () {
    this.setState({ loading: true });
    $.ajax({
      url: '/daotao/lich_trinh_giang_days/check',
      data: { id: this.props.id },
      type: 'POST',
      success: (function (data) {
        this.setState({ data: data.lich, sinh_vien: data.sinh_vien, loading: false });
      }).bind(this)
    });
  },
  componentDidUpdate: function () {
    if (this.state.loading === true) {
      var opts = {
        lines: 15, // The number of lines to draw
        length: 40, // The length of each line
        width: 10, // The line thickness
        radius: 22, // The radius of the inner circle
        corners: 1, // Corner roundness (0..1)
        rotate: 38, // The rotation offset
        direction: 1, // 1: clockwise, -1: counterclockwise
        color: '#000', // #rgb or #rrggbb or array of colors
        speed: 1.7, // Rounds per second
        trail: 81, // Afterglow percentage
        shadow: true, // Whether to render a shadow
        hwaccel: true, // Whether to use hardware acceleration
        className: 'spinner', // The CSS class to assign to the spinner
        zIndex: 2e9, // The z-index (defaults to 2000000000)
        top: 'auto', // Top position relative to parent in px
        left: 'auto' // Left position relative to parent in px
      };
      var target = document.getElementById('foo');
      var spinner = new Spinner(opts).spin(target);
      $(target).data('spinner', spinner);
    } else {
      var target = document.getElementById('foo');
      var spinner = new Spinner(opts).stop(target);
      $('#foo').data('spinner').stop();
    }
  },
  componentDidMount: function () {
    if (this.state.loading === true) {
      var opts = {
        lines: 15, // The number of lines to draw
        length: 40, // The length of each line
        width: 10, // The line thickness
        radius: 22, // The radius of the inner circle
        corners: 1, // Corner roundness (0..1)
        rotate: 38, // The rotation offset
        direction: 1, // 1: clockwise, -1: counterclockwise
        color: '#000', // #rgb or #rrggbb or array of colors
        speed: 1.7, // Rounds per second
        trail: 81, // Afterglow percentage
        shadow: true, // Whether to render a shadow
        hwaccel: true, // Whether to use hardware acceleration
        className: 'spinner', // The CSS class to assign to the spinner
        zIndex: 2e9, // The z-index (defaults to 2000000000)
        top: 'auto', // Top position relative to parent in px
        left: 'auto' // Left position relative to parent in px
      };
      var target = document.getElementById('foo');
      var spinner = new Spinner(opts).spin(target);
      $(target).data('spinner', spinner);
    } else {
      //var target = document.getElementById('foo');
      //var spinner = new Spinner(opts).stop(target);			
      $('#foo').data('spinner').stop();
    }
  },
  render: function () {
    var self = this;
    var x = this.state.data.map(function (d, index) {
      return React.createElement(
        "tr",
        { "class": index % 2 === 0 ? 'warning' : 'danger' },
        React.createElement(
          "td",
          null,
          d.tuan
        ),
        React.createElement(
          "td",
          null,
          d.thoi_gian
        ),
        React.createElement(
          "td",
          null,
          d.giang_vien
        ),
        React.createElement(
          "td",
          null,
          d.phong
        ),
        React.createElement(
          "td",
          null,
          d.so_tiet
        ),
        React.createElement(
          "td",
          null,
          d.alias_state
        ),
        React.createElement(
          "td",
          null,
          d.type_status
        )
      );
    });
    var sv = this.state.sinh_vien.map(function (d, index) {
      return React.createElement(
        "tr",
        { "class": index % 2 === 0 ? 'warning' : 'danger' },
        React.createElement(
          "td",
          null,
          index + 1
        ),
        React.createElement(
          "td",
          null,
          d.code
        ),
        React.createElement(
          "td",
          null,
          d.hovaten
        ),
        React.createElement(
          "td",
          null,
          d.ma_lop_hanh_chinh
        )
      );
    });

    return React.createElement(
      "div",
      null,
      React.createElement("div", { id: "foo" }),
      React.createElement(
        "div",
        { "class": "table-responsive" },
        React.createElement(
          "h4",
          null,
          "Danh sách lịch trùng"
        ),
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
                "Giảng viên"
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
              )
            )
          ),
          React.createElement(
            "tbody",
            null,
            x
          )
        )
      ),
      React.createElement(
        "div",
        { "class": "table-responsive" },
        React.createElement(
          "h4",
          null,
          "Danh sách sinh viên trùng"
        ),
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
                "Mã lớp hành chính"
              )
            )
          ),
          React.createElement(
            "tbody",
            null,
            sv
          )
        )
      )
    );
  }
});

var LichDaDuyet = React.createClass({
  displayName: "LichDaDuyet",

  getInitialState: function () {
    return { data: [] };
  },
  componentWillMount: function () {
    this.loadData();
  },
  loadData: function () {
    $.ajax({
      url: '/daotao/lich_trinh_giang_days/daduyet',
      success: (function (data) {
        this.setState({ data: data });
      }).bind(this)
    });
  },
  render: function () {
    var self = this;
    var x = this.state.data.map(function (d, index) {
      return React.createElement(
        "tr",
        { "class": index % 2 === 0 ? 'warning' : 'danger' },
        React.createElement(
          "td",
          null,
          d.tuan
        ),
        React.createElement(
          "td",
          null,
          d.thoi_gian
        ),
        React.createElement(
          "td",
          null,
          d.giang_vien
        ),
        React.createElement(
          "td",
          null,
          d.phong
        ),
        React.createElement(
          "td",
          null,
          d.so_tiet
        ),
        React.createElement(
          "td",
          null,
          d.alias_state
        ),
        React.createElement(
          "td",
          null,
          d.type_status
        ),
        React.createElement(
          "td",
          null,
          d.alias_status
        ),
        React.createElement(
          "td",
          null,
          d.updated_alias
        )
      );
    });
    return React.createElement(
      "div",
      { "class": "table-responsive" },
      React.createElement(
        "h4",
        null,
        "Danh sách lịch đã duyệt"
      ),
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
              "Giảng viên"
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
              "Ngày duyệt"
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