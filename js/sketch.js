'use strict'

alert('Hi there, you can click spacebar to switch between paint-erase buttons');

let gridBoxesContainer = document.querySelector('.universal-container .grid-box');

//this array will store the boxes that will store the tiny-boxes"the final boxes form"
let tallBoxesHolder = [];

function drawBoxes(boxNumbersX = 16)
{
    /* freeUp the array: remove the "old-tallContainers" */
    tallBoxesHolder.splice(0, (tallBoxesHolder.length));

    for(let i = 0; i < boxNumbersX; ++i)
    {
        let tallBox = document.createElement('div');
        tallBox.setAttribute('class', 'tall-container');
        tallBoxesHolder.push(tallBox);
    }

    for(let tallBox of tallBoxesHolder)
    {
        for(let i = 0; i < boxNumbersX; ++i)
        {
            let tinyBox = document.createElement('div');
            tinyBox.setAttribute('class', 'tiny-box');
            tallBox.appendChild(tinyBox);
        }
    }

    for(let tallBox of tallBoxesHolder)
    {
        gridBoxesContainer.appendChild(tallBox);
    }


}

//initial call: when the page is loaded draw "16x16" grid-boxes
drawBoxes();


/* for the gridSizeSlider and what is related to it.....................*/
//for the gridSizeSlider
let gridSizeSlider = document.querySelector('#gridSizeSlider');
let gridBoxSizeDisplay = document.querySelector('#rangeOutput');

gridSizeSlider.addEventListener('input', displayData);
function displayData()
{
    gridBoxSizeDisplay.textContent = `${this.value} x ${this.value}`;
}

//make number-of-boxes responsive to gridSizeSlider: '#gridSizeSlider'
const submitBtn = document.querySelector('.submitBtn');
submitBtn.addEventListener('click', redrawBoxes);
let newBoxNumbers = 0;
function redrawBoxes()
{
    removeTallBoxes();//it removes Everything since tinyBoxes are contained in the tallBoxes
    newBoxNumbers = +(gridSizeSlider.value);
    drawBoxes(newBoxNumbers);
}

function removeTallBoxes()
{
    //we only need to remove the tallBoxes and all the boxes 'tinyBoxes also' will ...
    //be removed, since the the tinyBoxes are contained in the tallBoxes 
    for(let tallBox of tallBoxesHolder)
    {
        tallBox.remove();
    }
}
/*.......................................................*/

/* for sketching; painting and erasing ..................*/
let gridBoxClicksCount = 0;

gridBoxesContainer.addEventListener('click', checkPaintStatus);

let paintTruth = true;
let eraseTruth = false;

function checkPaintStatus()
{
    if(paintTruth === true)
    {
        paint();
    }
    else if(eraseTruth === true)
    {
        erase();
    }

}

//paint: start
function paint()
{
    const smallGridBoxes = document.querySelectorAll('.universal-container .grid-box .tall-container .tiny-box');
    if(gridBoxClicksCount % 2 === 0)
    {
        ++gridBoxClicksCount;
        for(let box of smallGridBoxes)
        {
            box.removeEventListener('mouseover', eraseBoxes);
            box.addEventListener('mouseover', paintBoxes);
        }
    }
    else if(gridBoxClicksCount % 2 === 1)
    {
        ++gridBoxClicksCount;
        for(let box of smallGridBoxes)
        {
            box.removeEventListener('mouseover', eraseBoxes);
            box.removeEventListener('mouseover', paintBoxes);
        }
    }

}

function paintBoxes()
{
    this.style.backgroundColor ='red';
}
// paint: end..................................................

//erase: start .......................................
function erase()
{
    const smallGridBoxes = document.querySelectorAll('.universal-container .grid-box .tall-container .tiny-box');
    if(gridBoxClicksCount % 2 === 0)
    {

        ++gridBoxClicksCount;
        for(let box of smallGridBoxes)
        {
            box.removeEventListener('mouseover', paintBoxes);
            box.addEventListener('mouseover', eraseBoxes);
        }
    }
    else if(gridBoxClicksCount % 2 === 1)
    {
        ++gridBoxClicksCount;
        for(let box of smallGridBoxes)
        {
            box.removeEventListener('mouseover', paintBoxes);
            box.removeEventListener('mouseover', eraseBoxes);
        }
    }
}

function eraseBoxes()
{
    this.style.backgroundColor ='white';
}
// erase: end..................................................

/* paint and erase buttons ...................................*/
//paint-button
const paintBtn = document.querySelector('.paintBtn');
paintBtn.addEventListener('click', paintBtnClicked);

function paintBtnClicked()
{
    gridBoxClicksCount = 1;

    paint();
    paintTruth = true;
    eraseTruth = false;

    eraseBtn.classList.remove('btnClicked');
    paintBtn.classList.remove('btnNotClicked');


    paintBtn.classList.add('btnClicked');
    eraseBtn.classList.add('btnNotClicked');
}

//erase-button
const eraseBtn = document.querySelector('.eraseBtn');
eraseBtn.addEventListener('click', eraseBtnClicked);
function eraseBtnClicked()
{
    gridBoxClicksCount = 1;

    erase();
    paintTruth = false;
    eraseTruth = true;

    paintBtn.classList.remove('btnClicked');
    eraseBtn.classList.remove('btnNotClicked');

    eraseBtn.classList.add('btnClicked');
    paintBtn.classList.add('btnNotClicked');
}

//add a keyListener to spaceButton,
//when it is clicked it will switch between sketch buttons

// add keyListener
window.addEventListener('keydown', keyCheck);

function keyCheck(e)
{
    if(e.keyCode === 32)
    {
        if(paintTruth === true)
        {
            eraseBtnClicked();
        }
        else {
            paintBtnClicked();
        }
    }
}

//show/hideLines-button
const showHideLinesBtn = document.querySelector('.menu .showHideLines');
showHideLinesBtn.addEventListener('click', showHideLines);

function showHideLines()
{
    const tinyBoxes = document.querySelectorAll('.universal-container .grid-box .tiny-box')
    for(let tinyBox of tinyBoxes)
    {
        tinyBox.classList.toggle('remove-tiny-box-border');
    }
}
