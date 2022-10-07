import React, {memo} from "react"

import Card from "@mui/material/Card"
import CardMedia from "@mui/material/CardMedia"
import CardContent from "@mui/material/CardContent"
import CardActions from "@mui/material/CardActions"
import Typography from "@mui/material/Typography"
import MyButton from "../MyButton"

import styles from "./index.module.scss"

const MyTipCard = props => {
	return (
		<Card className={styles.root}>
			<CardContent className={styles.content}>
				<CardMedia image={props.image} className={styles.image} />
				<Typography component="p" className={styles.text}>
					{props.content}
				</Typography>
			</CardContent>
			{props.actions && props.actions.length > 0 && (
				<CardActions className={styles.actions}>
					{props.actions.map((item, index) => (
						<MyButton key={index} {...item} />
					))}
				</CardActions>
			)}
		</Card>
	)
}

export default memo(MyTipCard)
