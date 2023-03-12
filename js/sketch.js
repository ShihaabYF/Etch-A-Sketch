'use strict'

let gridBoxesContainer = document.querySelector('.universal-container .grid-box');

//this array will store the boxes that will store the tiny-boxes"the final boxes form"
let subGridContainer = [];

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
