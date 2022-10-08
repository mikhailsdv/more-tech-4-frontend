import React, {useState, useCallback, useEffect, useMemo} from "react"
import useApi from "api/useApi"
import scrollTo from "smoothscroll"
import useDialog from "hooks/useDialog"
import {useSnackbar} from "notistack"
import {arrayRandom} from "js/utils"
import {reachGoal} from "js/ym"

import Subject from "components/Subject"
import FadedAttention from "components/FadedAttention"
import BottomActions from "components/BottomActions"
import Box from "@mui/material/Box"
import Button from "components/Button"
import SessionQuestionCard from "components/QuestionCard/Session"
import Loading from "components/Loading"
import TextSuggestion from "components/TextSuggestion"
import ErrorMessageBody from "components/ErrorMessageBody"

import FactCheckRoundedIcon from "@mui/icons-material/FactCheckRounded"
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded"
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded"
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded"

import logoMainSrc from "images/logo/logo-main.svg"

import styles from "./index.module.scss"
import animateCSS from "styles/animate.module.scss"

const images = [...Array(18)].map((_, index) =>
	require(`images/cats/${index + 1}.jpg`)
)

const questionsAmount = 25
const reactions = [
	{
		from: 0,
		to: 9,
		images: [images[0], images[1], images[2]],
		captions: [
			"Оцень плоха",
			"Мне плохаа",
			"Это ужасно",
			"Все очень плохо",
		],
	},
	{
		from: 10,
		to: 19,
		images: [images[1], images[2], images[3]],
		captions: [
			"Плохааа",
			"Иди учи",
			"Слишком плохо",
			"Все очень плохо",
			"Наугад да?",
		],
	},
	{
		from: 20,
		to: 29,
		images: [images[2], images[3], images[4]],
		captions: [
			"Соберись, солнышко",
			"Внимательнее, зайка",
			"Старайся больше",
			"Все очень плохо",
		],
	},
	{
		from: 30,
		to: 39,
		images: [images[3], images[4], images[5]],
		captions: [
			"Так себе...",
			"Ну такоее.",
			"Ты же можешь лучше",
			"2 в дневник",
		],
	},
	{
		from: 40,
		to: 49,
		images: [images[5], images[6], images[7]],
		captions: ["Котик разочарован", "Можно больше", "Чё так мало?"],
	},
	{
		from: 50,
		to: 59,
		images: [images[8], images[9], images[10]],
		captions: [
			"Слабовато",
			"Хотя бы проходной",
			"Недостаточно",
			"Давай еще раз",
		],
	},
	{
		from: 60,
		to: 69,
		images: [images[10], images[11], images[12]],
		captions: [
			"Пойдет",
			"Ниче так",
			"Не расслабляемся",
			"Проходной есть",
			"Годится",
		],
	},
	{
		from: 70,
		to: 79,
		images: [images[10], images[11], images[12]],
		captions: ["Неплохо", "Класс", "Проходной есть", "Поднажми, родной"],
	},
	{
		from: 80,
		to: 89,
		images: [images[11], images[12], images[13]],
		captions: ["Четко", "Моя гордость", "Умничка", "А ты хорош"],
	},
	{
		from: 90,
		to: 99,
		images: [images[11], images[12], images[13]],
		captions: [
			"Красавчик",
			"Великолепно",
			"Прекрасно",
			"Невероятно",
			"Респект",
			"Уважуха",
		],
	},
	{
		from: 100,
		to: 100,
		images: [images[14], images[15], images[16], images[17]],
		captions: [
			"Я в шоке",
			"Гений",
			"Сверхразум",
			"Поступай в Гарвард",
			"Чётко",
			"Мегамозг",
			"Шок контент",
			"Котик рад",
			"Нет слов, одни эмоции",
		],
	},
]

