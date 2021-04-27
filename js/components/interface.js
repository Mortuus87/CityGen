export default function () {
	let html = "";
	
	html += `<select name="alignment" id="alignment">`;
	for (const alignment of settlementTables.alignment.all) {
		html += `<option value="${alignment}">${alignment}</option>`
	}
	html += `</select><span >Town type</span><br>`;

	html += `<select name="size" id="size">`;
	for (let i = 0; i < settlementTables.size.all.length; i++) {
		html += `<option value="${i}">${settlementTables.populationValue[i]}</option>`;
	}
	html += `</select><br>`;

	html += `<form action="" id="qualities"><table><tbody>`;
	for (const score of settlementTables.statistics) {
		html += `<tr><td><label for="${score}">${score}</label></td>
		<td><input id="${score}" name="${score}" type="text"></td>
		<td> + <span id="${score}-bonus">bonus</span></td>
		<td> = <span id="${score}-final">final</span></td>
		</tr>`;
	}

	html += `</tbody></table></form>`;

	html += `<select name="qualities" id="qualities">`;
	for (let i = 0; i < settlementTables.qualities.length; i++) {
		const quality = settlementTables.qualities[i];
		html += `<option value="${i}">${quality.name}</option>`;
		
	}
	html += `</select>`;

	html += 
	`<div id="quality preview">
		<h2>Get name</h2>
		<p>settlementTables.qualities[i] where i is the value of the select</p>
		<p>Add a button with the same id passed to a function that looks up and adds it to a render container</p>
		<button id="add-quality">Add quality</button>

		<br><br>
		
		<div id="qualities output">
			<div id="quality-id">
				<h3>Quality</h3>
				<p>Example quality description</p>
			</div>
		</div>
	</div>`;


	html += `<br><br><br>`;
	return html;
}
