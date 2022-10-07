const fs = require("fs")

const dir = fs.readdirSync("./icons")
dir.forEach(fn => {
	const iconName = fn.replace(".svg", "")
	let svg = fs.readFileSync(`./icons/${fn}`).toString()
	svg = svg
		.replace(/\s?fill=".+?"/gmi, "")
		.replace(/<\/svg>\n?/gmi, "")
		.replace(/<svg .+>\n/gmi, "")
		.trim()
		.replace(/\n/gmi, "\n\t")

	fs.writeFileSync(`./js/${iconName}.js`, `
import React, {forwardRef} from "react"

import Template from "./utils/Template"

export default forwardRef((props, ref) => <Template
	ref={ref}
	tags={["none"]}
	{...props}
>
	${svg}
</Template>)
`.trim())
	console.log(svg)
})