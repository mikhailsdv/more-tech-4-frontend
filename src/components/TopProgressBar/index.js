import React, {useState, useEffect} from "react"

import styles from "./index.module.scss"

const TopProgressBar = props => {
	const {isOverscrolled} = props
	const [progress, setProgress] = useState(0)

	useEffect(() => {
		const onScroll = () => {
			const doc = document.documentElement
			const scrollTop =
				(window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)
			const scrollHeight =
				document.documentElement.scrollHeight ||
				document.body.scrollHeight
			const windowInnerHeight = window.innerHeight
			const scrollPercent =
				scrollTop / (scrollHeight - windowInnerHeight) || 0
			setProgress(scrollPercent * 100)
		}
		window.addEventListener("scroll", onScroll)

		return () => window.removeEventListener("scroll", onScroll)
	}, [])

	return (
		<div className={styles.root}>
			<div
				className={styles.progress}
				data-overscrolled={isOverscrolled}
				style={{
					transform: `translateX(${-100 + progress}%)`,
				}}
			/>
		</div>
	)
}

export default TopProgressBar
