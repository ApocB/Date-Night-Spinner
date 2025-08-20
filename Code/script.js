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

function createWheel(key) {
  const wheelElem = document.getElementById("wheel-" + key);
  const opts = wheels[key].options;
  const slice = 360 / opts.length;
  const radius = 170; // slightly larger for text space
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("width","350");
  svg.setAttribute("height","350");
  const defs = document.createElementNS(svgNS,"defs");
  svg.appendChild(defs);

  // center glow
  const glow = document.createElementNS(svgNS,"radialGradient");
  glow.setAttribute("id", key + "-glow");
  glow.innerHTML = `
    <stop offset="0%" stop-color="#ffccd5" stop-opacity="0.9"/>
    <stop offset="70%" stop-color="#ff4d6d" stop-opacity="0.4"/>
    <stop offset="100%" stop-color="transparent" stop-opacity="0"/>
  `;
  defs.appendChild(glow);

  opts.forEach((opt,i)=>{
    const gradId = key+"-grad-"+i;
    const grad = document.createElementNS(svgNS,"linearGradient");
    grad.setAttribute("id",gradId);
    grad.setAttribute("x1","0%"); grad.setAttribute("y1","0%");
    grad.setAttribute("x2","100%"); grad.setAttribute("y2","100%");
    grad.innerHTML = `
      <stop offset="0%" stop-color="${i%2?'#ff4d6d':'#ff8095'}"/>
      <stop offset="100%" stop-color="${i%2?'#cc0033':'#ff99aa'}"/>
    `;
    defs.appendChild(grad);

    const startAngle = i*slice;
    const endAngle = startAngle+slice;
    const largeArc = slice>180?1:0;
    const x1 = 175 + radius*Math.cos(Math.PI*startAngle/180);
    const y1 = 175 + radius*Math.sin(Math.PI*startAngle/180);
    const x2 = 175 + radius*Math.cos(Math.PI*endAngle/180);
    const y2 = 175 + radius*Math.sin(Math.PI*endAngle/180);

    // slice
    const path = document.createElementNS(svgNS,"path");
    path.setAttribute("d", `M175,175 L${x1},${y1} A${radius},${radius} 0 ${largeArc} 1 ${x2},${y2} Z`);
    path.setAttribute("fill", `url(#${gradId})`);
    svg.appendChild(path);

    // arc for text
    const arcPath = document.createElementNS(svgNS,"path");
    const arcId = `${key}-arc-${i}`;
    arcPath.setAttribute("id",arcId);
    arcPath.setAttribute("d",`M${x1},${y1} A${radius},${radius} 0 ${largeArc} 1 ${x2},${y2}`);
    arcPath.setAttribute("fill","none");
    svg.appendChild(arcPath);

    // curved text
    const text = document.createElementNS(svgNS,"text");
    text.setAttribute("dy","-25"); // move text inward
    text.setAttribute("fill","white");
    text.setAttribute("font-size","18"); // bigger font
    text.setAttribute("font-weight","bold");
    text.setAttribute("stroke","black");
    text.setAttribute("stroke-width","0.7");

    const textPath = document.createElementNS(svgNS,"textPath");
    textPath.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",`#${arcId}`);
    textPath.setAttribute("startOffset","50%");
    textPath.setAttribute("text-anchor","middle");
    textPath.textContent = opt;
    text.appendChild(textPath);
    svg.appendChild(text);
  });

  // glow circle overlay
  const glowCircle = document.createElementNS(svgNS,"circle");
  glowCircle.setAttribute("cx","175");
  glowCircle.setAttribute("cy","175");
  glowCircle.setAttribute("r",radius);
  glowCircle.setAttribute("fill",`url(#${key}-glow)`);
  svg.appendChild(glowCircle);

  wheelElem.appendChild(svg);

  // hidden rigged toggle
  wheelElem.ondblclick = ()=>{
    wheels[key].riggedMode = !wheels[key].riggedMode;
    console.log(key + " rigged:", wheels[key].riggedMode);
  };
}

// Initialize all wheels
Object.keys(wheels).forEach(createWheel);

function spin(type){
  const wheelObj = wheels[type];
  const wheelElem = document.getElementById("wheel-"+type);
  const resultElem = document.getElementById("result-"+type);

  let result = wheelObj.riggedMode ?
    wheelObj.riggedOptions[Math.floor(Math.random()*wheelObj.riggedOptions.length)] :
    wheelObj.options[Math.floor(Math.random()*wheelObj.options.length)];

  const index = wheelObj.options.indexOf(result);
  const slice = 360 / wheelObj.options.length;

  wheelObj.rotation += 1800 + (index*slice)+(slice/2);
  wheelElem.style.transform = `rotate(${wheelObj.rotation}deg)`;

  setTimeout(()=>{ resultElem.textContent = result; },5200);
}

function spinAll(){
  spin("activity"); spin("dinner"); spin("outfits");
}