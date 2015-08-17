'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _rcNotification = require('rc-notification');

var _rcNotification2 = _interopRequireDefault(_rcNotification);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var top = 24;
var notificationInstance = undefined;

function callback(key, btnCose) {
  if (btnCose) {
    btnCose(key);
  }
}

function getNotificationInstance() {
  notificationInstance = notificationInstance || _rcNotification2['default'].newInstance({
    prefixCls: 'ant-notification',
    style: {
      top: top,
      right: 0
    }
  });
  return notificationInstance;
}

function notice(args) {
  var duration = undefined;
  if (args.duration === undefined) {
    duration = 500;
  } else {
    duration = args.duration;
  }

  if (args.icon) {
    var prefixCls = ' ant-notification-notice-content-icon-';
    var iconClass = 'anticon anticon-';
    switch (args.icon) {
      case 'success':
        iconClass += 'check-circle-o';
        break;
      case 'info':
        iconClass += 'info-circle-o';
        break;
      case 'error':
        iconClass += 'exclamation-circle-o';
        break;
      case 'warn':
        iconClass += 'question-circle-o';
        break;
      default:
        iconClass += 'info-circle';
    }

    getNotificationInstance().notice({
      content: _react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement('i', { className: iconClass + prefixCls + 'icon-' + args.icon + prefixCls + 'icon' }),
        _react2['default'].createElement(
          'p',
          { className: prefixCls + 'message' },
          args.message
        ),
        _react2['default'].createElement(
          'p',
          { className: prefixCls + 'description' },
          args.description
        )
      ),
      duration: duration,
      closable: true,
      onClose: args.onClose,
      style: {}
    });
  } else {
    var prefixCls = 'ant-notification-notice-content-';
    if (!args.btn) {
      getNotificationInstance().notice({
        content: _react2['default'].createElement(
          'div',
          null,
          _react2['default'].createElement(
            'p',
            { className: prefixCls + 'message' },
            args.message
          ),
          _react2['default'].createElement(
            'p',
            { className: prefixCls + 'description' },
            args.description
          )
        ),
        duration: duration,
        closable: true,
        onClose: args.onClose,
        style: {}
      });
    } else {
      var key = 'manual' + new Date().getTime();
      getNotificationInstance().notice({
        content: _react2['default'].createElement(
          'div',
          null,
          _react2['default'].createElement(
            'p',
            { className: prefixCls + 'message' },
            args.message
          ),
          _react2['default'].createElement(
            'p',
            { className: prefixCls + 'description' },
            args.description
          ),
          _react2['default'].createElement(
            'span',
            { onClick: callback.bind(null, key, args.btnClose), className: prefixCls + 'btn' },
            args.btn
          )
        ),
        duration: duration,
        closable: true,
        onClose: args.onClose,
        key: key,
        style: {}
      });
    }
  }
}

var api = {
  open: function open(args) {
    notice(args);
  },
  close: function close(key) {
    if (notificationInstance) {
      notificationInstance.removeNotice(key);
    }
  },
  config: function config(options) {
    top = isNaN(options.top) ? 24 : options.top;
  }
};

['success', 'info', 'warn', 'error'].forEach(function (type) {
  api[type] = function (args) {
    var newArgs = (0, _objectAssign2['default'])({}, args, {
      icon: type
    });
    return api.open(newArgs);
  };
});

exports['default'] = api;
module.exports = exports['default'];