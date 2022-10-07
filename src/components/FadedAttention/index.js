import React from "react"

import CircularProgress from "@mui/material/CircularProgress"

import styles from "./index.module.scss"

const FadedAttention = props => {
	const {loading, message, messageFirst, icon: Icon} = props

	return (
		<div className={styles.root} data-message-first={messageFirst}>
			{loading ? (
				<CircularProgress
					className={styles.progress}
					size={44}
					disableShrink
					variant="indeterminate"
					thickness={4}
				/>
			) : (
				<Icon className={styles.icon} />
			)}
			<span className={styles.message}>{message}</span>
		</div>
	)
}

export default FadedAttention
