import React from "react"
import {Link} from "react-router-dom"
import classnames from "classnames"

import styles from "./index.module.scss"

//Universal link component.
const Link_ = props => {
	const {
		block, //bool | Pass `true` if the link wraps some block, not just text.
		external, //bool | Pass `true` if the link is external.
		internal, //bool | Pass `true` if the link is internal.
		to, //str  | Href.
		targetBlank = true, //bool | Only for external links. Pass `true` to make the link open in a new tab. | `true`
		underline, //bool | Controls underline. Possible values are `always` and `hover`.
		children,
		className,
		...rest
	} = props

	const aProps = {
		//fixes warning
		target: targetBlank ? "_blank" : "_self",
		rel: targetBlank ? "noreferrer noopener" : "",
	}

	return internal ? (
		<Link
			to={to}
			className={classnames(
				styles.root,
				className,
				block && styles.block,
				underline && styles[`underline-${underline}`]
			)}
			{...rest}
		>
			{children}
		</Link>
	) : (
		<a
			href={to}
			className={classnames(
				styles.root,
				className,
				block && styles.block,
				underline && styles[underline]
			)}
			{...aProps}
			{...rest}
		>
			{children}
		</a>
	)
}

export default Link_
