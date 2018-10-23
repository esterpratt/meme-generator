'use strict';

var gCanvas;
var gCtx;

function init() {
    var imgs = createImgs();

    gCanvas = document.querySelector('#canvas');
    gCtx = gCanvas.getContext('2d');

    gCanvas.width = window.innerWidth / 2;
    gCanvas.height = window.innerHeight / 2;

    renderGallery()
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
    drawImgOnCanvas(image);
    console.log('Element',image);
    console.log('Element Modal ID',image.dataset.id);
}