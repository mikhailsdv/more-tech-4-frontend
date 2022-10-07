import {useState, useEffect, useCallback} from "react"

export default function useLoadingButton(initial) {
	const [loadingButtons, setLoadingButtons] = useState(initial || [])

	const setLoadingButton = useCallback(id => {
		setLoadingButtons(arr => (arr.includes(id) ? arr : arr.concat(id)))
	}, [])

	const unsetLoadingButton = useCallback(id => {
		setLoadingButtons(arr =>
			arr.includes(id) ? arr.filter(item => item !== id) : arr
		)
	}, [])

	const isLoadingButton = useCallback(id => loadingButtons.includes(id), [
		loadingButtons,
	])

	useEffect(() => {
		setLoadingButtons(initial || [])
	}, [initial])

	return [
		setLoadingButton,
		unsetLoadingButton,
		isLoadingButton,
		loadingButtons,
		setLoadingButtons,
	]
}
