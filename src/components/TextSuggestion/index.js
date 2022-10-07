import React from "react"
import classnames from "classnames"

import LightbulbRoundedIcon from "@mui/icons-material/LightbulbRounded"

import styles from "./index.module.scss"

const TextSuggestion = props => {
	const {
		icon,
		children,
		color = "yellow",
		className,
		classes = {},
		...rest
	} = props

	const Icon = icon || LightbulbRoundedIcon

	return (
		<div
			className={classnames(styles.root, className, classes.root)}
			data-color={color}
			{...rest}
		>
			{children && (
				<div className={styles.message}>
					<Icon className={styles.messageIcon} />
					{children}
				</div>
			)}
		</div>
	)
}

export default TextSuggestion
