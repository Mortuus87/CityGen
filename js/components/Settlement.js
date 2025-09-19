import roll from "./rollArray.js";
import { CardList } from "./CardList.js";

export class Settlement {
  constructor(tables) {
    this.table = tables;
    this.size = 0;
    this.alignment = '';

    // this.type = this.table.sizeLabel[size];
    this.statistics = [];
    this.statistics.corruption = 0;
    this.statistics.crime = 0;
    this.statistics.economy = 0;
    this.statistics.law = 0;
    this.statistics.lore = 0;
    this.statistics.society = 0;

    this.statistics.baseValueBonus = 0;
    this.statistics.purchaseLimitBonus = 0;

    this.availableQualities   = this.table.qualities;
    this.selectedQualities    = [];
    this.selectedQualityNames = [];
    this.selectedQualityNotes = [];

    this.availableGovernments    = this.table.governments;
    this.selectedGovernments     = [];
    this.selectedGovernmentNames = [];
    this.selectedGovernmentNotes = [];

    this.minorItems  = "";
    this.mediumItems = "";
    this.majorItems  = "";

    this.baseValueTotal = 0;
    this.purchaseLimitTotal = 0;

    this.spellcastingMax = "-";
  }

  reset = () => {
    this.statistics.corruption = 0;
    this.statistics.crime = 0;
    this.statistics.economy = 0;
    this.statistics.law = 0;
    this.statistics.lore = 0;
    this.statistics.society = 0;

    this.statistics.baseValueBonus = 0;
    this.statistics.purchaseLimitBonus = 0;

    this.availableQualities   = this.table.qualities;
    this.selectedQualities    = [];
    this.selectedQualityNames = [];
    this.selectedQualityNotes = [];

    this.availableGovernments    = this.table.governments;
    this.selectedGovernments     = [];
    this.selectedGovernmentNames = [];
    this.selectedGovernmentNotes = [];

    this.minorItems  = "";
    this.mediumItems = "";
    this.majorItems  = "";

    this.baseValueTotal = 0;
    this.purchaseLimitTotal = 0;

    this.spellcastingMax = "-";
  }

  setQualities = (qualities, mode = '') => {
    if (mode === 'government') {
      qualities.forEach(quality => {
        this.selectedGovernments.push(quality);
        this.selectedGovernmentNames.push(quality["name"])
        this.selectedGovernmentNotes = [...this.selectedGovernmentNotes, ...quality["notes"]];
      });
    } else {
      qualities.forEach(quality => {
        this.selectedQualities.push(quality);
        this.selectedQualityNames.push(quality["name"])
        this.selectedQualityNotes = [...this.selectedQualityNotes, ...quality["notes"]];
      });
    }
  }

  getQualities = (mode = '') => {
    if (mode === 'government') {
      return qualitiesToApply = this.selectedGovernments;
    } else {
      return qualitiesToApply = this.selectedQualities;
    }
  }

  addQuality = (quality, mode = '') => {
    // TODO: get the actual quality based on the ID
    // Move quality from one collection to another! from available to active
    if (mode === 'government') {
      this.selectedGovernments.push(quality);
    } else {
      this.selectedQualities.push(quality);
    }
  }

  removeQuality = (qualityId, mode = '') => {
    // TODO: move back/reenable removed quality
    // move quality back to available collection
    if (mode === 'government') {
      this.selectedGovernments.pop(qualityId);
    } else {
      this.selectedQualities.pop(qualityId);
    }

  }

  applyQualities = (mode = '') => {
    let qualitiesToApply = '';
    if (mode === 'government') {
      qualitiesToApply = this.selectedGovernments;
    } else {
      qualitiesToApply = this.selectedQualities;
    }

    qualitiesToApply.forEach(quality => {
      this.table.statistics.forEach(statName => {
        switch (statName) {
          case "corruption":
          case "crime":
          case "economy":
          case "law":
          case "lore":
          case "society":
          case "danger":
          case "spellcastingBonus":
            this.statistics[statName] += quality[statName];
            break;
          case "baseValueBonus":
            this.statistics[statName] += this.baseValue * quality[statName];
            break;
          case "purchaseLimitBonus":
            this.statistics[statName] += this.purchaseLimit * quality[statName];
            break;
        }
      })
    });
  }

  setGovernments = (governments) => {
    this.setQualities(governments, 'government')
  }

  getGovernments = () => {
    return this.getQualities('government');
  }

  addGovernment = () => {
    this.addQuality('government')
  }

  removeGovernment = () => {
    this.removeQuality('government')
  }

  applyGovernments = () => {
    this.applyQualities('government');
  }

  setAlignment = (alignment) => {
    this.alignment = alignment;
  }

  getAlignment = () => {
    return this.alignment;
  }

  applyAlignment = () => {
    const a = this.alignment;

    if (a === 'LG' || a === 'LN' || a === 'LE') {
      this.statistics.law++;
    }
    if (a === 'LG' || a === 'NG' || a === 'CG') {
      this.statistics.society++;
    }
    if (a === 'CG' || a === 'CN' || a === 'CE') {
      this.statistics.crime++;
    }
    if (a === 'LE' || a === 'NE' || a === 'CE') {
      this.statistics.corruption++;
    }
    if (a === 'NG' || a === 'TN' || a === 'NE' || a === 'LN' || a === 'CN') {
      this.statistics.lore++;
      if (a === 'TN') {
        this.statistics.lore++;
      }
    }
  }

