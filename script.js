// MATRIX BACKGROUND

const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = "01";
const fontSize = 14;
const columns = canvas.width/fontSize;

const drops = [];

for(let x=0;x<columns;x++){
drops[x]=1;
}

function draw(){

ctx.fillStyle="rgba(0,0,0,0.05)";
ctx.fillRect(0,0,canvas.width,canvas.height);

ctx.fillStyle="#0f0";
ctx.font=fontSize+"px monospace";

for(let i=0;i<drops.length;i++){

const text=letters.charAt(Math.floor(Math.random()*letters.length));

ctx.fillText(text,i*fontSize,drops[i]*fontSize);

if(drops[i]*fontSize>canvas.height && Math.random()>0.975)
drops[i]=0;

drops[i]++;

}

}

setInterval(draw,33);


// V2RAY GENERATOR

let cooldown=false;

document.getElementById("generate").onclick=async()=>{

if(cooldown){
alert("Wait 10 seconds before generating again");
return;
}

if(!confirm("Warning: Nodes may not work. Continue?"))
return;

cooldown=true;
setTimeout(()=>cooldown=false,10000);

try{

const res=await fetch("https://raw.githubusercontent.com/Firmfox/Proxify/main/v2ray_configs/mixed/subscription-1.txt");

const txt=await res.text();

document.getElementById("output").textContent=txt.slice(0,5000);

}catch{

alert("Failed to fetch nodes");

}

};


// AI TALKER

const chat=document.getElementById("chat");

document.getElementById("send").onclick=async()=>{

const msg=document.getElementById("msg").value;

if(!msg) return;

chat.innerHTML+=`<div>You: ${msg}</div>`;

document.getElementById("msg").value="";

try{

const res=await fetch("https://api-inference.huggingface.co/models/microsoft/DialoGPT-small",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({inputs:msg})
});

const data=await res.json();

const reply=data.generated_text || "AI didn't respond";

chat.innerHTML+=`<div>AI: ${reply}</div>`;

chat.scrollTop=chat.scrollHeight;

}catch{

chat.innerHTML+=`<div>AI: Error contacting AI</div>`;

}

};
