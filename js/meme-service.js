'use strict';

var gStyleState;
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
        txts: [],
        selectedLineIdx: -1
    };
}

function createLine(val, size, x, y, color, fontFamily, align) {
    var line = {
        line: val,
        size: size,
        x: x,
        y: y,
        color: color,
        fontFamily: fontFamily,
        align: align,
        isSelected: true
    }

    gMeme.txts.push(line);
    return line;
}

function getMeme() {
    return gMeme;
}

function getLineByIndex(lineIndex) {
    return gMeme.txts[lineIndex];
}

function drawImgOnCanvas(image) {

    //TODO - CONNECT TO ANOTHER FUNC!
    // HANDLE THE HEIGHT AND WIDTH - RESPONSIVE
    gCtx.drawImage(image, 0, 0, gCanvas.width, gCanvas.height);
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