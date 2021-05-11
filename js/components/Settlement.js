import roll from "./rollArray.js";

export default function (table) {
  return new Settlement(table)
}

class Settlement {
  constructor(
    size = roll(settlementTables.size)[0], 
    alignment = roll(settlementTables.alignment)[0], 
    table = settlementTables
  ) {
    
    this.size = size;
    this.alignment = alignment;
    this.table = table;

    this.population = this.table.populationValue[size];
    this.type = this.table.sizeLabel[size];

    this.corruption = 0;
    this.crime = 0;
    this.economy = 0;
    this.law = 0;
    this.lore = 0;
    this.society = 0;

    this.danger = this.table.danger[size];
    this.baseValueBonus = 0;
    this.purchaseLimitBonus = 0;

    this.qualityNumber = this.table.qualitiesValue[size];
    this.qualities = [];
    this.qualityNotes = [];

    this.governments = [];
    this.governmentNotes = [];

    this.modifierNumber = this.table.modifier[size];
    this.modifiers = [];

    this.minorItems = "";
    this.mediumItems = "";
    this.majorItems = "";

    this.baseValue = this.table.baseValue[size];
    this.baseValueTotal = 0;
    this.purchaseLimit = this.table.purchaseLimit[size];
    this.purchaseLimitTotal = 0;

    this.spellcasting = size;
    this.spellcastingMax = "-";

    this.applyQualities = () => {
      const qualities = roll(this.table.qualities, this.qualityNumber);

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
      const governments = roll(this.table.governments);

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
        // console.log("adding +1 law");
      }
      if (a === 'LG' || a === 'NG' || a === 'CG') {
        this.society++;
        // console.log("adding +1 society");
      }
      if (a === 'CG' || a === 'CN' || a === 'CE') {
        this.crime++;
        // console.log("adding +1 crime");
      }
      if (a === 'LE' || a === 'NE' || a === 'CE') {
        this.corruption++;
        // console.log("adding +1 corruption");
      }
      if (a === 'NG' || a === 'TN' || a === 'NE' || a === 'LN' || a === 'CN') {
        this.lore++;
        // console.log("adding +1 lore");
        if (a === 'TN') {
          this.lore++;
          // console.log("adding +1 lore (TN)");
        }
      }
    }

    this.applySize = () => {
      this.population = this.table.populationValue[this.size];
      this.type = this.table.sizeLabel[this.size];
      
      this.modifierNumber = this.table.modifier[this.size];

      this.corruption = this.corruption + this.modifierNumber;
      this.crime = this.crime + this.modifierNumber;
      this.economy = this.economy + this.modifierNumber;
      this.law = this.law + this.modifierNumber;
      this.lore = this.lore + this.modifierNumber;
      this.society = this.society + this.modifierNumber;

      this.danger = this.table.danger[this.size];
      this.qualityNumber = this.table.qualitiesValue[this.size];
      this.baseValue = this.table.baseValue[this.size];
      this.purchaseLimit = this.table.purchaseLimit[this.size];
      this.spellcasting = this.size;
    }

    this.applySpells = () => {
      if (this.spellcasting > this.table.spellcastingIndex.length) {
        this.spellcasting = this.table.spellcastingIndex.length;
      }

      if (this.spellcasting < 0) {
        this.spellcasting = 0;
      }

      this.spellcastingMax = this.table.spellcastingIndex[this.spellcasting];
      this.purchaseLimitTotal = this.purchaseLimit + this.purchaseLimitBonus;
      this.baseValueTotal = this.baseValue + this.baseValueBonus;

      this.minorItems = this.table.magicItemsBySpellcasting[this.size + 4];
      this.mediumItems = this.table.magicItemsBySpellcasting[this.size + 2];
      this.majorItems = this.table.magicItemsBySpellcasting[this.size + 0];
    }

    this.process = () => {
      this.applyQualities();
      this.applyGovernments();
      this.applyAlignment();
      this.applySize();
      this.applySpells();
    }

    this.render = (selector = document.querySelector(".info")) => {
      let qualityText = '';
      for (let i = 0; i < this.qualities.length; i++) {
        const quality = this.qualities[i];
        qualityText += `<b>${quality}</b>`;
        qualityText += `<p>${this.qualityNotes[i]}</p>`;
      }

      selector.innerHTML = `
      <p>
        <b>${this.alignment} ${this.type}</b>
      </p>
      <p>
        <b>Population:</b> ${this.table.populationValue[this.size]}
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
        ${qualityText}
      <p>
        <b>Government:</b> ${this.governments.join(", ")}
      </p>
      <p>
        ${this.governmentNotes.join("<br><br>")}
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
      </p>`;
    }

    this.renderWiki = (selector = document.querySelector(".template")) => {
      selector.innerHTML = 
`{{City
  |name=City
  |alignment=${this.alignment}
  |type=${this.type}
  |corruption=${this.corruption}
  |crime=${this.crime}
  |economy=${this.economy}
  |law=${this.law}
  |lore=${this.lore}
  |society=${this.society}
  |qualities=[[Settlements#${this.qualities.join("]], [[Settlements#")}]]
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
}}`;
    }

    this.setSize = (size) => {
      size = parseInt(size);
      this.size = size;

    };

    this.getSize = () => {
      return this.size;
    }

    this.setAlignment = (alignment) => {
      this.alignment = alignment;
    };

    this.getAlignment = () => {
      return this.alignment;
    }
  }
}