export class CardList {
  /**
   * @param {Settlement} settlement
   */
  constructor(settlement) {
    this.settlement = settlement;
  }

  printAvailableQualities = () => {
    let html = '';
    this.settlement.availableQualities.forEach(quality => {
      html += this.getCard(quality);
    });

    document.querySelector("#available-qualities").innerHTML = html;
  }

  printAvailableGovernments = () => {
    let html = '';
    this.settlement.availableGovernments.forEach(government => {
      html += this.getCard(government);
    });

    document.querySelector("#available-governments").innerHTML = html;
  }

  printSelectedQualities = () => {
    let html = '';
    this.settlement.selectedQualities.forEach(quality => {
      html += this.getCard(quality, true);
    });

    document.querySelector("#selected-qualities").innerHTML = html;
  }

  getCard = (quality, removable) => {
    return `
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-12">
            <h3>${quality.name}</h3>
            <span>${removable ? 'remove' : 'add'}</span>
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
