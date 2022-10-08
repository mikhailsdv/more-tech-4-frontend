import React from "react"
import classnames from "classnames"

import Drawer from "@mui/material/Drawer"
import CloseIcon from "@mui/icons-material/Close"

import styles from "./index.module.scss"

const RightDrawer = props => {
	const {children, onClose, isOpen, classes = {}} = props

	return (
		<Drawer
			open={isOpen}
			anchor="right"
			onClose={onClose}
			PaperProps={{
				classes: {
					root: classnames(styles.paper, classes.paper),
				},
			}}
		>
			{onClose && (
				<div className={styles.closeIconWrapper} onClick={onClose}>
					<CloseIcon className={styles.closeIcon} />
				</div>
			)}

			<div className={classnames(styles.inner, classes.inner)}>
				{children}
			</div>
		</Drawer>
	)
}

export default RightDrawer
