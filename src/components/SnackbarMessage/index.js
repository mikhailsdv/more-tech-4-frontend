import React, {forwardRef} from "react"
import classnames from "classnames"
import {useSnackbar, SnackbarContent} from "notistack"

import Typography from "@mui/material/Typography"
import CloseIcon from "@mui/icons-material/Close"

import styles from "./index.module.scss"

const titles = {
	error: "Ошибка",
	default: "Уведомление",
	warning: "Обратите внимание",
	success: "Уведомление",
}

const SnackbarMessage = forwardRef((props, ref) => {
	const {closeSnackbar} = useSnackbar()
	const {
		id,
		content,
		message,
		variant = "default",
		className,
		classes = {},
		...rest
	} = props
	let {title} = props

	if (!title) {
		title = titles[variant]
	}

	return (
		<SnackbarContent
			ref={ref}
			className={classnames(styles.root, className, classes.root)}
			{...rest}
		>
			<CloseIcon
				className={styles.closeIcon}
				onClick={() => closeSnackbar(id)}
			/>
			{title && (
				<Typography variant={"subtitle1bold"} emphasis={"high"}>
					{title}
				</Typography>
			)}
			{message && (
				<Typography
					variant={"body2"}
					emphasis={"medium"}
					className={styles.message}
				>
					{message}
				</Typography>
			)}
			{content && content}
			{variant && (
				<div
					className={classnames(styles.indicator, styles[variant])}
				/>
			)}
		</SnackbarContent>
	)
})

export default SnackbarMessage
