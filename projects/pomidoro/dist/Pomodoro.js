'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Timer = require('./Timer');

var _Timer2 = _interopRequireDefault(_Timer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//private props
var _timers = Symbol('timers');
var _domElems = Symbol('domElems');

var Pomodoro = function () {
  function Pomodoro() {
    _classCallCheck(this, Pomodoro);

    this[_timers] = [];
    this[_domElems] = {};
  }

  _createClass(Pomodoro, [{
    key: 'init',
    value: function init() {
      this[_domElems].create = document.getElementById('createTimer');
      this[_domElems].timers = document.getElementById('timers');

      // this.addListeners(true);
      return this;
    }
  }, {
    key: 'setTimers',
    value: function setTimers(timersData) {
      this[_timers] = timersData.map(function (data) {
        return new _Timer2.default(data.title, data.duration);
      });
      return this;
    }
  }, {
    key: 'getTimers',
    value: function getTimers() {
      return this[_timers].map(function (timer) {
        return _extends({}, timer);
      });
    }
  }, {
    key: 'addTimer',
    value: function addTimer(timerInfo) {
      var timer = new _Timer2.default(timerInfo.title, timerInfo.duration);
      this[_timers].push(timer);
      return this;
    }
  }, {
    key: 'removeTimer',
    value: function removeTimer(timerId) {
      this[_timers].splice(timerId, 1);
      return this;
    }
  }, {
    key: 'getTimerById',
    value: function getTimerById(timerId) {
      return _extends({}, this[_timers][timerId]);
    }
  }, {
    key: 'addListeners',
    value: function addListeners(early) {
      if (early) {
        this.domElms.create.addEventListener(function (event) {});
      } else {}
    }
  }, {
    key: 'prepareHTML',
    value: function prepareHTML() {
      var html = '';
      html += '<div>';
      html += this[_timers][0].title;
      html += " - ";
      html += this[_timers][0].getRemainingTime;
      html += '</div>';

      return html;
    }
  }, {
    key: 'buildHtml',
    value: function buildHtml() {}
  }, {
    key: 'save',
    value: function save() {
      window.localStorage.setItem('pomodoro-timers', JSON.stringify(this.timers));
    }
  }, {
    key: 'load',
    value: function load() {
      return JSON.parse(window.localStorage.getItem('pomodoro-timers')) || [];
    }
  }]);

  return Pomodoro;
}();

;

exports.default = Pomodoro;