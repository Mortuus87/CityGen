import { roll } from "./rollArray.js";
import { CardList } from "./CardList.js";

const Type = {
  GOVERNMENT: 'government',
  QUALITY: 'quality',
}

export const Operation = {
  TO_SELECTED: 'add',
  TO_AVAILABLE: 'remove',
}

/**
 * TODO: extract any rendering classes into a separate module. This class should only handle internal logic, not presentation.
 */
export class Settlement {
  constructor(tables) {
    this.table = tables;
    this.size = 0;
    this.alignment = '';

    this.statistics = []; // must be set for sub-arrays to have a home.
    this.resetStatistics();

    this.availableQualities   = this.table.qualities;
    this.selectedQualities    = [];
    this.selectedQualityNotes = [];

    this.availableGovernments    = this.table.governments;
    this.selectedGovernments     = [];
    this.selectedGovernmentNotes = [];

    this.minorItems  = "";
    this.mediumItems = "";
    this.majorItems  = "";

    this.baseValueTotal = 0;
    this.purchaseLimitTotal = 0;
    this.spellcastingMax = "-";

  }

  reset = () => {
    this.resetQualities();
    this.resetStatistics();

    this.minorItems  = "";
    this.mediumItems = "";
    this.majorItems  = "";

    this.baseValueTotal = 0;
    this.purchaseLimitTotal = 0;
    this.spellcastingMax = "-";

    this.minorItems = "-";
    this.mediumItems = "-";
    this.majorItems = "-";
  }

  resetQualities = () => {
    this.availableQualities   = [...this.availableQualities, ...this.selectedQualities];
    this.selectedQualities    = [];
    this.selectedQualityNotes = [];

    this.availableGovernments    = [...this.availableGovernments, ...this.selectedGovernments];
    this.selectedGovernments     = [];
    this.selectedGovernmentNotes = [];
  }

  resetStatistics = () => {
    this.statistics.corruption = 0;
    this.statistics.crime = 0;
    this.statistics.economy = 0;
    this.statistics.law = 0;
    this.statistics.lore = 0;
    this.statistics.society = 0;
    this.statistics.danger = 0;
    this.statistics.baseValueModifier = 0;
    this.statistics.purchaseLimitModifier = 0;
    this.statistics.spellcastingModifier = 0;
  }

  moveQuality = (uid, type, direction) => {
    // console.log('moving', uid, 'to', direction);
    if (type === Type.GOVERNMENT) {
      if (direction === Operation.TO_SELECTED) {
        // move from available to selected
        this.availableGovernments.forEach((government, i) => {
          if (government.uid === uid) {
            this.selectedGovernments.push(this.availableGovernments.splice(i, 1)[0]);
          }
        });
      } else {
        // assume move from selected to available
        this.selectedGovernments.forEach((government, i) => {
          if (government.uid === uid) {
            this.availableGovernments.push(this.selectedGovernments.splice(i, 1)[0]);
          }
        });
      }
    } else if (type === Type.QUALITY) {
      // assume quality
      if (direction === Operation.TO_SELECTED) {
        // move from available to selected
        this.availableQualities.forEach((quality, i) => {
          if (quality.uid === uid) {
            this.selectedQualities.push(this.availableQualities.splice(i, 1)[0])
          }
        });
      } else {
        // assume move from selected to available
        this.selectedQualities.forEach((quality, i) => {
          if (quality.uid === uid) {
            this.availableQualities.push(this.selectedQualities.splice(i, 1)[0])
          }
        });
      }
    }
  }

  setQualities = (qualities, mode = Type.QUALITY) => {
    if (mode === Type.GOVERNMENT) {
      qualities.forEach(quality => {
        this.moveQuality(quality.uid, Type.GOVERNMENT, Operation.TO_SELECTED);
      });
    } else if (mode === Type.QUALITY) {
      qualities.forEach(quality => {
        this.moveQuality(quality.uid, Type.QUALITY, Operation.TO_SELECTED);
      });
    }
  }

  getQualities = (mode = Type.QUALITY) => {
    if (mode === Type.GOVERNMENT) {
      return this.selectedGovernments;
    } else if (mode === Type.QUALITY) {
      return this.selectedQualities;
    }
  }

