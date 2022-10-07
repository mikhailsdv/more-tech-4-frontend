import React from "react"
import classnames from "classnames"

import IconButton from "@mui/material/IconButton"

import styles from "./index.module.scss"

const OpenSelect = props => {
	const {
		value,
		onChange,
		placeholder,
		name,
		icon: Icon,
		options,
		className,
		classes = {},
		...rest
	} = props

	return (
		<div
			className={classnames(styles.root, className, classes.root)}
			{...rest}
		>
			<div className={styles.icon}>
				<Icon />
			</div>
			<div className={styles.input}>
				<div className={styles.placeholder}>{placeholder}</div>
				<div className={styles.options}>
					{options.map(
						({value: optionValue, children: optionChildren}) => (
							<IconButton
								key={optionValue}
								className={styles.option}
								data-active={value === optionValue}
								onClick={() => onChange(optionValue)}
							>
								{optionChildren}
							</IconButton>
						)
					)}
				</div>
			</div>
			<input type="hidden" name={name} value={value} />
		</div>
	)
}

export default OpenSelect
