import create from "./components/createSettlement.js";
import applyQualities from "./components/applyQualities.js";
import render from "./components/renderSettlement.js";

function init() {
  let settlement = create();

  settlement = applyQualities(settlement); 
  console.log(settlement);

  render(settlement);

}

init();