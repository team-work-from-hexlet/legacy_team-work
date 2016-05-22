import Pomodoro from './Pomodoro';
const pomodoro = new Pomodoro();
// pomodoro.load();
pomodoro.addTimer({title: 'test timer 1000 sec', duration: 1000000});

var test = document.getElementById('test');
pomodoro.startAllTimers();
setInterval(() => {
    test.innerHTML = pomodoro.prepareHTML();
    // pomodoro.save();
}
, 1000);