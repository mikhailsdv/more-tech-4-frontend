import React, {
	useState,
	useCallback,
	useRef,
	useEffect,
	useMemo,
	useContext,
} from "react"
import classnames from "classnames"
import useApi from "api/useApi"
import {hasBlurSupport} from "../../js/utils"
import UserContext from "contexts/user"

import SubjectFilters from "../SubjectFilters"
import Subject from "../Subject"
import FadedAttention from "../FadedAttention"

import SearchRoundedIcon from "@mui/icons-material/SearchRounded"
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded"
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded"
//import WarningRoundedIcon from "@mui/icons-material/WarningRounded"

import styles from "./index.module.scss"
import animateCSS from "styles/animate.module.scss"

const lsKey = "lastSelectedSubject"

const SelectSubject = props => {
	const {tabId, setSelectedSubject, selectedSubject, isOverscrolled} = props

	const {user} = useContext(UserContext)
	const {updateUserInfo, filterSubjects} = useApi()

	const [language, setLanguage] = useState(user.language)
	const [course, setCourse] = useState(user.course)
	const [archived, setArchived] = useState(user.archived)
	const [ordering, setOrdering] = useState(user.ordering)

	const isFilled = useMemo(
		() => [course, language, ordering].every(item => Boolean(item)),
		[course, language, ordering]
	)

	const [open, setOpen] = useState(false)
	const [subjects, setSubjects] = useState([])
	const [isLoading, setIsLoading] = useState(false)

	const rootEl = useRef()

	const openToggle = useCallback(() => setOpen(prev => !prev), [])

	const onSelectSubject = useCallback(
		subject => {
			window.localStorage.setItem(lsKey, JSON.stringify(subject))
			setSelectedSubject(subject)
			setOpen(false)
		},
		[setSelectedSubject]
	)

	useEffect(() => {
		;(async () => {
			if (!isFilled) return
			setIsLoading(true)
			const {status, data} = await filterSubjects({
				course,
				language,
				archived,
				ordering,
			})
			setIsLoading(false)
			if (status) {
				setSubjects(
					data.map(item => ({
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
				await updateUserInfo({
					course,
					language,
					archived,
					ordering,
				})
			} else {
				setSubjects([])
			}
		})()
	}, [
		course,
		language,
		archived,
		ordering,
		isFilled,
		filterSubjects,
		updateUserInfo,
	])

	useEffect(() => {
		setLanguage(user.language)
		setCourse(user.course)
		setArchived(user.archived)
		setOrdering(user.ordering)
	}, [user])

	const Content = useCallback(() => {
		if (isLoading) {
			return <FadedAttention loading message="Загрузка..." />
		} else if (subjects.length) {
			const components = subjects
				.slice()
				.sort((a, b) => Number(b.isNew) - Number(a.isNew))
				.sort(
					(a, b) =>
						Number(b.id === selectedSubject?.id) -
						Number(a.id === selectedSubject?.id)
				)
				.map(item => (
					<Subject
						key={item.id}
						className={classnames(
							styles.subject,
							animateCSS.animated,
							animateCSS.fadeInUp
						)}
						isActive={selectedSubject?.id === item.id}
						onClick={() => onSelectSubject(item)}
						{...item}
					/>
				))
				.concat(
					<FadedAttention
						key="search"
						icon={SearchRoundedIcon}
						message="Нет нужного предмета? Попробуйте найти его в поиске по названию."
					/>
				)

			const lsLastSelectedSubject = window.localStorage.getItem(lsKey)
			if (lsLastSelectedSubject) {
				try {
					const lastSelectedSubject = JSON.parse(
						lsLastSelectedSubject
					)
					if (selectedSubject?.id !== lastSelectedSubject.id) {
						components.unshift(
							<Subject
								key="recent"
								className={classnames(
									styles.subject,
									animateCSS.animated,
									animateCSS.fadeInUp
								)}
								isActive={
									selectedSubject?.id ===
									lastSelectedSubject.id
								}
								onClick={() =>
									onSelectSubject(lastSelectedSubject)
								}
								isRecent
								{...lastSelectedSubject}
							/>
						)
					}
				} catch (err) {
					window.localStorage.removeItem(lsKey)
				}
			}
			return components
		} else if (subjects.length === 0 && isFilled) {
			//поиск не дал результатов
			return (
				<FadedAttention
					icon={SearchRoundedIcon}
					message="Предметы с данными параметрами не найдены"
				/>
			)
		} else {
			let message
			if (!language) {
				message = "Осталось выбрать язык обучения"
			}
			if (!course) {
				message = "Осталось выбрать курс"
			}
			if (!language && !course) {
				message = "Выберите язык обучения и курс"
			}
			return (
				<FadedAttention
					icon={ArrowUpwardRoundedIcon}
					message={message}
				/>
			)
		}
	}, [
		subjects,
		isFilled,
		selectedSubject,
		onSelectSubject,
		isLoading,
		language,
		course,
	])

	useEffect(() => {
		if (!open || !["prepare", "session"].includes(tabId)) {
			rootEl.current.scrollTop = 0
		}
	}, [open, tabId])

	return (
		<>
			{open && <div className={styles.backdrop} onClick={openToggle} />}
			<div
				className={styles.root}
				data-open={open}
				data-overscrolled={isOverscrolled}
				data-hidden={!["session", "prepare"].includes(tabId)}
				data-disable-blur={!hasBlurSupport}
				ref={rootEl}
			>
				<div className={styles.toggle} onClick={openToggle}>
					<KeyboardArrowUpRoundedIcon
						className={styles.icon}
						data-open={open}
					/>
				</div>
				<div className={styles.description} onClick={openToggle}>
					<span className={styles.text}>
						Выберите предмет{" "}
						<span className={styles.mode}>
							{
								{
									session: "сессии",
									prepare: "подготовки",
								}[tabId]
							}
						</span>
					</span>
				</div>
				<SubjectFilters
					isLoading={isLoading}
					language={language}
					setLanguage={setLanguage}
					course={course}
					setCourse={setCourse}
					archived={archived}
					setArchived={setArchived}
					ordering={ordering}
					setOrdering={setOrdering}
				/>
				<div className={styles.subjects}>
					<Content />
				</div>
			</div>
		</>
	)
}

export default SelectSubject
