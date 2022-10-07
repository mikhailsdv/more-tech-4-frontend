import React, {useState, useCallback, useContext} from "react"
import useApi from "../../../api/useApi"
import {useSnackbar} from "notistack"
//import UserContext from "../../../contexts/user"
import useEffectOnce from "../../../hooks/useEffectOnce"
import AuthorizationContext from "../../../contexts/authorization"
import {useNavigate} from "react-router-dom"
import classnames from "classnames"

import Card from "../../../components/Card"
import Typography from "../../../components/Typography"
import TextField from "../../../components/TextField"
import Button from "../../../components/Button"
import CheckboxLabel from "../../../components/CheckboxLabel"
import Container from "@mui/material/Container"

import logoImage from "../../../images/logo/logo.svg"
import HttpsRoundedIcon from "@mui/icons-material/HttpsRounded"
import VpnKeyIcon from "@mui/icons-material/VpnKey"

import styles from "./index.module.scss"

const App = () => {
	const {login: signin, setToken} = useApi()
	const {enqueueSnackbar} = useSnackbar()
	//const {setUser} = useContext(UserContext)
	const {isAuthorized, setIsAuthorized} = useContext(AuthorizationContext)
	const navigate = useNavigate()

	const [isLoading, setIsLoading] = useState(false)
	const [isSession, setIsSession] = useState(false)
	const [login, setLogin] = useState("")
	const [password, setPassword] = useState("")

	useEffectOnce(() => {
		isAuthorized && navigate("/profile")
	}, [isAuthorized, navigate])

	const onSubmit = useCallback(
		async e => {
			e.preventDefault()

			setIsLoading(true)
			const {error, token} = await signin({
				login,
				password,
			})
			setIsLoading(false)
			if (error) {
				enqueueSnackbar({
					message: error,
					variant: "error",
				})
			} else {
				setToken({token, isSession})
				//setUser(data)
				setIsAuthorized(true)
				setTimeout(() => {
					window.location.href = "/profile"
				}, 600)
			}
		},
		[
			login,
			signin,
			password,
			setToken,
			//setUser,
			setIsAuthorized,
			isSession,
			enqueueSnackbar,
		]
	)

	return (
		<Container maxWidth="xs">
			<Card className={classnames(styles.card, "mt-14")}>
				<div className={styles.logo}>
					<img
						src={logoImage}
						alt={"logo"}
						className={styles.image}
					/>
				</div>
				<form onSubmit={onSubmit}>
					<Typography
						variant="h5"
						className={"mb-6 mt-10"}
						align={"center"}
					>
						Вход
					</Typography>
					<TextField
						label="Email или телефон"
						value={login}
						onChange={e => setLogin(e.target.value)}
						type="text"
						name="username"
						autoComplete="username"
						icon={VpnKeyIcon}
						required
						className={"mb-4"}
					/>
					<TextField
						label="Пароль"
						value={password}
						onChange={e => setPassword(e.target.value)}
						type="password"
						name="password"
						autoComplete="current-password"
						icon={HttpsRoundedIcon}
						required
						className={"mb-2"}
					/>

					<CheckboxLabel
						value={isSession}
						onChange={setIsSession}
						label={"Запомнить меня"}
						className={"mb-4"}
					/>
					{/*<Typography variant="subtitle1">
						<Link to="/signup" internal underline="always">
							Еще не зарегистрированы?
						</Link>
					</Typography>
					<Typography variant="subtitle1">
						<Link to="/restore" internal underline="always">
							Забыли пароль?
						</Link>
					</Typography>*/}
					<Button
						variant="primary"
						isLoading={isLoading}
						type="submit"
						fullWidth
					>
						Войти
					</Button>
				</form>
			</Card>
		</Container>
	)
}

export default App
