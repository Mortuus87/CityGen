import roll from "./rollArray.js";

export default function () {
  const alignment = roll(settlementTables.alignment.all)[0];
  // console.log(alignment);
  const size = roll(settlementTables.size.all)[0];
  // console.log(size);

  return new Settlement(alignment, size)
}

function Settlement(alignment, size) {
  this.alignment = alignment;
  this.size = size;

  this.population = settlementTables.populationValue[size];
  this.type = settlementTables.sizeLabel[size];

  this.corruption = 0;
  this.crime = 0;
  this.economy = 0;
  this.law = 0;
  this.lore = 0;
  this.society = 0;

  this.danger = settlementTables.danger[size];
  this.baseValueBonus = 0;
  this.purchaseLimitBonus = 0;

  this.qualityNumber = settlementTables.qualitiesValue[size];
  this.qualities = [];
  this.qualityNotes = [];

  this.governments = [];
  this.governmentNotes = [];

  this.modifierNumber = settlementTables.modifier[size];
  this.modifiers = [];

  this.minorItems = "";
  this.mediumItems = "";
  this.majorItems = "";

  this.baseValue = settlementTables.baseValue[size];
  this.baseValueTotal = 0;
  this.purchaseLimit = settlementTables.purchaseLimit[size];
  this.purchaseLimitTotal = 0;

  this.spellcasting = size;
  this.spellcastingMax = "-";

  this.applyQualities = () => {
    const qualities = roll(settlementTables.qualities, this.qualityNumber);

    for (let i = 0; i < qualities.length; i++) {
      const quality = qualities[i];

      this.qualities.push(quality.name);
      this.qualityNotes = [...this.qualityNotes, ...quality.notes]

      this.corruption += quality.corruption;
      this.crime += quality.crime;
      this.economy += quality.economy;
      this.law += quality.law;
      this.lore += quality.lore;
      this.society += quality.society;
      this.danger += quality.danger;

      this.spellcasting += quality.spellcastingBonus;
      this.baseValueBonus += this.baseValue * quality.baseValueBonus;
      this.purchaseLimitBonus += this.purchaseLimit * quality.purchaseLimitBonus;
    }
  }

  this.applyGovernments = () => {
    const governments = roll(settlementTables.governments);

    for (let i = 0; i < governments.length; i++) {
      const government = governments[i];

      this.governments.push(government.name);
      this.governmentNotes = [...this.governmentNotes, ...government.notes]

      this.corruption += government.corruption;
      this.crime += government.crime;
      this.economy += government.economy;
      this.law += government.law;
      this.lore += government.lore;
      this.society += government.society;
      this.danger += government.danger;
      
      this.spellcasting += government.spellcastingBonus;
      this.baseValueBonus += this.baseValue * government.baseValueBonus;
      this.purchaseLimitBonus += this.purchaseLimit * government.purchaseLimitBonus;
    }
  }

  this.applyAlignment = () => {
    // TODO
    // Get modifiers from alignment - switch statement?
  }

  this.process = () => {
    this.applyQualities();
    this.applyGovernments();
    this.applyAlignment();

    if (this.spellcasting > settlementTables.spellcastingIndex.length) {
      this.spellcasting = settlementTables.spellcastingIndex.length;
    }
    if (this.spellcasting < 0) {
      this.spellcasting = 0;
    }

    this.spellcastingMax = settlementTables.spellcastingIndex[this.spellcasting];
    this.purchaseLimitTotal = this.purchaseLimit + this.purchaseLimitBonus;
    this.baseValueTotal = this.baseValue + this.baseValueBonus;

    this.minorItems = settlementTables.magicItemsBySpellcasting[this.size+4];
    this.mediumItems = settlementTables.magicItemsBySpellcasting[this.size+2];
    this.majorItems = settlementTables.magicItemsBySpellcasting[this.size+0];
  }

  this.render = () => {
    document.querySelector(".top-info").innerHTML = `
      <p><b>${this.alignment} ${this.type}</b></p>
      <p><b>Population:</b> ${settlementTables.populationValue[this.size]}</p>
      <p><b>Qualities: </b>${this.qualities.join(", ")}</p>
      <p>${this.qualityNotes.join("<br><br>")}</p>
      <p><b>Government: </b>${this.governments.join(", ")}</p>
      <p>${this.governmentNotes.join("<br><br>")}</p>
    `;

    const corruptionField = document.querySelector("#corruption");
    const crimeField = document.querySelector("#crime");
    const economyField = document.querySelector("#economy");
    const lawField = document.querySelector("#law");
    const loreField = document.querySelector("#lore");
    const societyField = document.querySelector("#society");

    corruptionField.value = this.corruption;
    crimeField.value = this.crime;
    economyField.value = this.economy;
    lawField.value = this.law;
    loreField.value = this.lore;
    societyField.value = this.society;

    document.querySelector(".bottom-info").innerHTML = `
      <p><b>Base value:</b> ${this.baseValueTotal}</p>
      <p><b>Purchase limit:</b> ${this.purchaseLimitTotal}</p>
      <p><b>Highest spell level:</b> ${this.spellcastingMax}</p>
      <p><b>Magic items</b>:
        <ul>
          <li>Minor: ${this.minorItems}</li>
          <li>Medium: ${this.mediumItems}</li>
          <li>Major: ${this.majorItems}</li>
        </ul>
      </p>
    `;
  }
}