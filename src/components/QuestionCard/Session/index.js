import React, {useState, useCallback} from "react"
import classnames from "classnames"

import Card from "../../Card"
import Typography from "../../Typography"
import IconButton from "@mui/material/IconButton"

import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded"
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined"
import ReportRoundedIcon from "@mui/icons-material/ReportRounded"
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded"
import CancelRoundedIcon from "@mui/icons-material/CancelRounded"

import commonStyles from "../common.module.scss"
import styles from "./index.module.scss"

const SessionQuestionCard = props => {
	const {
		isSessionPassed,
		onSelectVariant,
		id,
		is_saved: isSavedProp,
		variants,
		hideAction,
		question,
		index,
		className,
		classes = {},
	} = props

	const [selected, setSelected] = useState(null)
	const [isSaved, setIsSaved] = useState(isSavedProp)

	const getState = useCallback(
		({isRight, index}) => {
			if (isSessionPassed) {
				if (isRight) {
					return "right"
				} else if (!isRight && index === selected) {
					return "wrong"
				} else {
					return "faded"
				}
			} else {
				return ""
			}
		},
		[selected, isSessionPassed]
	)

	const getVariant = useCallback(
		({variant, isRight, index}) => {
			if (isSessionPassed) {
				if (isRight) {
					return (
						<>
							<CheckCircleRoundedIcon
								className={styles.variantIcon}
							/>
							{variant}
						</>
					)
				} else if (!isRight && index === selected) {
					return (
						<>
							<CancelRoundedIcon className={styles.variantIcon} />
							{variant}
						</>
					)
				} else {
					return variant
				}
			} else {
				return variant
			}
		},
		[isSessionPassed, selected]
	)

	const onSelect = useCallback(
		index => {
			!isSessionPassed && setSelected(index)
			onSelectVariant &&
				onSelectVariant({
					questionId: id,
					isRight: variants[index].is_right,
				})
		},
		[isSessionPassed, onSelectVariant, variants, id]
	)

	return (
		<Card
			data-session-question-id={id}
			className={classnames(commonStyles.root, className, classes.root)}
		>
			<Typography
				title={
					<span className={commonStyles.title}>
						{typeof index === "number" && (
							<div className={commonStyles.index}>{index}</div>
						)}
						{question}
					</span>
				}
			/>
			<div className={commonStyles.content}>
				{variants.map((item, index) => {
					return (
						<div
							className={classnames(
								commonStyles.variant,
								styles.variant
							)}
							key={index}
							data-active={selected === index}
							data-state={getState({
								isRight: item.is_right,
								index,
							})}
							onClick={() => onSelect(index)}
						>
							{getVariant({
								variant: item.variant,
								isRight: item.is_right,
								index,
							})}
						</div>
					)
				})}
			</div>
			{!hideAction && (
				<div>
					<IconButton
						className={classnames(
							commonStyles.button,
							commonStyles.reportButton
						)}
					>
						<ReportRoundedIcon className={commonStyles.icon} />
					</IconButton>
					<IconButton className={commonStyles.button}>
						{isSaved ? (
							<BookmarkRoundedIcon
								className={commonStyles.icon}
							/>
						) : (
							<BookmarkBorderOutlinedIcon
								className={commonStyles.icon}
							/>
						)}
					</IconButton>
				</div>
			)}
		</Card>
	)
}

export default SessionQuestionCard
