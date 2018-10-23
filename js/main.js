'use strict';

var gCanvas;
var gCtx;
var gOffset;

function init() {
    var imgs = createImgs();

    gCanvas = document.querySelector('#canvas');
    gCtx = gCanvas.getContext('2d');
    
    gCanvas.width = window.innerWidth/2;
    gCanvas.height = window.innerHeight/2;

    gOffset = getCanvasOffset();

    renderGallery()
    // createMeme();
}

function getCanvasOffset() {
    return {left: gCanvas.offsetLeft, top: gCanvas.offsetTop}
}

function onEnterText(txt) { 
    var line = createLine(txt, 20, 0, 20, gCtx.fillStyle, 'left');

    var meme = getMeme();

    gCtx.fillText(txt, 0, 20);
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
                        <img src="${images[i].url}" data-id="${images[i].id}" onclick="onSelectImg(this)">
                        </li>`
    }
    strHtml += '</ul>'
    elGallery.innerHTML = strHtml;
}

// gets image  Element
// TO DO - UPDATE THE MODAL - WITH THE SELECTED IMAGE  
function onSelectImg(image) {
    createMeme(image.dataset.id);
    
    drawImgOnCanvas(image);
    // console.log('Element',image);
    // console.log('Element Modal ID',image.dataset.id);
}