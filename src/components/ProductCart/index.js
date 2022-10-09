import React, {useState, useCallback, useEffect} from "react"
import classnames from "classnames"

import Card from "../Card"
import Typography from "../Typography"
import Image from "../Image"
import Coins from "../Coins"
import IconButton from "@mui/material/IconButton"

import {
	MdShoppingBag,
	MdOutlineShoppingBag,
	MdFavoriteBorder,
	MdFavorite,
} from "react-icons/md"

import styles from "./index.module.scss"
import useApi from "../../api/useApi"

export default function Product(props) {
	const {
		id,
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

	const {
		removeProductFromCart,
		unlikeProduct,
		likeProduct,
		addProductToCart,
	} = useApi()

	const [isLiked, setIsLiked] = useState(false)
	const [isCart, setIsCart] = useState(false)

	const like = useCallback(async () => {
		if (isLiked) {
			setIsLiked(false)
			await unlikeProduct({product_id: id})
		} else {
			setIsLiked(true)
			await likeProduct({product_id: id})
		}
	}, [isLiked, id])

	const cart = useCallback(async () => {
		if (isCart) {
			setIsCart(false)
			await removeProductFromCart({product_id: id})
		} else {
			setIsCart(true)
			await addProductToCart({product_id: id})
		}
	}, [isCart, id])

	return (
		<Card
			className={classnames(styles.root, className, classes.root)}
			{...rest}
		>
			<Image src={image} className={styles.image} />
			<div className={styles.info}>
				<Typography variant={"subtitle1bold"}>{title}</Typography>
				<Typography variant={"body2"} className={"mb-3"}>
					{description}
				</Typography>
				<div className={styles.footer}>
					<Coins
						amount={price}
						className={"mr-auto"}
						classes={{amount: styles.hoverColor}}
					/>
				</div>
			</div>
		</Card>
	)
}
