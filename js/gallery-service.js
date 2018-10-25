'use strict';

var gImgs;
var gKeyWordsMap;

function createImgs() {
    gImgs = [
        createImg('img/003.jpg', ['trump', 'happy']),
        createImg('img/004.jpg', ['sad']),
        createImg('img/005.jpg', ['happy']),
        createImg('img/006.jpg', ['happy']),
        createImg('img/2.jpg', ['sad']),
        createImg('img/5.jpg', ['happy']),
        createImg('img/004.jpg', ['happy']),
        createImg('img/004.jpg', ['happy']),
        createImg('img/004.jpg', ['sad']),
        createImg('img/004.jpg', ['happy']),
        createImg('img/004.jpg', ['happy']),
        createImg('img/004.jpg', ['happy']),
    ];

    // return gImgs;
}

function createImg(url, keyWords) {
    return { id: createId(), url, keyWords };
}

function getImgsByFilter(keyword) {
    var filteredImgs = gImgs.filter(img => {
        return img.keyWords.some(imgKewWord => {
            return imgKewWord === keyword
        })
    })

    return filteredImgs;
}

function creatKeyWordsMap() {
    gKeyWordsMap = {};
    // go over imgs keywords
    gImgs.forEach(img => {
        img.keyWords.forEach(keyWord => {
            // if keyword exist - add 1 to its value
            // if (gKeyWordsMap[keyWord]) gKeyWordsMap[keyWord]++;
            // if new keyword - create key on map with value 1
            gKeyWordsMap[keyWord] = 1;
        });
    });
}

function updateKeyWordsMap(key) {
    if (gKeyWordsMap[key]) {
        gKeyWordsMap[key]++;
        saveToStorage('keywordsMap', gKeyWordsMap);
    }
}

function drawImgOnCanvas(image) {
    var imageRatio = image.width / image.height;
    var canvasComputed = {};
    canvasComputed = {width: gCanvas.width ,height: gCanvas.width/imageRatio};
    console.log('image width:',image.width,'image height:', image.height, 'image ratio', imageRatio);
    console.log( 'gCanvas.width', gCanvas.width, 'gCanvas.height', gCanvas.height, 'canvas ratio', gCanvas.width/gCanvas.height); 
    
  
    // console.log(canvasComputed.height);
   
    // if ( canvasComputed.height > gCanvas.height ) {
        // OVERFLOW - Y - NEED TO BE FIX

        // canvasComputed.height = gCanvas.height;
        // gCanvas.width = gCanvas.height*imageRatio;
        
    // } else {
        // }
        // gCtx.drawImage(image, 0, 0, gCanvas.width, gCanvas.height);
    // gCanvas = canvasComputed;
    gCtx.drawImage(image, 0, 0, canvasComputed.width, canvasComputed.height);
    
}

function getImageById(id) {
    return document.querySelector(`[data-id='${id}']`);
}

function uploadNewImg(imgEl) {
    gMeme.elImg = imgEl;
    renderMeme();
}