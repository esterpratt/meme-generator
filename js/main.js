'use strict';

var gCanvas;
var gCtx;

function init() {
    var imgs = createImgs();

    // gStyleState = {
    //     color: '#000',
    //     size: 20,
    //     fontFamily: 'arial',
    // }

    renderGallery();
    // TO DELETE LATER WHEN GALLERY SYNC
    // createMeme(1);
}

function initCanvas() {
    gCanvas = document.getElementById('canvas');
    gCtx = gCanvas.getContext('2d');
    var containerWidth = document.querySelector('main').offsetWidth;
    var containerHeight = document.querySelector('main').offsetHeight;
    gCanvas.width = containerWidth;
    gCanvas.height = containerHeight;
}

// function getCanvasOffset() {
//     return { left: gCanvas.offsetLeft, top: gCanvas.offsetTop }
// }

function onEnterText(txt) {

    var line = gMeme.selectedLine;

    // line.size = 20;
    // var y = line.y;

    // if (gMeme.selectedLine === -1) {
    //     let line = createLine(txt, size, x, y);
    //     gMeme.selectedLine = line;
    // } else {
    if (txt) {
        line.isSelected = true;
    } else {
        // delete from array
        // find line index
        if (gMeme.txts.length > 1) {
            deleteLine(line);
            // change to new line editor
            addNewLine();
        }
        // line.size = 0;
        // line.isSelected = false;
    }

    gMeme.selectedLine.txt = txt;
    // }

    setTextWidth(gMeme.selectedLine);
    renderMeme();
}

function setTextWidth(line) {
    var txt = line.txt;
    // TODO - Is it necessary to define gCtx.font??
    gCtx.font = `${line.size}px ${line.fontFamily}`;
    var width = gCtx.measureText(txt).width;
    line.width = width;
}

// render meme
function renderMeme() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    var meme = getMeme();
    var image = getImageById(meme.selectedImgId);
    drawImgOnCanvas(image);

    meme.txts.forEach(line => {
        if (line.txt) {
            if (line.isSelected) {
                markLine(line);
            }
            gCtx.font = `${line.size}px ${line.fontFamily}`;
            gCtx.fillStyle = line.color;
            gCtx.fillText(line.txt, line.x, line.y);
        }
    })
}

function onChangeTextColor(color) {
    // TODO: change current color according to global state!
    // gCtx.fillStyle = color;

    // if there is a line selected
    // if (gMeme.selectedLine !== -1) {
    //     console.log(selectedLine);

    // change its color
    changeColor(gMeme.selectedLine, color);
    // render the meme
    renderMeme();
    // }
}

function onClickCanvas(ev) {
    // var mouseX = ev.clientX - gCanvas.offsetLeft;
    var mouseY = ev.clientY - gCanvas.offsetTop;

    // check if clicked on line
    var line = gMeme.txts.find((line) => {
        return (mouseY < line.y && mouseY > line.y - line.size)
    });

    var elHeadline = document.querySelector('.editorHeadline');

    // if clicked on different line - remove isSelected from other line
    if (gMeme.selectedLine !== line) {
        if (gMeme.selectedLine) {
            gMeme.selectedLine.isSelected = false;
        }
    }

    // if clicked on line
    if (line) {
        gMeme.selectedLine = line;
        line.isSelected = true;
        // change headline
        elHeadline.innerHTML = 'Line Editor';
        // update Editor values


        // if clicked outside
    } else {
        addNewLine();
    }

    renderMeme();
}

function addNewLine() {
    var elHeadline = document.querySelector('.editorHeadline');
    // change headline
    elHeadline.innerHTML = 'New Line Editor';
    // if there is text on last line - add new line
    if (gMeme.txts[gMeme.txts.length - 1].txt) {
        var y = 20;
        // get y of last entered line
        let prevLine = gMeme.txts[gMeme.txts.length - 1];
        let prevY = prevLine.y;
        let spaceBetweenLines = gCanvas.height / 10;
        y = prevY + spaceBetweenLines;

        gMeme.selectedLine = createLine(20, 20, y);
    }
}

function markLine(line) {
    // get line
    // var line = getLineByIndex(lineIndex);

    gCtx.beginPath();
    gCtx.moveTo(line.x - 10, line.y - line.size);
    gCtx.lineTo(line.x + line.width + 10, line.y - line.size);
    gCtx.lineTo(line.x + line.width + 10, line.y + 10);
    gCtx.lineTo(line.x - 10, line.y + 10);
    gCtx.lineTo(line.x - 10, line.y - line.size);
    gCtx.strokeStyle = 'red';
    gCtx.stroke();

}


// INJECT UL-> LI IMAGES TO GALLERY DIV
function renderGallery() {
    //TODO: get gallery function - instead of global var
    var elGallery = document.querySelector('.gallery-items');
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
    document.body.classList.remove('gallery');
    document.querySelector('.gallery-items').style.display = 'none';
    // document.querySelector('main').style.display = 'block';

    // gOffset = getCanvasOffset();

    // init canvas
    initCanvas();
    createMeme(id);
    // create first empty line
    gMeme.selectedLine = createLine(20, 20, 20);
    renderMeme();
}

function returnToGallery(ev) {
    ev.preventDefault();
    document.body.classList.add('gallery');
    document.querySelector('.gallery-items').style.display = 'inherit';

    // document.body.sy
    // document.querySelector('.gallery-items').style.display = 'block';
    // document.querySelector('.meme-container').style.display = 'none';
}

function onDownloadImage(el, ev) {
    downloadCanvas(el);
}

function onChangeStyle(key, value) {
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
//     if (gSelectedLine != -1) {
//         // change its color
//         changeFontFamily(gSelectedLine, fontFamily);
//         // render the meme
//         renderMeme();
//     }
// }