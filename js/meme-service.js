'use strict';

var gMeme;

function createMeme(id) {
    gMeme = {
        elImg: null,
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

    gMeme.txts.push(line);
    return line;
}

function deleteLine(line) {
    var lineIdx = gMeme.txts.findIndex(currLine => {
        return line.id === currLine.id;
    })

    gMeme.selectedLine = undefined;
    gMeme.txts.splice(lineIdx, 1);
}

function getLineByIndex(lineIndex) {
    return gMeme.txts[lineIndex];
}

function changeColor(line, color) {
    line.color = color;
}

function changeFontFmaily(line, font) {
    line.fontFamily = font;
}

function changeFontSize(line, value) {
    line.size += value;
}

function moveCanvasEl(direction) {
    var line = gMeme.selectedLine;
    var moveLenght = 10;
    if (!line) return;
    else {
        switch (direction) {
            case 'left':
                line.x -= moveLenght;
                break;
            case 'right':
                line.x += moveLenght;
                break;
            case 'up':
                line.y -= moveLenght;
                break;
            case 'down':
                line.y += moveLenght;
                break;
        }
        renderMeme();
    }
}

function eraseLine() {
    deleteLine(gMeme.selectedLine);
    renderMeme();
}

function eraseAll() {
    gMeme.selectedLine = undefined;
    gMeme.txts = [];
    renderMeme();
}