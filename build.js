import { readFile, writeFile } from 'fs/promises'
import { marked } from 'marked'

const put_into_index_html = html => `
<!doctype html>
<html>
<head>
	<meta charset="utf-8"/>
	<title>Notes</title>
	<link rel="stylesheet" type="text/css" href="style.css" />
</head>
<body>
	<main>${html}</main>
	<script>
		window.addEventListener('load', () => {
			setTimeout(() => {
				window.scrollTo(0, document.scrollingElement.scrollHeight)
			}, 0)
		})
	</script>
</body>
</html>
`

const main = async() => {
	const input_path = `./input/notes.md`
	const output_path = `./public/index.html`

	const markdown = await readFile(input_path, { encoding: `utf8` })
	const notes_html = marked.parse(markdown)

	await writeFile(output_path, put_into_index_html(notes_html))
}

main().then(() => {
	console.log(`✅`)
}).catch(err => {
	console.error(err)
	process.exit(1)
})
