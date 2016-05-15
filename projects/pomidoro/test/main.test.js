const assert = require('chai').assert;
const w3cjs = require('w3cjs');

import {Pomodoro as pomodoro} from '../js/main';


describe('test', () => {
    it('test1', () => {
        console.log(pomodoro);
        assert.equal(pomodoro.timers[0].name, 'test');
    });
    
    it('test2', () => {
        console.log(pomodoro.getTimers());
        assert.deepEqual(pomodoro.getTimers(), [ { name: 'test' } ]);
    });
    
    
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
    
    it('should add timers', () => {
        pomodoro.addTimer();
    });
    
    it('should set timers', () => {
        pomodoro.setTimers();
    });
    
    it('should get timers', () => {
        
    });
    
    it('should create timer', () => {
        
    });
    
    it('should create timer obj', () => {
        let timerObj1 = new pomodoro.Timer('testObj1', 111);
        assert.deepEqual(timerObj1, {title: 'testObj1', duration: 111});
        
        let timerObj2 = new pomodoro.Timer('testObj2', 222);
        assert.deepEqual(timerObj2, {title: 'testObj2', duration: 222});
    });
});
