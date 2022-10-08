import React, {useState, useEffect, useMemo, useRef} from "react"
import useApi from "api/useApi"
import {pluralize} from "js/utils"
import {useSnackbar} from "notistack"
import {reachGoal} from "js/ym"

import FadedAttention from "components/FadedAttention"
import PrepareQuestionCard from "components/QuestionCard/Prepare"
import Box from "@mui/material/Box"
import Subject from "components/Subject"
import Loading from "components/Loading"
import TextSuggestion from "components/TextSuggestion"
import ErrorMessageBody from "components/ErrorMessageBody"

import SearchRoundedIcon from "@mui/icons-material/SearchRounded"
import LightbulbRoundedIcon from "@mui/icons-material/LightbulbRounded"

import styles from "./index.module.scss"

const minSearchQueryLength = 3

const App = props => {
	const {searchQuery, openPrepareWithSubject} = props

	const {search} = useApi()
	const {enqueueSnackbar} = useSnackbar()

	const [questions, setQuestions] = useState([])
	const questionsLength = useRef(questions.length)
	const [subjects, setSubjects] = useState([])
	const hasAnyResult = useMemo(
		() => questions.length > 0 || subjects.length > 0,
		[questions, subjects]
	)
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		questionsLength.current = questions.length
	}, [questions])

	useEffect(() => {
		;(async () => {
			if (searchQuery.length < minSearchQueryLength) {
				setQuestions([])
			} else {
				questionsLength.current === 0 && setIsLoading(true)
				try {
					const {status, data} = await search({q: searchQuery})

					if (!status) {
						setQuestions([])
						return
					}
					document.documentElement.scrollTop = 0
					setSubjects(
						data.subjects.map(item => ({
							course: item.course,
							date: item.date,
							id: item.id,
							language: item.language,
							name: item.name,
							questions: item.questions,
							isNew: item.is_new,
							isSaved: item.is_saved,
							//usedCount: item.used_count,
						}))
					)
					setQuestions(
						data.questions.map(item => ({
							id: item.id,
							note: (
								<>
									найдено в «
									<span
										onClick={() =>
											openPrepareWithSubject(item.subject)
										}
										className={styles.a}
									>
										{item.subject.name}
									</span>
									»
								</>
							),
							question: (
								<>
									{item.question.substring(
										0,
										item.str_pos[0]
									)}
									<span className={styles.highlighted}>
										{item.question.substring(
											item.str_pos[0],
											item.str_pos[1]
										)}
									</span>
									{item.question.substring(item.str_pos[1])}
								</>
							),
							variants: [
								{
									variant: item.variant,
									isRight: true,
								},
							],
						}))
					)
					reachGoal("question_search")
				} catch (err) {
					enqueueSnackbar({
						message: (
							<ErrorMessageBody
								message="Не удалось загрузить предмет. Проверьте подключение к сети."
								errors={{
									message: err.message,
									res: err.response,
									searchQuery,
								}}
							/>
						),
						variant: "error",
					})
					reachGoal("error")
				}
				setIsLoading(false)
			}
		})()
	}, [searchQuery, enqueueSnackbar, search, openPrepareWithSubject])

	const enoughSearchQueryLength = searchQuery.length >= minSearchQueryLength

	return (
		<>
			{!isLoading && !enoughSearchQueryLength && (
				<>
					<TextSuggestion icon={LightbulbRoundedIcon} color="purple">
						Поиск ищет совпадения среди вопросов и предметов по всей
						базе за все года.
						<br />
						<br />
						Чтобы познакомиться с поиском, введите «<i>маркетинг</i>
						» или «<i>в каком году</i>».
					</TextSuggestion>
					{searchQuery.length === 0 && (
						<FadedAttention
							icon={SearchRoundedIcon}
							message={`Чтобы начать поиск, введите как минимум ${minSearchQueryLength} ${pluralize(
								minSearchQueryLength,
								"символ",
								"символа",
								"символов"
							)}`}
						/>
					)}
					{searchQuery.length > 0 && (
						<FadedAttention
							icon={SearchRoundedIcon}
							message={`Чтобы начать поиск, введите еще ${
								minSearchQueryLength - searchQuery.length
							} ${pluralize(
								minSearchQueryLength - searchQuery.length,
								"символ",
								"символа",
								"символов"
							)}`}
						/>
					)}
				</>
			)}

			{isLoading && <Loading />}

			{!isLoading &&
				enoughSearchQueryLength &&
				(hasAnyResult ? (
					<div className={styles.container}>
						{questions.slice(0, 2).map((item, index) => (
							<Box key={`q${item.id}`} mb={2}>
								<PrepareQuestionCard
									index={index + 1}
									isAnswersShown={true}
									hideAction={true}
									{...item}
								/>
							</Box>
						))}
						{subjects.map((item, index) => (
							<Box key={`s${item.id}`} mb={2}>
								<Subject
									fullWidth
									onClick={() => openPrepareWithSubject(item)}
									{...item}
								/>
							</Box>
						))}
						{questions.slice(2).map((item, index) => (
							<Box key={`q${item.id}`} mb={2}>
								<PrepareQuestionCard
									index={index + 3}
									isAnswersShown={true}
									hideAction={true}
									{...item}
								/>
							</Box>
						))}
					</div>
				) : (
					<FadedAttention
						icon={SearchRoundedIcon}
						message="Ничего не найдено"
					/>
				))}

			{/*<BottomActions isOverscrolled={isOverscrolled}>
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
					<FadedAttention
						icon={ArrowDownwardRoundedIcon}
						message="Ответьте на все вопросы и сдайте сессию"
					/>*/}
		</>
	)
}

export default App