const App = props => {
	const {isOverscrolled, sessionSelectedSubject: subject} = props

	const {
		open: openResultsDialog,
		close: closeResultsDialog,
		props: resultsDialogProps,
		Component: ResultsDialog,
	} = useDialog()
	const {getSubject, saveSessionScore} = useApi()
	const {enqueueSnackbar} = useSnackbar()

	const [questions, setQuestions] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [answeredRight, setAnsweredRight] = useState(0)
	const [isSessionPassed, setIsSessionPassed] = useState(false)

	const [selectedVariants, setSelectedVariants] = useState({})
	const onSelectVariant = useCallback(({questionId, isRight}) => {
		setSelectedVariants(prev => ({
			...prev,
			[questionId]: isRight,
		}))
	}, [])

	const onPassSession = useCallback(async () => {
		if (Object.keys(selectedVariants).length === questionsAmount) {
			const answeredRightAmount = Object.values(selectedVariants).filter(
				item => item
			).length
			setAnsweredRight(answeredRightAmount)
			setIsSessionPassed(true)
			openResultsDialog()
			reachGoal("session_finish")
			try {
				await saveSessionScore({
					subject_id: subject.id,
					score: Math.floor(
						(100 / questionsAmount) * answeredRightAmount
					),
				})
			} catch (err) {
				console.error(err)
			}
		} else {
			const missingQuestion = questions.find(
				item => selectedVariants[item.id] === undefined
			)
			const missingQuestionCardEl = document.querySelector(
				`[data-session-question-id="${missingQuestion.id}"`
			)
			const missingQuestionCardElOffsetTop =
				missingQuestionCardEl.offsetTop
			scrollTo(missingQuestionCardElOffsetTop - 62, 1100, () => {
				missingQuestionCardEl.classList.add(
					animateCSS.animated,
					animateCSS.shake
				)
				setTimeout(() => {
					missingQuestionCardEl.classList.remove(
						animateCSS.animated,
						animateCSS.shake
					)
				}, 1000)
			})
		}
	}, [
		saveSessionScore,
		questions,
		openResultsDialog,
		selectedVariants,
		subject,
	])

	const showMistakes = useCallback(() => {
		closeResultsDialog()
	}, [closeResultsDialog])

	const loadSubject = useCallback(() => {
		if (!subject) return
		document.documentElement.scrollTop = 0
		;(async () => {
			setIsLoading(true)
			setSelectedVariants({})
			setIsSessionPassed(false)
			try {
				const {status, data} = await getSubject({
					id: subject.id,
					random: questionsAmount,
				})
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

	useEffect(loadSubject, [loadSubject])

	const currentPercent = (100 / questionsAmount) * answeredRight
	const currentReaction = reactions.find(
		item => currentPercent >= item.from && currentPercent <= item.to
	)
	const currentImage = useMemo(
		() => arrayRandom(currentReaction.images),
		[currentReaction]
	)
	const currentCaption = useMemo(
		() => arrayRandom(currentReaction.captions),
		[currentReaction]
	)

	return (
		<>
			<ResultsDialog
				{...resultsDialogProps}
				title={
					<>
						<img
							src={logoMainSrc}
							className={styles.titleLogo}
							alt="logo"
						/>{" "}
						Результаты сессии
					</>
				}
				action={
					<Button variant="primary" wide onClick={showMistakes}>
						{answeredRight === questionsAmount
							? "Закрыть"
							: "Посмотреть ошибки"}
					</Button>
				}
				onClose={showMistakes}
			>
				Всего: {questionsAmount}
				<br />
				Правильных: {answeredRight}
				<br />
				Неправильных: {questionsAmount - answeredRight}
				<br />
				<div className={styles.percent}>Процент: {currentPercent}%</div>
				<div className={styles.catWrapper}>
					<img
						src={currentImage}
						alt="cat"
						className={styles.catImage}
					/>
					<div className={styles.catText}>{currentCaption}</div>
				</div>
				{answeredRight !== questionsAmount &&
					"Вопросы с ошибками будут помечены красным."}
			</ResultsDialog>

			{!isLoading && (!subject || questions.length === 0) && (
				<>
					<TextSuggestion icon={FactCheckRoundedIcon} color="blue">
						Это режим сессии. После выбора предмета вам будут выданы{" "}
						<u>25 случайных вопросов</u> из данного предмета.
						<br />
						<br />
						Режим сессии аналогичен реальной сессии и позволяет
						ничем не рискуя «проверить свои силы».
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
					<Subject fullWidth {...subject} />
					<FadedAttention
						messageFirst
						icon={ArrowDownwardRoundedIcon}
						message="Ответьте на все вопросы и сдайте сессию"
					/>

					<div className={styles.container}>
						{questions.map(item => (
							<Box key={item.id} mb={2}>
								<SessionQuestionCard
									isSessionPassed={isSessionPassed}
									onSelectVariant={onSelectVariant}
									{...item}
								/>
							</Box>
						))}
					</div>

					<BottomActions isOverscrolled={isOverscrolled}>
						{isSessionPassed ? (
							<Button
								variant="primary"
								iconAfter={ReplayRoundedIcon}
								onClick={loadSubject}
							>
								Пройти еще раз
							</Button>
						) : (
							<Button
								variant={
									Object.keys(selectedVariants).length ===
									questionsAmount
										? "positive"
										: "primary"
								}
								iconAfter={CheckCircleRoundedIcon}
								onClick={onPassSession}
							>
								Сдать сессию
							</Button>
						)}
					</BottomActions>
				</>
			)}
		</>
	)
}

export default App
