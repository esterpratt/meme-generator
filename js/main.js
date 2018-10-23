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

    createMeme();
    
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
    console.log(x, y);

}