  applyQualities = () => {
    // reset to not accumulate statistics
    this.resetStatistics();

    let qualitiesToApply = [...this.selectedGovernments, ...this.selectedQualities];
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
          case "spellcastingModifier":
          case "baseValueModifier":
          case "purchaseLimitModifier":
            this.statistics[statName] += parseFloat(quality[statName]);
            break;
            /* this.statistics[statName] += parseFloat(this.baseValue) * parseFloat(quality[statName]);
            break;
            this.statistics[statName] += parseFloat(this.purchaseLimit) * parseFloat(quality[statName]);
            break; */
        }
      })
    });
  }

  setAlignment = (alignment) => {
    this.alignment = alignment;
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
    this.size = parseInt(size);
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

    this.baseValue = parseInt(this.table.baseValues[this.size]);
    this.purchaseLimit = parseInt(this.table.purchaseLimits[this.size]);
  }

  applySpellcastingAndFinance = () => {
    // Raise to minimum 0
    if (this.statistics.spellcastingModifier < 0) {
      this.statistics.spellcastingModifier = 0;
    }

    const magicSize = Math.min(Math.max(parseInt(parseInt(this.statistics.spellcastingModifier)) + parseInt(this.size),0),this.table.spellcastingIndexes.length-1);

    /* console.log('---');
    console.log('size',this.size);
    console.log('magicSize',magicSize);
    console.log('---');
    console.log('spellcastingModifier',this.statistics.spellcastingModifier);
    console.log('baseValueModifier',this.statistics.baseValueModifier);
    console.log('purchaseLimitModifier',this.statistics.purchaseLimitModifier); */

    this.spellcastingMax = this.table.spellcastingIndexes[magicSize];
    this.baseValueTotal = parseFloat(this.baseValue) + (parseFloat(this.baseValue) * parseFloat(this.statistics.baseValueModifier));
    this.purchaseLimitTotal = parseFloat(this.purchaseLimit) + (parseFloat(this.purchaseLimit) * parseFloat(this.statistics.purchaseLimitModifier));

    /* console.log('---');
    console.log('spellcastingMax',this.spellcastingMax);
    console.log('baseValueTotal',this.baseValueTotal);
    console.log('purchaseLimitTotal',this.purchaseLimitTotal); */

    this.minorItems = this.table.magicItemsBySpellcasting[magicSize + 4];
    this.mediumItems = this.table.magicItemsBySpellcasting[magicSize + 2];
    this.majorItems = this.table.magicItemsBySpellcasting[magicSize + 0];
  }

  fillQualities = () => {
    this.setQualities(roll(this.availableQualities, this.table.qualitiesValues[this.size] - this.selectedQualities.length), Type.QUALITY);
    this.setQualities(roll(this.availableGovernments, 1 - this.selectedGovernments.length), Type.GOVERNMENT);
  }

  // Full processing - reset and apply.
  calculate = () => {
    this.applySize();
    this.applyAlignment();
    this.applyQualities();
    this.applySpellcastingAndFinance();
  }

  getProperties = (array, property) => {
    let retArray = [];
    array.forEach(element => {
      retArray.push(element[property]);
    });
    return retArray;
  }

  render = () => {
    document.querySelector('#alignment').innerHTML = this.alignment
    document.querySelector('#type').innerHTML = this.type;
    document.querySelector('#population-range').innerHTML = this.table.populationValues[this.size];
    document.querySelector('#short-government').innerHTML = this.getProperties(this.selectedGovernments, 'name').join(', ');

    let qualitiesHtml = '';
    this.getProperties(this.selectedQualities, 'name').forEach(qualityName => {
      qualitiesHtml += `<li>${qualityName}</li>`;
    });
    document.querySelector('#short-qualities').innerHTML = qualitiesHtml;

    ["corruption","crime","economy","law","lore","society","danger"].forEach(statName => {
      document.querySelector('#' + statName + '-score' ).innerHTML = this.statistics[statName];
    });

    document.querySelector('#spellcastingTotal').innerHTML = this.spellcastingMax + '*';
    document.querySelector('#baseValueTotal').innerHTML = this.baseValueTotal;
    document.querySelector('#purchaseLimitTotal').innerHTML = this.purchaseLimitTotal;

    let cardList = new CardList(this);
    cardList.printSelectedGovernments();
    cardList.printSelectedQualities();

    cardList.printAvailableGovernments();
    cardList.printAvailableQualities();

    this.renderWiki();
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
    `{{City |name=City |alignment=${this.alignment} |type=${this.type} |corruption=${this.statistics.corruption} |crime=${this.statistics.crime} |economy=${this.statistics.economy} |law=${this.statistics.law} |lore=${this.statistics.lore} |society=${this.statistics.society} |qualities=${qualitiesWikiLinks} |danger=${this.danger} |government=${this.getProperties(this.selectedGovernments, 'name').join(', ')} |population=${this.table.populationValues[this.size]} |notable_npcs= |base_val=${this.baseValueTotal} |purchase_limit=${this.purchaseLimitTotal} |spellcasting=${this.spellcastingMax} |minor=${this.minorItems} |medium=${this.mediumItems} |major=${this.majorItems}}}
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
            case 'spellcastingModifier':
            let spellcastingModifier = quality[stat] <= 0 ? `decrease spellcasting by ${quality[stat]} level(s)`  : `increase spellcasting by ${quality[stat]} level(s)`
            html += 'Spellcasting: ' + spellcastingModifier + '; ';
            break;
            case 'baseValueModifier':
            let baseValueModifier = quality[stat] <= 0 ? `decrease by ${quality[stat] * 100}%` : `increase by ${quality[stat] * 100}%`
            html += 'Base value: ' + baseValueModifier + '; ';
            break;
            case 'purchaseLimitModifier':
            let purchaseLimitModifier = quality[stat] <= 0 ? `decrease by ${quality[stat] * 100}%` : `increase by ${quality[stat] * 100}%`
            html += 'Purchase limit: ' + purchaseLimitModifier + '; ';
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
