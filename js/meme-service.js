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

function createMeme() {
    gMeme = {
        selectedImgId: 1,
        txts: []
    };
}

function createLine(val, size, x, y, color, align) {
    var line = {
        line: val,
        size: 30,
        x: x,
        y: y,
        color: color, 
        align: align
    }

    gMeme.txts.push(line);
}

function getMeme() {
    return gMeme;
}