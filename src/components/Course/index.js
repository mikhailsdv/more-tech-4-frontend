import React from "react"
import classnames from "classnames"

import Card from "../Card"
import Typography from "../Typography"
import Image from "../Image"
import Button from "../Button"
import IconButton from "@mui/material/IconButton"

import {MdFavoriteBorder} from "react-icons/md"

import styles from "./index.module.scss"

export default function Course(props) {
	const {
		image,
		title,
		description,
		onOpen,
		isFavorite,
		isInCart,
		className,
		classes = {},
		...rest
	} = props

	return (
		<Card
			className={classnames(styles.root, className, classes.root)}
			{...rest}
		>
			<Image src={image} className={"mb-5 w-full"} />
			<Typography variant={"h6"} gutterButtom>
				{title}
			</Typography>
			<Typography variant={"body2"} className={"mb-3"}>
				{description}
			</Typography>
			<div className={styles.footer}>
				<Button
					onClick={onOpen}
					className={"mr-auto"}
					variant={"primary"}
					small
				>
					Открыть курс
				</Button>
				<IconButton className={styles.hoverColor}>
					<MdFavoriteBorder />
				</IconButton>
			</div>
		</Card>
	)
}
