const wheels = {
  activity: {
    options: ["🍿 Movie Night", "🎲 Board Games", "🌌 Stargazing", "🎤 Karaoke", "🎮 Video Games", "🧑‍🍳 Cook Together"],
    riggedOptions: ["🍿 Movie Night"],
    riggedMode: true,
    rotation: 0
  },
  dinner: {
    options: ["🍝 Italian", "🍣 Sushi", "🥩 Steakhouse", "🌮 Mexican", "🍕 Pizza", "🥗 Healthy Bowls"],
    riggedOptions: ["🍣 Sushi"],
    riggedMode: true,
    rotation: 0
  },
  outfits: {
    options: ["👕 Casual", "👔 Dressy", "🎽 Sporty", "👗 Fancy", "🧥 Cozy", "😎 Themed"],
    riggedOptions: ["👗 Fancy"],
    riggedMode: true,
    rotation: 0
  }
};

function createWheel(key) {
  const wheelElem = document.getElementById("wheel-" + key);
  const opts = wheels[key].options;
  const slice = 360 / opts.length;
  const outerRadius = 170;
  const textRadius = 135; // bring text closer to center (was near 170 before)
  const svgNS = "http://www.w3.org/2000/svg";

  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("width", "350");
  svg.setAttribute("height", "350");

  const defs = document.createElementNS(svgNS, "defs");
  svg.appendChild(defs);

  opts.forEach((opt, i) => {
    const gradId = `${key}-grad-${i}`;
    const grad = document.createElementNS(svgNS, "linearGradient");
    grad.setAttribute("id", gradId);
    grad.setAttribute("x1", "0%");
    grad.setAttribute("y1", "0%");
    grad.setAttribute("x2", "100%");
    grad.setAttribute("y2", "100%");
    grad.innerHTML = `
      <stop offset="0%" stop-color="${i % 2 ? '#ff4d6d' : '#ff8095'}"/>
      <stop offset="100%" stop-color="${i % 2 ? '#cc0033' : '#ff99aa'}"/>
    `;
    defs.appendChild(grad);

    const startAngle = i * slice;
    const endAngle = startAngle + slice;
    const largeArc = slice > 180 ? 1 : 0;

    const x1 = 175 + outerRadius * Math.cos(Math.PI * startAngle / 180);
    const y1 = 175 + outerRadius * Math.sin(Math.PI * startAngle / 180);
    const x2 = 175 + outerRadius * Math.cos(Math.PI * endAngle / 180);
    const y2 = 175 + outerRadius * Math.sin(Math.PI * endAngle / 180);

    const path = document.createElementNS(svgNS, "path");
    path.setAttribute("d", `M175,175 L${x1},${y1} A${outerRadius},${outerRadius} 0 ${largeArc} 1 ${x2},${y2} Z`);
    path.setAttribute("fill", `url(#${gradId})`);
    svg.appendChild(path);

    // TEXT PATH (curved inside the arc, but closer to center)
    const arcPath = document.createElementNS(svgNS, "path");
    const midAngle = (startAngle + endAngle) / 2;
    const arcX1 = 175 + textRadius * Math.cos(Math.PI * startAngle / 180);
    const arcY1 = 175 + textRadius * Math.sin(Math.PI * startAngle / 180);
    const arcX2 = 175 + textRadius * Math.cos(Math.PI * endAngle / 180);
    const arcY2 = 175 + textRadius * Math.sin(Math.PI * endAngle / 180);

    arcPath.setAttribute("d", `M${arcX1},${arcY1} A${textRadius},${textRadius} 0 ${largeArc} 1 ${arcX2},${arcY2}`);
    arcPath.setAttribute("id", `${key}-text-arc-${i}`);
    arcPath.setAttribute("fill", "none");
    defs.appendChild(arcPath);

    const text = document.createElementNS(svgNS, "text");
    text.setAttribute("font-size", "20");
    text.setAttribute("font-weight", "bold");
    text.setAttribute("fill", "white");
    text.setAttribute("stroke", "black");
    text.setAttribute("stroke-width", "3");
    text.setAttribute("paint-order", "stroke fill");
    text.setAttribute("style", "filter: drop-shadow(0px 0px 4px rgba(0,0,0,0.8))");

    const textPath = document.createElementNS(svgNS, "textPath");
    textPath.setAttribute("href", `#${key}-text-arc-${i}`);
    textPath.setAttribute("startOffset", "50%");
    textPath.setAttribute("text-anchor", "middle");
    textPath.textContent = opt;

    text.appendChild(textPath);
    svg.appendChild(text);
  });

  wheelElem.appendChild(svg);

  // Double click toggles rigged mode
  wheelElem.ondblclick = () => {
    wheels[key].riggedMode = !wheels[key].riggedMode;
    console.log(key + " rigged:", wheels[key].riggedMode);
  };
}

Object.keys(wheels).forEach(createWheel);

function spin(type) {
  const wheelObj = wheels[type];
  const wheelElem = document.getElementById("wheel-" + type);
  const resultElem = document.getElementById("result-" + type);

  const result = wheelObj.riggedMode
    ? wheelObj.riggedOptions[Math.floor(Math.random() * wheelObj.riggedOptions.length)]
    : wheelObj.options[Math.floor(Math.random() * wheelObj.options.length)];

  const index = wheelObj.options.indexOf(result);
  const slice = 360 / wheelObj.options.length;

  wheelObj.rotation += 1800 + (index * slice) + (slice / 2);
  wheelElem.style.transition = "transform 5s cubic-bezier(0.25, 1, 0.5, 1)";
  wheelElem.style.transform = `rotate(${wheelObj.rotation}deg)`;

  setTimeout(() => {
    resultElem.textContent = result;
  }, 5200);
}

function spinAll() {
  spin("activity");
  spin("dinner");
  spin("outfits");
}
