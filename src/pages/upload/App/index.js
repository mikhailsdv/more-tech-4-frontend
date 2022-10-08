import React, {useState, useCallback, useContext, useEffect} from "react"
import useApi from "api/useApi"
import {languageFlags} from "js/utils"
import {useSnackbar} from "notistack"
import UserContext from "contexts/user"
import {reachGoal} from "js/ym"

import Card from "components/Card"
import CardContent from "@mui/material/CardContent"
import CardTitle from "components/CardTitle"
import Box from "@mui/material/Box"
import TextField from "components/TextField"
import Button from "components/Button"
import FileUploadField from "components/FileUploadField"
import OpenSelect from "components/OpenSelect"
import ErrorMessageBody from "components/ErrorMessageBody"

import ShortTextRoundedIcon from "@mui/icons-material/ShortTextRounded"
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded"
import TranslateRoundedIcon from "@mui/icons-material/TranslateRounded"

import styles from "./index.module.scss"

const App = () => {
	const {uploadSubject} = useApi()
	const {enqueueSnackbar} = useSnackbar()
	const {user} = useContext(UserContext)

	const [isLoading, setIsLoading] = useState(false)

	const [name, setName] = useState("")
	const [language, setLanguage] = useState("")
	const [course, setCourse] = useState("")
	const [file, setFile] = useState(null)

	const onSubmit = useCallback(
		async e => {
			e.preventDefault()
			const nameTrim = name.trim().substr(0, 256)

			if (nameTrim.length < 3) {
				enqueueSnackbar({
					message:
						"Слишком короткое имя предмета. Напишите полное имя без сокращений.",
					variant: "error",
				})
				return
			}
			if (!file) {
				enqueueSnackbar({
					message: "Вы забыли прикрепить файл.",
					variant: "warning",
				})
				return
			}
			if (!course) {
				enqueueSnackbar({
					message: "Вы забыли выбрать курс.",
					variant: "warning",
				})
				return
			}
			if (!language) {
				enqueueSnackbar({
					message: "Вы заыбли выбрать язык обучения.",
					variant: "warning",
				})
				return
			}

			setIsLoading(true)
			try {
				const {status, data} = await uploadSubject({
					subject_name: nameTrim,
					course,
					language,
					file,
				})
				setIsLoading(false)

				if (status) {
					enqueueSnackbar({
						message:
							"Заявка отправлена и вскоре будет рассмотренна модератором. Это займет до 1 часа. Как только вопросы будут загружены на сервис, мы оповестим вас в WhatsApp.",
						variant: "success",
					})
					setName("")
					setFile(null)
					reachGoal("subject_uploaded")
				} else {
					switch (data) {
						case "too_short_subject_name": {
							enqueueSnackbar({
								message: "Слишком короткое название предмета.",
								variant: "error",
							})
							break
						}
						case "file_extension_error": {
							enqueueSnackbar({
								message:
									"Недопустимое расширение файла. Вы можете загружать файлы формата .doc, .docx, .txt или .pdf.",
								variant: "error",
							})
							break
						}
						case "too_big_file": {
							enqueueSnackbar({
								message:
									"Превышен максимальный размер файла (4 Мб)",
								variant: "error",
							})
							break
						}
						default: {
							enqueueSnackbar({
								message: (
									<ErrorMessageBody
										message="Не удалось отправить предмет."
										errors={{
											data,
											status,
											nameTrim,
											course,
											language,
										}}
									/>
								),
								variant: "error",
							})
							reachGoal("error")
						}
					}
				}
			} catch (err) {
				enqueueSnackbar({
					message: (
						<ErrorMessageBody
							message="Не удалось загрузить предмет. Проверьте подключение к сети."
							errors={{
								message: err.message,
								res: err.response,
								nameTrim,
								course,
								language,
							}}
						/>
					),
					variant: "error",
				})
				reachGoal("error")
			}
		},
		[enqueueSnackbar, uploadSubject, name, language, course, file]
	)

	useEffect(() => {
		setLanguage(user.language)
		setCourse(user.course)
	}, [user])

	return (
		<Card>
			<form onSubmit={onSubmit}>
				<CardContent>
					<CardTitle variant="h6">Отправить предмет</CardTitle>
					<Box mb={2}>
						<TextField
							label={
								<>
									<u>Полное</u> название предмета
								</>
							}
							placeholder="Название без сокращений"
							value={name}
							onChange={e => setName(e.target.value)}
							type="text"
							name="name"
							icon={ShortTextRoundedIcon}
							required
						/>
					</Box>
					<Box mb={2}>
						<FileUploadField
							name="file"
							accept=".doc,.docx,.pdf,.txt,.rtf"
							placeholder="Прикрепите файл, где первые варианты ответов — правильные"
							value={file}
							onChange={setFile}
						/>
					</Box>

					<Box mb={2}>
						<OpenSelect
							placeholder="Курс"
							value={course}
							onChange={setCourse}
							icon={AccountBalanceRoundedIcon}
							name="course"
							options={[
								{
									value: 1,
									children: 1,
									basis: 4,
								},
								{
									value: 2,
									children: 2,
									basis: 4,
								},
								{
									value: 3,
									children: 3,
									basis: 4,
								},
								{
									value: 4,
									children: 4,
									basis: 4,
								},
							]}
						/>
					</Box>
					<Box mb={2}>
						<OpenSelect
							placeholder="Отделение (язык обучения)"
							value={language}
							onChange={setLanguage}
							icon={TranslateRoundedIcon}
							name="language"
							options={[
								{
									value: "kz",
									children: (
										<img
											alt="kzz"
											src={languageFlags.kz}
											className={styles.languageIcon}
										/>
									),
									basis: 3,
								},
								{
									value: "ru",
									children: (
										<img
											alt="ru"
											src={languageFlags.ru}
											className={styles.languageIcon}
										/>
									),
									basis: 3,
								},
								{
									value: "en",
									children: (
										<img
											alt="en"
											src={languageFlags.en}
											className={styles.languageIcon}
										/>
									),
									basis: 3,
								},
							]}
						/>
					</Box>
				</CardContent>
				<Button
					variant="primary"
					isLoading={isLoading}
					type="submit"
					wide
				>
					Отправить
				</Button>
			</form>
		</Card>
	)
}

export default App
