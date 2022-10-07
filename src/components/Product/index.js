import React from "react"
import classnames from "classnames"

import Card from "../Card"
import Typography from "../Typography"
import Image from "../Image"
import Coins from "../Coins"
import IconButton from "@mui/material/IconButton"

import {MdOutlineShoppingBag, MdFavoriteBorder} from "react-icons/md"

import styles from "./index.module.scss"

export default function Product(props) {
	const {
		image,
		title,
		description,
		price,
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
			<Typography variant={"subtitle1bold"} gutterButtom>
				{title}
			</Typography>
			<Typography variant={"body2"} className={"mb-3"}>
				{description}
			</Typography>
			<div className={styles.footer}>
				<Coins
					amount={price}
					className={"mr-auto"}
					classes={{amount: styles.hoverColor}}
				/>
				<IconButton className={styles.hoverColor}>
					<MdOutlineShoppingBag />
				</IconButton>
				<IconButton className={styles.hoverColor}>
					<MdFavoriteBorder />
				</IconButton>
			</div>
		</Card>
	)
}
