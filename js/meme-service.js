'use strict';

var gImgs;
var gMeme;

function createImgs() {
    gImgs = [
        createImg('img/003.jpg', ['happy']),
        createImg('img/004.jpg', ['happy']),
        createImg('img/005.jpg', ['happy']),
        createImg('img/006.jpg', ['happy']),
        createImg('img/2.jpg', ['happy']),
        createImg('img/5.jpg', ['happy']),
        createImg('img/004.jpg', ['happy']),
        createImg('img/004.jpg', ['happy']),
        createImg('img/004.jpg', ['happy']),
        createImg('img/004.jpg', ['happy']),
        createImg('img/004.jpg', ['happy']),
        createImg('img/004.jpg', ['happy']),
    ];

    return gImgs;
}

function createImg(url, keyWords) {
    return { id: createId(), url, keyWords };
}

function createMeme(id) {
    gMeme = {
        selectedImgId: id,
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
        fontFamily: 'Arial',
        align: align
    }

    gMeme.txts.push(line);
}

function getMeme() {
    return gMeme;
}

function drawImgOnCanvas(image) {

    //TODO - CONNECT TO ANOTHER FUNC!
    // HANDLE THE HEIGHT AND WIDTH - RESPONSIVE
    gCtx.drawImage(image, 0, 0, 458, 315);
}

function getImageById(id) {
    return document.querySelector(`[data-id='${id}']`);
}

function changeColor(lineIdx, color) {
    gMeme.txts[lineIdx].color = color;
}

function downloadCanvas(elLink) {
    elLink.href = gCanvas.toDataURL();
    elLink.download = 'meme.jpg';
}