import React from "react"
import {numberWithSpaces} from "../../js/utils"
import classnames from "classnames"

import CoinIcon from "../../icons/Coin"
import Typography from "../Typography"

import styles from "./index.module.scss"

export default function Coins(props) {
	const {
		amount,
		inline,
		emphasis = "medium",
		className,
		classes = {},
		...rest
	} = props
	const Root = inline ? "span" : "div"

	return (
		<Root
			className={classnames(
				styles.root,
				className,
				classes.root,
				inline && styles.inline
			)}
			{...rest}
		>
			<Typography
				variant={"h6"}
				component={Root}
				emphasis={emphasis}
				className={classnames(styles.amount, classes.amount)}
			>
				{numberWithSpaces(amount)}
			</Typography>
			<CoinIcon className={classnames(styles.icon, classes.icon)} />
		</Root>
	)
}
