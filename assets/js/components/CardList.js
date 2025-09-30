import { Operation, Type } from "./Settlement.js";

export class CardList {
  /**
   * @param {Settlement} settlement
   */
  constructor(settlement) {
    this.settlement = settlement;
  }

  printAvailableGovernments = () => {
    let html = '';
    let governments = this.sortByName(this.settlement.availableGovernments);
    governments.forEach((government) => {
      html += this.getCard(government, Operation.TO_SELECTED);
    });

    document.querySelector("#available-governments").innerHTML = html;
  }

  printAvailableQualities = () => {
    let html = '';
    let qualities = this.sortByName(this.settlement.availableQualities);
    qualities.forEach((quality) => {
      html += this.getCard(quality, Operation.TO_SELECTED);
    });

    document.querySelector("#available-qualities").innerHTML = html;
  }

  printAvailableDisadvantages = () => {
    let html = '';
    let qualities = this.sortByName(this.settlement.availableDisadvantages);
    qualities.forEach((quality) => {
      html += this.getCard(quality, Operation.TO_SELECTED);
    });

    document.querySelector("#available-disadvantages").innerHTML = html;
  }

  printSelectedGovernments = () => {
    let html = '';
    let governments = this.sortByName(this.settlement.selectedGovernments);
    governments.forEach((government) => {
      html += this.getCompactCard(government, Operation.TO_AVAILABLE);
    });

    let emptyCount = 1 - this.settlement.selectedGovernments.length

    for (let index = 0; index < emptyCount; index++) {
      html += this.getEmptyCompactCard(Type.GOVERNMENT);
    }

    document.querySelector("#selected-governments").innerHTML = html;
  }

  printSelectedQualities = () => {
    let html = '';
    let qualities = this.sortByName(this.settlement.selectedQualities);
    qualities.forEach((quality) => {
      html += this.getCompactCard(quality, Operation.TO_AVAILABLE);
    });

    let emptyCount = this.settlement.table.qualitiesValues[this.settlement.size] - this.settlement.selectedQualities.length

    for (let index = 0; index < emptyCount; index++) {
      html += this.getEmptyCompactCard(Type.QUALITY);
    }

    document.querySelector("#selected-qualities").innerHTML = html;
  }

  printSelectedDisadvantages = () => {
    let html = '';
    let qualities = this.sortByName(this.settlement.selectedDisadvantages);
    qualities.forEach((quality) => {
      html += this.getCompactCard(quality, Operation.TO_AVAILABLE);
    });

      let emptyCount = 1 - this.settlement.selectedDisadvantages.length

    for (let index = 0; index < emptyCount; index++) {
      html += this.getEmptyCompactCard(Type.DISADVANTAGE, 'optional');
    }

    document.querySelector("#selected-disadvantages").innerHTML = html;
  }

  sortByName = (array) => {
    array.sort(function (a, b) {
      if (a.name < b.name) {
        return -1;
      } else if (a.name > b.name) {
          return 1;
      } else {
          return 0;
      }
    });
    return array;
  };

  getStatistics = (quality) => {
    let names = [];
    this.settlement.table.statistics.forEach((name) => {
      if (quality[name] !== 0) {
        switch (name) {
          case "corruption":
          case "crime":
          case "economy":
          case "law":
          case "lore":
          case "society":
          case "danger":
            names.push(name + ' ' + quality[name]);
            break;
          case "spellcastingModifier":
            names.push('spellcasting bonus ' + quality[name]);
            break;
          case "baseValueModifier":
            names.push('base value bonus ' + quality[name]);
            break;
          case "purchaseLimitModifier":
            names.push('purchase limit bonus ' + quality[name]);
            break;
        }
      }
    })

    return names;
  }

  getIcon = (action) => {
    let html;
    switch (action) {
      case Operation.TO_SELECTED:
        html = '<i class="fas fa-plus-circle"></i>';
        break;
      case Operation.TO_AVAILABLE:
        html = '<i class="fas fa-times-circle"></i>';
        break;
      case Operation.REROLL:
        html = '<i class="fas fa-dice-d20"></i>';
        break;
    }
    return html;
  }

  getTagList = (quality) => {
    const tags = this.getStatistics(quality);
    return tags.length ? `<ul class="tag-list"><li>${tags.join('</li><li>')}</li></ul>` : `<ul class="tag-list"><li>see text</li></ul>`;
  }

  getCard = (quality, operation) => {
    return `
    <div class="col col-12 col-md-6">
      <div class="card default" id="${quality.uid}">
        <div class="row">
          <div class="col-12">
            <div class="card-body">
              <div class="d-flex">
                <div class="w-100">
                  <details>
                    <summary>
                      <span>${quality.name}</b>
                    </summary>
                    <p>${quality.notes}</p>
                  </details>
                  ${this.getTagList(quality)}
                </div>
                <div class="controls">
                  <a class="quality-control" data-type="${quality.type}" data-uid="${quality.uid}" data-operation="${operation}" title="${operation}">${this.getIcon(operation)}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
  }

  getCompactCard = (quality, operation) => {
    return `
    <div class="card compact" id="${quality.uid}">
      <div class="card-body">
        <details>
          <summary><span>${quality.name}</span></summary>
          ${this.getTagList(quality)}
          <p>${quality.notes}</p>
        </details>
        <div class="controls">
          <a class="quality-control" data-type="${quality.type}" data-uid="${quality.uid}" data-operation="${Operation.REROLL}" title="${Operation.REROLL}">${this.getIcon(Operation.REROLL)}</a>
          <a class="quality-control" data-type="${quality.type}" data-uid="${quality.uid}" data-operation="${operation}" title="${operation}">${this.getIcon(operation)}</a>
        </div>
      </div>
    </div>`;
  }

  getEmptyCompactCard = (type, variant = 'default') => {
    return `
    <div class="card compact empty ${variant}">
      <div class="card-body">
        <span>${type === 'disadvantage' ? 'Disadvantage(s) [optional]':'Empty ' + type + ' slot'}</span>
        <div class="controls">
          <a class="quality-control" data-type="${type}" data-operation="${Operation.REROLL}" title="Roll">${this.getIcon(Operation.REROLL)}</a>
        </div>
      </div>
    </div>`;
  }
}
