import createSettlement from "./components/Settlement.js";
import rollArray from "./components/rollArray.js";
// settlementTables is imported in the html as a script. It should probably be gotten here instead.

function init() {
  settlementTables.qualities.forEach(element => {

    console.log(element.name);
  });

  update();

  document.querySelector('#updateBtn').addEventListener('click', (e) => {
    e.preventDefault();
    update();
  });
}

function update() {
  let selectedSize = document.querySelector('#selectSize').value;
  if (selectedSize === 'any') {
    selectedSize = rollArray(settlementTables.sizes)[0]
  };

  let selectedAlignment = document.querySelector('#selectAlignment').value;
  if (selectedAlignment === 'any') {
    selectedAlignment = rollArray(settlementTables.alignments)[0]
  };

  const settlement = createSettlement();

  settlement.setSize(selectedSize);
  settlement.setAlignment(selectedAlignment);


  console.log(settlement);

}

init();