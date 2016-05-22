import Timer from './Timer';

//private props
const _timers = Symbol('timers');
const _domElems = Symbol('domElems');

class Pomodoro {
  
  constructor() {
    this[_timers] = [];
    this[_domElems] = {};
  }
  
  init() {
    this[_domElems].create = document.getElementById('createTimer');
    this[_domElems].timers = document.getElementById('timers');
    
    // this.addListeners(true);
    return this;
  }
  
  startAllTimers() {
    this[_timers].forEach((timer) => timer.start() );
  }
  
  setTimers(timersData) {
    this[_timers] = timersData.map((data) => {
      return new Timer(data.title, data.duration);
    });
    return this;
  }
  
  getTimers() {
    return this[_timers].map((timer) => { return {...timer}; });
  }
  
  addTimer(timerInfo) {
    let timer = new Timer(timerInfo.title, timerInfo.duration);
    this[_timers].push(timer);
    return this;
  }
  
  removeTimer(timerId) {
    this[_timers].splice(timerId,1);
    return this;
  }
  
  getTimerById(timerId) {
    return {...this[_timers][timerId]};
  }
  
  addListeners(early) {
    if (early) {
      this.domElms.create.addEventListener((event) => {
          
      });
    } else {
        
    }
  }
  
  prepareHTML() {
    let html = '';
    html += '<div>';
    html += this[_timers][0].title;
    html += ": ";
    html += Math.round(this[_timers][0].getRemainingTime() / 1000);
    html += " sec"
    html += '</div>';
    
    return html;
  }
  
  buildHtml() {
    
  }
  
  save() {
    window.localStorage.setItem('pomodoro-timers', JSON.stringify(this[_timers]));
  }
  
  load() {
    return JSON.parse(window.localStorage.getItem('pomodoro-timers')) || [];
  }
};

export default Pomodoro;