export default function (settlement) {
  let html = `
    <p>${settlement.alignment} ${settlement.type}</p>
    <p>${settlement.qualities.join(", ")}</p>
  `;

  document.querySelector(".output-1").innerHTML = html;

  html = `
    <p>${settlement.government}</p>
  `

  document.querySelector(".output-2").innerHTML = html;

  populateStatInputs(settlement);
}

function populateStatInputs(settlement) {
  const corruptionField = document.querySelector("#corruption");
  const crimeField = document.querySelector("#crime");
  const economyField = document.querySelector("#economy");
  const lawField = document.querySelector("#law");
  const loreField = document.querySelector("#lore");
  const societyField = document.querySelector("#society");

  corruptionField.value = settlement.statistics.corruption;
  crimeField.value = settlement.statistics.crime;
  economyField.value = settlement.statistics.economy;
  lawField.value = settlement.statistics.law;
  loreField.value = settlement.statistics.lore;
  societyField.value = settlement.statistics.society;
}