const timers = [ { name: 'test' } ];

const Timer = class {
    
    constructor(title='', duration=1500) {
        [this.title, this.duration] = [title, duration];
    }
    
    /*    
    start 
    pause
    stop
    started 
    */
    
}

/*let asd = new Timer({title: 'asd', duration: 111});
let asd1 = new Timer({duration: 111});
let asd2 = new Timer({title: 'asd'});

console.log(asd,asd1,asd2);*/
/*
timers = [
    {
      title: "Первый таймер",
      duration: 300,
      state: 'pause',
    },
]
*/

export const Pomodoro = {
    Timer,
    timers,
    domElms: {},
    
    init: () => {
        this.domElms.create = document.getElementById('createTimer');
        this.domElms.timers = document.getElementById('timers');
        
        this.addListeners(true);
    },
    
    addListeners: (early) => {
        if (early) {
            this.domElms.create.addEventListener((event) => {
                
            });
        } else {
            
        }
    },
    
    prepareHTML: () => {
        return "<div></div>";
    },
    
    buildHtml: () => {
        
    },
    
    getTimers: () => {
        //return '123';
        return Pomodoro.timers;  
    },
    
    save: () => {
        window.localStorage.setItem('pomodoro-timers', JSON.stringify(this.timers));
    },
    load: () => {
        return JSON.parse(window.localStorage.getItem('pomodoro-timers')) || [];
    },
};