import React, {useState, useCallback} from "react"
import useApi from "api/useApi"
import {wame} from "js/utils"
import {useSnackbar} from "notistack"
import useURLParams from "hooks/useURLParams"
import {reachGoal} from "js/ym"

import ErrorMessageBody from "components/ErrorMessageBody"
import Card from "components/Card"
import CardContent from "@mui/material/CardContent"
import CardTitle from "components/CardTitle"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import TextField from "components/TextField"
import Button from "components/Button"
import Link from "components/Link"

import EmailRoundedIcon from "@mui/icons-material/EmailRounded"
import HttpsRoundedIcon from "@mui/icons-material/HttpsRounded"

import styles from "./index.module.scss"

const App = () => {
	const {token} = useURLParams()

	const {restorePassword, setNewPassword, setToken} = useApi()
	const {enqueueSnackbar} = useSnackbar()

	const [isLoading, setIsLoading] = useState(false)

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const onRestorePassword = useCallback(
		async e => {
			e.preventDefault()

			setIsLoading(true)
			try {
				const {status, data} = await restorePassword({
					email,
				})
				setIsLoading(false)

				if (status) {
					setEmail("")
					enqueueSnackbar({
						message:
							"Ссылка на восстановление пароля была отправлена на указанный адрес. Если письма нет во входящих, проверьте папку спам.",
						variant: "success",
					})
					reachGoal("password_forgot")
				} else {
					switch (data) {
						case "too_much_forgots": {
							enqueueSnackbar({
								message:
									"Вы можете отправлять запрос на восстановление пароля не более, чем раз в 15 минут. Попробуйте позднее.",
								variant: "error",
							})
							break
						}
						case "input_email_error": {
							enqueueSnackbar({
								message: "Email не найден.",
								variant: "warning",
							})
							break
						}
						case "accout_blocked": {
							enqueueSnackbar({
								message: (
									<>
										Ваш аккаунт был автоматически
										заблокирован в связи с частой сменой
										устройства. Мы расцениваем это, как
										попытку передачи своего аккаунта кому-то
										еще. Свяжитесь с{" "}
										<Link
											to={wame({
												message:
													"Привет. Мой аккаунт в Тестнике заблокировался. Можно ли его как-то восстановить?",
											})}
											external
											underline="always"
										>
											нами в WhatsApp
										</Link>
										. Администрация может отказать вам в
										просьбе восстановить аккаунт.
									</>
								),
								variant: "warning",
							})
							break
						}
						case "accout_frozen": {
							enqueueSnackbar({
								message: (
									<>
										Аккаунт приостановлен до повторной
										оплаты. Чтобы продолжить пользоваться
										Тестником свяжитесь с{" "}
										<Link
											to={wame({
												message:
													"Привет. Я бы хотел(-а) продлить аккаунт и продолжить пользоваться Тестником.",
											})}
											external
											underline="always"
										>
											нами в WhatsApp
										</Link>
										.
									</>
								),
								variant: "warning",
							})
							break
						}
						case "trial_ended": {
							enqueueSnackbar({
								message: (
									<>
										Тестовый период окончен. Аккаунт
										временно заблокирован. Для дальнейшего
										использования сервиса свяжитесь с{" "}
										<Link
											to={wame({
												message:
													"Привет. Мой тестовый период закончился. Можно ли как-то продлить?",
											})}
											external
											underline="always"
										>
											нами в WhatsApp
										</Link>
										.
									</>
								),
								variant: "warning",
							})
							break
						}
						default: {
							enqueueSnackbar({
								message: (
									<ErrorMessageBody
										message="Не удалось восстановить пароль."
										errors={{
											status,
											data,
											email,
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
							message="Не удалось восстановить пароль."
							errors={{
								message: err.message,
								res: err.response,
								email,
							}}
						/>
					),
					variant: "error",
				})
				reachGoal("error")
			}
		},
		[email, restorePassword, enqueueSnackbar]
	)

	const onSetNewPassword = useCallback(
		async e => {
			e.preventDefault()

			if (!password) {
				enqueueSnackbar({
					message: "Введите новый пароль.",
					variant: "warning",
				})
				return
			}
			if (password.length < 6) {
				enqueueSnackbar({
					message: "Слишком короткий пароль.",
					variant: "warning",
				})
				return
			}
			if (!token || token.length !== 64) {
				enqueueSnackbar({
					message:
						"Что-то не так с вашей ссылкой из письма. Свяжитесь с поддержкой.",
					variant: "error",
				})
				return
			}

			setIsLoading(true)
			try {
				const {status, data} = await setNewPassword({
					password,
					token,
				})
				setIsLoading(false)

				if (status) {
					setPassword("")
					enqueueSnackbar({
						message: "Пароль успешно восстановлен.",
						variant: "success",
					})
					setToken({token: data.token})
					reachGoal("password_restore")
					setTimeout(() => {
						window.location.href = "/prepare"
					}, 1500)
				} else {
					switch (data) {
						case "unknown_error": {
							enqueueSnackbar({
								message:
									"Неизвестная ошибка. Свяжитесь с поддержкой.",
								variant: "error",
							})
							break
						}
						case "forgot_not_found": {
							enqueueSnackbar({
								message:
									"Заявка на восстановление не найдена, либо устарела. Попробуйте еще раз.",
								variant: "error",
							})
							break
						}
						case "input_password_error": {
							enqueueSnackbar({
								message:
									"Пароль может содержать от 6-ти до 32-х символов и должен состоять из цифр и букв латинского алфавита.",
								variant: "warning",
							})
							break
						}
						default: {
							enqueueSnackbar({
								message: (
									<ErrorMessageBody
										message="Не удалось восстановить пароль."
										errors={{
											status,
											data,
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
							message="Не удалось восстановить пароль."
							errors={{
								message: err.message,
								res: err.response,
							}}
						/>
					),
					variant: "error",
				})
				reachGoal("error")
			}
		},
		[token, password, setNewPassword, setToken, enqueueSnackbar]
	)

	return (
		<>
			<Card>
				<form onSubmit={token ? onSetNewPassword : onRestorePassword}>
					<CardContent>
						<CardTitle variant="h6">Восстановить пароль</CardTitle>
						<Box mb={2}>
							{token ? (
								<TextField
									label="Придумайте пароль"
									value={password}
									onChange={e => setPassword(e.target.value)}
									name="password"
									type="password"
									autoComplete="new-password"
									icon={HttpsRoundedIcon}
									required
								/>
							) : (
								<TextField
									label="Email"
									value={email}
									onChange={e => setEmail(e.target.value)}
									type="email"
									name="email"
									autoComplete="email"
									icon={EmailRoundedIcon}
									required
								/>
							)}
						</Box>

						<Typography
							variant="subtitle1"
							className={styles.typography}
						>
							{token
								? "Почти готово. Осталось только придумать новый пароль."
								: "Мы вышлем вам письмо, содержащее ссылку на восстановление пароля."}
						</Typography>
					</CardContent>
					<Button
						variant="primary"
						isLoading={isLoading}
						type="submit"
						wide
					>
						Восстановить пароль
					</Button>
				</form>
			</Card>
		</>
	)
}

export default App
