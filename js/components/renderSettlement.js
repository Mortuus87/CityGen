export default function (settlement) {
    let html = `
    <div class="card">
    <div class="card-header">
      <h2>Settlement</h2>
    </div>
    <div class="card-body">
      <p>${settlement.alignment} - ${settlement.type}</p>
      <p>${settlement.qualities.join(", ")}</p>
      <table>
        <tbody>
          <tr>
            <th>Corruption</th>
            <td>${settlement.statistics.corruption}</td>
          </tr>
        </tbody>
          <tr>
            <th>Crime</th>
            <td>${settlement.statistics.crime}</td>
          </tr>
        </tbody>
          <tr>
            <th>Economy</th>
            <td>${settlement.statistics.economy}</td>
          </tr>
        </tbody>
          <tr>
            <th>Law</th>
            <td>${settlement.statistics.law}</td>
          </tr>
        </tbody>
          <tr>
            <th>Lore</th>
            <td>${settlement.statistics.lore}</td>
          </tr>
        </tbody>
          <tr>
            <th>Society</th>
            <td>${settlement.statistics.society}</td>
          </tr>
        </tbody>
      </table>
      <p>Danger</p>
      <p>Government</p>
      <p>Base Value, Purchase Limit, Spellcasting</p>
      <p>Minor items, medium items, major items</p>
    </div>
  </div>
    `;

    return html;

}