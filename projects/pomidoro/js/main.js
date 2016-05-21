import Pomodoro from './Pomodoro';
const pomodoro = new Pomodoro();
pomodoro.addTimer({title: 'lala', duration: 10000});

var test = document.getElementById('test');
test.innerHTML = 'test';
test.innerHTML = pomodoro.prepareHTML();
pomodoro.startAllTimers();
setInterval(() => test.innerHTML = pomodoro.prepareHTML()
, 1000);