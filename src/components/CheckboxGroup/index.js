import React from "react"
import classnames from "classnames"

import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import Typography from "../Typography"

import styles from "./index.module.scss"

export default function CheckboxGroup(props) {
	const {
		title,
		options,
		values,
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
			{title && (
				<FormLabel id={id}>
					<Typography variant={"subtitle1bold"}>{title}</Typography>
				</FormLabel>
			)}
			{options.map(option => (
				<FormControlLabel
					key={option.value}
					checked={values.includes(option.value)}
					onChange={(_, value) => {
						if (value) {
							onChange(values.concat(option.value))
						} else {
							onChange(
								values.filter(item => item !== option.value)
							)
						}
					}}
					control={<Checkbox />}
					label={option.label}
					className={classnames(row && styles.mr)}
				/>
			))}
		</FormControl>
	)
}
