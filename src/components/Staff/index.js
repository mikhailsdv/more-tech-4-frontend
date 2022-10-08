import React from "react"
import classnames from "classnames"

import Typography from "@mui/material/Typography"
import Skeleton from "../Skeleton"
import Avatar from "@mui/material/Avatar"

import styles from "./index.module.scss"

//Компонент карточки сотрудника.
const Staff = props => {
	const {
		name, //str|Имя сотрудника.
		image, //str|Ссылка на фото.
		position, //str|Должность в компании.
		card, //bool|Передайте `true`, если нужно показать компонент в виде карточки.
		className, //str|Доплнительный className для корневого элемента.
		...rest //obj|Все остальные пропсы будут перенаправлены корневому элементу.
	} = props

	return (
		<div
			className={classnames(styles.root, className, card && styles.card)}
			{...rest}
		>
			<Avatar className={styles.avatar} src={image} />
			<div className={styles.info}>
				{name ? (
					<Typography variant={"subtitle2bold"}>{name}</Typography>
				) : (
					<Skeleton
						animation={false}
						width="60%"
						height={20}
						className={classnames("mb-1", styles.skeleton)}
					/>
				)}
				{position ? (
					<Typography variant={"caption"}>{position}</Typography>
				) : (
					<Skeleton
						animation={false}
						width="80%"
						height={20}
						className={styles.skeleton}
					/>
				)}
			</div>
		</div>
	)
}

export default Staff
