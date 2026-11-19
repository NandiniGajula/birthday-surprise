// PERSONALIZE HERE: change this 4-digit passcode before sharing.
const PASSCODE = "0812";

const screens = ["lockScreen","welcomeScreen","letterScreen","memoriesScreen"];
let entered = "";
const dots = document.querySelectorAll("#dots i");
const lockMessage = document.getElementById("lockMessage");
const toast = document.getElementById("toast");

function showScreen(id){
  screens.forEach(s => document.getElementById(s).classList.toggle("active",s===id));
  window.scrollTo({top:0,behavior:"smooth"});
}
function updateDots(){
  dots.forEach((dot,i)=>dot.classList.toggle("filled",i<entered.length));
}
function notify(message){
  toast.textContent=message;toast.classList.add("show");
  setTimeout(()=>toast.classList.remove("show"),2300);
}
function pressKey(key){
  if(key==="clear"){entered=entered.slice(0,-1);}
  else if(key==="enter"){checkPasscode();return;}
  else if(entered.length<4){entered+=key;}
  updateDots();
}
document.querySelectorAll("#keypad button").forEach(btn=>btn.addEventListener("click",()=>pressKey(btn.dataset.key)));
document.getElementById("unlockBtn").addEventListener("click",checkPasscode);
document.addEventListener("keydown",e=>{
  if(!document.getElementById("lockScreen").classList.contains("active"))return;
  if(/^[0-9]$/.test(e.key))pressKey(e.key);
  if(e.key==="Backspace")pressKey("clear");
  if(e.key==="Enter")checkPasscode();
});
function checkPasscode(){
  if(entered===PASSCODE){
    lockMessage.textContent="Unlocked! A little love is waiting…";
    lockMessage.classList.remove("error");
    showScreen("welcomeScreen");
  }else{
    lockMessage.textContent="Oops! Try again, my favourite human 💙";
    lockMessage.classList.add("error");
    entered="";updateDots();
  }
}
document.getElementById("openLetterBtn").addEventListener("click",()=>{
  document.getElementById("envelope").classList.add("opened");
  showScreen("letterScreen");
});
document.getElementById("backToWelcome").addEventListener("click",()=>showScreen("welcomeScreen"));
document.getElementById("memoriesBtn").addEventListener("click",()=>showScreen("memoriesScreen"));
document.getElementById("restartBtn").addEventListener("click",()=>{
  entered="";updateDots();lockMessage.textContent="Enter the 4-digit secret";lockMessage.classList.remove("error");
  showScreen("lockScreen");
});



// Background music for the entire website
const backgroundMusic = document.getElementById("backgroundMusic");

let musicStarted = false;

backgroundMusic.volume = 0.5;

function startBackgroundMusic() {
    if (musicStarted) return;

    backgroundMusic.play()
        .then(() => {
            musicStarted = true;
            console.log("Birthday music is playing!");
        })
        .catch(error => {
            console.error("Music playback error:", error);
        });
}

// Start music when the visitor clicks the first passcode button
document.querySelectorAll("#keypad button").forEach(button => {
    button.addEventListener("click", startBackgroundMusic);
});

// Also start music if the visitor clicks Unlock
document.getElementById("unlockBtn").addEventListener("click", startBackgroundMusic);
