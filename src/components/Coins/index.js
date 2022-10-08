import React from "react"
import {numberWithSpaces} from "../../js/utils"
import classnames from "classnames"

import CoinIcon from "../../icons/Coin"
import Typography from "../Typography"

import styles from "./index.module.scss"

//Компонент монеток.
export default function Coins(props) {
	const {
		amount, //number|Количество монет
		inline, //bool|Передайте `true`, если компонент является инлайновым.
		emphasis = "medium", //str|Вариант начертания текста.|`"medium"`
		className, //str|Доплнительный className для корневого элемента.
		classes = {}, //obj|Дополнительные классы к дочерним элементам.
		...rest //obj|Все остальные пропсы будут перенаправлены корневому элементу.
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
