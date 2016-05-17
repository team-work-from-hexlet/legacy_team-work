import Timer from './Timer';

class Pomodoro {
    
    constructor() {
        this.timers = [];
        this.domElms = [];
    }
    
    
    init() {
        this.domElms.create = document.getElementById('createTimer');
        this.domElms.timers = document.getElementById('timers');
        
        this.addListeners(true);
    }
    
    
    setTimers(timers) {
        this.timers = timers;
        return this;
    }
    
    getTimers() {
        return this.timers;
    }
    
    addTimer(timer) {
        if ( !(timer instanceof Timer) ) {
            throw new Error('invalid timer obj');
        }
        this.timers.push(timer);
    }
    
    addListeners(early) {
        if (early) {
            this.domElms.create.addEventListener((event) => {
                
            });
        } else {
            
        }
    }
    
    prepareHTML() {
        return "<div></div>";
    }
    
    buildHtml() {
        
    }
    
    save() {
        window.localStorage.setItem('pomodoro-timers', JSON.stringify(this.timers));
    }
    
    load() {
        return JSON.parse(window.localStorage.getItem('pomodoro-timers')) || [];
    }
};

export default Pomodoro;