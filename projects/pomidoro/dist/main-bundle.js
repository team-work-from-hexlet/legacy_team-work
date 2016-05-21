/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Pomodoro = __webpack_require__(1);

	var _Pomodoro2 = _interopRequireDefault(_Pomodoro);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var pomodoro = new _Pomodoro2.default();
	pomodoro.addTimer({ title: 'lala', duration: 10000 });

	var test = document.getElementById('test');
	test.innerHTML = 'test';
	test.innerHTML = pomodoro.prepareHTML();
	pomodoro.startAllTimers();
	setInterval(function () {
	  return test.innerHTML = pomodoro.prepareHTML();
	}, 1000);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Timer = __webpack_require__(2);

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
	    key: 'startAllTimers',
	    value: function startAllTimers() {
	      this[_timers].forEach(function (timer) {
	        return timer.start();
	      });
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
	      html += this[_timers][0].getRemainingTime();
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

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var STATES = {
	  paused: Symbol('paused'),
	  running: Symbol('running'),
	  runningWork: Symbol('runningWork'),
	  runningBreak: Symbol('runningBreak')
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
	    key: 'counter',
	    value: function counter(time) {
	      // if(0 || state.pause) complete();
	      this[_startTime] = new Date();
	      (function tick() {
	        var _this = this;

	        this[_intervalId] = setTimeout(function () {
	          _this[_remainingTime] = time - (new Date() - _this[_startTime]);
	          if (_this[_remainingTime] <= 0) {
	            _this.changeState();
	            return;
	          }
	          tick();
	        }, 1000);
	      })();
	    }

	    // while(true) {
	    // if 0 -> alert, reset counter, start break time
	    // if 0 -> alert, reset break, start counter time
	    // }

	  }, {
	    key: 'changeState',
	    value: function changeState() {
	      // state -> next state
	      // if (work) -> break
	      // if (break) -> work
	      // if(pause) -> pause & set nextState
	      // alert(state ... over)
	      // set next state
	      // count() (nextState) // if pause -> continue
	    }
	  }, {
	    key: 'start',
	    value: function start() {
	      var _this2 = this;

	      this[_state] = STATES.running;

	      clearInterval(this[_intervalId]);
	      //ориентироваться на системное время из-за неточности таймеров
	      this[_startTime] = new Date();

	      //todo: воткнуть counter
	      this[_intervalId] = setInterval(function () {
	        _this2[_remainingTime] = (_this2[_pauseTime] ? _this2[_pauseTime] : _this2.duration) - (new Date() - _this2[_startTime]);
	      }, 1000);
	    }

	    // may be
	    // get pauseTime () {
	    // return this[_pauseTime];
	    // }
	    // ??

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

	    // m.b. toJSON() or toString()?

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

/***/ }
/******/ ]);