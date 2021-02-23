
import create from "./components/createSettlement.js";
import applyQualities from "./components/applyQualities.js";

function init() {
  let settlement = create();
  // console.log(settlement);

  // let quality = roll(qualityTables);
  // console.log(quality);

  


  settlement = applyQualities(settlement); 
  console.log(settlement);


}

init()