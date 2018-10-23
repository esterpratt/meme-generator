'use strict';

var gCanvas;
var gCtx;
var gOffset;

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
    var line = createLine(txt, 20, 10, 80, gCtx.fillStyle, 'left');
    renderMeme();
}

// render the selected line
function renderMeme() {
    var meme = getMeme();
    var image = getImageById(meme.selectedImgId);
    drawImgOnCanvas(image);
}

function delete() {

    meme.txts.foreach(txt, => {
        gCtx.font=`${line.size}px ${line.fontFamily}`;
        gCtx.fillText(line.line, line.x, line.y);
    })
}

function onChangeTextColor(color) {
    gCtx.fillStyle = color;
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
// TO DO - UPDATE THE MODAL - WITH THE SELECTED IMAGE  
function onSelectImg(id) {
    createMeme(id);
    renderMeme()
}