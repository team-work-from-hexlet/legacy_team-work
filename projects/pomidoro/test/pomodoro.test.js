import chai from 'chai';
const assert = chai.assert;

import w3cjs from 'w3cjs';

import Pomodoro from '../js/Pomodoro';
const pomodoro = new Pomodoro();

import Timer from '../js/Timer';


describe('Pomodoro test', () => {
  it('checkHTML', (done) => {
    
    pomodoro.addTimer({title: 'lala', duration: 100});
    
    let html = `
      <!DOCTYPE HTML>
      <html>
          <head>
              <meta charset="UTF-8">
              <title>
                  my_title
              </title>
          </head>
          <body>${pomodoro.prepareHTML()}</body>
      </html>`;
  
    let res = w3cjs.validate({
      input: html,
      output: 'json',
      callback: (res) => {
          assert.doesNotThrow( () => {
              if (res.messages.length > 0) {
                  throw {error: 'HTML code contains errors'};
              }               
              done();
          });
      }
    });
  });
  
  it('should add timer', () => {
    pomodoro.setTimers([
      {title: 'timer1', duration: 1000},
    ]);
    
    let t1 = {title: 'timer1', duration: 1000};
    let t2 = {title: 'timer2', duration: 1000};
    
    assert.strictEqual(pomodoro.getTimers().length, 1);
    pomodoro.addTimer(t1);
    assert.strictEqual(pomodoro.getTimers().length, 2);
    pomodoro.addTimer(t1);
    assert.strictEqual(pomodoro.getTimers().length, 3);
  });
  
  it('should set timers', () => {
    let timersData = [
      {title: 'timer1', duration: 1000},
      {title: 'timer2', duration: 2000},
      {title: 'timer3', duration: 3000},
    ]
    
    pomodoro.setTimers(timersData);
    
    let internalTimers = pomodoro.getTimers();
    assert.strictEqual(internalTimers.length, timersData.length);
    
    internalTimers.forEach((timerObj, i) => {
      assert.deepEqual(timerObj, timersData[i]);
    });
  });
  
  it('should get timers', () => {
    let t1 = new Timer('timer1', 1000);
    let t2 = new Timer('timer2', 2000);
    
    pomodoro.setTimers([]);
    pomodoro.addTimer(t1);
    pomodoro.addTimer(t2);
    
    assert.deepEqual(pomodoro.getTimers(), [t1,t2]);
  });
  
  it('should remove timer', () => {
    let t1 = new Timer('timer1', 1000);
    let t2 = new Timer('timer2', 2000);
    let t3 = new Timer('timer3', 3000);
    pomodoro.setTimers([t1,t2,t3]);
    pomodoro.removeTimer(1);
    assert.deepEqual(pomodoro.getTimers(), [t1,t3]);
  });
  
  it('should get timer by id', () => {
    let timers = [];
    for(let i = 0; i < 10; ++i) {
      timers.push( {title: `timer${i}`, duration: i*1000} );
    }
    pomodoro.setTimers(timers);
    for(let i = 9; i >= 0; --i) {
      assert.deepEqual(pomodoro.getTimerById(i), timers[i]);
    }
  });
  
  it('test timers encapsulation', () => {
    let timersData = [
      {title: 't1', duration: 1},
      {title: 't2', duration: 2},
      {title: 't3', duration: 3},
      {title: 't4', duration: 4},
    ];
    pomodoro.setTimers(timersData);
    
    let timersCopy1 = pomodoro.getTimers();
    timersCopy1.forEach((timerObj) => {
      timerObj.title = Math.random();
      timerObj.duration = Math.random();
    });
    timersCopy1.push('invalid timer');
    
    let timersCopy2 = pomodoro.getTimers();;
    assert.strictEqual(timersCopy2.length, timersData.length);
    timersCopy2.forEach((timerObj, i) => {
      assert.strictEqual(timerObj.title, timersData[i].title);
    })
  })
    
});
