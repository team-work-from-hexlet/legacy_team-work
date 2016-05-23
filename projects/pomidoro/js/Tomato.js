import Timer from './Timer';
import {EventEmitter} from 'events';


const STATES = {
    paused: 'paused',
    work: 'runningWork',
    rest: 'restWork',
};
Object.freeze(STATES);

//private props
const _title = Symbol('title');
const _workDuration = Symbol('workDuration');
const _restDuration = Symbol('restDuration');
const _repeatCount = Symbol('repeatCount');
const _workTimer = Symbol('workTimer');
const _restTimer = Symbol('restTimer');
const _state = Symbol('state');
const _currentTimer = Symbol('currentTimer');

class Tomato extends EventEmitter {
  constructor(data) {
    super();
    this[_title] = data.title || 'NonameTomato';
    this[_workDuration] = data.workDuration || 25*60*1000; // 25min
    this[_restDuration] = data.restDuration || 5*60*1000; // 5min
    this[_repeatCount] = data.repeatCount || 4;
    
    this[_state] = STATES.paused;
    
    this[_workTimer] = new Timer(this[_title] + '_workTimer', this[_workDuration]);
    this[_workTimer].on('done', this._onTimerDone.bind(this));
    this[_restTimer] = new Timer(this[_title] + '_restTimer', this[_restDuration]);
    this[_restTimer].on('done', this._onTimerDone.bind(this));
    
    this[_currentTimer] = this[_workTimer];
  }
  
  _onTimerDone() {
    this._toggleState();
    this[_currentTimer].start();
  }
  
  _swapTimers() {
    switch(this[_currentTimer]) {
      case this[_workTimer]:
        this[_currentTimer] = this[_restTimer];
        break;
      case this[_restTimer]:
        this[_currentTimer] = this[_workTimer];
        break;
    }
  }
  
  _toggleState() {
    switch(this[_state]) {
      case STATES.work:
        this[_state] = STATES.rest;
        break;
      case STATES.rest:
        this[_state] = STATES.work;
        break;
    }
    this._swapTimers();
  }
  
  getRemainingTime() {
    return this[_currentTimer].getRemainingTime();
  }
  
  start() {
    this[_state] = STATES.work;
    this[_currentTimer].start();
  }
  
  pause() {
    this[_state] = STATES.paused;
    this[_currentTimer].pause();
  }
  
  getState() {
    return this[_state];
  }
  
  getTitle() {
    return this[_title];
  }
  
  getWorkDuration() {
    return this[_workDuration];
  }
  
  getRestDuration() {
    return this[_restDuration];
  }   
  
  getRepeatCount() {
    return this[_repeatCount];
  }   
}

export default Tomato;