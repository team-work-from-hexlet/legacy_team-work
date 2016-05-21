'use strict';

var _Pomodoro = require('./Pomodoro');

var _Pomodoro2 = _interopRequireDefault(_Pomodoro);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pomodoro = new _Pomodoro2.default();
pomodoro.addTimer({ title: 'lala', duration: 100 });

var test = document.getElementById('test');
test.innerHTML = 'test';
test.innerHTML = pomodoro.prepareHTML();