function init(){
var canvasEl = document.getElementById("canvas");
var ctx = canvasEl.getContext("2d");


var containerWidth = document.querySelector('main').offsetWidth;
var containerHeight = document.querySelector('main').offsetHeight;
canvasEl.width = containerWidth;
canvasEl.height = containerHeight;
console.log(containerWidth);
console.log(containerHeight);
}

function underConstraction(el){
    event.preventDefault();
    console.log('Under Constraction',el);
}




// // SELECTORS
// var iconAction = document.querySelectorAll('aside li .far');
// console.log('here',iconAction);

// var iconActionTitle = document.querySelectorAll('.btn.btn-control');

// console.log('here',iconActionTitle);
// console.log('title',iconActionTitle[0].title);