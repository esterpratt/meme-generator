'use strict';

var gImgs;
var gMeme;

function createImgs() {
    gImgs = [
        createImg('img/003.jpg', ['happy']),
        createImg('img/004.jpg', ['happy']),
        createImg('img/004.jpg', ['happy']),
        createImg('img/004.jpg', ['happy']),
        createImg('img/004.jpg', ['happy']),
        createImg('img/004.jpg', ['happy']),
        createImg('img/004.jpg', ['happy']),
        createImg('img/004.jpg', ['happy']),
        createImg('img/004.jpg', ['happy']),
        createImg('img/004.jpg', ['happy']),
        createImg('img/004.jpg', ['happy']),
        createImg('img/004.jpg', ['happy']),
    ];

    return gImgs;
}

function createImg(url, keyWords) {
    return {id: createId(), url, keyWords};
}

function drawImgOnCanvas(image){
    //TODO - CONNECT TO ANOTHER FUNC!
    // HANDLE THE HEIGHT AND WIDTH - RESPONSIVE
    gCtx.drawImage(image, 0, 0,458,315);
}