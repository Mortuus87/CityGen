export default function (table) {
  return new Qualities(table)
}

class Qualities {
  constructor(table = settlementTables) {
    this.qualities = table.qualities
    this.print = () => {
      let html = '';
      this.qualities.forEach(quality => {
        html += `=== ${quality.name} ===<br>`;
        html += `${quality.notes}<br><br>`;

        let stats = [
          'corruption',
          'crime',
          'economy',
          'law',
          'lore',
          'society',
          'danger',
          'spellcastingBonus',
          'baseValueBonus',
          'purchaseLimitBonus'
        ];

        html += `'''Modifier(s):''' `;
        stats.forEach(stat => {
          if (quality[stat] != 0) {
            quality[stat] = quality[stat] <= 0 ? quality[stat] : '+'+quality[stat]
            switch (stat) {
              case 'spellcastingBonus':
                html += 'Spellcasting ' + quality[stat] + '; '
                break;
              case 'baseValueBonus':
                html += 'Base value ' + quality[stat] + '; '
                break;
              case 'purchaseLimitBonus':
                html += 'Purchase limit ' + quality[stat] + '; '
                break;
              default:
                html += stat.charAt(0).toUpperCase() + stat.slice(1) + ' ' + quality[stat] + '; '
                break;
            }  
          }
        });
        html += `<br><br>`;
      });

      document.querySelector(".info").innerHTML = html;
    }
  }
}