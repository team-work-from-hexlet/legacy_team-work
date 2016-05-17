import chai from 'chai';
const assert = chai.assert;

import Timer from '../js/Timer';

//фейковые таймеры
import sinon from 'sinon';
//доступ к неэскпортированным данным модуля
import rewire from 'rewire';

const TimerModule = rewire('../js/Timer');

describe('Timer test', () => {
  let clock;
  
  beforeEach(() => {
      clock = sinon.useFakeTimers();
  });
  
  afterEach(() => {
      clock.restore();
  });
  
  it('should create timer obj', () => {
    let timerObj1 = new Timer('testTimer1', 111);
    assert.deepEqual(timerObj1, {
      title: 'testTimer1', 
      duration: 111,
    });
    
    let timerObj2 = new Timer('testTimer2', 222);
    assert.deepEqual(timerObj2, {
      title: 'testTimer2', 
      duration: 222,
    });
  });
  
  it('test timer start', () => {
    let t = new Timer();
    const STATES = Timer.getStatesList();
    assert.equal(t.getState(), STATES.paused);
    t.start();
    assert.equal(t.getState(), STATES.running);
  });
  
  it('test timer pause', () => {
    let t = new Timer();
    t.start();
    const STATES = Timer.getStatesList();
    assert.equal(t.getState(), STATES.running);
    t.pause();
    assert.equal(t.getState(), STATES.paused);
  });
  
  it('test timer ticking', () => {
    let t = new Timer('timer1', 5000);
    t.start();
    clock.tick(500);
    assert.equal(t.getRemainingTime(), 4500);
    clock.tick(2000);
    assert.equal(t.getRemainingTime(), 2500);
    clock.tick(1500);
    assert.equal(t.getRemainingTime(), 1000);
    clock.tick(1000);
    assert.equal(t.getRemainingTime(), 0);
    clock.tick(500);
    assert.equal(t.getRemainingTime(), -500);
  });
  
  it('should reset timer', () => {
    let t = new Timer('resetTestTimer', 2000);
    const STATES = Timer.getStatesList();
    t.start();
    clock.tick(500);
    assert.equal(t.getRemainingTime(), 1500);
    t.reset();
    assert.equal(t.getRemainingTime(), 2000);
    clock.tick(1500);
    assert.equal(t.getRemainingTime(), 500);
    t.reset();
    assert.equal(t.getRemainingTime(), 2000);
    clock.tick(2500);
    assert.equal(t.getRemainingTime(), -500);
    t.reset();
    assert.equal(t.getRemainingTime(), 2000);
  });
});