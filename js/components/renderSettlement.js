export default function (settlement) {
    let html = `
    <div class="card">
    <div class="card-header">
      <h2>Settlement</h2>
    </div>
    <div class="card-body">
      <p>${settlement.alignment} - ${settlement.type}</p>
      <p>${settlement.qualities.join(", ")}</p>
      <p>Corruption ${settlement.statistics.corruption}; Crime ${settlement.statistics.crime}; Economy ${settlement.statistics.economy}; Law ${settlement.statistics.law}; Lore ${settlement.statistics.lore}; Society ${settlement.statistics.society}</p>
      <p>Danger ${settlement.statistics.danger}</p>
      <p>Government: ${settlement.government}</p>
      <p>Base Value, Purchase Limit, Spellcasting</p>
      <p>Minor items, medium items, major items</p>
    </div>
  </div>
    `;

    return html;

}