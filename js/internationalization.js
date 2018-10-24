
// Internationalization and localization
var gLanguage = 'eng';
var language = [{}]

// object with all translation
var gTranslations = {
    eng: {
        isRtl: false,
        title: 'meme\'tasek?',
        headlayers: 'Layers',
        btnback: 'Back',
        btnacces: 'Accessibility',
        btnshare: 'Share',
        btnupload: 'Upload',
        btndownload: 'Download',
        headfooter: '⛬ SHARE WITH LOVE ❤',

    },
    heb: {
        isRtl: true,
        title: 'מימ\'תעסק?',
        headlayers: 'שכבות',
        btnback: 'חזרה',
        btnacces: 'נגישות',
        btnshare: 'שיתוף',
        btnupload: 'העלאה',
        btndownload: 'הורדה',
        headfooter: '⛬  שתפו באהבה  ❤',
    }
}

var gTranslationsTitles = {
    eng: {
        btnback: 'Back to Gallery',
        btnacces: 'Change to accessibility mode',
        btnshare: 'Share with friends',
        btnupload: 'Upload to server',
        btndownload: 'Download image',
    },
    heb: {
        btnback: 'חזרה לגלריה',
        btnacces: 'עבור למצב נגישות',
        btnshare: 'שיתוף לחברים',
        btnupload: 'העלאה לשרת',
        btndownload: 'הורדה',
    }
}

function getUserLang() {
    return gLanguage;
}

function changeLanguage(lang) {
    // console.log(lang);
    gLanguage = lang;
    translateElements(lang);
    translateElementsTitle(lang);
    if (gTranslations[lang].isRtl) document.body.classList.add('rtl');
    else document.body.classList.remove('rtl');
}

function translateElements(lang) {
    // select all the element with data attribute - for each - translate;
    var translateEls = document.querySelectorAll('[data-translate]');
    for (var i = 0; i < translateEls.length; i++) {
        var translateEl = translateEls[i];
        var translate = translateEl.dataset.translate;
        
        // console.log(translateEl.dataset.translate);
        translateEl.innerText = gTranslations[lang][translate];
    }
    //render all

}
function translateElementsTitle(lang) {
    // select all the element with data attribute - for each - translate title;
    var translateEls = document.querySelectorAll('[data-translate]');
    for (var i = 0; i < translateEls.length; i++) {
        var translateEl = translateEls[i];
        if (translateEl.title) {
        var translate = translateEl.dataset.translate;
        translateEl.title = gTranslationsTitles[lang][translate];

    }
        
        // console.log(translateEl.dataset.translate);
    }
    //render all
}

// var iconActionTitle = document.querySelectorAll('.btn.btn-control');

// console.log('here',iconActionTitle);
// console.log('title',iconActionTitle[0].title);