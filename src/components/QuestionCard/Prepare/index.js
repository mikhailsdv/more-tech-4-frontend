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
import Typography from "@mui/material/Typography"
import Link from "../Link"

import TipsAndUpdatesOutlinedIcon from "@mui/icons-material/TipsAndUpdatesOutlined"
import TipsAndUpdatesRoundedIcon from "@mui/icons-material/TipsAndUpdatesRounded"
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded"
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined"
import ReportRoundedIcon from "@mui/icons-material/ReportRounded"

import commonStyles from "../common.module.scss"
import styles from "./index.module.scss"

const PrepareQuestionCard = props => {
	const {
		id,
		is_saved: isSavedProp,
		isAnswersShown,
		note,
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
	const [showRight, setShowRight] = useState(null)
	const [faded, setFaded] = useState([])
	const [isSaved, setIsSaved] = useState(isSavedProp)

	const getState = useCallback(
		({isRight, index}) => {
			if (variants.length === 1) {
				return "right"
			} else if (faded.includes(index)) {
				return "faded"
			} else if (selected !== null && !isAnswersShown) {
				if (isRight && index === selected) {
					return "right"
				} else if (!isRight && index === selected) {
					return "wrong"
				} else if (!isRight && index !== selected) {
					return "faded"
				} else if (isRight && index !== selected && showRight) {
					return "right"
				}
			} else if (isAnswersShown) {
				if (isRight) {
					return "right"
				} else {
					return "faded"
				}
			} else {
				return ""
			}
		},
		[variants, selected, isAnswersShown, faded, showRight]
	)

	const onSelect = useCallback(
		index => {
			if (
				!isAnswersShown &&
				selected === null &&
				variants.length > 1 &&
				!faded.includes(index)
			) {
				setSelected(index)
				setTimeout(() => {
					setShowRight(true)
				}, 300)
			}
		},
		[isAnswersShown, selected, faded, variants]
	)

	const fadeWrong = useCallback(() => {
		if (variants.length >= 3 && faded.length === 0 && !isAnswersShown) {
			reachGoal("tip")
			const faded = []
			do {
				const randomIndex = Math.round(
					Math.random() * (variants.length - 1)
				)
				const randomItem = variants[randomIndex]
				if (!randomItem.isRight && !faded.includes(randomIndex)) {
					faded.push(randomIndex)
					variants.filter((item, index) => index !== randomIndex)
				}
			} while (variants.length - faded.length !== 2)
			setFaded(faded)
		}
	}, [variants, isAnswersShown, faded.length])

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
				{variants.map((item, index) => (
					<div
						className={classnames(
							commonStyles.variant,
							styles.variant
						)}
						key={index}
						data-state={getState({isRight: item.is_right, index})}
						onClick={() => onSelect(index)}
					>
						{item.variant}
					</div>
				))}
				{note && (
					<Typography
						variant="subtitle1"
						className={commonStyles.note}
					>
						{note}
					</Typography>
				)}
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
						onClick={fadeWrong}
						disabled={
							(selected !== null && faded.length === 0) ||
							isAnswersShown
						}
					>
						{variants.length >= 3 && faded.length > 0 ? (
							<TipsAndUpdatesRoundedIcon
								className={commonStyles.icon}
							/>
						) : (
							<TipsAndUpdatesOutlinedIcon
								className={commonStyles.icon}
							/>
						)}
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

export default PrepareQuestionCard
