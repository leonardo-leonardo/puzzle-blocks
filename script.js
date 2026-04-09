const canvas = document.getElementById("game");

blocks = blocks.filter(block=>{
if(x>block.x && x<block.x+block.size && y>block.y && y<block.y+block.size){
score+=5;
return false;
}
return true;
})

document.getElementById("score").innerText=score;
})

// Daily Reward

document.getElementById("dailyBtn").onclick = ()=>{
let reward = Math.floor(Math.random()*100);
document.getElementById("reward").innerText = reward;
document.getElementById("daily").style.display="block";
}

function closeDaily(){
document.getElementById("daily").style.display="none";
}

// Leaderboard

const firebaseConfig = {
apiKey: "YOUR_API_KEY",
authDomain: "YOUR_AUTH",
projectId: "YOUR_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function saveScore(){
db.collection("scores").add({
score:score,
date:Date.now()
})
}

function showLeaderboard(){
document.getElementById("leaderboard").style.display="block";

let list = document.getElementById("leaderList");
list.innerHTML="";

db.collection("scores")
.orderBy("score","desc")
.limit(10)
.get()
.then(snapshot=>{
snapshot.forEach(doc=>{
let li=document.createElement("li");
li.textContent=doc.data().score;
list.appendChild(li);
})
})
}

function closeLeader(){
document.getElementById("leaderboard").style.display="none";
}

document.getElementById("leaderBtn").onclick = showLeaderboard;

// Save score on restart

document.getElementById("restartBtn").onclick = ()=>{
saveScore();
score=0;
blocks=[];
}
