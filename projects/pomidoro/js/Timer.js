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
const _pauseTime = Symbol('pauseTime');


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
  
  counter(time) {
    // if(0 || state.pause) complete();
    this[_startTime] = new Date();
    (function tick() {
      this[_intervalId] = setTimeout(() => {
        this[_remainingTime] = time - (new Date() - this[_startTime]);
        if (this[_remainingTime] <= 0) {
          this.changeState();
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

  
  changeState() {
    // state -> next state
    // if (work) -> break
    // if (break) -> work
    // if(pause) -> pause & set nextState
    // alert(state ... over)
    // set next state
    // count() (nextState) // if pause -> continue
  }
  
  start() {
    this[_state] = STATES.running;
    
    clearInterval(this[_intervalId]);
    //ориентироваться на системное время из-за неточности таймеров
    this[_startTime] = new Date();
    
    //todo: воткнуть counter
    this[_intervalId] = setInterval(() => {
        this[_remainingTime] = (this[_pauseTime] ? this[_pauseTime] : this.duration) - (new Date() - this[_startTime]); 
    }, 1000);
  }

  // may be
  // get pauseTime () {
    // return this[_pauseTime];
  // }
  // ??
  getPauseTime() {
    return this[_pauseTime];
  }
  
  pause() {
    this[_state] = STATES.paused;
    this[_pauseTime] = this[_remainingTime];
    clearInterval(this[_intervalId]);
  }
  
  reset() {
    this[_startTime] = new Date();
    this[_remainingTime] = this.duration;
    this[_pauseTime] = null;
  }
  
  // m.b. toJSON() or toString()?
  exportToJSON() {
    return JSON.stringify({
      title: this.title,
      duration: this.duration,
      remainingTime: this[_remainingTime]
    });
  }
};

export default Timer;