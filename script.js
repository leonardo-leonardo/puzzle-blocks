const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;

let score = 0;
let blocks = [];
let gameRunning = false;

// Create Block
function createBlock(){
return{
x:Math.random()*360,
y:0,
size:30,
speed:2+Math.random()*2
};
}

// Draw Game
function draw(){
ctx.clearRect(0,0,canvas.width,canvas.height);

blocks.forEach(block=>{
block.y += block.speed;

ctx.fillStyle = "#00c6ff";
ctx.fillRect(block.x,block.y,block.size,block.size);

if(block.y > canvas.height){
block.y = 0;
block.x = Math.random()*360;
}
});

requestAnimationFrame(draw);
}

// Spawn Blocks
function spawn(){
if(!gameRunning) return;

blocks.push(createBlock());

setTimeout(spawn,1500);
}

// Click Destroy
canvas.addEventListener("click",function(e){

const rect = canvas.getBoundingClientRect();
const x = e.clientX - rect.left;
const y = e.clientY - rect.top;

blocks = blocks.filter(block=>{
if(
x > block.x &&
x < block.x + block.size &&
y > block.y &&
y < block.y + block.size
){
score += 10;
updateScore();
return false;
}
return true;
});

});

// Update Score
function updateScore(){
document.getElementById("score").innerText = score;
}

// Start Game
document.getElementById("startBtn").onclick = ()=>{
gameRunning = true;
spawn();
}

// Restart Game
document.getElementById("restartBtn").onclick = ()=>{
saveScore();
score = 0;
blocks = [];
updateScore();
}

// Daily Reward
document.getElementById("dailyBtn").onclick = ()=>{

let today = new Date().toDateString();
let last = localStorage.getItem("daily");

if(last !== today){
let reward = Math.floor(Math.random()*100)+50;
localStorage.setItem("daily",today);

document.getElementById("reward").innerText = reward;
}else{
document.getElementById("reward").innerText = "Already claimed";
}

document.getElementById("daily").style.display = "block";

}

function closeDaily(){
document.getElementById("daily").style.display = "none";
}

// Save Score
function saveScore(){

let scores = JSON.parse(localStorage.getItem("scores") || "[]");

scores.push(score);

scores.sort((a,b)=>b-a);

scores = scores.slice(0,10);

localStorage.setItem("scores",JSON.stringify(scores));
}

// Show Leaderboard
function showLeaderboard(){

let scores = JSON.parse(localStorage.getItem("scores") || "[]");

let list = document.getElementById("leaderList");

list.innerHTML = "";

scores.forEach(s=>{
let li = document.createElement("li");
li.innerText = s;
list.appendChild(li);
});

document.getElementById("leaderboard").style.display = "block";

}

function closeLeader(){
document.getElementById("leaderboard").style.display = "none";
}

document.getElementById("leaderBtn").onclick = showLeaderboard;

draw();
