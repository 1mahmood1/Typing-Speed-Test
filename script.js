// ==========================================
// 1. Helper Functions & UI Utilities
// ==========================================

/**
 * Applies Tailwind styling classes to dynamic buttons.
 */
function applyButtonClasses(button) {
    button.classList.add(
        'rounded-lg',
        'border',
        'border-white/20',
        'px-4',
        'py-1.5',
        'text-[15px]',
        'text-white/80',
        'transition',
        'hover:border-blue-400/80',
        'hover:bg-blue-500/5',
        'hover:text-blue-400'
    );
}

/**
 * Highlights the active difficulty button based on sessionStorage on page load.
 */
function setInitialDifficultyUI(easyButton, mediumButton, hardButton) {
    let difficulty = sessionStorage.getItem('difficulty');
    if (difficulty) {
        if (difficulty === 'easy') {
            easyButton.classList.add('clicked');
            mediumButton.classList.remove('clicked');
            hardButton.classList.remove('clicked');
        }
        if (difficulty === 'medium') {
            easyButton.classList.remove('clicked');
            mediumButton.classList.add('clicked');
            hardButton.classList.remove('clicked');
        }
        if (difficulty === 'hard') {
            easyButton.classList.remove('clicked');
            mediumButton.classList.remove('clicked');
            hardButton.classList.add('clicked');
        }
    }
}

// ==========================================
// 2. DOM Elements & Initial Setup
// ==========================================

const easyButton = document.querySelector('#easy');
const mediumButton = document.querySelector('#medium');
const hardButton = document.querySelector('#hard');
const buttons = document.querySelectorAll('.button');
const startButton = document.querySelector('#startButton');
const paragraph = document.querySelector('#paragraph');
const personalBest = document.querySelector('#personalBest');

// Paragraphs dataset for typing tests
let paragraphs = new Map([
    ['paragraphOne', "The archaeological expedition unearthed artifacts that complicated prevailing theories about Bronze Age trade networks. Obsidian from Anatolia, lapis lazuli from Afghanistan, and amber from the Baltic all discovered in a single Mycenaean tomb suggested commercial connections far more extensive than previously hypothesized. We've underestimated ancient peoples' navigational capabilities and their appetite for luxury goods, the lead researcher observed. Globalization isn't as modern as we assume."],
    ['paragraphTwo', "In the quiet depths of human history, the most enduring monuments are not built of stone or steel, but of character and wisdom. Throughout the ages, civilizations have risen to immense heights of material wealth and political power, only to crumble into forgotten dust when they lost their ethical compass. True strength does not lie in the capacity to dominate others or accumulate endless resources, but in the commitment to elevate human dignity, foster knowledge, and cultivate compassion. Every choice we make today ripples into tomorrow, shaping the quiet legacy we leave behind. Ultimately, the measure of a life is not determined by what we gather for ourselves, but by the light we bring into the lives of others."]
]);

// Initialize buttons and setup click listeners for difficulty selection
buttons.forEach((button) => {
    applyButtonClasses(button);
    button.addEventListener('click', () => {
        buttons.forEach((btn) => {
            btn.classList.remove('clicked');
        });
        button.classList.add('clicked');
        
        if (button.id === 'easy') {
            sessionStorage.setItem('difficulty', 'easy');
        }
        if (button.id === 'medium') {
            sessionStorage.setItem('difficulty', 'medium');
        }
        if (button.id === 'hard') {
            sessionStorage.setItem('difficulty', 'hard');
        }
    });
});

// Render paragraph text wrapped into individual letter spans
let letters = paragraphs.get('paragraphOne').split('');
letters.forEach((letter) => {
    let span = document.createElement('span');
    span.innerText = letter;
    span.classList.add('letterSpan');
    paragraph.appendChild(span);
});

// Restore saved difficulty visual state
setInitialDifficultyUI(easyButton, mediumButton, hardButton);

// Load personal record from localStorage
personalBest.innerText = localStorage.getItem('BestRecord') || 0;

// ==========================================
// 3. Typing Test State & Event Handling
// ==========================================

let index = 0;
let errors = 0;
let correctness = 0; 
let allKeyDown = 0;
let minutes;
let accuracy;
let countdown;
let timeLeft = 0;

/**
 * Handles typing keydown events, accuracy calculation, and letter styling.
 */
function handleTypingInput(e) {

    if (index >= letters.length) {
        return;
    }
    
    let keyPress = e.key;
    let currentLetter = letters[index];
    let spans = document.querySelectorAll('.letterSpan');
    
    spans[index].classList.add('underLineSpan');
    
    if (keyPress.length === 1) {
        allKeyDown++;
    }
    
    // // letter pressed // //

    if (keyPress) {

        // // Correct letter pressed // // 
        if (keyPress === currentLetter) {
            spans[index].classList.add('text-green-500');
            spans[index].classList.remove('text-red-500');
            spans[index].classList.remove('underLineSpan');
            correctness++;
            index++
            spans[index].classList.add('underLineSpan');
        }
        
        // Incorrect letter pressed
        if (keyPress !== currentLetter && keyPress.length === 1) {
            
            spans[index].classList.remove('underLineSpan');
            
            spans[index].classList.add('text-red-500');
            
            if (errors >= 0) {
                errors++;
            }

            index++;
            spans[index].classList.add('underLineSpan');

        }

        if (index > 0 && (keyPress === 'Backspace' || keyPress === 'Delete')) {

            const spansIndex = index - 1;

            if (spans[spansIndex].classList.contains('text-red-500')) {
                if (errors >= 0) {
                    errors--;
                }
            } else if (spans[spansIndex].classList.contains('text-green-500')) {
                correctness--;
            }

            spans[spansIndex].classList.remove('text-red-500', 'text-green-500');

            spans[index].classList.remove('underLineSpan');

            index--;

            spans[index].classList.add('underLineSpan');
        }

        // Calculate and update live accuracy percentage
        if (keyPress.length === 1) {
            accuracy = ((correctness / (correctness + errors)) * 100).toFixed(2);
            let accuracyResultHtml = document.querySelector('#resultAccuracy');
            let accuracyMainHtml = document.querySelector('#accuracy');
            if (accuracyResultHtml) accuracyResultHtml.innerText = accuracy;
            if (accuracyMainHtml) accuracyMainHtml.innerText = accuracy;
        }
        
        if (index === letters.length) {
            stopTest();
        } 
    }

    // if (keyPress === currentLetter) {
    //     spans[index].classList.remove('underLineSpan');
    //     spans[index].classList.add('text-green-500');
    //     spans[index].classList.remove('text-red-500');
    //     index++;
    //     correctness++;
        
    //     if (index < letters.length) {
    //         spans[index].classList.add('underLineSpan');
    //     } 
    //     if (index === letters.length) {
    //         stopTest();
    //     } 
    // } 
    
    // Handle backspace or delete key

}

