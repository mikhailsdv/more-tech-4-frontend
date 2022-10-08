import React, {
	Fragment,
	useContext,
	useCallback,
	useState,
	useEffect,
	useRef,
} from "react"
import {useNavigate} from "react-router-dom"
import {pluralize, numberWithSpaces} from "../../../js/utils"
import UserContext from "../../../contexts/user"
import AuthorizationContext from "../../../contexts/authorization"
import useApi from "../../../api/useApi"
import useDialog from "../../../hooks/useDialog"
import classnames from "classnames"
import {useSnackbar} from "notistack"

//import format from "date-fns/format"
//import parse from "date-fns/parse"
//import eachDayOfInterval from "date-fns/eachDayOfInterval"
//import sub from "date-fns/sub"
//import {ru} from "date-fns/locale"

import Tab from "../../../components/Tab"
import Tabs from "../../../components/Tabs"
import Grid from "@mui/material/Grid"
import Divider from "@mui/material/Divider"
import Card from "../../../components/Card"
import Button from "../../../components/Button"
import Coins from "../../../components/Coins"
import Image from "../../../components/Image"
import TextField from "../../../components/TextField"
import Typography from "../../../components/Typography"
import Staff from "../../../components/Staff"
import RadioGroup from "../../../components/RadioGroup"
import CheckboxGroup from "../../../components/CheckboxGroup"

import User from "../components/User"
import Admin from "../components/Admin"

import {
	MdOutlinePinDrop,
	MdCall,
	MdOutlineMailOutline,
	MdOutlineDraw,
	MdSocialDistance,
} from "react-icons/md"
import {FiSearch} from "react-icons/fi"
import StarIcon from "@mui/icons-material/Star"

import styles from "./index.module.scss"

const staff = [...Array(6)].map((_, index) => (
	<div key={index}>
		<Staff
			name={"Илья Николаев"}
			position={"Product Design Lead"}
			image={"https://picsum.photos/40/40" + "?random=" + (index + 1)}
		/>
		<Divider />
	</div>
))

export default function Wallet(props) {
	const {user} = useContext(UserContext)
	//const {getUserScoresGraph, changePassword, setToken, resetToken} = useApi()

	//const [isChangingPassword, setIsChangingPassword] = useState(false)
	const [tab, setTab] = useState("send")
	const [email, setEmail] = useState("")
	const [sum, setSum] = useState("")
	const [userName, setUserName] = useState("")
	const [cardNumber, setCardNumber] = useState("")
	const [via, setVia] = useState("email")
	const [saveCard, setSaveCard] = useState(false)

	/*const {
		open: openChangePasswordDialog,
		close: closeChangePasswordDialog,
		props: changePasswordDialogProps,
		Component: ChangePasswordDialog,
	} = useDialog()*/

	/*const onLogout = useCallback(() => {
		resetToken()
		setIsAuthorized(false)
		navigate("/about")
	}, [resetToken, navigate, setIsAuthorized])*/

	/*const roleComponents = {
		admin: <Admin />,
		user: <User />,
	}

	return (
		<UserContext.Consumer>
			{({user}) => roleComponents[user.rights]}
		</UserContext.Consumer>
	)*/

	return (
		<>
			<User />
			<br />
			<br /> <Admin />
		</>
	)
}
