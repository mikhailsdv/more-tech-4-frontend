import React from "react"
import classnames from "classnames"

import Typography from "@mui/material/Typography"

import CancelRoundedIcon from "@mui/icons-material/CancelRounded"

import styles from "./index.module.scss"

//Компонент чипа.
const Chip = props => {
	const {
		children, //str|Текст чипа.
		isSelected, //bool|Передайте , чтобы выделить чип синим цветом.
		onDelete, //func|Функция, которая будет вызвана при удалении этой крошки.
		className, //str|Доплнительный className для корневого элемента.
		...rest //obj|Все остальные пропсы будут перенаправлены корневому элементу.
	} = props

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
