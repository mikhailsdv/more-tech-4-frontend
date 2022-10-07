import React from "react"

import preloaderLogoSrc from "../../images/logo/preloader-logo.svg"

import styles from "./index.module.scss"

const Launch = props => {
	return (
		<div className={styles.root}>
			<img alt="" src={preloaderLogoSrc} className={styles.icon} />
		</div>
	)
}

export default Launch