  setSize = (size) => {
    this.size = size;
  };

  getSize = () => {
    return this.size;
  };

  applySize = () => {
    this.type = this.table.sizeLabels[this.size];
    this.modifierNumber = this.table.modifiers[this.size];

    this.table.statistics.forEach(statName => {
      switch (statName) {
        case "corruption":
        case "crime":
        case "economy":
        case "law":
        case "lore":
        case "society":
          this.statistics[statName] = this.statistics[statName] + this.modifierNumber;
          break;
      }
    })

    this.statistics.danger = this.table.dangers[this.size];
    this.statistics.spellcastingBonus = this.size;

    this.selectedQualityNumber = this.table.qualitiesValues[this.size];
    this.baseValue = this.table.baseValues[this.size];
    this.purchaseLimit = this.table.purchaseLimits[this.size];
  }

  getQualitySlots = () => {
    return this.table.qualitiesValues[this.size];
  }

  getGovernmentSlots = () => {
    return 1;
  }

  setSpellcasting = () => {

  }

  getSpellcasting = () => {

  }

  applySpellcasting = () => {
    // Cap if above 9th level
    if (this.statistics.spellcastingBonus > this.table.spellcastingIndexes.length) {
      this.statistics.spellcastingBonus = this.table.spellcastingIndexes.length;
    }

    // Raise to minimum 0
    if (this.statistics.spellcastingBonus < 0) {
      this.statistics.spellcastingBonus = 0;
    }

    this.spellcastingMax = this.table.spellcastingIndexes[this.statistics.spellcastingBonus];
    this.purchaseLimitTotal = this.purchaseLimit + this.statistics.purchaseLimitBonus;
    this.baseValueTotal = this.baseValue + this.statistics.baseValueBonus;

    this.minorItems = this.table.magicItemsBySpellcasting[this.size + 4];
    this.mediumItems = this.table.magicItemsBySpellcasting[this.size + 2];
    this.majorItems = this.table.magicItemsBySpellcasting[this.size + 0];
  }

  // Full processing - reset and apply.
  calculate = () => {
    this.reset();

    this.applySize();
    this.applyAlignment();

    this.setQualities(roll(this.availableQualities, this.getQualitySlots()));
    this.setQualities(roll(this.availableGovernments, this.getGovernmentSlots()), 'government');

    this.applyQualities();
    this.applyGovernments();


    this.applySpellcasting();
  }

  render = () => {
    /*
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
    */

    document.querySelector('#alignment').innerHTML = this.alignment
    document.querySelector('#type').innerHTML = this.type + ' (' + this.size + ')'
    document.querySelector('#population-range').innerHTML = this.table.populationValues[this.size];
    document.querySelector('#short-government').innerHTML = this.selectedGovernmentNames.join(', ');
    let qualitiesHtml = '';
    this.selectedQualityNames.forEach(qualityName => {
      qualitiesHtml += `<li>${qualityName}</li>`;
    });
    document.querySelector('#short-qualities').innerHTML = qualitiesHtml;

    ["corruption","crime","economy","law","lore","society","danger"].forEach(statName => {
      document.querySelector('#' + statName + '-score' ).innerHTML = this.statistics[statName];
    });

    let cardList = new CardList(this);
    cardList.printAvailableQualities();
    cardList.printAvailableGovernments();

    cardList.printSelectedQualities();
  }

  renderWiki = () => {
    const selector = document.querySelector("#template");
    let qualitiesWikiLinks = '';

    for (let i = 0; i < this.selectedQualities.length; i++) {
      const quality = this.selectedQualities[i];
      qualitiesWikiLinks += `[[#${quality.name}|${quality.name}]]`;
      if (i != this.selectedQualities.length) {
        qualitiesWikiLinks += ', ';
      }
    }

    selector.innerHTML =
    `{{City |name=City |alignment=${this.alignment} |type=${this.type} |corruption=${this.statistics.corruption} |crime=${this.statistics.crime} |economy=${this.statistics.economy} |law=${this.statistics.law} |lore=${this.statistics.lore} |society=${this.statistics.society} |qualities=${qualitiesWikiLinks} |danger=${this.danger} |government=${this.selectedGovernmentNames.join(", ")} |population=${this.table.populationValues[this.size]} |notable_npcs= |base_val=${this.baseValueTotal} |purchase_limit=${this.purchaseLimitTotal} |spellcasting=${this.spellcastingMax} |minor=${this.minorItems} |medium=${this.mediumItems} |major=${this.majorItems}}}
    <div>
    <p>== Qualities ==</p>
    ${this.printModifiers(this.selectedQualities, true)}
    </div>
    <div>
    <p>== Government ==</p>
    ${this.printModifiers(this.selectedGovernments, true)}
    </div>`;
  }

  printModifiers = (qualities, wikiMode = true) => {
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
            /* console.log(genericBonus); */
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
