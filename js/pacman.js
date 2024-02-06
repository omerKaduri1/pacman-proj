'use strict'

const PACMAN = '😀'
var gPacman

function createPacman(board) {
    // DONE: initialize gPacman...
    gPacman = {
        location: {
            i: 2,
            j: 2
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function onMovePacman(ev) {
    if (!gGame.isOn) return
    const nextLocation = getNextLocation(ev.key)
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    if (nextCell === WALL) return

    if (nextCell === SUPER_FOOD) {
        if (gPacman.isSuper) return
        gPacman.isSuper = true
        changeGhostColor()
        playSuperEatSound()
        setTimeout(() => {
            gPacman.isSuper = false
            returnGhost()
            changeGhostColor()
        }, 5000)
    }

    if (nextCell === GHOST) {
        if (gPacman.isSuper) {
            removeGhost(nextLocation)
            playEatGhostSound()
        } else {
            gameOver()
            playDeathSound
            return
        }
    }

    if (nextCell === FOOD) {
        gFoodCount--
        updateScore(1)
        playEatFoodSound()
    }

    if (nextCell === CHERRY) {
        updateScore(10)
        playSuperEatSound()
    }


    if (checkVictory()) gameOver()


    // DONE: moving from current location:
    // DONE: update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // DONE: update the DOM
    renderCell(gPacman.location, EMPTY)

    // DONE: Move the pacman to new location:
    // DONE: update the model
    gPacman.location = nextLocation
    gBoard[nextLocation.i][nextLocation.j] = PACMAN
    // DONE: update the DOM
    renderCell(nextLocation, PACMAN)
}

function getNextLocation(eventKeyboard) {
    var className = ''
    const nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard) {
        case 'ArrowUp':
            nextLocation.i--
            break;
        case 'ArrowRight':
            nextLocation.j++
            break;
        case 'ArrowDown':
            nextLocation.i++
            break;
        case 'ArrowLeft':
            nextLocation.j--
            break;
    }
    return nextLocation
}

function checkVictory() {
    return gFoodCount === 0
}