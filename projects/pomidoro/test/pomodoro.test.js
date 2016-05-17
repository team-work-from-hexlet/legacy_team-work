import chai from 'chai';
const assert = chai.assert;

import w3cjs from 'w3cjs';

import Pomodoro from '../js/Pomodoro';
const pomodoro = new Pomodoro();

import Timer from '../js/Timer';


describe('Pomodoro test', () => {
    
    it('checkHTML', (done) => {
        
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
        let t1 = new Timer('testObj1', 1);
        let t2 = new Timer('testObj2', 2);
        
        let timersArr = [t1, t2];
        pomodoro.setTimers(timersArr);
        
        let t3 = new Timer('testObj3', 3);
        pomodoro.addTimer(t3);
        
        assert.deepEqual(pomodoro.timers, [t1,t2,t3]);
    });
    
    it('should set timers', () => {
        let timers = [
            new Timer('timer1', 1000),
            new Timer('timer2', 2000),
            new Timer('timer3', 3000)
        ]
        
        pomodoro.setTimers(timers);
        
        assert.deepEqual(pomodoro.timers, timers);
    });
    
    it('should get timers', () => {
        let t = new Timer('timer1', 1000);
        
        pomodoro.setTimers([]);
        pomodoro.addTimer(t);
        pomodoro.addTimer(t);
        
        assert.deepEqual(pomodoro.getTimers(), [t,t]);
    });
    
});
