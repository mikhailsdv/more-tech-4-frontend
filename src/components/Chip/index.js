import React from "react"
import classnames from "classnames"

import Typography from "@mui/material/Typography"

import CancelRoundedIcon from "@mui/icons-material/CancelRounded"

import styles from "./index.module.scss"

const Chip = props => {
	const {children, isSelected, onDelete, className, ...rest} = props

	return (
		<div
			className={classnames(
				styles.root,
				className,
				isSelected && styles.selected
			)}
			{...rest}
		>
			<Typography variant={"subtitle2"} className={styles.text}>
				{children}
			</Typography>
			{onDelete && (
				<CancelRoundedIcon
					className={styles.delete}
					onClick={onDelete}
				/>
			)}
		</div>
	)
}

export default Chip
