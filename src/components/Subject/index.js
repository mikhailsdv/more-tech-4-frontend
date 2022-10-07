import React, {useState, useCallback} from "react"
import classnames from "classnames"
import {languageFlags} from "../../js/utils"
import format from "date-fns/format"
import parse from "date-fns/parse"
import useApi from "api/useApi"
import {ru} from "date-fns/locale"
import copy from "copy-to-clipboard"
import {useSnackbar} from "notistack"
import {reachGoal} from "../../js/ym"

import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"

import FiberNewRoundedIcon from "@mui/icons-material/FiberNewRounded"
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded"
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded"
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded"
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder"
import BookmarkIcon from "@mui/icons-material/Bookmark"

import styles from "./index.module.scss"

const Subject = props => {
	const {
		id,
		questions,
		showActions = true,
		fullWidth,
		//usedCount,
		isNew,
		date,
		course,
		isSaved: isSavedProp,
		isRecent,
		language,
		name,
		isActive,
		classes = {},
		className,
		children,
		onClick,
		...rest
	} = props

	const {saveSubject} = useApi()
	const {enqueueSnackbar} = useSnackbar()

	const [isCopied, setIsCopied] = useState(false)
	const [isSaved, setIsSaved] = useState(isSavedProp)

	const onSave = useCallback(async () => {
		try {
			setIsSaved(!isSaved)
			const {status, data} = await saveSubject({id})
			if (status) {
				setIsSaved(data.saved)
				data.saved && reachGoal("subject_save")
			} else {
				setIsSaved(isSaved)
				//reachGoal("error")
			}
		} catch (err) {
			setIsSaved(isSaved)
			//reachGoal("error")
		}
	}, [saveSubject, isSaved, id])

	const onCopy = useCallback(() => {
		copy(`${window.location.origin}/prepare?subject=${id}`)
		setIsCopied(true)
		reachGoal("subject_link_copy")
		enqueueSnackbar({
			message:
				"Ссылка на предмет скопирована. Вы можете поделиться ею с друзьями, которые пользуются Тестником.",
			variant: "success",
		})
		setTimeout(() => setIsCopied(false), 2000)
	}, [id, enqueueSnackbar])

	return (
		<div
			className={classnames(styles.wrapper, className, classes.root)}
			{...rest}
		>
			<div
				className={styles.root}
				data-active={isActive}
				data-fullwidth={fullWidth}
				onClick={onClick}
			>
				{!isRecent && isNew && (
					<FiberNewRoundedIcon className={styles.newBadgeIcon} />
				)}
				{isRecent && (
					<div className={styles.recentBadge}>
						<HistoryRoundedIcon
							className={styles.recentBadgeIcon}
						/>
					</div>
				)}

				<div className={styles.name}>{name}</div>
				<Divider className={styles.divider} />
				<div className={styles.info}>
					{!Boolean(questions) &&
						!Boolean(course) &&
						!Boolean(date) && (
							<div className={styles.text}>Нет данных ⌛</div>
						)}
					{Boolean(questions) && (
						<div className={styles.text}>{questions}</div>
					)}
					{Boolean(course) && (
						<div className={styles.text}>{course} курс</div>
					)}
					<div className={styles.languageFlag}>
						<img alt="" src={languageFlags[language]} />
					</div>
					{Boolean(date) && (
						<div className={styles.text}>
							📅 
							{format(
								parse(date, "yyyy-MM-dd HH:mm:ss", new Date()),
								"d MMM yyyy",
								{locale: ru}
							)}
						</div>
					)}
				</div>
			</div>

			{showActions && Boolean(id) && (
				<div className={styles.actions}>
					<IconButton
						size="small"
						className={styles.button}
						onClick={onCopy}
					>
						{isCopied ? (
							<CheckCircleOutlineRoundedIcon />
						) : (
							<ContentCopyRoundedIcon />
						)}
					</IconButton>

					<IconButton
						size="small"
						className={styles.button}
						onClick={onSave}
					>
						{isSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
					</IconButton>
				</div>
			)}
		</div>
	)
}

export default Subject
