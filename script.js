const app = document.getElementById("app");
let noCount = 0;
const noMessages = ["how dare u","wow rude","u like pressing no dont u","okay last chance"];
let teaseTimeout;
const herName = "Maya";

// Day-specific contents
const dayContents = {
  7: { title: "Rose Day 💐", msg: "Roses are red… just like my love for you 🌹", gif: "assets/rose.gif" },
  8: { title: "Propose Day 💌", msg: "I wish I could propose right now… ❤️", gif: "assets/propose.gif" },
  9: { title: "Chocolate Day 🍫", msg: "Sweet like chocolate, sweet like us 😘", gif: "assets/chocolate.gif" },
  10: { title: "Teddy Day 🧸", msg: "Sending you this soft teddy hug 🤗", gif: "assets/teddy.gif" },
  11: { title: "Promise Day 🤞", msg: "I promise to always be there for you 💖", gif: "assets/promise.gif" },
  12: { title: "Hug Day 🤗", msg: "Virtual hugs coming your way! 🤗💞", gif: "assets/hug.gif" },
  13: { title: "Kiss Day 😘", msg: "Blowing a kiss to you 😘💓", gif: "assets/kiss.gif" },
  14: { title: "Valentine's Day 💘", msg: "Happy Valentine’s Day! You’re my everything 💖", gif: "assets/valentine.gif" }
};

// --- Floating Hearts across full screen ---
function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.innerText = "💖";
  heart.style.left = Math.random()*window.innerWidth+"px";
  heart.style.top = Math.random()*window.innerHeight+"px";
  heart.style.fontSize=(15+Math.random()*30)+"px";
  heart.style.animationDuration=(3+Math.random()*4)+"s";
  document.getElementById("hearts").appendChild(heart);
  setTimeout(()=>heart.remove(),7000);
}
setInterval(createHeart,150);

// --- Confetti for Feb 14 ---
function createConfettiPiece(){
  const conf = document.createElement("div");
  conf.style.position="absolute";
  const size = 15 + Math.random()*30; // 15-45px
  conf.style.width = size + "px";
  conf.style.height = size + "px";
  conf.style.background=['#ff6b9c','#ffcc00','#00ffcc','#ff66ff','#66ccff','#ff99cc','#ff33ff'][Math.floor(Math.random()*7)];
  conf.style.left = Math.random()*window.innerWidth+"px";
  conf.style.top = "-50px";
  conf.style.opacity = 0.8 + Math.random()*0.2;
  conf.style.borderRadius = Math.random() > 0.5 ? "50%" : "20%";
  conf.style.transform = `rotate(${Math.random()*360}deg)`;
  conf.style.zIndex = 2;
  document.getElementById("confetti").appendChild(conf);

  const fall = setInterval(()=>{
    let top = parseFloat(conf.style.top);
    let left = parseFloat(conf.style.left);
    top += 4 + Math.random()*6;
    left += Math.sin(top/15)*4;
    conf.style.top = top+"px";
    conf.style.left = left+"px";
    conf.style.transform = `rotate(${top*5}deg)`;
    if(top>window.innerHeight){ conf.remove(); clearInterval(fall);}
  },20);
}

function confettiExplosion(count=80){
  for(let i=0;i<count;i++){
    setTimeout(()=>createConfettiPiece(), i*20);
  }
}

// --- Loading animation ---
function showLoading(callback){
  app.innerHTML=`
    <div class="loading-screen">
      <p class="loading-text">loading...</p>
      <div class="loading-bar-container">
        <div class="loading-bar" id="loadingBar"></div>
      </div>
    </div>
  `;
  const bar=document.getElementById("loadingBar");
  let progress=0;
  const interval=setInterval(()=>{
    progress+=1+Math.random()*2;
    if(progress>=100) progress=100;
    bar.style.width=progress+"%";
    if(progress>=100){ clearInterval(interval); callback(); }
  },50);
}

// --- Yes/No teasing buttons ---
function updateButtons(){
  const yesBtn=document.getElementById("yesBtn");
  const noBtn=document.getElementById("noBtn");

  yesBtn.addEventListener("click",yesClicked);

  noBtn.addEventListener("mouseover",()=>{
    const maxX=window.innerWidth-noBtn.offsetWidth;
    const maxY=window.innerHeight-noBtn.offsetHeight;
    noBtn.style.position="fixed";
    noBtn.style.left=Math.random()*maxX+"px";
    noBtn.style.top=Math.random()*maxY+"px";
  });
  noBtn.addEventListener("click",nextNo);

  startTeaseTimer();
}

function startTeaseTimer(){
  if(teaseTimeout) clearTimeout(teaseTimeout);
  teaseTimeout=setTimeout(()=>{
    const yesBtn=document.getElementById("yesBtn");
    if(yesBtn){
      app.innerHTML=`
        <img src="assets/cute.gif" alt="cute"/>
        <h1>how dare u… just click yes already u dumass panda 😤</h1>
        <div class="buttons">
          <button class="no" style="opacity:0.4" id="noBtn">no 🙃</button>
          <button class="yes" style="transform:scale(1.1)" id="yesBtn">yes 💕</button>
        </div>
      `;
      updateButtons();
    }
  },7000);
}

