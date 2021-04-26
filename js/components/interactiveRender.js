export default function () {
	let html = "";
	
	html += `<select name="alignment" id="alignment">`;
	for (const alignment of settlementTables.alignment.all) {
		html += `<option value="${alignment}">${alignment}</option>`
	}
	html += `</select><br>`;

	html += `<select name="size" id="size">`;
	for (const size of settlementTables.size.all) {
		html += `<option value="${size}">${settlementTables.sizeLabel[size]} - ${settlementTables.populationValue[size]}</option>`
	}
	html += `</select><br>`;

	html += `	<form action="" id="qualities">`;
	for (const score of settlementTables.statistics) {
		html += `
		<label for="${score}">${score}</label>
		<input name="${score}" type="text">
		<br>
		`;
	}
	html += `</form>`;

	




	return html;
}
