import React, {useState, useCallback} from "react"
import useApi from "api/useApi"
import {wame} from "../../js/utils"
import classnames from "classnames"
import {useSnackbar} from "notistack"
import {reachGoal} from "../../js/ym"

import Card from "../Card"
import CardHeader from "@mui/material/CardHeader"
import CardContent from "@mui/material/CardContent"
import CardActions from "@mui/material/CardActions"
import IconButton from "@mui/material/IconButton"
import Link from "../Link"

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

	const {enqueueSnackbar} = useSnackbar()
	const {saveToBookmarks} = useApi()

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

	const onSaveToBookmarks = useCallback(async () => {
		setIsSaved(prev => !prev)
		const {status, data} = await saveToBookmarks({question_id: id})
		if (status) {
			if (typeof data.saved === "boolean") {
				setIsSaved(data.saved)
				data.saved && reachGoal("question_save")
			}
		} /* else {
			reachGoal("error")
		}*/
	}, [id, saveToBookmarks])

	const onReport = useCallback(() => {
		enqueueSnackbar({
			message: (
				<>
					Если в вопросе есть ошибка или вопрос отображается
					некорректно, вы можете запросить исправление.
					<br />
					<br />
					<Link
						to={wame({
							message: `Привет. Хочу запросить исправление вопроса в Тестнике.\n\nВопрос: «${question}».\nИдентификатор вопроса: ${id}.`,
						})}
						external
					>
						Нажмите здесь, чтобы запросить исправление этого
						вопроса.
					</Link>
				</>
			),
			variant: "warning",
		})
	}, [question, id, enqueueSnackbar])

	return (
		<Card
			data-session-question-id={id}
			className={classnames(commonStyles.root, className, classes.root)}
		>
			<CardHeader
				title={
					<span className={commonStyles.title}>
						{typeof index === "number" && (
							<div className={commonStyles.index}>{index}</div>
						)}
						{question}
					</span>
				}
			/>
			<CardContent className={commonStyles.content}>
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
			</CardContent>
			{!hideAction && (
				<CardActions disableSpacing className={commonStyles.actions}>
					<IconButton
						className={classnames(
							commonStyles.button,
							commonStyles.reportButton
						)}
						onClick={onReport}
					>
						<ReportRoundedIcon className={commonStyles.icon} />
					</IconButton>
					<IconButton
						className={commonStyles.button}
						onClick={onSaveToBookmarks}
					>
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
				</CardActions>
			)}
		</Card>
	)
}

export default SessionQuestionCard
