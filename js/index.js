import create from "./components/createSettlement.js";
import applyQualities from "./components/applyQualities.js";
import render from "./components/renderSettlement.js";

function init() {
  let settlement = create();
  // console.log(settlement);

  // let quality = roll(qualityTables);
  // console.log(quality);

  


  settlement = applyQualities(settlement); 
  console.log(settlement);

  document.querySelector(".output").innerHTML = render(settlement);

}

init()