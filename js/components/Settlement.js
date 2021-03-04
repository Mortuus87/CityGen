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
    const a = this.alignment;

    if (a === 'LG' || a === 'LN' || a === 'LE') {
      this.law++;
      console.log("adding +1 law");
    }
    if (a === 'LG' || a === 'NG' || a === 'CG') {
      this.society++;
      console.log("adding +1 society");
    }
    if (a === 'CG' || a === 'CN' || a === 'CE') {
      this.crime++;
      console.log("adding +1 crime");
    }
    if (a === 'LE' || a === 'NE' || a === 'CE') {
      this.corruption++;
      console.log("adding +1 corruption");
    }
    if (a === 'NG' || a === 'TN' || a === 'NE' || a === 'LN' || a === 'CN') {
      this.lore++;
      console.log("adding +1 lore");
      if (a === 'TN') {
        this.lore++;
        console.log("adding +1 law (TN)");
      }
    }
  }

  this.applySize = () => {
    // console.log(this);

    const size = this.size;
    const modifier = settlementTables.modifier[size];
    
    this.corruption = this.corruption + modifier;
    this.crime = this.crime + modifier;
    this.economy = this.economy + modifier;
    this.law = this.law + modifier;
    this.lore = this.lore + modifier;
    this.society = this.society + modifier;

    // console.log(modifier);
  }

  this.process = () => {
    this.applyQualities();
    this.applyGovernments();
    this.applyAlignment();
    this.applySize();

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
    document.querySelector(".info").innerHTML = `
      <p>
        <b>${this.alignment} ${this.type}</b>
      </p>
      <p>
        Corruption ${this.corruption};
        Crime ${this.crime};
        Economy ${this.economy};
        Law ${this.law};
        Lore ${this.lore};
        Society ${this.society};
      </p>
      <p>
        <b>Danger:</b> ${this.danger}
      </p>
      <p>
        <b>Qualities:</b> ${this.qualities.join(", ")}
      </p>
      <p>
        ${this.qualityNotes.join("<br><br>")}
      </p>

      <p>
        <b>Government:</b> ${this.governments.join(", ")}
      </p>
      <p>
        ${this.governmentNotes.join("<br><br>")}
      </p>
      <p>
        <b>Population:</b> ${settlementTables.populationValue[this.size]}
      </p>

      <p>
        <b>Base value:</b> ${this.baseValueTotal}; 
        <b>Purchase limit:</b> ${this.purchaseLimitTotal};
        <b>Highest spell level:</b> ${this.spellcastingMax};
      </p>

      <p>
        <b>Minor items</b> ${this.minorItems};
        <b>Medium items</b> ${this.mediumItems};
        <b>Major items</b> ${this.majorItems};
      </p>
    `;
  }

  this.renderWiki = () => {
    document.querySelector(".template").innerHTML = `
    {{City
    |name=City
    |alignment=${this.alignment}
    |type=${this.type}
    |corruption=${this.corruption}
    |crime=${this.crime}
    |economy=${this.economy}
    |law=${this.law}
    |lore=${this.lore}
    |society=${this.society}
    |qualities=${this.qualities.join(", ")}
    |danger=${this.danger}
    |government=${this.governments.join(", ")}
    |population=${this.population}
    |notable_npcs=
    |base_val=${this.baseValueTotal}
    |purchase_limit=${this.purchaseLimitTotal}
    |spellcasting=${this.spellcastingMax}
    |minor=${this.minorItems}
    |medium=${this.mediumItems}
    |major=${this.majorItems}
    }}
    `
  }
}