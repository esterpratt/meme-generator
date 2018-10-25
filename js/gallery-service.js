'use strict';

var gImgs;
var gKeyWordsMap;
var gCurrKeyword;

function createImgs() {
    gImgs = [
        createImg('img/003.jpg', ['trump', 'stupid', 'man']),
        createImg('img/004.jpg', ['cute', 'dog', 'cute']),
        createImg('img/005.jpg', ['dog', 'kid', 'sleepy']),
        createImg('img/006.jpg', ['cat', 'sleepy']),
        createImg('img/2.jpg', ['happy', 'dance']),
        createImg('img/5.jpg', ['happy', 'kid']),
        createImg('img/8.jpg', ['happy']),
        createImg('img/9.jpg', ['happy', 'kid', 'cute']),
        createImg('img/12.jpg', ['man']),
        createImg('img/19.jpg', ['man', 'angry']),
        createImg('img/img6.jpg', ['dog', 'happy', 'cute']),
        createImg('img/drevil.jpg', ['man']),
        createImg('img/img2.jpg', ['kid', 'dance', 'happy', 'cute']),
        createImg('img/img4.jpg', ['trump', 'stupid', 'man']),
        createImg('img/img5.jpg', ['happy', 'kid', 'cute']),
        createImg('img/img11.jpg', ['happy', 'man']),
        createImg('img/img12.jpg', ['man']),
        createImg('img/leo.jpg', ['happy', 'man']),
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
    // console.log('image width:',image.width,'image height:', image.height, 'image ratio', imageRatio);
    // console.log( 'gCanvas.width', gCanvas.width, 'gCanvas.height', gCanvas.height, 'canvas ratio', gCanvas.width/gCanvas.height); 
    if (canvasComputed.height < gCanvas.height) {
        gCanvas.height = canvasComputed.height;
    }
    gCtx.drawImage(image, 0, 0, canvasComputed.width, canvasComputed.height);
}

function getImageById(id) {
    return document.querySelector(`[data-id='${id}']`);
}

function uploadNewImg(imgEl) {
    gMeme.elImg = imgEl;
    renderMeme();
}