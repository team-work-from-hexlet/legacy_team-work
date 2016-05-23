import chai from 'chai';
const assert = chai.assert;

//фейковые таймеры
import sinon from 'sinon';

import Tomato from '../js/Tomato';

describe('Tomato tests', () => {
  let clock;
  
  beforeEach(() => {
    clock = sinon.useFakeTimers();
  });
  
  afterEach(() => {
    clock.restore();
  });
  
  it('should create tomato obj', () => {
    let tomato = new Tomato({
      title: 'tomatoTitle',
      workDuration: 10000,
      restDuration: 2000,
      repeatCount: 4
    });
    assert.strictEqual(tomato.getTitle(), 'tomatoTitle');
    assert.strictEqual(tomato.getWorkDuration(), 10000);
    assert.strictEqual(tomato.getRestDuration(), 2000);
    assert.strictEqual(tomato.getRepeatCount(), 4);
  });
  
  it('should change tomato state on start', () => {
    let tomato = new Tomato({
      title: 'tomatoTitle',
      workDuration: 10000,
      restDuration: 2000,
      repeatCount: 4
    });
    assert.strictEqual(tomato.getState(), 'paused');
    tomato.start();
    assert.strictEqual(tomato.getState(), 'runningWork');
  });
  
  it('should change tomato state on pause', () => {
    let tomato = new Tomato({
      title: 'tomatoTitle',
      workDuration: 10000,
      restDuration: 2000,
      repeatCount: 4
    });
    assert.strictEqual(tomato.getState(), 'paused');
    tomato.start();
    assert.strictEqual(tomato.getState(), 'runningWork');
    tomato.pause();
    assert.strictEqual(tomato.getState(), 'paused');
  });
  
  it('test tomato ticking', () => {
    let tomato = new Tomato({
      title: 'tomatoTitle',
      workDuration: 10000,
      restDuration: 2000,
      repeatCount: 4
    });
    tomato.start();
    assert.strictEqual(tomato.getRemainingTime(), 10000);
    clock.tick(2500);
    assert.strictEqual(tomato.getRemainingTime(), 7500);
    clock.tick(5100);
    assert.strictEqual(tomato.getRemainingTime(), 2400);
    clock.tick(2500);
    //switch to rest time
    assert.strictEqual(tomato.getRemainingTime(), 1900);
    clock.tick(1500);
    assert.strictEqual(tomato.getRemainingTime(), 400);
    clock.tick(400);
    //switch to work time
    assert.strictEqual(tomato.getRemainingTime(), 10000);
    clock.tick(1000);
    assert.strictEqual(tomato.getRemainingTime(), 9000);
    clock.tick(12000); //switch to rest then to work again
    assert.strictEqual(tomato.getRemainingTime(), 9000);
  });
  
  it('test tomato ticking with pause', () => {
    let tomato = new Tomato({
      title: 'tomatoTitle',
      workDuration: 7000,
      restDuration: 5000,
      repeatCount: 4
    });
    tomato.start();
    assert.strictEqual(tomato.getRemainingTime(), 7000);
    clock.tick(2500);
    assert.strictEqual(tomato.getRemainingTime(), 4500);
    clock.tick(500);
    assert.strictEqual(tomato.getRemainingTime(), 4000);
    tomato.pause();
    clock.tick(20000);
    assert.strictEqual(tomato.getRemainingTime(), 4000);
    clock.tick(1000);
    assert.strictEqual(tomato.getRemainingTime(), 4000);
    tomato.start();
    clock.tick(1000);
    assert.strictEqual(tomato.getRemainingTime(), 3000);
    clock.tick(3500);
    assert.strictEqual(tomato.getRemainingTime(), 4500);
    clock.tick(5000);
    assert.strictEqual(tomato.getRemainingTime(), 6500);
  });
});