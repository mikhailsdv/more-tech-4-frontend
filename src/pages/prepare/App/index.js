import React, {useState, useCallback, useEffect} from "react"
import {useNavigate} from "react-router-dom"
import useApi from "api/useApi"
import {arrayShuffle} from "js/utils"
import {useSnackbar} from "notistack"
import useURLParams from "hooks/useURLParams"
import {reachGoal} from "js/ym"

import Subject from "components/Subject"
import FadedAttention from "components/FadedAttention"
import BottomActions from "components/BottomActions"
import Box from "@mui/material/Box"
import Button from "components/Button"
import PrepareQuestionCard from "components/QuestionCard/Prepare"
import Loading from "components/Loading"
import TextSuggestion from "components/TextSuggestion"
import ErrorMessageBody from "components/ErrorMessageBody"

import PsychologyRoundedIcon from "@mui/icons-material/PsychologyRounded"
import ShuffleRoundedIcon from "@mui/icons-material/ShuffleRounded"
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded"
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded"
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded"
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded"
import FactCheckRoundedIcon from "@mui/icons-material/FactCheckRounded"

import styles from "./index.module.scss"

const App = props => {
	const {
		openSessionWithSubject,
		isOverscrolled,
		prepareSelectedSubject: subject,
		setPrepareSelectedSubject,
		url,
		active,
	} = props

	const navigate = useNavigate()

	const {subject: subjectIdInURL, load_subject: loadSubject} = useURLParams({
		parseNumeric: true,
	})
	const {getSubject, getSubjectInfo} = useApi()
	const {enqueueSnackbar} = useSnackbar()

	const [questions, setQuestions] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [isAnswersShown, setIsAnswersShown] = useState(false)
	const [isShuffling, setIsShuffling] = useState(false)

	const reset = useCallback(() => {
		navigate(url, {
			replace: true,
		})
		setPrepareSelectedSubject(null)
		setQuestions([])
		setIsAnswersShown(false)
		setIsShuffling(false)
		setIsLoading(false)
	}, [url, navigate, setPrepareSelectedSubject])

	const showAnswers = useCallback(() => {
		reachGoal("show_answers")
		setIsAnswersShown(prev => !prev)
	}, [])

	const goToSession = useCallback(() => {
		openSessionWithSubject(subject)
		reachGoal("from_prepare_to_session")
	}, [openSessionWithSubject, subject])

	useEffect(() => {
		if (!subject) return
		;(async () => {
			setIsLoading(true)
			try {
				const {status, data} = await getSubject({id: subject.id})
				if (status && data.length > 0) {
					setQuestions(data)
					reachGoal("subject_selected")
				} else {
					enqueueSnackbar({
						message:
							"Не удалось загрузить предмет. Скорей всего он был удален из базы.",
						variant: "error",
					})
				}
			} catch (err) {
				enqueueSnackbar({
					message: (
						<ErrorMessageBody
							message="Не удалось загрузить предмет. Проверьте подключение к сети."
							errors={{
								message: err.message,
								res: err.response,
								subject,
							}}
						/>
					),
					variant: "error",
				})
				reachGoal("error")
			}
			setIsLoading(false)
		})()
	}, [subject, getSubject, enqueueSnackbar])

	useEffect(() => {
		if ((subjectIdInURL && !subject) || loadSubject) {
			const subjectId = loadSubject || subjectIdInURL
			;(async () => {
				try {
					setIsLoading(true)
					const {status, data} = await getSubjectInfo({id: subjectId})
					if (status) {
						setPrepareSelectedSubject({
							course: data.course,
							date: data.date,
							id: data.id,
							language: data.language,
							name: data.name,
							questions: data.questions,
							isNew: data.is_new,
							isSaved: data.is_saved,
							//usedCount: item.used_count,
						})
						loadSubject &&
							navigate(`${url}?subject=${data.id}`, {
								replace: true,
							})
					} else {
						enqueueSnackbar({
							message:
								"Не удалось загрузить предмет. Скорей всего он был удален из базы.",
							variant: "error",
						})
						navigate(url, {
							replace: true,
						})
					}
				} catch (err) {
					setIsLoading(false)
					enqueueSnackbar({
						message: (
							<ErrorMessageBody
								message="Не удалось загрузить предмет. Проверьте подключение к сети."
								errors={{
									message: err.message,
									res: err.response,
									subject,
								}}
							/>
						),
						variant: "error",
					})
					reachGoal("error")
					navigate(url, {
						replace: true,
					})
				}
			})()
		}
	}, [
		subject,
		subjectIdInURL,
		loadSubject,
		setPrepareSelectedSubject,
		getSubjectInfo,
		enqueueSnackbar,
		navigate,
		url,
	])

	useEffect(() => {
		if (subject && active && !loadSubject) {
			navigate(`${url}?subject=${subject.id}`, {
				replace: true,
			})
		}
	}, [subject, loadSubject, active, url, navigate])

	const shuffle = useCallback(() => {
		setIsShuffling(true)
		reachGoal("questions_shuffle")
		setTimeout(() => {
			setQuestions(prev => arrayShuffle(prev))
			setIsShuffling(false)
		}, 1000)
	}, [])

	return (
		<>
			{!isLoading && (!subject || !questions.length > 0) && (
				<>
					<TextSuggestion icon={PsychologyRoundedIcon} color="yellow">
						Это режим подготовки. После выбора предмета вам будут
						выданы <u>все вопросы</u> данного предмета.
						<br />
						<br />
						Режим подготовки активизирует визуальную память за счет
						использования позитивных и негативных зрительных
						раздражителей.
					</TextSuggestion>
					<FadedAttention
						messageFirst
						icon={ArrowDownwardRoundedIcon}
						message="Для начала выберите предмет внизу"
					/>
				</>
			)}

			{isLoading && <Loading />}

			{subject && !isLoading && questions.length > 0 && (
				<>
					<Box mb={1}>
						<Subject fullWidth {...subject} />
					</Box>

					<Box mb={3} className={styles.buttons}>
						<Button
							iconAfter={HighlightOffRoundedIcon}
							variant="negative"
							className={styles.reset}
							wide
							onClick={reset}
						>
							Сбросить
						</Button>
						<Button
							iconAfter={ShuffleRoundedIcon}
							variant="primary"
							className={styles.shuffle}
							wide
							onClick={shuffle}
							isLoading={isShuffling}
						>
							Перемешать
						</Button>
						<Button
							iconAfter={FactCheckRoundedIcon}
							variant="positive"
							className={styles.session}
							wide
							onClick={goToSession}
						>
							Начать сессию
						</Button>
					</Box>

					{questions.map(item => (
						<Box key={item.id} mb={2}>
							<PrepareQuestionCard
								isAnswersShown={isAnswersShown}
								{...item}
							/>
						</Box>
					))}

					<BottomActions isOverscrolled={isOverscrolled}>
						<Button
							variant="primary"
							iconAfter={
								isAnswersShown
									? VisibilityOffRoundedIcon
									: RemoveRedEyeRoundedIcon
							}
							onClick={showAnswers}
						>
							{isAnswersShown
								? "Скрыть ответы"
								: "Показать ответы"}
						</Button>
					</BottomActions>
				</>
			)}
		</>
	)
}

export default App
