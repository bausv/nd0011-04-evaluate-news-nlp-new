/**
 * @jest-environment jsdom
 */

import {setResponseValues} from './formEventHandler';

'use strict';
test('response values are correctly set', () => {
    document.body.innerHTML = `
    <div id="result">
    <span id="spinner-icon"></span>
    <span id="agreement-icon"></span>
    <span id="agreement"></span>
    <span id="subjectivity-icon"></span>
    <span id="subjectivity"></span>
    <span id="irony-icon"></span>
    <span id="irony"></span>
    <span id="result-text"></span>
    </div>
    `;

    setResponseValues('ag', 'su', 'ir', 'te');
    expect(document.getElementById('agreement').innerText).toBe('ag');
    expect(document.getElementById('subjectivity').innerText).toBe('su');
    expect(document.getElementById('irony').innerText).toBe('ir');
    expect(document.getElementById('result-text').innerText).toBe('te');

});