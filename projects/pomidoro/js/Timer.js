import {EventEmitter} from 'events';

const STATES = {
    paused: Symbol('paused'),
    running: Symbol('running'),
    runningWork: Symbol('runningWork'),
    runningBreak: Symbol('runningBreak'),
};
Object.freeze(STATES);

//private props
const _state = Symbol('state');
const _remainingTime = Symbol('remainingTime');
const _startTime = Symbol('startTime');
const _intervalId = Symbol('intervalId');


class Timer extends EventEmitter {
  
  static getStatesList() {
    return STATES;
  }
  
  static createFromJSON(jsonStr) {
    let dataObj = JSON.parse(jsonStr);
    let timer = new Timer(dataObj.title, dataObj.duration);
    timer[_remainingTime] = dataObj.remainingTime;
    return timer;
  }
  
  constructor(title='', duration=1500000) {
    super();
    this.title = title;
    this.duration = duration;
    this[_state] = STATES.paused;
    this[_remainingTime] = duration;
    this[_startTime] = new Date();
  }
  
  getState() {
    return this[_state];
  }
  
  getRemainingTime() {
    if (this[_state] != STATES.paused) {
      this.recalcRemainingTime();
    }
    return this[_remainingTime];
  }

  recalcRemainingTime() {
    this[_remainingTime] -= (new Date() - this[_startTime]);
    
    if (this[_remainingTime] <= 0) {
      this.emit('done');
      this.reset();
      this.pause();
      return;
    }
    
    this[_startTime] = new Date();
  }
  
  start() {
    this[_state] = STATES.running;
    
    clearInterval(this[_intervalId]);
    //ориентироваться на системное время из-за неточности таймеров
    this[_startTime] = new Date();
    this[_intervalId] = setInterval(() => {
      this.recalcRemainingTime();
      this[_startTime] = new Date();
    }, 1000);
  }
  
  pause() {
    this[_state] = STATES.paused;
    this.recalcRemainingTime();
    clearInterval(this[_intervalId]);
  }
  
  reset() {
    this[_startTime] = new Date();
    this[_remainingTime] = this.duration;
  }
  
  // m.b. toJSON() or toString()?
  exportToJSON() {
    this.recalcRemainingTime();
    return JSON.stringify({
      title: this.title,
      duration: this.duration,
      remainingTime: this[_remainingTime]
    });
  }
};

export default Timer;