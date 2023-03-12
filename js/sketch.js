'use strict'

let gridBoxesContainer = document.querySelector('.universal-container .grid-box');

//this array will store the boxes that will store the tiny-boxes"the final boxes form"
let subGridContainer = [];//change the name to tallBoxesHolder: it is a more descriptive name

function drawBoxes(boxNumbersX = 16)
{
    /* freeUp the array */
    subGridContainer.splice(0, (subGridContainer.length));

    for(let i = 0; i < boxNumbersX; ++i)
    {
        let tallBox = document.createElement('div');
        tallBox.setAttribute('class', 'tall-container');
        subGridContainer.push(tallBox);
    }

    for(let tallBox of subGridContainer)
    {
        for(let i = 0; i < boxNumbersX; ++i)
        {
            let tinyBox = document.createElement('div');
            tinyBox.setAttribute('class', 'tiny-box');
            tallBox.appendChild(tinyBox);
        }
    }

    for(let tallBox of subGridContainer)
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
    for(let tallBox of subGridContainer)
    {
        tallBox.remove();
    }
}
/*.......................................................*/