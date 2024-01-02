const inputContainer = document.querySelector("#input-container");
const countdownForm = document.querySelector("#countdownForm");
const dateEl = document.querySelector("#date-picker");

const countdownEl = document.querySelector("#countdown");
const countdownElTitle = document.querySelector("#countdown-title");
const countdownBtn = document.querySelector("#countdown-button");
const timeElements = document.querySelectorAll("span");

const completeEl = document.querySelector("#complete");
const completeElInfo = document.querySelector("#complete-info");
const completeBtn = document.querySelector("#complete-button");

let countdownTitle = ""; // We use let since this value is going to keep changing
let countdownDate = '';
let countdownValue = Date;
// let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set date input minimum with current date
const today = new Date().toISOString().split("T")[0];
dateEl.setAttribute('min', today);

// Populate Countdown
function updateDOM(){
    countdownActive = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownValue - now;    
        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);
    
        // Hide Input
        inputContainer.hidden = true;

        //If countdonw has ended, show complete
        if(distance < 0){
            countdownEl.hidden = true;
            clearInterval(countdownActive);
            completeElInfo.textContent = `"${countdownTitle}" finished on ${countdownDate}`;
            completeEl.hidden = false;
        }
        else{
        // Populate Countdown
            countdownElTitle.textContent = `${countdownTitle}`;
            timeElements[0].textContent = `${days}`;
            timeElements[1].textContent = `${hours}`;
            timeElements[2].textContent = `${minutes}`;
            timeElements[3].textContent = `${seconds}`;
            completeEl.hidden = true;
            completeElInfo.hidden = false;
            countdownEl.hidden = false;
        }
    }, second);
}

// Take values from Form input
function updateCountdown(e){
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    savedCountdown = {
        title: countdownTitle,
        date: countdownDate,
    };
    localStorage.setItem('countdown', JSON.stringify(savedCountdown));
    if(countdownDate === ''){
        alert('Please Fill both the inputs.');
    }
    else{
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}

// Reset All values
function reset(){
    countdownEl.hidden = true;
    completeEl.hidden = true;
    inputContainer.hidden = false;
    clearInterval(countdownActive);
    countdownTitle = '';
    countdownDate = '';
    localStorage.removeItem('countdown');
}

function restoreprevCountdown(){
    // Getting countdown from local storage
    if(localStorage.getItem('countdown')){
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}

// Event Listeners
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);

// On load check local strorage
restoreprevCountdown();