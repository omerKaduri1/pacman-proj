'use strict'

const WALL = '🧱'
const FOOD = '▫️'
const EMPTY = ' '
const SUPER_FOOD = '🍔'
const CHERRY = '🍒'

// Model
const gGame = {
    score: 0,
    isOn: false
}
var gBoard
var gFoodCount
var gCherryInterval

function onInit() {
    updateScore(0)
    gBoard = buildBoard()
    createGhosts(gBoard)
    createPacman(gBoard)
    renderBoard(gBoard)
    gGame.isOn = true
    hideModal()
    if (gCherryInterval) clearInterval(gCherryInterval)
    gCherryInterval = setInterval(addCherry, 15000)
    // moveGhosts()
}

function buildBoard() {
    gFoodCount = 0
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])

        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD
            gFoodCount++

            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
                gFoodCount--
            }

            if (i === 2 && j === 2) gFoodCount--

            if (i === 1 && j === 1 || i === 1 && j === size - 2 ||
                i === size - 2 && j === 1 || i === size - 2 && j === size - 2) {
                board[i][j] = SUPER_FOOD
                gFoodCount--
            }
        }
    }
    return board
}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {

            const cell = board[i][j]
            const className = `cell cell-${i}-${j}`

            strHTML += `<td class="${className}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    const elContainer = document.querySelector('.board')
    elContainer.innerHTML = strHTML
}

function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}

function updateScore(diff) {
    // DONE: update model and dom
    if (!diff) {
        gGame.score = 0
    } else {
        gGame.score += diff
    }
    document.querySelector('span.score').innerText = gGame.score
}

function addCherry() {
    const pos = getEmptyPos()
    if (!pos) return
    else gBoard[pos.i][pos.j] = CHERRY

    renderCell(pos, CHERRY)
}

function gameOver() {
    showModal()
    clearInterval(gIntervalGhosts)
    clearInterval(gCherryInterval)
    renderCell(gPacman.location, '🪦')
    gGame.isOn = false
}

function showModal() {
    const elModal = document.querySelector('.modal')
    elModal.classList.remove('hide')
    var isVictory = checkVictory()
    console.log('isVictory:', isVictory)
    if (isVictory) {
        elModal.querySelector('h2').innerText = 'Victorious!'
    }
}

function hideModal() {
    const elModal = document.querySelector('.modal')
    elModal.classList.add('hide')
}

function playEatFoodSound() {
    const eatSound = new Audio('sounds/eat.wav')
    eatSound.play()
}

function playSuperEatSound() {
    const superEatSound = new Audio('sounds/supereat.wav')
    superEatSound.play()
}

function playEatGhostSound() {
    const eatGhostSound = new Audio('sounds/eatghost.wav')
    eatGhostSound.play()
}

function playDeathSound() {
    const deathSound = new Audio('sounds/death.wav')
    deathSound.play()
}