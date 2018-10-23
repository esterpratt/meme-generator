'use strict';

function createId() {
    const length = 4;
    let txt = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
}

// generates a random number between params min and max
function generateNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}