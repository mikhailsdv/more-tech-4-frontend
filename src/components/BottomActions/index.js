import React from "react"
import classnames from "classnames"

import styles from "./index.module.scss"

const BottomActions = props => {
	const {children, isOverscrolled, className, ...rest} = props

	return (
		<div
			className={classnames(styles.root, className)}
			data-overscrolled={isOverscrolled}
			{...rest}
		>
			{children}
		</div>
	)
}

export default BottomActions
