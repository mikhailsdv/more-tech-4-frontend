import React, {useState, useCallback, useContext} from "react"
import useApi from "api/useApi"
import {wame} from "js/utils"
import {useSnackbar} from "notistack"
import UserContext from "contexts/user"
import AuthorizationContext from "contexts/authorization"
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
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded"
import KeyRoundedIcon from "@mui/icons-material/KeyRounded"
import HttpsRoundedIcon from "@mui/icons-material/HttpsRounded"

import styles from "./index.module.scss"

const App = () => {
	const {signup, setToken} = useApi()
	const {enqueueSnackbar} = useSnackbar()
	const {setUser} = useContext(UserContext)
	const {setIsAuthorized} = useContext(AuthorizationContext)

	const [isLoading, setIsLoading] = useState(false)

	const [email, setEmail] = useState("")
	const [phone, setPhone] = useState("")
	const [key, setKey] = useState("")
	const [password, setPassword] = useState("")

	const onSubmit = useCallback(
		async e => {
			e.preventDefault()

			setIsLoading(true)
			try {
				const {status, data} = await signup({
					email,
					phone,
					key,
					password,
				})
				setIsLoading(false)

				if (status) {
					setToken({token: data.token})
					setUser(data)
					setIsAuthorized(true)
					reachGoal("user_signup")
					setTimeout(() => {
						window.location.href = "/prepare"
					}, 600)
				} else {
					switch (data) {
						case "email_taken": {
							enqueueSnackbar({
								message: (
									<>
										Этот email уже занят.{" "}
										<Link
											to="/signin"
											underline="always"
											internal
										>
											Войдите
										</Link>
										, если вы уже зарегистрированы.
									</>
								),
								variant: "error",
							})
							break
						}
						case "key_not_found": {
							enqueueSnackbar({
								message: "Неверный ключ регистрации.",
								variant: "error",
							})
							break
						}
						case "input_phone_error": {
							enqueueSnackbar({
								message: "Вы ввели неверный номер телефона.",
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
						case "input_email_error": {
							enqueueSnackbar({
								message: "Вы ввели неверную почту.",
								variant: "error",
							})
							break
						}
						default: {
							enqueueSnackbar({
								message: (
									<ErrorMessageBody
										message="Не удалось пройти регистрацию."
										errors={{
											status,
											data,
											email,
											phone,
											key,
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
							message="Не удалось пройти регистрацию."
							errors={{
								message: err.message,
								res: err.response,
								email,
								phone,
								key,
							}}
						/>
					),
					variant: "error",
				})
				reachGoal("error")
			}
		},
		[
			signup,
			email,
			password,
			key,
			phone,
			setToken,
			setUser,
			setIsAuthorized,
			enqueueSnackbar,
		]
	)

	return (
		<Card>
			<form onSubmit={onSubmit}>
				<CardContent>
					<CardTitle variant="h6">Регистрация</CardTitle>
					<Box mb={2}>
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
					</Box>
					<Box mb={2}>
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
					</Box>
					<Box mb={2}>
						<TextField
							label="Телефон"
							placeholder="+7 (___) ___ __ __"
							maskProps={{
								mask: "+{7} (700) 000 00 00",
								overwrite: true,
							}}
							value={phone}
							onChange={e => setPhone(e.target.value)}
							name="phone"
							type="text"
							autoComplete="current-password"
							icon={LocalPhoneRoundedIcon}
							required
						/>
					</Box>
					<Box mb={1}>
						<TextField
							label="Ключ регистрации"
							value={key}
							onChange={e => setKey(e.target.value)}
							type="number"
							icon={KeyRoundedIcon}
							required
							inputProps={{
								min: 0,
								max: 9999,
								pattern: "[0-9]{4}",
								inputMode: "decimal",
								step: 1,
							}}
						/>
					</Box>
					<Typography
						variant="subtitle1"
						className={styles.typography}
					>
						Для получения ключа{" "}
						<Link
							to={wame({
								message:
									"Привет. Я бы хотел(-а) купить ключ для регистрации в Тестнике.",
							})}
							external
							underline="always"
						>
							свяжитесь с нами в WhatsApp
						</Link>
						.
					</Typography>
					<br />

					<Typography
						variant="subtitle1"
						className={styles.typography}
					>
						Регистрируясь, вы принимаете{" "}
						<Link to="/terms" internal underline="always">
							условия пользовательского соглашения
						</Link>
						.
					</Typography>
					<Typography
						variant="subtitle1"
						className={styles.typography}
					>
						<Link to="/signin" internal underline="always">
							Уже есть аккаунт?
						</Link>
					</Typography>
				</CardContent>
				<Button
					variant="primary"
					isLoading={isLoading}
					type="submit"
					wide
				>
					Зарегистрироваться
				</Button>
			</form>
		</Card>
	)
}

export default App
