function spin(type){
  const wheelObj = wheels[type];
  const wheelElem = document.getElementById("wheel-"+type);
  const resultElem = document.getElementById("result-"+type);

  // pick result
  let result = wheelObj.riggedMode ?
    wheelObj.riggedOptions[Math.floor(Math.random()*wheelObj.riggedOptions.length)] :
    wheelObj.options[Math.floor(Math.random()*wheelObj.options.length)];

  const index = wheelObj.options.indexOf(result);
  const slice = 360 / wheelObj.options.length;

  // add full spins + target angle
  const spins = Math.floor(Math.random()*3) + 5; // 5-7 full spins
  const targetRotation = spins*360 + (index*slice) + slice/2;

  wheelObj.rotation += targetRotation;

  // apply smooth rotation
  wheelElem.style.transition = "transform 5s cubic-bezier(0.33, 1, 0.68, 1)";
  wheelElem.style.transform = `rotate(${wheelObj.rotation}deg)`;

  setTimeout(()=>{
    resultElem.textContent = result;
  }, 5000); // match transition duration
}
