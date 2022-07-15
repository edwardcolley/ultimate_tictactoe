!function(){

  // build 2D array. A board size of 3 would result with:
  // [
  //   [null, null, null],
  //   [null, null, null],
  //   [null, null, null],
  // ]
  const getBoardState = (boardSize) => {
    return new Array(boardSize).fill().map(() => {
      return new Array(boardSize).fill(null);
    });
  }


  let boardSize = 3;
  let boardState = getBoardState(boardSize);
  let winCondition = 3;
  // let nextMoveX = false;
  let showModal = false;
  let xWinState = 0;
  let oWinState = 0;

  let playerCount = 2;

  // gets charCode and converts to alphabet for possible multiple players
  const alpha = Array.from(Array(26)).map((e, i) => i + 65);
  const players = alpha.map((x) => String.fromCharCode(x));
  players.unshift('O', 'X');

  let playersArr = players.filter((player, index) => index < playerCount)
  let currentTurn = 0;

  const app = document.querySelector('.container');

  const addPlayerMove = (element) => {
    const currentPlayerValue = playersArr[currentTurn];
    const currentElement = element;
    const currentElementRow = Number(currentElement.getAttribute('row'));
    const currentElementCell = Number(currentElement.getAttribute('cell'));

    boardState[currentElementRow][currentElementCell] = currentPlayerValue;
    
    checkIfWin(boardState, winCondition)
    render();

    if ((currentTurn + 1) >= playerCount) {
      currentTurn = 0;
      return;
    }
    currentTurn++;
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

  const checkIfWin = (boardState, winCondition) => {

    const getChainLength = (match) => {
      let chainLength = 2;
      const incrementIfMatch = (otherMatch) => {
        if (otherMatch.match) {
          chainLength = chainLength + 1;
          incrementIfMatch(otherMatch.match)
        }
      }
      incrementIfMatch(match);
      return chainLength;
    };

    const getMatchingCells = (rowIndex, cellIndex, direction) => {
      const currentCellValue = boardState[rowIndex][cellIndex];
      const belowCellValue = (boardState[rowIndex + 1] || [])[cellIndex] || null;
      const rightCellValue = (boardState[rowIndex] || [])[cellIndex + 1] || null;

      const leftDiagonalCellValue = (boardState[rowIndex + 1] || [])[cellIndex - 1] || null;
      const rightDiagonalCellValue = (boardState[rowIndex + 1] || [])[cellIndex + 1] || null;

      const arrayToReturn = [];

      const directionMatches = cellDirection => {
        return !direction || direction === cellDirection;
      };

      if (belowCellValue === currentCellValue && directionMatches('below')) {
        arrayToReturn.push({
          row: rowIndex + 1,
          cell: cellIndex,
          direction: 'below',
          value: currentCellValue,
          match: getMatchingCells(rowIndex + 1, cellIndex, 'below')[0],
        })
      }
      if (rightCellValue === currentCellValue && directionMatches('right')) {
        arrayToReturn.push({
          row: rowIndex,
          cell: cellIndex + 1,
          direction: 'right',
          value: currentCellValue,
          match: getMatchingCells(rowIndex, cellIndex + 1, 'right')[0],
        })
      }
      if (rightDiagonalCellValue === currentCellValue && directionMatches('rightDiagonal')) {
        arrayToReturn.push({
          row: rowIndex + 1,
          cell: cellIndex + 1,
          direction: 'rightDiagonal',
          value: currentCellValue,
          match: getMatchingCells(rowIndex + 1, cellIndex + 1, 'rightDiagonal')[0],
        })
      }
      if (leftDiagonalCellValue === currentCellValue && directionMatches('leftDiagonal')) {
        arrayToReturn.push({
          row: rowIndex + 1,
          cell: cellIndex - 1,
          direction: 'leftDiagonal',
          value: currentCellValue,
          match: getMatchingCells(rowIndex + 1, cellIndex - 1, 'leftDiagonal')[0],
        })
      }
      return arrayToReturn;
    }

    boardState.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {

        if (cell === null) return;

        const matches = getMatchingCells(rowIndex, cellIndex);
        if (!matches.length) return;

        matches.forEach((match) => {
          const chainLength = getChainLength(match);
          if (chainLength === winCondition) {
            console.log(match);
            match.value === 'X' ? xWinState++ : oWinState++;
            changeScoreboard();
            showWinnerModal(match.value);
          }
        })
      });
    });
  };

  const resetBoard = () => {
    // creates 2D null array for boardState
    boardState = new Array(boardSize).fill().map(() => {
      return new Array(boardSize).fill(null);
    });
    render();
  };

  const changeBoardSize = () => {
    if (boardSize === 3) {
      boardSize = 8;
      winCondition = 5;
      boardState = getBoardState(boardSize);
      render();
    } else if (boardSize !== 3) {
      boardSize = 3;
      winCondition = 3;
      boardState = getBoardState(boardSize);
      render();
    }
  };

  const setupEventListeners = () => {
    const cards = document.querySelectorAll('.cell-container');
    const closeModalBtn = document.querySelector(".close");
    const newGameBtn = document.querySelector('#new-game-btn');
    const changeBoardBtn = document.querySelector('#change-board-btn');

    cards.forEach((card) => {
      card.addEventListener('click', (e) => {
        const currentElement = e.target;
        addPlayerMove(currentElement);
      });
    });

    closeModalBtn.addEventListener('click', showWinnerModal);
    newGameBtn.addEventListener('click', resetBoard);
    changeBoardBtn.addEventListener('click', changeBoardSize)
  }

  const changeScoreboard = () => {
    const xWins = document.querySelector('.xwin-score');
    const oWins = document.querySelector('.owin-score');


    xWins.textContent = `X Wins: ${xWinState}`;
    oWins.textContent = `O Wins: ${oWinState}`;
  }

  const render = () => {
    console.log('playerState: ', playersArr);
    app.innerHTML = 
      `<div class="board" >
        ${boardState.map((row, rowIndex) => `
          <div class="row-container" row="${rowIndex}">
            ${row.map((cell, cellIndex) => `
              <div class="cell-container ${boardState[rowIndex][cellIndex] === 'X' ? 'x-move' : ''} ${boardState[rowIndex][cellIndex] === 'O' ? 'o-move' : ''}" 
                row="${rowIndex}" 
                cell="${cellIndex}">
                ${boardState[rowIndex][cellIndex] === null ? '' : boardState[rowIndex][cellIndex]}
              </div>
            `).join('')}
          </div>
        `).join('')}
      </div>`
    setupEventListeners();
  }
  
  render();
  
}();