// ==========================================
// 4. Timer & Test Execution Flow
// ==========================================

/**
 * Decrements the timer interval and finishes test at zero seconds.
 */
function updateTimer() {
    let time = document.querySelector('#time');
    if (time) time.textContent = timeLeft;
    
    if (timeLeft <= 0) {
        stopTest();
        return;
    }
    timeLeft--;
} 

// Start test listener
startButton.addEventListener('click', () => {
    let difficulty = sessionStorage.getItem('difficulty');
    let startBtn = document.querySelector('#startButton');
    
    if (!difficulty) {
        showDifficultyPopup();
    }
    if (difficulty) {
        paragraph.classList.remove('blur-[4px]');
        startBtn.classList.add('hidden');
        
        if (difficulty === 'easy') {
            timeLeft = 90;
            minutes = 1.5;
        } 
        if (difficulty === 'medium') {
            timeLeft = 60;
            minutes = 1;
        } 
        if (difficulty === 'hard') {
            timeLeft = 30;
            minutes = 0.5;
        } 
        
        updateTimer();
        countdown = setInterval(updateTimer, 1000);
        document.addEventListener('keydown', handleTypingInput);
    }
});

/**
 * Displays warning popup when start is clicked without choosing difficulty.
 */
function showDifficultyPopup() {
    let difficultyPopup = document.querySelector('#difficultyPopup');
    let closeDifficultyPopup = document.querySelector('#closeDifficultyPopup');
    
    difficultyPopup.classList.remove('hidden');
    difficultyPopup.classList.add('flex');
    
    closeDifficultyPopup.addEventListener('click', () => {
        difficultyPopup.classList.add('hidden');
    });
}

/**
 * Configures the "Go Again" restart button.
 */
function setupRestartListener(resultScreen) {
    let goAgainButton = document.querySelector('#goAgainButton');
    goAgainButton.addEventListener('click', () => {
        resultScreen.classList.add('hidden'); 
        resultScreen.classList.remove('flex');
        startButton.classList.remove('hidden');
        paragraph.classList.add('blur-[4px]');
    });
}

// ==========================================
// 5. Results & Reset Logic
// ==========================================

/**
 * Calculates final WPM, updates records in localStorage, and resets typing counters.
 */
function calculateResultsAndReset() {
    let bestRecord = Number(localStorage.getItem('BestRecord')) || 0;
    let wpm = (allKeyDown / 5) / minutes;
    
    let resultWpm = document.querySelector('#resultWpm');
    let resultPersonalBest = document.querySelector('#resultPersonalBest');
    let resultMainWpm = document.querySelector('#resultMainWpm');

    if (wpm > bestRecord) {
        localStorage.setItem('BestRecord', wpm);
        bestRecord = wpm;
        personalBest.innerText = bestRecord;
    }

    if (resultWpm) resultWpm.innerText = wpm;
    if (resultPersonalBest) resultPersonalBest.innerText = bestRecord;
    if (resultMainWpm) resultMainWpm.innerText = wpm;

    // Reset styles on all character spans
    let spans = document.querySelectorAll('.letterSpan');
    spans.forEach((span) => {
        span.classList.remove('text-green-500');
        span.classList.remove('text-red-500');
        span.classList.remove('underLineSpan');
    });

    // Reset runtime stats
    correctness = 0;
    allKeyDown = 0;
    errors = 0;
    index = 0;
    
    let accuracyElement = document.querySelector('#accuracy');
    if (accuracyElement) accuracyElement.innerText = '0';
}

/**
 * Stops the test, removes keydown listeners, and presents the results overlay.
 */
function stopTest() {
    document.removeEventListener('keydown', handleTypingInput);
    calculateResultsAndReset();
    
    let resultScreen = document.querySelector('#resultScreen');
    resultScreen.classList.remove('hidden');
    resultScreen.classList.add('flex');
    
    setupRestartListener(resultScreen);
    clearInterval(countdown); 
}

// ==========================================
// 6. Theme Toggle (Light / Dark)
// ==========================================
// AI code
let themeToggle = document.querySelector('#themeToggle');
let savedTheme = localStorage.getItem('theme');

if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    themeToggle.innerText = '☀️';
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    let isLight = document.body.classList.contains('light-theme');
    
    if (isLight) {
        localStorage.setItem('theme', 'light');
        themeToggle.innerText = '☀️';
    } else {
        localStorage.setItem('theme', 'dark');
        themeToggle.innerText = '🌙';
    }
});
