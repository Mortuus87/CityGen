import { Settlement } from "./components/Settlement.js";
import { roll as rollArray } from "./components/rollArray.js";
import data from '../json/settlement.json' with { type: 'json' };

function init() {
  const settlement = new Settlement(data);
  settlement.reset();
  generate(settlement);
  update(settlement);

  document.querySelector('#updateBtn').addEventListener('click', (e) => {
    e.preventDefault();
    settlement.reset();
    generate(settlement);
    update(settlement);
  });
}

init();

/**
 * Fills the object with data. Uses set choices if present, and otherwise fills randomly until full.
 *
 * @param {Settlement} settlement
 */
function generate(settlement) {
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

  settlement.fillQualities() // requires size
}

/**
 * Updates the object, recalculating statistics
 * Renders the new html.
 * Applies event listeners to buttons
 *
 * @param {Settlement} settlement
 */
function update(settlement) {
  /* Calculation */
  settlement.calculate();

  /* Presentation - redraws settlement, stats and lists */
  settlement.render();

  // At this point the old event listeners should have been cleared, since the html has been redrawn, and the DOM has been thuroughly discombobulated.
  document.querySelectorAll('.quality-control').forEach(element => {
    element.addEventListener('click', (e) => {
      const dataset = e.target.dataset;
      settlement.moveQuality(dataset.uid, dataset.type, dataset.operation)
      update(settlement);
    });
  });

  console.log(settlement);
}
