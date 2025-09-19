export class Qualities {
  constructor(table = settlementTables) {
    this.table = table;
    this.qualities = table.qualities
  }

  printWikiHtml = (htmlElement = document.querySelector(".info").innerHTML) => {
    let html = '';
    this.qualities.forEach(quality => {
      html += `=== ${quality.name} ===<br>`;
      html += `${quality.notes}<br><br>`;

      html += `'''Modifier(s):''' `;
      this.table.statistics.forEach(stat => {
        if (quality[stat] != 0) {
          quality[stat] = quality[stat] <= 0 ? quality[stat] : '+'+quality[stat]
          switch (stat) {
            case 'spellcastingBonus':
            html += 'Spellcasting';
            break;
            case 'baseValueBonus':
            html += 'Base value';
            break;
            case 'purchaseLimitBonus':
            html += 'Purchase limit';
            break;
            default:
            html += stat.charAt(0).toUpperCase() + stat.slice(1);
            break;
          }
          html += ': ' + quality[stat] + '; '
        }
      });
      html += `<br><br>`;
    });

    htmlElement = html;
  }
}