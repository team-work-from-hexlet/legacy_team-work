const STATES = {
    paused: Symbol('paused'),
    running: Symbol('running'),
};
Object.freeze(STATES);

//private props
const _state = Symbol('state');
const _remainingTime = Symbol('remainingTime');
const _startTime = Symbol('startTime');
const _intervalId = Symbol('intervalId');


const Timer = class {
  
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
    this.title = title;
    this.duration = duration;
    this[_state] = STATES.paused;
    this[_remainingTime] = duration;
  }
  
  getState() {
    return this[_state];
  }
  
  getRemainingTime() {
    return this[_remainingTime];
  }
  
  start() {
    this[_state] = STATES.running;
    
    clearInterval(this[_intervalId]);
    //ориентироваться на системное время из-за неточности таймеров
    this[_startTime] = new Date();
    this[_intervalId] = setInterval(() => {
        this[_remainingTime] = this.duration - (new Date() - this[_startTime]);
    }, 500);
  }
  
  pause() {
    this[_state] = STATES.paused;
    clearInterval(this[_intervalId]);
  }
  
  reset() {
    this[_startTime] = new Date();
    this[_remainingTime] = this.duration;
  }
  
  exportToJSON() {
    return JSON.stringify({
      title: this.title,
      duration: this.duration,
      remainingTime: this[_remainingTime]
    });
  }
};

export default Timer;