export default function () {
	return new CityInterface();
}

function CityInterface() {
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

		html += `<select name="qualities" id="qualities">`;
		for (let i = 0; i < this.t.qualities.length; i++) {
			const quality = this.t.qualities[i];
			html += `<option value="${i}">${quality.name}</option>`;

		}
		html += `</select>`;

		html +=
			`<div id="quality-preview">
		<h2>Get name</h2>
		<p>settlementTables.qualities[i] where i is the value of the select</p>
		<p>Add a button with the same id passed to a function that looks up and adds it to a render container</p>
		<button id="add-quality">Add quality</button>

		<br><br>
		
		<div id="qualities-output">
			<div id="quality">
				<h3>Quality</h3>
				<p>Example quality description</p>
			</div>
		</div>
	</div>`;


		html += `<br><br>`;
		return html;
	}
	this.fill = (settlement) => {
		document.querySelector('#alignment [value="'+settlement.alignment+'"]').selected = true;
		document.querySelector('#size [value="'+settlement.size+'"]').selected = true;
		
		for (let i = 0; i < this.t.statistics.length; i++) {
			const stat = this.t.statistics[i];
			document.querySelector(`#${stat}-base`).value = settlement[stat];
		}

		let qualitiesHtml = '';
		for (let i = 0; i < settlement.qualities.length; i++) {
			qualitiesHtml += 
			`
			<h3>${settlement.qualities[i]}</h3>
			<p>${settlement.qualityNotes[i]}</p>
			`;
		}
		document.querySelector(`#qualities-output`).innerHTML = qualitiesHtml;


	}
}