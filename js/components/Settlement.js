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

    // this.population = this.table.populationValue[size];
    // this.type = this.table.sizeLabel[size];

    this.corruption = 0;
    this.crime = 0;
    this.economy = 0;
    this.law = 0;
    this.lore = 0;
    this.society = 0;

    // this.danger = this.table.danger[size];
    this.baseValueBonus = 0;
    this.purchaseLimitBonus = 0;

    // this.qualityNumber = this.table.qualitiesValue[size];
    this.qualities    = [];
    this.qualityNames = [];
    this.qualityNotes = [];

    this.governments     = [];
    this.governmentNames = [];
    this.governmentNotes = [];

    // this.modifierNumber = this.table.modifier[size];
    this.modifiers = [];

    this.minorItems  = "";
    this.mediumItems = "";
    this.majorItems  = "";

    // this.baseValue = this.table.baseValue[size];
    this.baseValueTotal = 0;
    // this.purchaseLimit = this.table.purchaseLimit[size];
    this.purchaseLimitTotal = 0;

    // this.spellcasting = size;
    this.spellcastingMax = "-";

    this.applyQualities = () => {
      const qualities = roll(this.table.qualities, this.qualityNumber);

      for (let i = 0; i < qualities.length; i++) {
        const quality = qualities[i];

        this.qualities.push(quality);
        this.qualityNames.push(quality.name)
        this.qualityNotes = [...this.qualityNotes, ...quality.notes];

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

        this.governments.push(government);
        this.governmentNames.push(government.name);
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
      }
      if (a === 'LG' || a === 'NG' || a === 'CG') {
        this.society++;
      }
      if (a === 'CG' || a === 'CN' || a === 'CE') {
        this.crime++;
      }
      if (a === 'LE' || a === 'NE' || a === 'CE') {
        this.corruption++;
      }
      if (a === 'NG' || a === 'TN' || a === 'NE' || a === 'LN' || a === 'CN') {
        this.lore++;
        if (a === 'TN') {
          this.lore++;
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
      this.applySize();
      this.applyAlignment();
      this.applyQualities();
      this.applyGovernments();
      this.applySpells();
    }

    this.render = (selector = document.querySelector(".info")) => {

      // Qualities text
      // let qualityText = '<p>';
      let qualitiesWikiLinks = '';
      // let qualitiesWikiEntries = '';
      for (let i = 0; i < this.qualities.length; i++) {
        const quality = this.qualities[i];
        qualitiesWikiLinks += `[[#${quality.name}|${quality.name}]]`;
        if (i != this.qualities.length) {
          qualitiesWikiLinks += ', ';
        }
      }
    
      let html = `<p>
        <div class="statistic">
          <span class="popper"><b>${this.alignment}</b></span>
          <span class="popup"><p>A settlement’s alignment not only describes the community’s general personality and attitude, but also influences its modifiers.</p>
          <ul>
            <li>A lawful component to a settlement’s alignment increases its law modifier by 1.</li>
            <li>A good component increases its society modifier by 1.</li>
            <li>A chaotic component increases its crime modifier by 1.</li>
            <li>An evil component increases its corruption modifier by 1.</li>
            <li>A neutral component increases its lore modifier by 1 (a truly neutral city gains an increase of 2 to its lore modifier).</li>
          </ul>
          <p>Alignment never modifies a settlement’s economy modifier.</p></div> 
        </div> <b>${this.type}</b>
        
      </p>
      <p>
        <b>Population:</b> ${this.table.populationValue[this.size]}
      </p>
      <p class="statistics">
        <div class="statistic">
          <span class="popper"><b>Corruption</b> ${this.corruption};</span>
          <span class="popup">A settlement’s corruption modifies all Bluff checks made against city officials or guards and all Stealth checks made outside (but not inside buildings or underground).</span> 
        </div>
        <div class="statistic">
          <span class="popper"><b>Crime</b> ${this.crime};</span>
          <span class="popup">The atmosphere generated by a settlement’s crime level applies as a modifier on Sense Motive checks to avoid being bluffed and to Sleight of Hand checks made to pick pockets.</span> 
        </div>
        <div class="statistic">
          <span class="popper"><b>Economy</b> ${this.economy};</span>
          <span class="popup">A settlement’s economy helps its citizens make money, and thus it applies as a modifier on all Craft, Perform, and Profession checks made to generate income.</span> 
        </div>
        <div class="statistic">
          <span class="popper"><b>Law</b> ${this.law};</span>
          <span class="popup">A settlement’s law modifier applies on Intimidate checks made to force an opponent to act friendly, Diplomacy checks against government officials, or Diplomacy checks made to call on the city guard.</span> 
        </div>
        <div class="statistic">
          <span class="popper"><b>Lore</b> ${this.lore};</span>
          <span class="popup">A settlement’s lore modifier applies on Diplomacy checks made to gather information and Knowledge checks made using the city’s resources to do research when using a library.</span> 
        </div>
        <div class="statistic">
          <span class="popper"><b>Society</b> ${this.society};</span>
          <span class="popup">A settlement’s society modifier applies on all Disguise checks, as well as on Diplomacy checks made to alter the attitude of any non-government official.</span> 
        </div>
      </p>

      <p>
        <div class="statistic">
          <span class="popper danger"><b>Danger:</b> ${this.danger};</span>
          <span class="popup">A settlement’s danger value is a number that gives a general idea of how dangerous it is to live in the settlement. A settlement’s base danger value depends on its type.</span> 
        </div>
      </p>

      <hr>
      <p><b>Qualities:</b> ${this.qualityNames.join(", ")}</p>

      ${this.printModifiers(this.qualities)}

      <hr>
      <p><b>Government:</b> ${this.governmentNames.join(", ")}</p>

      ${this.printModifiers(this.governments)}

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

      selector.innerHTML = html;
      this.qualitiesWikiLinks = qualitiesWikiLinks;
    }


    this.renderWiki = (selector = document.querySelector(".template")) => {
      selector.innerHTML =
        `{{City |name=City |alignment=${this.alignment} |type=${this.type} |corruption=${this.corruption} |crime=${this.crime} |economy=${this.economy} |law=${this.law} |lore=${this.lore} |society=${this.society} |qualities=${this.qualitiesWikiLinks} |danger=${this.danger} |government=${this.governmentNames.join(", ")} |population=${this.population} |notable_npcs= |base_val=${this.baseValueTotal} |purchase_limit=${this.purchaseLimitTotal} |spellcasting=${this.spellcastingMax} |minor=${this.minorItems} |medium=${this.mediumItems} |major=${this.majorItems}}}
        <div>
          <p>== Qualities ==</p>
          ${this.printModifiers(this.qualities, true)}
        </div>
        <div>
          <p>== Government ==</p>
          ${this.printModifiers(this.governments, true)}
        </div>`;
    }

    this.setSize = (size) => {
      size = parseInt(size);
      this.size = size;
    };

    this.getSize = () => {
      return this.size;
    };

    this.setAlignment = (alignment) => {
      this.alignment = alignment;
    };

    this.getAlignment = () => {
      return this.alignment;
    };

    this.printModifiers = (qualities, wikiMode = false) => {
      let html = '';

      if (wikiMode) {
        html += ``;
      } else {
        html += ``;
      }

      qualities.forEach(quality => {
        html += `<div class="quality">`;
        if (wikiMode) {
          html += `=== ${quality.name} ===<br>`;
          html += `${quality.notes}<br>`;
          html += `<br>`;
          html += `'''Modifier(s):''' `;
        } else {
          html += `<b>${quality.name}</b>`;
          html += `<br>${quality.notes}`;
          html += `<br>`;
          html += `<b>Modifier(s):</b> `;
        }
        this.table.statistics.forEach(stat => {
          if (quality[stat] != 0) {
            switch (stat) {
              case 'spellcastingBonus':
                let spellcastingBonus = quality[stat] <= 0 ? `decrease spellcasting by ${quality[stat]} level(s)`  : `increase spellcasting by ${quality[stat]} level(s)`
                html += 'Spellcasting: ' + spellcastingBonus + '; ';
                break;
              case 'baseValueBonus':
                let baseValueBonus = quality[stat] <= 0 ? `decrease by ${quality[stat] * 100}%` : `increase by ${quality[stat] * 100}%`
                html += 'Base value: ' + baseValueBonus + '; ';
                break;
              case 'purchaseLimitBonus':
                let purchaseLimitBonus = quality[stat] <= 0 ? `decrease by ${quality[stat] * 100}%` : `increase by ${quality[stat] * 100}%`
                html += 'Purchase limit: ' + purchaseLimitBonus + '; ';
                break;
              default:
                let genericBonus = quality[stat] <= 0 ? quality[stat] : '+' + quality[stat];
                console.log(genericBonus);
                html += stat.charAt(0).toUpperCase() + stat.slice(1) + ': ' + genericBonus + '; ';
                break;
            }
          }
        });
        
        html += `</div>`;
        
      });
      
      // console.log(html);
      return html;
    }
  }
}