'use strict';

var gImgs;
var gMeme;

function createImgs() {
    gImgs = [
        createImg('img/003.jpg', ['happy']),
        createImg('img/004.jpg', ['happy']),
    ];

    return gImgs;
}

function createImg(url, keyWords) {
    return {id: createId(), url, keyWords};
}