'use strict';

var gCanvas;
var gCtx;

function init() {
    var imgs = createImgs();
    
    gCanvas = document.querySelector('#canvas');
    gCtx = gCanvas.getContext('2d');
    
    gCanvas.width = window.innerWidth/2;
    gCanvas.height = window.innerHeight/2;
}