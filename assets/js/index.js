import { Operation, Settlement } from "./components/Settlement.js";
import { roll as rollArray } from "./components/rollArray.js";
import settlementJson from '../resources/json/settlement.json' with { type: 'json' };
import ornJson from '../resources/json/orn.json' with { type: 'json' };

function init() {
  let json = settlementJson;

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  // Get a different table of data if the parameter ?setting=orn is present.
  if (urlParams.get('setting') === 'orn') {
    json = ornJson;
  } else {
    // Hide controller for wiki template when not used in homebrew context
    document.querySelector('#nav-wiki-tab').style.display = "none";
  }

  document.querySelector('#name').innerHTML = json.source;

  const settlement = new Settlement(json);
  settlement.reset();
  generate(settlement);
  update(settlement);

  document.querySelector('#updateBtn').addEventListener('click', (e) => {
    e.preventDefault();
    settlement.reset();
    generate(settlement);
    update(settlement);
  });

  document.querySelector('#selectSize').addEventListener('change', (e) => {
    e.preventDefault();
    let selectedSize = e.target.value;
    if (selectedSize !== 'any') {
      settlement.setSize(selectedSize);
    };

    update(settlement);
  });

  document.querySelector('#selectAlignment').addEventListener('change', (e) => {
    e.preventDefault();
    let selectedAlignment = e.target.value;
    if (selectedAlignment !== 'any') {
      settlement.setAlignment(selectedAlignment);
    };

    update(settlement);
  });

  document.getElementById('copyToClipboard').addEventListener('click', function() {
    var text = document.querySelector('#wiki-template').innerHTML;
    navigator.clipboard.writeText(text).then(() => {
      console.log("copied");
    })
  })
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
    selectedSize = rollArray(settlement.table.sizes)
  };

  let selectedAlignment = document.querySelector('#selectAlignment').value;
  if (selectedAlignment === 'any') {
    selectedAlignment = rollArray(settlement.table.alignments)[0]
  };

  /* Setters */
  settlement.setSize(selectedSize);
  settlement.setAlignment(selectedAlignment);

  settlement.resetQualities();
  settlement.fillQualities();
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
      switch (dataset.operation) {
        case Operation.TO_AVAILABLE:
        case Operation.TO_SELECTED:
          settlement.moveQuality(dataset.uid, dataset.type, dataset.operation)
          break;
        case Operation.REROLL:
          settlement.moveQuality(dataset.uid, dataset.type, Operation.TO_AVAILABLE);
          settlement.addRandomQuality(dataset.type);
        default:
          break;
      }
      update(settlement);
    });
  });

  console.log(settlement);
}
