const initialCardsData = [
    'https://picsum.photos/id/237/100/100',
    'https://picsum.photos/id/238/100/100',
    'https://picsum.photos/id/239/100/100',
    'https://picsum.photos/id/240/100/100',
    'https://picsum.photos/id/241/100/100',
    'https://picsum.photos/id/242/100/100',
    'https://picsum.photos/id/243/100/100',
    'https://picsum.photos/id/244/100/100'
];

const gameBoard = document.getElementById('game-board');
const modeSelectionDiv = document.getElementById('mode-selection');
const gameInfoDiv = document.getElementById('game-info');
const counterDisplay = document.getElementById('counter-display');
const highScoresContainer = document.getElementById('high-scores-container');
const backToMenuBtn = document.getElementById('back-to-menu-btn');
const h1JeuDeMemory = document.querySelector('#game-container > h1');

const modeLibreBtn = document.getElementById('mode-libre-btn');
const mode15Btn = document.getElementById('mode-15-btn');
const modeTimerBtn = document.getElementById('mode-timer-btn');

let selectedCards = [];
let boardLocked = false;
let currentMode = null; // 'libre', 'mode15', 'timer'
let chancesLeft = 0;
let movesCount = 0;
let timerInterval = null;
let startTime = 0;
let gameActive = false;

let highScores = {
    libre: [],
    timer: []
};


// fonction pour dupliquer le tableau (double les images pour créer des paires)
function duplicateArray(arraySimple) {
    return [...arraySimple, ...arraySimple];
}

// fonction pour mélanger le tableau
function shuffleArray(arrayToShuffle) {
    return [...arrayToShuffle].sort(() => 0.5 - Math.random());
}

// Formatage du temps
function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
}

// fonction pour gérer les scores
function loadHighScores() {
    const storedScores = localStorage.getItem('memoryGameHighScores');
    if (storedScores) {
        highScores = JSON.parse(storedScores);
    }
    if (!highScores.libre) highScores.libre = [];
    if (!highScores.timer) highScores.timer = [];
}

// fonction pour sauvegarder les scores
function saveHighScores() {
    localStorage.setItem('memoryGameHighScores', JSON.stringify(highScores));
}

// fonction pour afficher les scores
function displayHighScores() {
    const scoresLibreList = document.getElementById('scores-libre-list');
    const scoresTimerList = document.getElementById('scores-timer-list');
    
    scoresLibreList.innerHTML = '';
    highScores.libre.sort((a, b) => a.score - b.score).slice(0, 3).forEach(s => {
        const li = document.createElement('li');
        li.textContent = `${s.name}: ${s.score} coups`;
        scoresLibreList.appendChild(li);
    });
    if (scoresLibreList.innerHTML === '') scoresLibreList.innerHTML = '<li>Aucun score pour l\'instant</li>';

    scoresTimerList.innerHTML = '';
    highScores.timer.sort((a, b) => a.score - b.score).slice(0, 3).forEach(s => {
        const li = document.createElement('li');
        li.textContent = `${s.name}: ${formatTime(s.score)}`;
        scoresTimerList.appendChild(li);
    });
    if (scoresTimerList.innerHTML === '') scoresTimerList.innerHTML = '<li>Aucun score pour l\'instant</li>';
}

