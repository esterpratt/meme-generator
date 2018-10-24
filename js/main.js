'use strict';

var gCanvas;
var gCtx;
// var gOffset;
var gSpaceBetweenLines;

function init() {
    var imgs = createImgs();

    gStyleState = {
        color: '#000',
        size: 20,
        fontFamily: 'arial',
    }

    gCanvas = document.getElementById('canvas');
    gCtx = gCanvas.getContext('2d');

    gSpaceBetweenLines = gCanvas.height / 10;

    renderGallery()
    // TO DELETE LATER WHEN GALLERY SYNC
    // createMeme(1);

}

function initCanvas() {
    var containerWidth = document.querySelector('main').offsetWidth;
    var containerHeight = document.querySelector('main').offsetHeight;
    gCanvas.width = containerWidth;
    gCanvas.height = containerHeight;
}

// function getCanvasOffset() {
//     return { left: gCanvas.offsetLeft, top: gCanvas.offsetTop }
// }

function onEnterText(txt) {
    var size = 20;

    // get y of last entered line
    if (gMeme.txts.length > 0) {
        var prevLine = gMeme.txts[gMeme.txts.length - 1];
        var prevY = prevLine.y;
        var y = prevY + gSpaceBetweenLines;
    } else {
        var y = size;
    }

    var x = 20;
    var line = createLine(txt, size, x, y, 'black', 'Ariel', 'left');
    gMeme.selectedLineIdx = gMeme.txts.length - 1;
    setTextWidth(line);
    renderMeme();
}

function setTextWidth(line) {
    var txt = line.line;
    // TODO - Is it necessary to define gCtx.font??
    gCtx.font = `${line.size}px ${line.fontFamily}`;
    var width = gCtx.measureText(txt).width;
    line.width = width;
}

// render meme
function renderMeme() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    var meme = getMeme();
    var image = getImageById(meme.selectedImgId);
    drawImgOnCanvas(image);

    meme.txts.forEach((line) => {
        console.log(line.isSelected);

        if (line.isSelected) {
            markLine(line);
        }
        gCtx.font = `${line.size}px ${line.fontFamily}`;
        gCtx.fillStyle = line.color;
        gCtx.fillText(line.line, line.x, line.y);
    })
}

function onChangeTextColor(color) {
    // TODO: change current color according to global state!
    gCtx.fillStyle = color;

    // if there is a line selected
    if (gMeme.selectedLineIdx != -1) {
        // change its color
        changeColor(gMeme.selectedLineIdx, color);
        // render the meme
        renderMeme();
    }
}

function onClickCanvas(ev) {
    // var mouseX = ev.clientX - gCanvas.offsetLeft;
    var mouseY = ev.clientY - gCanvas.offsetTop;

    // check if clicked on line
    var lineIndex = gMeme.txts.findIndex((line) => {
        // TODO: draw lines around selected line
        // TODO: open tools, if open - change values according to selected line
        return (mouseY < line.y && mouseY > line.y - line.size)
    });

    // if clicked on line - mark it
    if (lineIndex != -1) {
        var line = getLineByIndex(lineIndex);
        line.isSelected = true;
    }

    // if clicked on different line - remove isSelected from other line

    if (gMeme.selectedLineIdx != lineIndex) {
        var line = getLineByIndex(gMeme.selectedLineIdx);
        console.log(line);

        if (line) {
            line.isSelected = false;
            console.log(line);

        }
    }

    gMeme.selectedLineIdx = lineIndex;

    renderMeme();
}

function markLine(line) {
    // get line
    // var line = getLineByIndex(lineIndex);

    gCtx.beginPath();
    gCtx.moveTo(line.x - 10, line.y - line.size);
    gCtx.lineTo(line.x + line.width + 10, line.y - line.size);
    gCtx.lineTo(line.x + line.width + 10, line.y + 10);
    gCtx.lineTo(line.x - 10, line.y + 10);
    gCtx.lineTo(line.x - 10, line.y - line.size);
    gCtx.strokeStyle = 'red';
    gCtx.stroke();

}


// INJECT UL-> LI IMAGES TO GALLERY DIV
function renderGallery() {
    //TODO: get gallery function - instead of global var
    var elGallery = document.querySelector('.gallery-items');
    var images = gImgs;
    var strHtml = '<ul>';
    for (var i = 0; i < images.length; i++) {
        strHtml += `    <li class="gallery-img">
                        <img src="${images[i].url}" data-id="${images[i].id}" onclick="onSelectImg('${images[i].id}')">
                        </li>`
    }
    strHtml += '</ul>'
    elGallery.innerHTML = strHtml;
}

// gets image  Element
// TO DO -   
// 1. DISPLAY:NONE - TO GALLERY   
// 2. SHOW BTN - BACK TO GALLERY   
function onSelectImg(id) {
    document.body.classList.remove('gallery');
    document.querySelector('.gallery-items').style.display = 'none';
    // document.querySelector('main').style.display = 'block';

    // gOffset = getCanvasOffset();

    // init canvas
    initCanvas();
    console.log(id);
    createMeme(id);
    renderMeme();
}

function returnToGallery(ev) {
    ev.preventDefault();
    document.querySelector('.gallery-container').style.display = 'block';
    document.querySelector('.meme-container').style.display = 'none';
}

function onDownloadImage(el, ev) {
    downloadCanvas(el);
}

function onChangeStyle(key, value) {
    console.log(key, value);
    gStyleState[key] = value;
}

// function onChangeFontFamily(value){
//     console.log(value);
// }

// function onChangeFontSize(value){
//     console.log(value);
// }


// function onChangeFontFamily(fontFamily) {
//     // change current color
//     gCtx.font = `30px ${fontFamily} `;

//     // if there is a line selected
//     if (gSelectedLineIdx != -1) {
//         // change its color
//         changeFontFamily(gSelectedLineIdx, fontFamily);
//         // render the meme
//         renderMeme();
//     }
// }