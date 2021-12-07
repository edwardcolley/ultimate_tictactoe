!function(){
  let newBoardSize = 3;

  // build 2D array. A board size of 3 would result with:
  // [
  //   [null, null, null],
  //   [null, null, null],
  //   [null, null, null],
  // ]
  let boardState = new Array(newBoardSize).fill(new Array(newBoardSize).fill(null))
  // let largeBoardState = [
  //   [null, null, null, null, null, null],
  //   [null, null, null, null, null, null],
  //   [null, null, null, null, null, null],
  //   [null, null, null, null, null, null],
  //   [null, null, null, null, null, null],
  //   [null, null, null, null, null, null],
  // ]
  // let boardSize = [
  //   {
      // size: 'small',
      // active: true,
      // squares: 9,
      // containerClassName: 'grid-container',
      // itemClassName: 'grid-item',
    // },
    // {
      // size: 'large',
      // active: false,
      // squares: 36,
      // containerClassName: 'large-grid-container',
      // itemClassName: 'large-grid-item',
    // },
  // ];
  let nextMoveX = false;
  let showModal = false;
  let xWinState = 0;
  let oWinState = 0;


  const app = document.querySelector('.container');

  const changeBoardState = (playerSymbol, currentElemId) => {
    // const [ small, large ] = boardSize;
    // if (small.active) {
    //   if (currentElemId <= 3) {
    //     boardState[0][currentElemId - 1] = playerSymbol;
    //     return;
    //   };
    //   if (currentElemId <= 6) {
    //     boardState[1][currentElemId - 4] = playerSymbol;
    //     return;
    //   }
    //   if (currentElemId <= 9) {
    //     boardState[2][currentElemId - 7] = playerSymbol;
    //     return;
    //   }
    // }

    // if (large.active) {
    //   if (currentElemId <= 6) {
    //     largeBoardState[0][currentElemId - 1] = playerSymbol;
    //     return;
    //   };
    //   if (currentElemId <= 12) {
    //     largeBoardState[1][currentElemId - 7] = playerSymbol;
    //     return;
    //   }
    //   if (currentElemId <= 18) {
    //     largeBoardState[2][currentElemId - 13] = playerSymbol;
    //     return;
    //   }
    //   if (currentElemId <= 24) {
    //     largeBoardState[3][currentElemId - 19] = playerSymbol;
    //     return;
    //   };
    //   if (currentElemId <= 30) {
    //     largeBoardState[4][currentElemId - 25] = playerSymbol;
    //     return;
    //   }
    //   if (currentElemId <= 36) {
    //     largeBoardState[5][currentElemId - 31] = playerSymbol;
    //     return;
    //   }
    // }
    console.log(currentElemId);
  }

  const addPlayerMove = (event) => {
    const copyBoardState = [ [ ...boardState[0] ], [ ...boardState[1] ], [ ...boardState[2] ] ]
    console.log('boardstate from addplayermove: ', copyBoardState);
    const currentElement = event.target;
    const currentElemRow = parseInt(currentElement.getAttribute('row'));
    const currentElemCell = parseInt(currentElement.getAttribute('cell'));
    console.log('row: ', currentElemRow);
    console.log('cell: ', currentElemCell);
    // const [ small, large ] = boardSize;

    //move to render method
    // currentElement.insertAdjacentHTML('afterbegin', nextMoveX ? '<div class="x-move">X</div>' : '<div class="o-move">O</div>');
    // currentElement.removeEventListener('click', addPlayerMove);
    
    // if (nextMoveX) {
    //   changeBoardState('x', currentElemId);
    //   if (small.active) {
    //     checkIfWin(boardState, 'x');
    //   }
    //   if (large.active) {
    //     checkIfWin(largeBoardState, 'x');
    //   }
    // } else {
    //   changeBoardState('o', currentElemId);
    //   if (small.active) {
    //     checkIfWin(boardState, 'o');
    //   }
    //   if (large.active) {
    //     checkIfWin(largeBoardState, 'o');
    //   }
    // }
    console.log('current event.target: ', event.target)
    if (nextMoveX) {
      console.log('board square before state change', boardState[currentElemRow][currentElemCell])
      boardState[currentElemRow][currentElemCell] = 'X'
      console.log('board square after state change', boardState[currentElemRow][currentElemCell])
    } else {
      boardState[currentElemRow][currentElemCell] = 'O'
    }
    console.log('boardstate from addplayermove before render: ', boardState);

    // checkIfWin()
    nextMoveX = !nextMoveX;
    render();
  }

  const toggleModal = () => {
    showModal = !showModal;
  }

  const showWinnerModal = (direction) => {
    const modal = document.querySelectorAll('#myModal')[0];
    const modalContent = document.querySelectorAll('#modal-text')[0]
    modalContent.textContent = `${direction} wins!`;
    
    toggleModal();

    if (showModal) {
      modal.style.display = "block";
    } else {
      modal.style.display = "none";
    }
  }

  const changeBoardSize = () => {
    const [ small, large ] = boardSize;
    small.active = !small.active;
    large.active = !large.active;
    render();
  }

  const clearBoard = () => {};

  const changeScoreboard = () => {
    const xWins = document.querySelector('.xwin-score');
    const oWins = document.querySelector('.xwin-score');

    console.log(xWinState, oWinState);

    xWins.textContent = `X Wins: ${xWinState}`;
    oWins.textContent = `O Wins: ${oWinState}`;
  }

  // const checkIfWin = (boardState) => {

  //   const getMatchingCells = (rowIndex, cellIndex) => {
  //     const currentCell = boardState[rowIndex][cellIndex];
  //     const below = (boardState[rowIndex + 1] || [])[cellIndex] || null;
  //     const right = (boardState[rowIndex] || [])[cellIndex + 1] || null;

  //     const leftDiagonal = (boardState[rowIndex + 1] || [])[cellIndex - 1] || null;
  //     const rightDiagonal = (boardState[rowIndex + 1] || [])[cellIndex + 1] || null;

  //     const arrayToReturn = [];

  //     if (below === currentCell) {
  //       arrayToReturn.push({
  //         row: rowIndex + 1,
  //         cell: cellIndex,
  //         direction: 'below',
  //         value: currentCell,
  //       })
  //     }
  //     if (right === currentCell) {
  //       arrayToReturn.push({
  //         row: rowIndex,
  //         cell: cellIndex + 1,
  //         direction: 'right',
  //         value: currentCell,
  //       })
  //     }
  //     if (rightDiagonal === currentCell) {
  //       arrayToReturn.push({
  //         row: rowIndex + 1,
  //         cell: cellIndex + 1,
  //         direction: 'rightDiagonal',
  //         value: currentCell,
  //       })
  //     }
  //     if (leftDiagonal === currentCell) {
  //       arrayToReturn.push({
  //         row: rowIndex + 1,
  //         cell: cellIndex - 1,
  //         direction: 'leftDiagonal',
  //         value: currentCell,
  //       })
  //     }
  //     return arrayToReturn;
  //   }

  //   boardState.forEach((row, rowIndex) => {
  //     row.forEach((cell, cellIndex) => {

  //       if (cell === null) return;

  //       const matches = getMatchingCells(rowIndex, cellIndex);
  //       if (!matches.length) return;

  //       matches.forEach((match) => {
  //         const nextMatches = getMatchingCells(match.row, match.cell)
  //         const [ small, large ] = boardSize;

  //         const nextMatchInSequence = nextMatches.find((nextMatch) => {
  //           return nextMatch.direction === match.direction
  //         })
  //         if (nextMatchInSequence && small.active) {
  //           match.value === 'x' ? xWinState++ : oWinState++;
  //           changeScoreboard();
  //           showWinnerModal(match.value);
  //         }

  //         if(nextMatchInSequence && large.active) {
  //           nextMatches.forEach((match) => {
  //             const fourthMatchInSequence = getMatchingCells(match.row, match.cell);
              
  //             fourthMatchInSequence.forEach((match) => {
  //               const fifthMatchingSequence = getMatchingCells(match.row, match.cell);
                
  //               if (fifthMatchingSequence[0] && fifthMatchingSequence[0].direction === match.direction) {
  //                 match.value === 'x' ? xWinState++ : oWinState++;
  //                 changeScoreboard();
  //                 showWinnerModal(match.value);
  //               }
  //             })
  //           })
  //         }
  //       })

  //     });
  //   });
  // };

  const setupEventListeners = () => {
    const card = document.querySelectorAll('.cell-container');
    // const largeGameCard = document.getElementsByClassName('large-grid-item');
    // const closeModalBtn = document.querySelector(".close")[0];
    // const newGameBtn = document.querySelectorAll('#new-game-btn')[0];
    // const changeBoard = document.querySelectorAll('#change-board-btn')[0];

    Array.from(card).forEach((div) => {
      div.addEventListener('click', addPlayerMove);
    })
    // Array.from(largeGameCard).forEach((div) => {
    //   div.addEventListener('click', addPlayerMove);
    // })
    // closeModalBtn.addEventListener('click', showWinnerModal);
    // newGameBtn.addEventListener('click', () => render());
    // changeBoard.addEventListener('click', changeBoardSize);
  }

  const render = () => {
    console.log(boardState);
    // const [ small, large ] = boardSize;
    // let arrayOfCards = [];

    // if (small.active){
    //   for (let i = 1; i <= small.squares; i++) {
    //     arrayOfCards.push(`<div id="${i}" class=${small.itemClassName}></div>`);
    //   }
    // }

    // if (large.active) {
    //   for (let i = 1; i <= large.squares; i++) {
    //     arrayOfCards.push(`<div id="${i}" class=${large.itemClassName}></div>`);
    //   }
    // }

    // const newUi = arrayOfCards.join('');
    app.innerHTML = 
      `<div class="board" >
        ${boardState.map((row, rowIndex) => `
          <div class="row-container" row="${rowIndex}">
            ${row.map((cell, cellIndex) => `
              <div class="cell-container" row="${rowIndex}" cell="${cellIndex}"></div>
            `).join('')}
          </div>
        `).join('')}
      </div>`
    setupEventListeners();
  }
  
  render();
  
}();