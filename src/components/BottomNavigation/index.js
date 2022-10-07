import React from "react"
import {hasBlurSupport} from "../../js/utils"

import styles from "./index.module.scss"

import BottomNavigation from "@mui/material/BottomNavigation"
import BottomNavigationAction from "@mui/material/BottomNavigationAction"

const BottomNavigation_ = props => {
	const {onChange, actions, activeActionId, isOverscrolled} = props

	return (
		<BottomNavigation
			onChange={(e, value) => onChange(value)}
			showLabels
			value={activeActionId}
			data-overscrolled={isOverscrolled}
			data-disable-blur={!hasBlurSupport}
			classes={{
				root: styles.root,
			}}
		>
			{actions.map(item => (
				<BottomNavigationAction
					key={item.id}
					value={item.id}
					label={item.name}
					icon={<item.icon />}
					data-active={item.id === activeActionId}
					classes={{
						root: styles.actionRoot,
						label: styles.actionLabel,
					}}
				/>
			))}
		</BottomNavigation>
	)
}

export default BottomNavigation_
