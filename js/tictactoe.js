function initTicTacToe() {
    const board = document.getElementById('tic-tac-toe-board');
    board.innerHTML = Array(9).fill('<div></div>').join('');
    
    const cells = board.querySelectorAll('div');
    let currentPlayer = 'X';
    let gameActive = true;

    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    function handleCellClick(e) {
        const cell = e.target;
        
        if(cell.textContent === '' && gameActive) {
            cell.textContent = currentPlayer;
            
            if(checkWin()) {
                alert(`${currentPlayer} wins!`);
                gameActive = false;
                return;
            }
            
            if(checkDraw()) {
                alert("It's a draw!");
                gameActive = false;
                return;
            }
            
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            
            if(currentPlayer === 'O') {
                setTimeout(computerMove, 500);
            }
        }
    }

    function computerMove() {
        if(!gameActive) return;
        
        const emptyCells = [...cells].filter(cell => cell.textContent === '');
        if(emptyCells.length === 0) return;
        
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        emptyCells[randomIndex].textContent = 'O';
        
        if(checkWin()) {
            alert('O wins!');
            gameActive = false;
            return;
        }
        
        if(checkDraw()) {
            alert("It's a draw!");
            gameActive = false;
            return;
        }
        
        currentPlayer = 'X';
    }

    function checkWin() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6]             // diagonals
        ];
        
        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return cells[a].textContent && 
                   cells[a].textContent === cells[b].textContent && 
                   cells[a].textContent === cells[c].textContent;
        });
    }

    function checkDraw() {
        return [...cells].every(cell => cell.textContent !== '');
    }
}
