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
	// pomodoro.load();
	pomodoro.addTimer({ title: 'test timer 1000 sec', duration: 1000000 });

	var test = document.getElementById('test');
	pomodoro.startAllTimers();
	setInterval(function () {
	    test.innerHTML = pomodoro.prepareHTML();
	    // pomodoro.save();
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
	      html += ": ";
	      html += Math.round(this[_timers][0].getRemainingTime() / 1000);
	      html += " sec";
	      html += '</div>';

	      return html;
	    }
	  }, {
	    key: 'buildHtml',
	    value: function buildHtml() {}
	  }, {
	    key: 'save',
	    value: function save() {
	      window.localStorage.setItem('pomodoro-timers', JSON.stringify(this[_timers]));
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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _events = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

	var Timer = function (_EventEmitter) {
	  _inherits(Timer, _EventEmitter);

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

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Timer).call(this));

	    _this.title = title;
	    _this.duration = duration;
	    _this[_state] = STATES.paused;
	    _this[_remainingTime] = duration;
	    _this[_startTime] = new Date();
	    return _this;
	  }

	  _createClass(Timer, [{
	    key: 'getState',
	    value: function getState() {
	      return this[_state];
	    }
	  }, {
	    key: 'getRemainingTime',
	    value: function getRemainingTime() {
	      this.recalcRemainingTime();
	      return this[_remainingTime];
	    }
	  }, {
	    key: 'recalcRemainingTime',
	    value: function recalcRemainingTime() {
	      this[_remainingTime] -= new Date() - this[_startTime];

	      if (this[_remainingTime] <= 0) {
	        this.emit('done');
	        this.reset();
	        this.pause();
	        return;
	      }

	      this[_startTime] = new Date();
	    }
	  }, {
	    key: 'start',
	    value: function start() {
	      var _this2 = this;

	      this[_state] = STATES.running;

	      clearInterval(this[_intervalId]);
	      //ориентироваться на системное время из-за неточности таймеров
	      this[_startTime] = new Date();
	      this[_intervalId] = setInterval(function () {
	        _this2.recalcRemainingTime();
	        _this2[_startTime] = new Date();
	      }, 1000);
	    }
	  }, {
	    key: 'pause',
	    value: function pause() {
	      this[_state] = STATES.paused;
	      this.recalcRemainingTime();
	      clearInterval(this[_intervalId]);
	    }
	  }, {
	    key: 'reset',
	    value: function reset() {
	      this[_startTime] = new Date();
	      this[_remainingTime] = this.duration;
	    }

	    // m.b. toJSON() or toString()?

	  }, {
	    key: 'exportToJSON',
	    value: function exportToJSON() {
	      this.recalcRemainingTime();
	      return JSON.stringify({
	        title: this.title,
	        duration: this.duration,
	        remainingTime: this[_remainingTime]
	      });
	    }
	  }]);

	  return Timer;
	}(_events.EventEmitter);

	;

	exports.default = Timer;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function (n) {
	  if (!isNumber(n) || n < 0 || isNaN(n)) throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	EventEmitter.prototype.emit = function (type) {
	  var er, handler, len, args, i, listeners;

	  if (!this._events) this._events = {};

	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error || isObject(this._events.error) && !this._events.error.length) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      }
	      throw TypeError('Uncaught, unspecified "error" event.');
	    }
	  }

	  handler = this._events[type];

	  if (isUndefined(handler)) return false;

	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++) {
	      listeners[i].apply(this, args);
	    }
	  }

	  return true;
	};

	EventEmitter.prototype.addListener = function (type, listener) {
	  var m;

	  if (!isFunction(listener)) throw TypeError('listener must be a function');

	  if (!this._events) this._events = {};

	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener) this.emit('newListener', type, isFunction(listener.listener) ? listener.listener : listener);

	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];

	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }

	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' + 'leak detected. %d listeners added. ' + 'Use emitter.setMaxListeners() to increase limit.', this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }

	  return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function (type, listener) {
	  if (!isFunction(listener)) throw TypeError('listener must be a function');

	  var fired = false;

	  function g() {
	    this.removeListener(type, g);

	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }

	  g.listener = listener;
	  this.on(type, g);

	  return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function (type, listener) {
	  var list, position, length, i;

	  if (!isFunction(listener)) throw TypeError('listener must be a function');

	  if (!this._events || !this._events[type]) return this;

	  list = this._events[type];
	  length = list.length;
	  position = -1;

	  if (list === listener || isFunction(list.listener) && list.listener === listener) {
	    delete this._events[type];
	    if (this._events.removeListener) this.emit('removeListener', type, listener);
	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener || list[i].listener && list[i].listener === listener) {
	        position = i;
	        break;
	      }
	    }

	    if (position < 0) return this;

	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }

	    if (this._events.removeListener) this.emit('removeListener', type, listener);
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function (type) {
	  var key, listeners;

	  if (!this._events) return this;

	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0) this._events = {};else if (this._events[type]) delete this._events[type];
	    return this;
	  }

	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }

	  listeners = this._events[type];

	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    while (listeners.length) {
	      this.removeListener(type, listeners[listeners.length - 1]);
	    }
	  }
	  delete this._events[type];

	  return this;
	};

	EventEmitter.prototype.listeners = function (type) {
	  var ret;
	  if (!this._events || !this._events[type]) ret = [];else if (isFunction(this._events[type])) ret = [this._events[type]];else ret = this._events[type].slice();
	  return ret;
	};

	EventEmitter.prototype.listenerCount = function (type) {
	  if (this._events) {
	    var evlistener = this._events[type];

	    if (isFunction(evlistener)) return 1;else if (evlistener) return evlistener.length;
	  }
	  return 0;
	};

	EventEmitter.listenerCount = function (emitter, type) {
	  return emitter.listenerCount(type);
	};

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isNumber(arg) {
	  return typeof arg === 'number';
	}

	function isObject(arg) {
	  return (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object' && arg !== null;
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}

/***/ }
/******/ ]);