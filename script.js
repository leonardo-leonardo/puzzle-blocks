const canvas = document.getElementById("game")

document.getElementById("dailyBtn").onclick = ()=>{
let today = new Date().toDateString()
let last = localStorage.getItem("daily")

if(last !== today){
let reward = Math.floor(Math.random()*100)+50
localStorage.setItem("daily",today)

document.getElementById("reward").innerText = reward
}
else{
document.getElementById("reward").innerText = "Already claimed"
}


document.getElementById("daily").style.display = "block"
}

function closeDaily(){
document.getElementById("daily").style.display = "none"
}

// Leaderboard

function saveScore(){
let scores = JSON.parse(localStorage.getItem("scores") || "[]")
scores.push(score)
scores.sort((a,b)=>b-a)
scores = scores.slice(0,10)

localStorage.setItem("scores",JSON.stringify(scores))
}

function showLeaderboard(){
let scores = JSON.parse(localStorage.getItem("scores") || "[]")
let list = document.getElementById("leaderList")

list.innerHTML = ""

scores.forEach(s=>{
let li = document.createElement("li")
li.innerText = s
list.appendChild(li)
})


document.getElementById("leaderboard").style.display = "block"
}

function closeLeader(){
document.getElementById("leaderboard").style.display = "none"
}

document.getElementById("leaderBtn").onclick = showLeaderboard


draw()
