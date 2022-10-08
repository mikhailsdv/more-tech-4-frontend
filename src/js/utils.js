const arrayRandom = arr => {
	return arr[Math.floor(Math.random() * arr.length)]
}

const arrayShuffle = b => {
	const a = b.slice()
	let j, x, i
	for (i = a.length - 1; i > 0; i--) {
		j = Math.floor(Math.random() * (i + 1))
		x = a[i]
		a[i] = a[j]
		a[j] = x
	}
	return a
}

const pluralize = (n, singular, plural, accusative) => {
	n = Math.abs(n)
	const n10 = n % 10
	const n100 = n % 100
	if (n10 === 1 && n100 !== 11) {
		return singular
	}
	if (2 <= n10 && n10 <= 4 && !(12 <= n100 && n100 <= 14)) {
		return plural
	}
	return accusative
}

/*const downloadFile = (url, filename) => {
	const a = document.createElement("a")
	a.href = url
	//a.setAttribute("target", "_blank")
	a.setAttribute("download", filename)
	a.click()
	a.remove()
}*/

const numberWithSpaces = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ")

const sleep = time => new Promise(r => setTimeout(r, time))

const hasBlurSupport =
	typeof document.body.style.webkitBackdropFilter === "string" ||
	typeof document.body.style.backdropFilter === "string"

const getFirstAndLastName = user => `${user.first_name} ${user.last_name}`

const getImage = filename =>
	`${process.env.REACT_APP_API_BASE_URL}/photo/${filename}`

module.exports = {
	pluralize,
	arrayRandom,
	arrayShuffle,
	sleep,
	numberWithSpaces,
	hasBlurSupport,
	getFirstAndLastName,
	getImage,
}
