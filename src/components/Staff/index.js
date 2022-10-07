import React from "react"
import classnames from "classnames"

import Typography from "@mui/material/Typography"
import Skeleton from "../Skeleton"
import Avatar from "@mui/material/Avatar"

import styles from "./index.module.scss"

const Staff = props => {
	const {name, image, position, card, className, ...rest} = props

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
						className={"mb-1"}
					/>
				)}
				{position ? (
					<Typography variant={"caption"}>{position}</Typography>
				) : (
					<Skeleton animation={false} width="80%" height={20} />
				)}
			</div>
		</div>
	)
}

export default Staff
