import React from "react"
import classnames from "classnames"
import {getImage, getFirstAndLastName} from "../../js/utils"

import Typography from "@mui/material/Typography"
import Skeleton from "../Skeleton"
import Link from "../Link"
import Avatar from "@mui/material/Avatar"

import styles from "./index.module.scss"

//Компонент карточки сотрудника.
const Staff = props => {
	const {
		id,
		first_name, //str|Имя сотрудника.
		last_name,
		photo_id, //str|Ссылка на фото.
		job, //str|Должность в компании.
		card, //bool|Передайте `true`, если нужно показать компонент в виде карточки.
		className, //str|Доплнительный className для корневого элемента.
		...rest //obj|Все остальные пропсы будут перенаправлены корневому элементу.
	} = props

	const name = Boolean(first_name && last_name)
		? getFirstAndLastName({first_name, last_name})
		: null

	return (
		<Link to={`/profile?id=${id}`} internal block>
			<div
				className={classnames(
					styles.root,
					className,
					card && styles.card
				)}
				{...rest}
			>
				<Avatar className={styles.avatar} src={getImage(photo_id)} />
				<div className={styles.info}>
					{name ? (
						<Typography variant={"subtitle2bold"}>
							{name}
						</Typography>
					) : (
						<Skeleton
							animation={false}
							width="60%"
							height={20}
							className={classnames("mb-1", styles.skeleton)}
						/>
					)}
					{job ? (
						<Typography variant={"caption"}>{job}</Typography>
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
		</Link>
	)
}

export default Staff
