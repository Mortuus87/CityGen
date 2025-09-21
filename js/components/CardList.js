const Operation = {
  ADD: 'add',
  REMOVE: 'remove',
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
    let qualities = this.sortByName(this.settlement.selectedQualities);
    qualities.forEach((quality) => {
      html += this.getCard(quality, Operation.ADD);
    });

    document.querySelector("#available-qualities").innerHTML = html;
  }

  printAvailableGovernments = () => {
    let html = '';
    let governments = this.sortByName(this.settlement.availableGovernments);
    governments.forEach((government) => {
      html += this.getCard(government, Operation.ADD);
    });

    document.querySelector("#available-governments").innerHTML = html;
  }

  printSelectedQualities = () => {
    let html = '';
    let qualities = this.sortByName(this.settlement.selectedQualities);
    qualities.forEach((quality) => {
      html += this.getCard(quality, Operation.REMOVE);
    });

    document.querySelector("#selected-qualities").innerHTML = html;
  }


  printSelectedGovernments = () => {
    let html = '';
    let governments = this.sortByName(this.settlement.selectedGovernments);
    governments.forEach((government) => {
      html += this.getCard(government, Operation.REMOVE);
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

  getCard = (quality, type) => {
    return `
    <div class="card" id="${quality.uid}">
      <div class="card-body">
        <div class="row">
          <div class="col-12">
            <h3>${quality.name}</h3>
            <span>${type === Operation.REMOVE ? 'remove' : 'add'}</span>
          </div>
          <div class="col-12">
            <details>
              <summary>Read more</summary>
              ${quality.notes}
            </details>
          </div>
        </div>
      </div>
    </div>`;
  }

  getEmptyCard = (type) => {
    return `<div class="card empty-${type}">
    <div class="card-body">
      <div class="row">
        <div class="col-12">
          <h3>${quality.name}</h3>
          <span>roll ${type}</span>
        </div>
        <div class="col-12">
          <details>
            <summary>Read more</summary>
            ${quality.notes}
          </details>
        </div>
      </div>
    </div>
  </div>`;
  }
}
