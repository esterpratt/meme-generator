'use strict';

var gCanvas;
var gCtx;
var gOffset;
var gSelectedLineIdx = 0;

function init() {
    var imgs = createImgs();

    gCanvas = document.querySelector('#canvas');
    gCtx = gCanvas.getContext('2d');

    gCanvas.width = window.innerWidth / 2;
    gCanvas.height = window.innerHeight / 2;

    gOffset = getCanvasOffset();

    renderGallery()
    // createMeme();
}

function getCanvasOffset() {
    return { left: gCanvas.offsetLeft, top: gCanvas.offsetTop }
}

function onEnterText(txt) {
    // TODO: get the correct x and y
    
    var line = createLine(txt, 20, 0, 5, gCtx.fillStyle, 'left');
    renderMeme();
}

// render the selected line
function renderMeme() {
    var meme = getMeme();
    var image = getImageById(meme.selectedImgId);
    drawImgOnCanvas(image);

    meme.txts.forEach((line) => {
        gCtx.font=`${line.size}px ${line.fontFamily}`;
        gCtx.fillText(line.line, line.x, line.y);
    })
}

function onChangeTextColor(color) {
    // change current color
    gCtx.fillStyle = color;

    // if there is a line selected
    if (gSelectedLineIdx != -1) {
        // change its color
        changeColor(gSelectedLineIdx, color);
        // render the meme
        renderMeme();
    }
}

function onClickCanvas(ev) {
    var x = ev.clientX;
    var y = ev.clientY;
}


// INJECT UL-> LI IMAGES TO GALLERY DIV
function renderGallery() {
    //TODO: get gallery function - instead of global var
    var elGallery = document.querySelector('.gallery-imgs');
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
    document.querySelector('.gallery-container').style.display = 'none';
    document.querySelector('.meme-container').style.display = 'block';
    createMeme(id);
    renderMeme()
}

function returnToGallery(event) {
    document.querySelector('.gallery-container').style.display = 'block';
    document.querySelector('.meme-container').style.display = 'none';
}