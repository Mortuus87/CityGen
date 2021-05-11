import createSettlement from "./components/Settlement.js";
import rollArray from "./components/rollArray.js";

function init() {
  update();

  document.querySelector('#updateBtn').addEventListener('click', (e) => {
    e.preventDefault();
    update();
  });
}

function update() {
  let selectedSize = document.querySelector('#selectSize').value;
  if (selectedSize == 'any') {
    selectedSize = rollArray(settlementTables.size)[0]
  };

  let selectedAlignment = document.querySelector('#selectAlignment').value;
  if (selectedAlignment == 'any') {
    selectedAlignment = rollArray(settlementTables.alignment)[0]
  };

  const settlement = createSettlement();

  settlement.setSize(selectedSize);
  settlement.setAlignment(selectedAlignment);

  settlement.process();
  settlement.render();
  // settlement.renderWiki();
  // console.log(settlement);
}

init();