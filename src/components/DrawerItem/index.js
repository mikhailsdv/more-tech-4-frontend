import React from "react"
import classnames from "classnames"
import {useLocation} from "react-router-dom"

import Link from "../Link"
import Typography from "@mui/material/Typography"

import styles from "./index.module.scss"

const DrawerItem = props => {
	const {title, url, open, icon: Icon, classes = {}} = props

	const location = useLocation()
	const isActive = location.pathname === url

	return (
		<div className={classnames(styles.root)} data-open={open}>
			<Link
				internal
				block
				to={url}
				className={styles.link}
				data-active={isActive}
				data-open={open}
			>
				<Icon className={styles.icon} />
				<Typography variant={"subtitle1bold"} className={styles.title}>
					{title}
				</Typography>
			</Link>
		</div>
	)
}

export default DrawerItem