function nextNo(){
  noCount++;
  if(noCount<noMessages.length){
    app.innerHTML=`
      <img src="assets/cute.gif" alt="cute"/>
      <h1>${noMessages[noCount-1]}</h1>
      <div class="buttons">
        <button class="no" id="noBtn">no 🙃</button>
        <button class="yes" id="yesBtn">yes 💕</button>
      </div>
    `;
    updateButtons();
  } else {
    app.innerHTML=`
      <img src="assets/cute.gif" alt="cute"/>
      <h1>okay now behave 😏</h1>
      <div class="buttons">
        <button class="no" style="opacity:0.4" id="noBtn">no 🙃</button>
        <button class="yes" style="transform:scale(1.1)" id="yesBtn">yes 💕</button>
      </div>
    `;
    updateButtons();
  }
}

// --- Yes path ---
function yesClicked(){
  if(teaseTimeout) clearTimeout(teaseTimeout);

  showLoading(()=>{
    app.innerHTML=`
      <div style="text-align:center;">
        <img src="assets/heart_anim.gif" alt="hearts" style="width:260px; border-radius:16px; margin-bottom:1rem;"/>
        <h1>good. now come here, <span style="font-size:2.6rem; font-weight:700;">${herName}</span> 💕</h1>
        <p>no pressure. just something i made for you</p>
        <div class="buttons">
          <button class="yes" id="continueBtn">open surprise 💖</button>
        </div>
      </div>
    `;
    const continueBtn=document.getElementById("continueBtn");

    const heartInterval=setInterval(()=>{
      const rect=continueBtn.getBoundingClientRect();
      const heart=document.createElement("div");
      heart.classList.add("heart");
      heart.innerText="💖";
      heart.style.left=rect.left+rect.width/2+(Math.random()*80-40)+"px";
      heart.style.top=rect.top+rect.height/2+(Math.random()*80-40)+"px";
      heart.style.fontSize=(15+Math.random()*25)+"px";
      heart.style.animationDuration=(2+Math.random()*2)+"s";
      document.getElementById("hearts").appendChild(heart);
      setTimeout(()=>heart.remove(),4000);
    },150);

    continueBtn.addEventListener("click",()=>{
      clearInterval(heartInterval);
      showLoading(enterGift);
    });
  });
}

// --- Final gift (kitten gif) ---
function enterGift(){
  app.innerHTML=`
    <img src="assets/kitten.gif" alt="kitten" id="giftGif" style="width:280px;"/>
    <h1>this is just for you, ${herName} 💌</h1>
    <p>click the kitten to get the envelopes 💕</p>
  `;
  const giftGif=document.getElementById("giftGif");
  giftGif.addEventListener("click",()=>{
    showLoading(showEnvelopeGrid);
  });
}

// --- Envelope grid zig-zag with day labels ---
function showEnvelopeGrid() {
  const days = [
    {day: 7, name: "Rose Day"},
    {day: 8, name: "Propose Day"},
    {day: 9, name: "Chocolate Day"},
    {day: 10, name: "Teddy Day"},
    {day: 11, name: "Promise Day"},
    {day: 12, name: "Hug Day"},
    {day: 13, name: "Kiss Day"},
    {day: 14, name: "Valentine's Day"}
  ];

  app.innerHTML = `
    <h1>pick a day 💌</h1>
    <div id="envelopeGridDiv"></div>
  `;
  const grid = document.getElementById("envelopeGridDiv");

  days.forEach((item, index) => {
    const container = document.createElement("div");
    container.style.display = "inline-block";
    container.style.margin = "12px";
    container.style.textAlign = "center";
    container.style.float = index % 2 === 0 ? "left" : "right";

    const env = document.createElement("div");
    env.classList.add("envelope");
    env.title = `${item.name} (${item.day} Feb)`;
    env.dataset.day = item.day;

    const label = document.createElement("div");
    label.classList.add("envelope-label");
    label.innerText = `${item.name}\n(${item.day} Feb)`;
    label.style.whiteSpace = "pre";

    env.addEventListener("click", () => openEnvelope(item));

    container.appendChild(env);
    container.appendChild(label);
    grid.appendChild(container);
  });
}

// --- Open envelope with GIF/message ---
function openEnvelope(item){
  const content = dayContents[item.day];

  // Feb 14: big confetti explosion
  if(item.day===14) confettiExplosion(80);

  app.innerHTML=`
    <img src="${content.gif}" alt="${content.title}" style="width:280px; border-radius:16px; margin-bottom:1rem;"/>
    <h1>${content.title}</h1>
    <p>${content.msg}</p>
    <div class="buttons">
      <button class="yes" id="nextDayBtn">pick another day</button>
    </div>
  `;
  document.getElementById("nextDayBtn").addEventListener("click", showEnvelopeGrid);
}

// Initialize
updateButtons();
