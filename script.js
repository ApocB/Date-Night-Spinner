function createWheel(key) {
  const wheelElem = document.getElementById("wheel-" + key);
  const opts = wheels[key].options;
  const slice = 360 / opts.length;
  const radius = 170; 
  const svgNS = "http://www.w3.org/2000/svg";

  // create SVG
  const svg = document.createElementNS(svgNS, "svg");
  const defs = document.createElementNS(svgNS, "defs");
  svg.appendChild(defs);

  // Center glow
  const glow = document.createElementNS(svgNS, "radialGradient");
  glow.setAttribute("id", `${key}-glow`);
  glow.innerHTML = `
    <stop offset="0%" stop-color="#ffccd5" stop-opacity="0.9"/>
    <stop offset="70%" stop-color="#ff4d6d" stop-opacity="0.4"/>
    <stop offset="100%" stop-color="transparent" stop-opacity="0"/>
  `;
  defs.appendChild(glow);

  opts.forEach((opt, i) => {
    // Gradient for slice
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
    const x1 = 150 + radius * Math.cos(Math.PI * startAngle / 180);
    const y1 = 150 + radius * Math.sin(Math.PI * startAngle / 180);
    const x2 = 150 + radius * Math.cos(Math.PI * endAngle / 180);
    const y2 = 150 + radius * Math.sin(Math.PI * endAngle / 180);

    // slice path
    const path = document.createElementNS(svgNS, "path");
    path.setAttribute("d", `M150,150 L${x1},${y1} A${radius},${radius} 0 ${largeArc} 1 ${x2},${y2} Z`);
    path.setAttribute("fill", `url(#${gradId})`);
    svg.appendChild(path);

    // text along path
    const arcPath = document.createElementNS(svgNS, "path");
    arcPath.setAttribute("id", arcId);
    arcPath.setAttribute("d", `M${x1},${y1} A${radius},${radius} 0 ${largeArc} 1 ${x2},${y2}`);
    arcPath.setAttribute("fill", "none");
    svg.appendChild(arcPath);

    const text = document.createElementNS(svgNS, "text");
    text.setAttribute("dy", "-12"); // move text inward
    text.setAttribute("fill", "white");
    text.setAttribute("font-size", "16");
    text.setAttribute("font-weight", "bold");
    text.setAttribute("stroke", "black");
    text.setAttribute("stroke-width", "0.6");

    const textPath = document.createElementNS(svgNS, "textPath");
    textPath.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", `#${arcId}`);
    textPath.setAttribute("startOffset", "50%");
    textPath.setAttribute("text-anchor", "middle");
    textPath.textContent = opt;
    text.appendChild(textPath);
    svg.appendChild(text);
  });

  // glow circle overlay
  const glowCircle = document.createElementNS(svgNS, "circle");
  glowCircle.setAttribute("cx", "150");
  glowCircle.setAttribute("cy", "150");
  glowCircle.setAttribute("r", radius);
  glowCircle.setAttribute("fill", `url(#${key}-glow)`);
  svg.appendChild(glowCircle);

  wheelElem.appendChild(svg);

  // double-click toggle for rigged mode
  wheelElem.ondblclick = () => {
    wheels[key].riggedMode = !wheels[key].riggedMode;
    console.log(key + " rigged:", wheels[key].riggedMode);
  };
}