// fonction pour vérifier si le score est un nouveau record et l'ajouter si c'est le cas
function checkAndAddHighScore(score) {
    let isNewHighScore = false;
    let scoreList;
    let messagePrompt = "Bravo ! Nouveau meilleur score ! Votre nom (laissez vide pour Anonyme) :";

    if (currentMode === 'libre') {
        scoreList = highScores.libre;
        // On vérifie si la liste a moins de 3 scores OU si le score actuel est meilleur que le 3ème
        // OU si la liste a des scores et le score actuel est meilleur que le dernier (qui est le 3ème si la liste est pleine)
        if (scoreList.length < 3 || (scoreList.length === 3 && score < scoreList[2].score)) {
            isNewHighScore = true;
        } else if (scoreList.length > 0 && scoreList.length < 3 && (scoreList.length < 3 || score < scoreList[scoreList.length-1].score)) {
             isNewHighScore = true; // Pour les cas où il y a 1 ou 2 scores et le nouveau est meilleur
        }


    } else if (currentMode === 'timer') {
        scoreList = highScores.timer;
        if (scoreList.length < 3 || (scoreList.length === 3 && score < scoreList[2].score)) {
            isNewHighScore = true;
        } else if (scoreList.length > 0 && scoreList.length < 3 && (scoreList.length < 3 || score < scoreList[scoreList.length-1].score)) {
            isNewHighScore = true;
        }
    }


    if (isNewHighScore) {
        const playerName = prompt(messagePrompt, "Anonyme") || "Anonyme";
        scoreList.push({ name: playerName, score: score });
        scoreList.sort((a, b) => a.score - b.score);
        if (scoreList.length > 3) {
            scoreList.splice(3); // Garde seulement les 3 meilleurs
        }
        saveHighScores();
        displayHighScores();
        return true;
    }
    return false;
}

// fonction pour créer une carte
function createCard(cardUrl) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = cardUrl;

    const cardContent = document.createElement('img');
    cardContent.classList.add('card-content');
    cardContent.src = cardUrl;
    card.appendChild(cardContent);

    card.addEventListener('click', onCardClick);
    return card;
}

// fonction pour gérer le clic sur une carte
function onCardClick() {
    if (!gameActive || boardLocked || this.classList.contains('flip') || this.classList.contains('matched')) {
        return;
    }

    if (currentMode === 'timer' && timerInterval === null && selectedCards.length === 0) {
        startTimer();
    }

    this.classList.add('flip');
    selectedCards.push(this);

    if (selectedCards.length === 2) {
        boardLocked = true;
        
        if (currentMode === 'libre') {
            movesCount++;
            counterDisplay.textContent = `Coups : ${movesCount}`;
        } else if (currentMode === 'mode15') {
            chancesLeft--;
            counterDisplay.textContent = `Chances restantes : ${chancesLeft}`;
        }
        
        setTimeout(checkForMatch, 1000);
    }
}

// fonction pour vérifier si les cartes correspondent
function checkForMatch() {
    const [card1, card2] = selectedCards;

    if (card1.dataset.value === card2.dataset.value) {
        card1.classList.add("matched");
        card2.classList.add("matched");
        
        const allCardsMatched = document.querySelectorAll('.card:not(.matched)').length === 0;
        if (allCardsMatched) {
            endGame(true); // Gagné
            return; // Sortir pour ne pas faire les vérifications de défaite
        }
    } else {
        card1.classList.remove("flip");
        card2.classList.remove("flip");
    }

    selectedCards = [];
    boardLocked = false;

    // Vérifications de défaite pour Mode 15
    if (currentMode === 'mode15') {
        const remainingUnmatchedCards = document.querySelectorAll('.card:not(.matched)').length;
        if (remainingUnmatchedCards > 0) { // S'il reste des cartes à trouver
            const remainingPairsToFind = remainingUnmatchedCards / 2;
            if (chancesLeft < remainingPairsToFind) {
                endGame(false, "not_enough_chances_left"); // Perdu, pas assez de chances pour finir
                return;
            }
            if (chancesLeft <= 0) {
                 // Normalement, cette condition ne sert à rein (car il ya la condition au dessus)... mais je la garde comme sécuritée
                endGame(false, "out_of_chances"); // Perdu, plus de chances
                return;
            }
        }
    }
}

// fonction pour lancer le timer
function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(() => {
        const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        counterDisplay.textContent = `Temps : ${formatTime(elapsedTime)}`;
    }, 1000);
}

// fonction pour arrêter le timer
function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

