'use strict';

var gCanvas;
var gCtx;
var gOffset;
var gSelectedLineIdx = -1;


// TODO:
// font-family, font-size,l-r align, up-down align, delete


function init() {
    var imgs = createImgs();
    
    gStyleState = {
        color: '#000' ,
        size: 20,
        fontFamily: 'arial',
    }    


    gCanvas = document.querySelector('#canvas');
    gCtx = gCanvas.getContext('2d');

    gCanvas.width = window.innerWidth / 2;
    gCanvas.height = window.innerHeight / 2;

    renderGallery()
    // createMeme();
}

function getCanvasOffset() {
    return { left: gCanvas.offsetLeft, top: gCanvas.offsetTop }
}

function onEnterText(txt) {
    // TODO: get the correct x and y
    var size = 20;
    var x = 0;
    var y = size;
    var line = createLine(txt, size, x, y, gCtx.fillStyle, 'left');
    renderMeme();
}

// render the selected line
function renderMeme() {
    var meme = getMeme();
    var image = getImageById(meme.selectedImgId);
    drawImgOnCanvas(image);

    meme.txts.forEach((line) => {
        gCtx.font = `${line.size}px ${line.fontFamily}`;
        gCtx.fillText(line.line, line.x, line.y);
    })
}

function onChangeTextColor(color) {
    // change current color
    onChangeStyle('color',color);
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
    var x = ev.clientX - gCanvas.offsetLeft;
    var y = ev.clientY - gCanvas.offsetTop;
    
    var lineY = gMeme.txts[0].y;
    var lineSize = gMeme.txts[0].size;
    // check if clicked on line
    if (y < lineY && y > lineY - lineSize) {
        console.log('hi');
    }
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

    // gOffset = getCanvasOffset();

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

function onChangeStyle(key, value){
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