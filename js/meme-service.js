'use strict';

var gStyleState;
var gImgs;
var gMeme;
// var gCurrLine = 0;

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
        selectedLine: undefined
    };
}

function createLine(size, x, y, color, fontFamily) {
    var line = {
        id: createId(),
        size,
        x,
        y,
        color,
        fontFamily,
        align: 'left',
        isSelected: true
    }

    // gMeme.txts[gCurrLine] = line;
    gMeme.txts.push(line);
    return line;
}

function deleteLine(line) {
    var lineIdx = gMeme.txts.findIndex(currLine => {
        return line.id === currLine.id;
    })
    console.log(lineIdx);
    
    gMeme.selectedLine = undefined;
    gMeme.txts.splice(lineIdx, 1);
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

function changeColor(line, color) {
    line.color = color;
}

function changeFontFmaily(line, font) {
    line.fontFamily = font;
}

function downloadCanvas(elLink) {
    elLink.href = gCanvas.toDataURL();
    elLink.download = 'meme.jpg';
}