// fonction pour commencer le jeu
function startGame(mode) {
    currentMode = mode;
    gameActive = true;
    boardLocked = false;
    selectedCards = [];
    gameBoard.innerHTML = '';
    gameBoard.classList.remove('board-disabled');
    gameBoard.style.display = 'grid'; // Afficher le jeu

    modeSelectionDiv.style.display = 'none'; // Cacher les modes
    gameInfoDiv.style.display = 'block';     // Affiche les infos de jeu
    backToMenuBtn.style.display = 'block';   // Affiche le bouton retour

    h1JeuDeMemory.style.display = 'none'; // par défaut h1 est caché
    highScoresContainer.style.display = 'none'; // par défaut les scores sont cachés

    if (mode === 'libre' || mode === 'timer') {
        highScoresContainer.style.display = 'block'; // Afficher les scores que pour ses modes
        document.getElementById('high-scores-libre').style.display = (mode === 'libre') ? 'block' : 'none';
        document.getElementById('high-scores-timer').style.display = (mode === 'timer') ? 'block' : 'none';
        displayHighScores();
    } else if (mode === 'mode15') {
        h1JeuDeMemory.style.display = 'block'; // Réaffiche le h1 pour ce mode
    }

    let allCards = duplicateArray(initialCardsData);
    allCards = shuffleArray(allCards);
    allCards.forEach(cardUrl => {
        const cardHtml = createCard(cardUrl);
        gameBoard.appendChild(cardHtml);
    });

    if (mode === 'libre') {
        movesCount = 0;
        counterDisplay.textContent = 'Coups : 0';
    } else if (mode === 'mode15') {
        chancesLeft = 15;
        counterDisplay.textContent = `Chances restantes : ${chancesLeft}`;
    } else if (mode === 'timer') {
        stopTimer();
        counterDisplay.textContent = 'Temps : 00:00';
    }
}

// fonction pour terminer le jeu
function endGame(isWin, lossReason = null) {
    gameActive = false;
    boardLocked = true;
    gameBoard.classList.add('board-disabled');
    let message = "";

    if (currentMode === 'timer') {
        stopTimer();
    }

    if (isWin) {
        message = "Bravo, vous avez gagné !";
        let newHighScoreMade = false;
        if (currentMode === 'libre') {
            newHighScoreMade = checkAndAddHighScore(movesCount);
        } else if (currentMode === 'timer') {
            const finalTime = Math.floor((Date.now() - startTime) / 1000);
            newHighScoreMade = checkAndAddHighScore(finalTime);
        }
    } else {
        if (currentMode === 'mode15') {
            if (lossReason === "not_enough_chances_left") {
                message = "Dommage ! Il ne vous reste pas assez de chances pour trouver toutes les paires. Perdu !";
            } else {
                message = "Dommage, vous n'avez plus de chances. Perdu !";
            }
        } else {
            message = "Fin de la partie.";
        }
    }
    
    setTimeout(() => {
        alert(message);
    }, 500);
}

// fonction pour réinitialiser le jeu
function resetToInitialState() {
    gameActive = false;
    currentMode = null;
    boardLocked = true;
    stopTimer();

    gameBoard.innerHTML = '';
    gameBoard.style.display = 'none';
    gameBoard.classList.remove('board-disabled');
    
    modeSelectionDiv.style.display = 'block';
    gameInfoDiv.style.display = 'none';
    highScoresContainer.style.display = 'none';
    backToMenuBtn.style.display = 'none';
    h1JeuDeMemory.style.display = 'block';

    counterDisplay.textContent = '';
    selectedCards = [];
    movesCount = 0;
    chancesLeft = 0;

    console.log("Jeu réinitialisé à l'état initial.");
}

// écouteurs d'événements et initialisation
modeLibreBtn.addEventListener('click', () => startGame('libre'));
mode15Btn.addEventListener('click', () => startGame('mode15'));
modeTimerBtn.addEventListener('click', () => startGame('timer'));
backToMenuBtn.addEventListener('click', resetToInitialState);

document.addEventListener('DOMContentLoaded', () => {
    loadHighScores();
    resetToInitialState();
    console.log("Jeu initialisé, en attente de sélection de mode.");
});