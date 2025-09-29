import { roll } from "./rollArray.js";
import { CardList } from "./CardList.js";

export const Type = {
  GOVERNMENT: 'government',
  QUALITY: 'quality',
  DISADVANTAGE: 'disadvantage',
}

export const Operation = {
  TO_SELECTED: 'add',
  TO_AVAILABLE: 'remove',
  REROLL: 'reroll'
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

    this.availableGovernments    = this.table.governments;
    this.selectedGovernments     = [];

    this.availableQualities   = this.table.qualities;
    this.selectedQualities    = [];

    this.availableDisadvantages    = this.table.disadvantages;
    this.selectedDisadvantages     = [];


    this.minorItems  = "";
    this.mediumItems = "";
    this.majorItems  = "";

    this.baseValueTotal = 0;
    this.purchaseLimitTotal = 0;
    this.spellcastingMax = "-";
  }

  reset = () => {
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
    this.availableGovernments = [...this.availableGovernments, ...this.selectedGovernments];
    this.selectedGovernments  = [];

    this.availableQualities   = [...this.availableQualities, ...this.selectedQualities];
    this.selectedQualities    = [];

    this.availableDisadvantages = [...this.availableDisadvantages, ...this.selectedDisadvantages];
    this.selectedDisadvantages  = [];
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
    //console.log(this.selectedGovernments);
    switch (type) {
      case Type.GOVERNMENT:
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
      break;
      case Type.QUALITY:
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
      break;
      case Type.DISADVANTAGE:
      if (direction === Operation.TO_SELECTED) {
        // move from available to selected
        this.availableDisadvantages.forEach((quality, i) => {
          if (quality.uid === uid) {
            this.selectedDisadvantages.push(this.availableDisadvantages.splice(i, 1)[0])
          }
        });
      } else {
        // assume move from selected to available
        this.selectedDisadvantages.forEach((quality, i) => {
          if (quality.uid === uid) {
            this.availableDisadvantages.push(this.selectedDisadvantages.splice(i, 1)[0])
          }
        });
      }
      break;
    }
  }

  setQualities = (qualities, type) => {
    switch (type) {
      case Type.GOVERNMENT:
      qualities.forEach(quality => {
        this.moveQuality(quality.uid, Type.GOVERNMENT, Operation.TO_SELECTED);
      });
      break;
      case Type.QUALITY:
      qualities.forEach(quality => {
        this.moveQuality(quality.uid, Type.QUALITY, Operation.TO_SELECTED);
      });
      break;
      case Type.DISADVANTAGE:
      qualities.forEach(quality => {
        this.moveQuality(quality.uid, Type.DISADVANTAGE, Operation.TO_SELECTED);
      });
      break;
    }
  }

  addRandomQuality = (type) => {
    let qualities = [];
    switch (type) {
      case Type.GOVERNMENT:
      qualities = roll(this.availableGovernments, 1)
      break;
      case Type.QUALITY:
      qualities = roll(this.availableQualities, 1)
      break;
      case Type.DISADVANTAGE:
      qualities = roll(this.availableDisadvantages, 1)
      break;
    }

    qualities.forEach(quality => {
      this.moveQuality(quality.uid, type, Operation.TO_SELECTED)
    });

  }

  getQualities = (mode) => {
    switch (mode) {
      case Type.GOVERNMENT:
      return this.selectedGovernments;
      case Type.QUALITY:
      return this.selectedQualities;
      case Type.DISADVANTAGE:
      return this.selectedDisadvantages;
    }
  }

  applyQualities = () => {
    // reset to not accumulate statistics
    let qualitiesToApply = [...this.selectedGovernments, ...this.selectedQualities, ...this.selectedDisadvantages];
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
    this.table.statistics.forEach(statName => {
      switch (statName) {
        case "corruption":
        case "crime":
        case "economy":
        case "law":
        case "lore":
        case "society":
        this.statistics[statName] = this.statistics[statName] + this.table.modifiers[this.size];
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

    this.spellcastingMax = this.table.spellcastingIndexes[magicSize];
    this.baseValueTotal = parseFloat(this.baseValue) + (parseFloat(this.baseValue) * parseFloat(this.statistics.baseValueModifier));
    this.purchaseLimitTotal = parseFloat(this.purchaseLimit) + (parseFloat(this.purchaseLimit) * parseFloat(this.statistics.purchaseLimitModifier));

    this.minorItems = this.table.magicItemsBySpellcasting[Math.min(magicSize + 4, this.table.magicItemsBySpellcasting.length - 1)];
    this.mediumItems = this.table.magicItemsBySpellcasting[Math.min(magicSize + 2, this.table.magicItemsBySpellcasting.length - 1)];
    this.majorItems = this.table.magicItemsBySpellcasting[Math.min(magicSize + 0, this.table.magicItemsBySpellcasting.length - 1)];
  }

  fillQualities = () => {
    this.setQualities(roll(this.availableQualities, this.table.qualitiesValues[this.size] - this.selectedQualities.length), Type.QUALITY);
    this.setQualities(roll(this.availableGovernments, 1 - this.selectedGovernments.length), Type.GOVERNMENT);
    //this.setQualities(roll(this.availableDisadvantages, 1 - this.selectedDisadvantages.length), Type.DISADVANTAGE);
  }

  // Full processing - reset and apply.
  calculate = () => {
    this.reset();
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
    document.querySelector('#type').innerHTML = this.table.sizeLabels[this.size];
    document.querySelector('#population-range').innerHTML = this.table.populationValues[this.size];
    document.querySelector('#short-government').innerHTML = this.getProperties(this.selectedGovernments, 'name').join(', ');
    document.querySelector('#short-qualities').innerHTML = this.getProperties(this.selectedQualities, 'name').join(', ');

    ["corruption","crime","economy","law","lore","society","danger"].forEach(statName => {
      document.querySelector('#' + statName + '-score' ).innerHTML = this.statistics[statName];
    });

    document.querySelector('#spellcastingTotal').innerHTML = this.spellcastingMax;
    document.querySelector('#baseValueTotal').innerHTML = this.baseValueTotal;
    document.querySelector('#purchaseLimitTotal').innerHTML = this.purchaseLimitTotal;

    document.querySelector('#minorItems').innerHTML = this.minorItems;
    document.querySelector('#mediumItems').innerHTML = this.mediumItems;
    document.querySelector('#majorItems').innerHTML = this.majorItems;

    document.querySelector('#applied-details').innerHTML =
    this.getProperties(this.selectedGovernments, 'notes').join('</p><p>') + '</p><p>' +
    this.getProperties(this.selectedQualities, 'notes').join('</p><p>') + '</p><p>' +
    this.getProperties(this.selectedDisadvantages, 'notes').join('</p><p>');

    let cardList = new CardList(this);
    cardList.printSelectedGovernments();
    let governmentCount = document.querySelector('#governmentCount');
    governmentCount.innerHTML = '(' + this.selectedGovernments.length + '/1)';
    if (this.selectedGovernments.length > 1) {
      governmentCount.classList.add('error');
    } else {
      governmentCount.classList.remove('error');
    }

    cardList.printSelectedQualities();
    let qualityCount = document.querySelector('#qualityCount');
    qualityCount.innerHTML = '(' + this.selectedQualities.length + '/' + this.table.qualitiesValues[this.size] + ')';
    if (this.selectedQualities.length > this.table.qualitiesValues[this.size]) {
      qualityCount.classList.add('error');
    } else {
      qualityCount.classList.remove('error');
    }

    cardList.printSelectedDisadvantages();
    cardList.printAvailableGovernments();
    cardList.printAvailableQualities();
    cardList.printAvailableDisadvantages();

    this.renderWiki();
  }

  renderWiki = () => {
    const textareaSelector = document.querySelector("#wiki-template");
    let qualitiesWikiLinks = '';

    for (let i = 0; i < this.selectedQualities.length; i++) {
      const quality = this.selectedQualities[i];
      qualitiesWikiLinks += `[[#${quality.name}|${quality.name}]]`;
      if (i != this.selectedQualities.length) {
        qualitiesWikiLinks += ', ';
      }
    }

    textareaSelector.innerHTML =
    `{{City |name={{PAGENAME}} |alignment=${this.alignment} |type=${this.table.sizeLabels[this.size]} |corruption=${this.statistics.corruption} |crime=${this.statistics.crime} |economy=${this.statistics.economy} |law=${this.statistics.law} |lore=${this.statistics.lore} |society=${this.statistics.society} |qualities=${qualitiesWikiLinks} |danger=${this.danger} |government=${this.getProperties(this.selectedGovernments, 'name').join(', ')} |population=${this.table.populationValues[this.size]} |notable_npcs= |base_val=${this.baseValueTotal} |purchase_limit=${this.purchaseLimitTotal} |spellcasting=${this.spellcastingMax} |minor=${this.minorItems} |medium=${this.mediumItems} |major=${this.majorItems}}}
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

    return html;
  }
}
