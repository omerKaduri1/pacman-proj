'use strict'

const GHOST = '👻'
var gGhosts = []
var gOriginalGhostsClr = []
var gDeadGhosts = []
var gIntervalGhosts

function createGhosts(board) {
    // DONE: 3 ghosts and an interval
    gGhosts = []
    for (var i = 0; i < 3; i++) {
        createGhost(board)
    }

    if (gIntervalGhosts) clearInterval(gIntervalGhosts)
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function createGhost(board) {
    // DONE
    const ghost = {
        location: {
            i: 2,
            j: 6
        },
        currCellContent: FOOD,
        color: getRandomColor()
    }

    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST
}

function moveGhosts() {
    // DONE: loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        const ghost = gGhosts[i]
        moveGhost(ghost)
    }
}

function moveGhost(ghost) {
    // DONE: figure out moveDiff, nextLocation, nextCell
    const moveDiff = getMoveDiff()
    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // DONE: return if cannot move
    if (nextCell === WALL) return
    if (nextCell === GHOST) return
    if (nextCell === SUPER_FOOD) return

    // // DONE: hitting a pacman? call gameOver
    if (nextCell === PACMAN) {
        if (gPacman.isSuper) {
            return
        }
        else {
            gameOver()
            playDeathSound()
            return
        }
    }


    // DONE: moving from current location:
    // DONE: update the model 
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // DONE: update the DOM
    renderCell(ghost.location, ghost.currCellContent)


    // DONE: Move the ghost to new location:
    // DONE: update the model 
    ghost.location = nextLocation
    ghost.currCellContent = nextCell
    gBoard[nextLocation.i][nextLocation.j] = GHOST
    // DONE: update the DOM
    renderCell(ghost.location, getGhostHTML(ghost))
}

function getMoveDiff() {
    const randNum = getRandomIntInclusive(1, 4)

    switch (randNum) {
        case 1: return { i: 0, j: 1 }
        case 2: return { i: 1, j: 0 }
        case 3: return { i: 0, j: -1 }
        case 4: return { i: -1, j: 0 }
    }
}

function changeGhostColor() {
    for (var i = 0; i < gGhosts.length; i++) {
        gOriginalGhostsClr.push(gGhosts[i].color)
    }

    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i]
        ghost.color = gPacman.isSuper ? 'blue' : gOriginalGhostsClr[i]
        renderCell(ghost.location, getGhostHTML(ghost))
    }
}

function removeGhost(location) {
    for (var i = 0; i < gGhosts.length; i++) {
        const currGhost = gGhosts[i]
        if (location.i === currGhost.location.i &&
            location.j === currGhost.location.j) {
            const deletedGhost = gGhosts.splice(i, 1)[0]
            if (deletedGhost.currCellContent === FOOD) {
                gFoodCount--
                deletedGhost.currCellContent = EMPTY
            }
            gDeadGhosts.push(deletedGhost)
            return
        }

    }
}

function returnGhost() {
    for (var i = 0; i < gDeadGhosts.length; i++) {
        const currGhost = gDeadGhosts[i]
        gGhosts.push(currGhost)
    }
}

function getGhostHTML(ghost) {
    return `<span style="background-color: ${ghost.color};">${GHOST}</span>`
}