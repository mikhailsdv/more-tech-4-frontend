import React from "react"
import classnames from "classnames"

import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"

import styles from "./index.module.scss"

export default function CheckboxGroup(props) {
	const {
		title,
		options,
		value,
		onChange,
		id,
		row,
		className,
		classes = {},
		...rest
	} = props

	return (
		<FormControl
			className={classnames(styles.root, classes.root, className)}
			{...rest}
		>
			{title && <FormLabel id={id}>{title}</FormLabel>}
			{options.map(option => (
				<FormControlLabel
					key={option.value}
					value={option.value}
					control={<Checkbox />}
					label={option.label}
					className={classnames(row && styles.mr)}
				/>
			))}
		</FormControl>
	)
}
