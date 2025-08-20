const wheels = {
  activity: {
    options: ["🍿 Movie Night","🎲 Board Games","🌌 Stargazing","🎤 Karaoke","🎮 Video Games","🧑‍🍳 Cook Together"],
    riggedOptions: ["🌌 Stargazing","🍿 Movie Night"],
    riggedMode: true,
    rotation: 0
  },
  dinner: {
    options: ["🍝 Italian","🍣 Sushi","🥩 Steakhouse","🌮 Mexican","🍕 Pizza","🥗 Healthy Bowls"],
    riggedOptions: ["🍣 Sushi","🍝 Italian"],
    riggedMode: true,
    rotation: 0
  },
  outfits: {
    options: ["👕 Casual","👔 Dressy","🎽 Sporty","👗 Fancy","🧥 Cozy","😎 Themed"],
    riggedOptions: ["👗 Fancy","👔 Dressy"],
    riggedMode: true,
    rotation: 0
  }
};

function createWheel(type){
  const wheel = document.getElementById("wheel-" + type);
  wheel.innerHTML = ""; // clear previous
  const opts = wheels[type].options;
  const slice = 360 / opts.length;

  opts.forEach((opt,i)=>{
    const seg = document.createElement("div");
    seg.style.transform = `rotate(${i*slice}deg)`;
    seg.className = "segment";
    seg.style.position="absolute";
    seg.style.width="50%";
    seg.style.height="50%";
    seg.style.top="50%";
    seg.style.left="50%";
    seg.style.transformOrigin="0% 0%";
    seg.style.background = i%2?"#ff8095":"#ff4d6d";
    seg.style.display="flex";
    seg.style.alignItems="flex-start";
    seg.style.justifyContent="center";
    seg.style.fontSize="18px";
    seg.style.color="white";
    seg.style.fontWeight="bold";
    seg.textContent = opt;
    wheel.appendChild(seg);
  });
}

// initialize all wheels
Object.keys(wheels).forEach(createWheel);

function spin(type){
  const w = wheels[type];
  const wheelElem = document.getElementById("wheel-" + type);
  const resultElem = document.getElementById("result-"+type);

  const result = w.riggedMode ? w.riggedOptions[Math.floor(Math.random()*w.riggedOptions.length)]
                               : w.options[Math.floor(Math.random()*w.options.length)];

  const index = w.options.indexOf(result);
  const slice = 360 / w.options.length;

  w.rotation += 1800 + index*slice + slice/2;
  wheelElem.style.transform = `rotate(${w.rotation}deg)`;

  setTimeout(()=>{ resultElem.textContent=result; },1500);
}

function spinAll(){
  spin("activity");
  spin("dinner");
  spin("outfits");
}