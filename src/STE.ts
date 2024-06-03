// simple templating engine

/* not really a template engine it just replaces
   {{p0}}, {{p1}}, ... etc tokens with the corresponding
   value of the array index provided to the render function
*/

const regex = /\{{p\d+\}\}/g;

export async function render(
	filePath: string,
	argsList: Array<string | number>,
) {
	const templateFile = Bun.file(filePath);
	const templateLiteral = await templateFile.text();
	return templateLiteral.replace(regex, (match) => {
		const index = match.slice(3, -2); // the number between "{{p" and "}}"
		// @ts-ignore
		return argsList[index];
	});
}
