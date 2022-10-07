import React from "react"
import classnames from "classnames"

import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import CircularProgress from "@mui/material/CircularProgress"

import styles from "./index.module.scss"

//Universal button component of the service.
const Button_ = props => {
	const {
		fullWidth, // bool | Pass `true` to make button full width.
		small, // bool | Pass `true` to render small version of button.
		loadingText, // str | Text to show (pulse) when `isLoading` = `true`.
		children, // node | Text of a button or element to render inside a button.
		iconAfter: IconAfter, // `SvgIcon` | Icon after the text.
		iconBefore: IconBefore, // `SvgIcon` | Icon before the text.
		variant, // str | Controls the variant of the button. Possible values are `primary`, `secondary`, `no-border`, `negative`.
		isLoading, // bool | Pass `true` to show circular progress.
		className, // str | Additional class name.
		...rest // obj | The rest props will be passed to the root component.
	} = props

	return (
		<Button
			className={classnames(
				styles.root,
				className,
				small && styles.small,
				fullWidth && styles.fullWidth,
				isLoading && styles.loading,
				variant && styles[variant]
			)}
			disableElevation
			{...rest}
		>
			{IconBefore && <IconBefore className={styles.iconBefore} />}
			{!loadingText && (
				<CircularProgress
					className={styles.preloader}
					size={20}
					thickness={4.5}
				/>
			)}
			<Typography
				variant="button"
				className={classnames(
					styles.label,
					loadingText && isLoading && styles.pulse
				)}
			>
				{loadingText ? (isLoading ? loadingText : children) : children}
			</Typography>
			{!(loadingText && isLoading) && IconAfter && (
				<IconAfter className={styles.iconAfter} />
			)}
		</Button>
	)
}

export default Button_
