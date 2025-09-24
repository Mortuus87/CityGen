const Operation = {
  TO_SELECTED: 'add',
  TO_AVAILABLE: 'remove'
}

export class CardList {
  /**
   * @param {Settlement} settlement
   */
  constructor(settlement) {
    this.settlement = settlement;
  }

  printAvailableQualities = () => {
    let html = '';
    let qualities = this.sortByName(this.settlement.availableQualities);
    qualities.forEach((quality) => {
      html += this.getCard(quality, Operation.TO_SELECTED);
    });

    document.querySelector("#available-qualities").innerHTML = html;
  }

  printAvailableGovernments = () => {
    let html = '';
    let governments = this.sortByName(this.settlement.availableGovernments);
    governments.forEach((government) => {
      html += this.getCard(government, Operation.TO_SELECTED);
    });

    document.querySelector("#available-governments").innerHTML = html;
  }

  printSelectedQualities = () => {
    let html = '';
    let qualities = this.sortByName(this.settlement.selectedQualities);
    qualities.forEach((quality) => {
      html += this.getCompactCard(quality, Operation.TO_AVAILABLE);
    });

    document.querySelector("#selected-qualities").innerHTML = html;
  }


  printSelectedGovernments = () => {
    let html = '';
    let governments = this.sortByName(this.settlement.selectedGovernments);
    governments.forEach((government) => {
      html += this.getCompactCard(government, Operation.TO_AVAILABLE);
    });

    document.querySelector("#selected-governments").innerHTML = html;
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

  getCard = (quality, operation) => {
    const tags = this.getStatistics(quality);
    const tagsHtml = tags.length ? `<ul class="tag-list"><li>${tags.join('</li><li>')}</li></ul>` : ``;

    return `
    <div class="card default" id="${quality.uid}">
        <div class="row">
          <div class="col-12">
            <div class="card-header">
              <h3>${quality.name}</h3>
              <div class="controls">
                <a class="quality-control" data-type="${quality.type}" data-uid="${quality.uid}" data-operation="${operation}">${operation === Operation.TO_SELECTED ? '<i class="fas fa-plus-circle"></i>' : '<i class="fas fa-minus-circle"></i>'}</a>
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="card-body">
              <details>
                <summary>Read more</summary>
                ${tagsHtml}
                ${quality.notes}
              </details>
          </div>
        </div>
      </div>
    </div>`;
  }

  getCompactCard = (quality, operation) => {
    const tags = this.getStatistics(quality);
    const tagsHtml = tags.length ? `<ul class="tag-list"><li>${tags.join('</li><li>')}</li></ul>` : ``;

    return `
    <div class="card compact" id="${quality.uid}">
      <div class="card-body">
        <details>
          <summary>${quality.name}</summary>
          ${tagsHtml}
          ${quality.notes}
        </details>
        <div class="controls">
          <a class="quality-control" data-type="${quality.type}" data-uid="${quality.uid}" data-operation="${operation}">${operation === Operation.TO_SELECTED ? '<i class="fas fa-plus-circle"></i>' : '<i class="fas fa-minus-circle"></i>'}</a>
        </div>
      </div>
    </div>`;
  }

  getEmptyCard = (operation) => {
    return `<div class="card empty-${operation}">
    <div class="card-body">
      <div class="row">
        <div class="col-12">
          <h3>${quality.name}</h3>
        </div>
        <div class="col-12">
          <details>
            <summary>Read more</summary>
            ${quality.notes}
          </details>
          <div class="controls">
            <a class="${quality.type}" data-uid="${quality.uid}" data-operation="${operation}">${operation}</a>
          </div>
        </div>
      </div>
    </div>
  </div>`;
  }
}
