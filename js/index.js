import { Settlement } from "./components/Settlement.js";
import { roll as rollArray } from "./components/rollArray.js";
import data from '../json/settlement.json' with { type: 'json' };

function init() {
  const settlement = new Settlement(data);
  update(settlement);

  document.querySelector('#updateBtn').addEventListener('click', (e) => {
    e.preventDefault();
    update(settlement);
  });

  // Other listeners?
}

init();

function update(settlement) {
  /* Se selector values, or randomize */
  let selectedSize = document.querySelector('#selectSize').value;
  if (selectedSize === 'any') {
    selectedSize = rollArray(data.sizes)
  };

  let selectedAlignment = document.querySelector('#selectAlignment').value;
  if (selectedAlignment === 'any') {
    selectedAlignment = rollArray(data.alignments)
  };

  /* Setters */
  settlement.setSize(selectedSize);
  settlement.setAlignment(selectedAlignment);

  /* Calculation */
  settlement.calculate();

  /* Presentation */
  // console.log(settlement);
  settlement.render();
  settlement.renderWiki();
}
