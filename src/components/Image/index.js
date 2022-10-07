import React, {useEffect, useRef, useState} from "react"

import classnames from "classnames"
import styles from "./index.module.scss"

import {TbPhotoOff} from "react-icons/tb"

export default function Image(props) {
	const {src, className, classes = {}, ...rest} = props

	const [isLoaded, setLoaded] = useState(false)
	const [imageSrc, setImageSrc] = useState(src)
	const [isError, setIsError] = useState(false)
	const imgEl = useRef(null)

	const onLoad = e => {
		setLoaded(true)
	}
	const onError = e => {
		setIsError(true)
	}

	useEffect(() => {
		const img = imgEl.current
		img.addEventListener("load", onLoad)
		img.addEventListener("error", onError)
		return () => {
			img.removeEventListener("load", onLoad)
			img.removeEventListener("error", onError)
		}
	}, [src])

	useEffect(() => {
		src ? setImageSrc(src) : setIsError(true)
	}, [src])

	return isError ? (
		<div className={styles.error}>
			<TbPhotoOff className={styles.icon} />
		</div>
	) : (
		<img
			alt=""
			src={imageSrc}
			ref={imgEl}
			className={classnames(
				styles.root,
				className,
				classes.root,
				isLoaded && styles.loaded
			)}
			{...rest}
		/>
	)
}
