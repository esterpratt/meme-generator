'use strict';

var gCanvas;
var gCtx;

function init() {
    // init imgs
    createImgs();
    
    // init keywords
    gKeyWordsMap = getFromStorage('keywordsMap');
    if (!gKeyWordsMap) {
        creatKeyWordsMap();
    }

    initGallery();
}

function initGallery() {
    renderKeywords();
    renderGallery(gImgs);
}

function initCanvas() {
    gCanvas = document.getElementById('canvas');
    gCtx = gCanvas.getContext('2d');
    var containerWidth = document.querySelector('main').offsetWidth;
    var containerHeight = document.querySelector('main').offsetHeight;
    gCanvas.width = containerWidth;
    gCanvas.height = containerHeight;
}

function onEnterText(txt) {

    var line = gMeme.selectedLine;

    // if there is no line selected - creates new line
    if (!line) {
        var y = 30;
        // get y of last entered line
        if (gMeme.txts.length) {
            let prevLine = gMeme.txts[gMeme.txts.length - 1];
            let prevY = prevLine.y;
            let spaceBetweenLines = gCanvas.height / 10;
            y = prevY + spaceBetweenLines;
            // if y more than canvas
            if (y > gCanvas.height) {
                y = 30;
            }
        }

        // gets current values
        var currentValues = getCurrentValues();

        gMeme.selectedLine = createLine(20, 20, y, currentValues.color, currentValues.font);
        line = gMeme.selectedLine;
    }

    // if (txt) {
    //     line.isSelected = true;
    // } 

    // update line's txt
    gMeme.selectedLine.txt = txt;

    renderMeme();
}

function getCurrentValues() {
    // get color
    var elColor = document.querySelector('.colorInput');
    var color = elColor.value;

    // get fontFamily
    var elFont = document.querySelector('.fontSeletor');
    var font = elFont.value;

    return { color, font };
}

function setTextWidth(line) {
    var txt = line.txt;
    // TODO - Is it necessary to define gCtx.font?
    gCtx.font = `${line.size}px ${line.fontFamily}`;
    var width = gCtx.measureText(txt).width;
    line.width = width;
}

// render meme
function renderMeme(img) {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    var image;
    var meme = getMeme();
    if (meme.elImg) image = meme.elImg;
    else image = getImageById(meme.selectedImgId);
    drawImgOnCanvas(image);

    meme.txts.forEach(line => {
        if (line.txt) {
            if (line.isSelected) {
                setTextWidth(line);
                markLine(line);
            }

            gCtx.font = `${line.size}px ${line.fontFamily}`;
            // paint inner text 
            gCtx.fillStyle = line.color;
            gCtx.fillText(line.txt, line.x, line.y);
            
            // if impact - paint outline text
            if (line.fontFamily)
            gCtx.strokeStyle = '#ffffff';
            gCtx.strokeText(line.txt, line.x, line.y);
        }
    })
}

function onChangeTextColor(color) {
    // if there is a line selected
    if (gMeme.selectedLine) {
        // change its color
        changeColor(gMeme.selectedLine, color);
        // render the meme
        renderMeme();
    }
}
function onChangeFontSize(value) {
    if (gMeme.selectedLine) {
        if (value === 'plus') changeFontSize(gMeme.selectedLine, 5);
        else if (value === 'minus') {
            if (gMeme.selectedLine.size > 5) changeFontSize(gMeme.selectedLine, -5);
        }
        renderMeme();
    }

}

function onChangeFontFamily(font) {
    if (gMeme.selectedLine) {
        changeFontFmaily(gMeme.selectedLine, font);
        renderMeme();
    }
}

function onClickCanvas(ev) {
    var mouseX = ev.clientX - gCanvas.offsetLeft;
    var mouseY = ev.clientY - gCanvas.offsetTop;

    // check if clicked on line
    var line = gMeme.txts.find(line => {
        return (mouseY < line.y + 10 && mouseY > line.y - line.size - 5
            && mouseX < line.width + line.x + 10 && mouseX > line.x - 10);
    });

    // if clicked on different line
    if (gMeme.selectedLine !== line) {
        // if there was a line selected before
        if (gMeme.selectedLine) {
            gMeme.selectedLine.isSelected = false;
        }
        // if a line was selected
        if (line) {
            line.isSelected = true;
            // if no line selected - go to add new line editor
        } else {
            onAddNewLine();
            // renderTextEditor();
        }
        gMeme.selectedLine = line;
    }

    // render text editor according to line
    renderTextEditor(line);

    renderMeme();
}

function onAddNewLine() {
    // if there is a line selected - remove selection and render text editor
    if (gMeme.selectedLine) {

        // if line selected is empty - remove it from array
        if (gMeme.selectedLine.txt === '') {
            deleteLine(gMeme.selectedLine);
        } else {
            gMeme.selectedLine.isSelected = false;
        }

        gMeme.selectedLine = undefined;
        renderMeme();
        renderTextEditor();
    }
}

function renderTextEditor(line) {
    var elHeadline = document.querySelector('.editorHeadline');
    var elColor = document.querySelector('.colorInput');
    var elTextInput = document.querySelector('.textInput');
    var elFont = document.querySelector('.fontSeletor');

    // if there is line selected
    if (line) {
        elHeadline.innerHTML = 'Edit Line';
        // update values
        elColor.value = line.color;
        elTextInput.value = line.txt;
        elFont.value = line.fontFamily;
    } else {
        elHeadline.innerHTML = 'New Line Editor';
        elColor.value = '#000000';
        elTextInput.value = '';
        elFont.value = 'impact';
    }
}

function markLine(line) {
    // If line is not empty
    if (line.txt) {
        gCtx.beginPath();
        gCtx.moveTo(line.x - 10, line.y - line.size - 5);
        gCtx.lineTo(line.x + line.width + 10, line.y - line.size - 5);
        gCtx.lineTo(line.x + line.width + 10, line.y + 10);
        gCtx.lineTo(line.x - 10, line.y + 10);
        gCtx.lineTo(line.x - 10, line.y - line.size - 5);
        gCtx.strokeStyle = 'red';
        gCtx.stroke();
    }
}

function renderKeywords() {

}

// INJECT UL-> LI IMAGES TO GALLERY DIV
function renderGallery(imgs) {
    //TODO: get gallery function - instead of global var
    var elGallery = document.querySelector('.gallery-items');

    var strHtml = '<ul>';
    for (var i = 0; i < imgs.length; i++) {
        strHtml += `    <li class="gallery-img">
                        <img src="${imgs[i].url}" data-id="${imgs[i].id}" onclick="onSelectImg('${imgs[i].id}')">
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

    // init canvas
    initCanvas();
    createMeme(id);
    renderMeme();
}

function returnToGallery(ev) {
    // ev.preventDefault();
    document.body.classList.add('gallery');
    document.querySelector('.gallery-items').style.display = 'inherit';
    initGallery();

    // document.body.sy
    // document.querySelector('.gallery-items').style.display = 'block';
    // document.querySelector('.meme-container').style.display = 'none';
}

function onDownloadImage(el, ev) {
    downloadCanvas(el);
}

function onEraseClick() {
    eraseEl();
}

function onMoveCanvasEl(direction) {
    moveCanvasEl(direction);
}

function onUploadImgBtn(ev) {
    // handleImageFromInput(ev, drawImgOnCanvas);
    handleImageFromInput(ev, uploadNewImg);
    // handleImageFromInput(ev, createImg);

}

function onKeywordSelect(keyword){
    updateKeyWordsMap(keyword);
    var imgs = getImgsByFilter(keyword);
    renderGallery(imgs);
    // console.log(keyword);
}