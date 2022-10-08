import React, {useCallback} from "react"
import classnames from "classnames"
import UserContext from "../../contexts/user"

//import Badge from "-@mui/material/Badge"
import Drawer from "@mui/material/Drawer"
import Hidden from "@mui/material/Hidden"
import Avatar from "@mui/material/Avatar"
import Typography from "@mui/material/Typography"
import Tooltip from "../Tooltip"
import DrawerItem from "../DrawerItem"
import Link from "../Link"
import Fab from "@mui/material/Fab"

import MenuRoundedIcon from "@mui/icons-material/MenuRounded"

import styles from "./index.module.scss"
import {useLocation} from "react-router-dom"

const Content = props => {
	const {isMobile, items, onClose, open, drawerToggle} = props

	const location = useLocation()
	const isProfileActive = location.pathname === "/profile"

	return (
		<>
			<UserContext.Consumer>
				{value => (
					<Link to={"/profile"} internal block>
						<div className={styles.header}>
							<Avatar
								alt={"userpic"}
								src={"https://picsum.photos/100/100"}
								className={classnames(
									styles.avatar,
									isProfileActive && styles.active
								)}
							/>
							<div className={styles.user}>
								<Typography variant={"subtitle1bold"}>
									{value.user.first_and_last_name}
								</Typography>
								<Typography variant={"body2"}>
									{value.user.email}
								</Typography>
							</div>
						</div>
					</Link>
				)}
			</UserContext.Consumer>
			<div className={styles.sections}>
				{items.map(item => (
					<div
						key={item.url}
						onClick={isMobile ? onClose : undefined}
					>
						<DrawerItem {...item} open={open} />
					</div>
				))}
			</div>
		</>
	)
}

const Drawer_ = props => {
	const {open, setState, drawerToggle, items, className, ...rest} = props
	const onClose = useCallback(() => setState(false), [])
	const onOpen = useCallback(() => setState(true), [])

	return (
		<>
			<Hidden smDown>
				<Drawer
					{...rest}
					classes={{
						paper: classnames(styles.paper, className),
					}}
					PaperProps={{"data-open": open}}
					variant="permanent"
					onMouseOver={onOpen}
					onMouseOut={onClose}
				>
					<Content {...props} isMobile={false} />
				</Drawer>
			</Hidden>

			<Hidden smUp>
				<>
					<Fab className={styles.fab} onClick={onOpen}>
						<MenuRoundedIcon className={styles.icon} />
					</Fab>
					<Drawer
						{...rest}
						ModalProps={{
							keepMounted: true,
						}}
						classes={{
							paper: classnames(styles.paper, className),
						}}
						onClose={onClose}
						open={open}
					>
						<Content {...props} isMobile={true} />
					</Drawer>
				</>
			</Hidden>
		</>
	)
}

export default Drawer_
