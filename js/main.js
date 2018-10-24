'use strict';

var gCanvas;
var gCtx;
// var gOffset;
var gSpaceBetweenLines;

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

    gSpaceBetweenLines = gCanvas.height / 15;

    renderGallery()
    // createMeme();
}

// function getCanvasOffset() {
//     return { left: gCanvas.offsetLeft, top: gCanvas.offsetTop }
// }

function onEnterText(txt) {
    console.log(txt);
    var size = 20;

    // get y and size of last entered line
    if (gMeme.txts.length > 0) {
        var prevLine = gMeme.txts[gMeme.txts.length - 1];
        var prevY = prevLine.y;
        var y = prevY + gSpaceBetweenLines;
    } else {
        var y = size;
    }

    var x = 20;
    var line = createLine(txt, size, x, y, gCtx.fillStyle, 'left');
    renderMeme();
}

// render meme
function renderMeme() {
    var meme = getMeme();
    var image = getImageById(meme.selectedImgId);
    drawImgOnCanvas(image);

    meme.txts.forEach((line) => {
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

    gMeme.selectedLineIdx = lineIndex;
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