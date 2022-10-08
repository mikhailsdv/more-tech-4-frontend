import React from "react"
import classnames from "classnames"
import {getImage, getFirstAndLastName} from "../../js/utils"

import Typography from "../Typography"
import Skeleton from "../Skeleton"
import Link from "../Link"
import Coins from "../Coins"
import Tooltip from "../Tooltip"
import IconButton from "@mui/material/IconButton"
import Divider from "@mui/material/Divider"

import KeyIcon from "@mui/icons-material/Key"
import ShareIcon from "@mui/icons-material/Share"

import styles from "./index.module.scss"

const Achievement = props => {
	const {
		preview,
		achievement_id,
		amount,
		id,
		nft_data,
		tx_hash,
		tx_type,
		user_achievement_data,
		user_id_from,
		user_id_to,
		className,
		...rest
	} = props

	const {publicKey, tokenId, uri} = nft_data
	const {description, title, price, people_gets_count} = user_achievement_data

	return preview ? (
		<Tooltip
			title={
				<div className={"text-center"}>
					<Typography
						variant={"h6"}
						align={"center"}
						gutterBottom
						className={"mt-2"}
					>
						{title}
					</Typography>
					<Typography
						variant={"subtitle1"}
						align={"center"}
						gutterBottom
					>
						{description}
					</Typography>
					<Coins amount={price} className={"mb-2"} />
				</div>
			}
		>
			<div className={classnames(styles.preview, className)} {...rest}>
				<img src={uri} alt={title} className={styles.img} />
			</div>
		</Tooltip>
	) : (
		<div className={classnames(styles.full, className)} {...rest}>
			<img src={uri} alt={title} className={styles.img} />
			<div className={styles.info}>
				<Typography
					variant={"subtitle1bold"}
					className={"mt-2 mb-2"}
					style={{width: "80%"}}
				>
					{title}
				</Typography>
				<Typography variant={"body2"} className={"mb-3"}>
					{description}
				</Typography>
				<Divider className={"mb-3"} />
				<div className={styles.footer}>
					<div>Такая же ачивка у {people_gets_count} людей</div>
					<Coins amount={price} />
				</div>
			</div>
			<div className={styles.links}>
				<IconButton
					href={`https://mumbai.polygonscan.com/tx/${tx_hash}`}
				>
					<KeyIcon />
				</IconButton>
				<IconButton
					href={`https://vk.com/share.php?url=${`https://mumbai.polygonscan.com/tx/${tx_hash}`}`}
				>
					<ShareIcon />
				</IconButton>
			</div>
		</div>
	)
}

export default Achievement
