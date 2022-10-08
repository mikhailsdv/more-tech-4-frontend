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
	const {enqueueSnackbar} = useSnackbar()
	//const {setUser} = useContext(UserContext)
	const navigate = useNavigate()

	const [isSession, setIsSession] = useState(false)

	return (
		<Container maxWidth="xs">
			<Card>
				<Typography
					variant="h5"
					className={"mb-6 mt-10"}
					align={"center"}
				>
					Вход
				</Typography>
			</Card>
		</Container>
	)
}

export default App
