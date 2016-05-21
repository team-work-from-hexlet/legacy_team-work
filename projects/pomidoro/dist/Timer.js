'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var STATES = {
  paused: Symbol('paused'),
  running: Symbol('running')
};
Object.freeze(STATES);

//private props
var _state = Symbol('state');
var _remainingTime = Symbol('remainingTime');
var _startTime = Symbol('startTime');
var _intervalId = Symbol('intervalId');
var _pauseTime = Symbol('pauseTime');

var Timer = function () {
  _createClass(Timer, null, [{
    key: 'getStatesList',
    value: function getStatesList() {
      return STATES;
    }
  }, {
    key: 'createFromJSON',
    value: function createFromJSON(jsonStr) {
      var dataObj = JSON.parse(jsonStr);
      var timer = new Timer(dataObj.title, dataObj.duration);
      timer[_remainingTime] = dataObj.remainingTime;
      return timer;
    }
  }]);

  function Timer() {
    var title = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
    var duration = arguments.length <= 1 || arguments[1] === undefined ? 1500000 : arguments[1];

    _classCallCheck(this, Timer);

    this.title = title;
    this.duration = duration;
    this[_state] = STATES.paused;
    this[_remainingTime] = duration;
  }

  _createClass(Timer, [{
    key: 'getState',
    value: function getState() {
      return this[_state];
    }
  }, {
    key: 'getRemainingTime',
    value: function getRemainingTime() {
      return this[_remainingTime];
    }
  }, {
    key: 'start',
    value: function start() {
      var _this = this;

      this[_state] = STATES.running;

      clearInterval(this[_intervalId]);
      //ориентироваться на системное время из-за неточности таймеров
      this[_startTime] = new Date();

      this[_intervalId] = setInterval(function () {
        _this[_remainingTime] = (_this[_pauseTime] ? _this[_pauseTime] : _this.duration) - (new Date() - _this[_startTime]);
      }, 500);
    }
  }, {
    key: 'getPauseTime',
    value: function getPauseTime() {
      return this[_pauseTime];
    }
  }, {
    key: 'pause',
    value: function pause() {
      this[_state] = STATES.paused;
      this[_pauseTime] = this[_remainingTime];
      clearInterval(this[_intervalId]);
    }
  }, {
    key: 'reset',
    value: function reset() {
      this[_startTime] = new Date();
      this[_remainingTime] = this.duration;
      this[_pauseTime] = null;
    }
  }, {
    key: 'exportToJSON',
    value: function exportToJSON() {
      return JSON.stringify({
        title: this.title,
        duration: this.duration,
        remainingTime: this[_remainingTime]
      });
    }
  }]);

  return Timer;
}();

exports.default = Timer;