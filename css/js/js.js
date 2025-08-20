const text = document.createElementNS(svgNS, "text");
text.setAttribute("dy", "-5");
text.setAttribute("fill", "white");
text.setAttribute("font-size", "16");         // 🔼 bigger font
text.setAttribute("font-weight", "bold");
text.setAttribute("stroke", "black");         // 🔼 outline for readability
text.setAttribute("stroke-width", "0.8");     // thin border around letters
