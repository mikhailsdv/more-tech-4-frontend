import React from "react"
import classnames from "classnames"

import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

import styles from "./index.module.scss"

const CardTitle = props => {
	const {className, children, classes = {}, ...rest} = props

	return (
		<Box
			mb={2}
			className={classnames(styles.root, className, classes.root)}
			{...rest}
		>
			<Typography variant="h6">{children}</Typography>
		</Box>
	)
}

export default CardTitle
