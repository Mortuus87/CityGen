export default function () {
	return new CityInterface();
}

class CityInterface {
	constructor() {
		this.t = settlementTables;
		this.draw = (settlement) => {
			let html = "";

			html += `<select name="alignment" id="alignment">`;
			for (const alignment of this.t.alignment.all) {
				html += `<option value="${alignment}">${alignment}</option>`
			}
			html += `</select><span>${settlement.type}</span><br>`;

			html += `<select name="size" id="size">`;
			for (let i = 0; i < this.t.size.all.length; i++) {
				html += `<option value="${i}">${this.t.populationValue[i]}</option>`;
			}
			html += `</select><br>`;

			html += `<form action="" id="qualities"><table><tbody>`;
			for (const score of this.t.statistics) {
				html += `<tr>
		<td><label for="${score}">${score}</label><br><input id="${score}-base" name="${score}" type="text" disabled></td>
		<td><label for="bonus">bonus</label><br><input id="${score}-bonus" name="bonus" value="0" type="text"></td>
		<td><label for="final">final</label><br><input id="${score}-final" name="final" value="0" type="text"></td>
		</tr>`;
			}

			html += `</tbody></table></form>`;

			// html += `<select name="qualities" id="qualities">`;
			// for (let i = 0; i < this.t.qualities.length; i++) {
			// 	const quality = this.t.qualities[i];
			// 	html += `<option value="${i}">${quality.name}</option>`;

			// }
			// html += `</select>`;

			html +=	`<div id="qualities-output"></div>`;
			html += `<br><br>`;
			return html;
		}
		this.fill = (settlement) => {
			document.querySelector('#alignment [value="' + settlement.alignment + '"]').selected = true;
			document.querySelector('#size [value="' + settlement.size + '"]').selected = true;

			for (let i = 0; i < this.t.statistics.length; i++) {
				const stat = this.t.statistics[i];
				document.querySelector(`#${stat}-base`).value = settlement[stat];
			}

			let qualitiesHtml = '';
			for (let i = 0; i < settlement.qualities.length; i++) {
				qualitiesHtml +=
				`<div class="quality">
					<h3>${settlement.qualities[i]}</h3>
					<p>${settlement.qualityNotes[i]}</p>
				</div>`;
			}

			document.querySelector(`#qualities-output`).innerHTML = qualitiesHtml;

		}
	}
}