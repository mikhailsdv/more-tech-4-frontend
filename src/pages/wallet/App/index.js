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
import Link from "../../../components/Link"
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
import Table from "../../../components/Table"

import {
	MdOutlinePinDrop,
	MdCall,
	MdOutlineMailOutline,
	MdOutlineDraw,
	MdSocialDistance,
} from "react-icons/md"
import {FiSearch} from "react-icons/fi"
import StarIcon from "@mui/icons-material/Star"

import upImage from "../../../images/other/up.svg"
import downImage from "../../../images/other/down.svg"

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
	const [history, setHistory] = useState([
		{
			image: "up",
			user_from_id: 123,
			link: "asdasd",
			type: "Mumbai",
			coins: {amount: 100, direction: "up"},
			TableHeadCellProps: {
				style: {
					minWidth: 220,
				},
			},
		},
		{
			image: "down",
			user_from_id: 123,
			link: "asdasd",
			type: "Mumbai",
			coins: {amount: 100, direction: "down"},
		},
		{
			image: "up",
			user_from_id: 123,
			link: "asdasd",
			type: "Mumbai",
			coins: {amount: 100, direction: "up"},
		},
	])

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
			<br />
			<br />
			<Card>
				<Typography variant={"h5"} className={"mb-4"}>
					История транзакций
				</Typography>
				<Table
					className={styles.table}
					//containerHeight={}
					columns={[
						{
							key: "image",
							title: "image",
							render: value => (
								<img
									src={value === "up" ? upImage : downImage}
									alt={""}
								/>
							),
						},
						{
							key: "user_from_id",
							title: "user_from_id",
							render: value => (
								<Typography variant={"subtitle2"}>
									From: {value}
								</Typography>
							),
						},
						{
							key: "link",
							title: "link",
							render: value => (
								<Typography variant={"subtitle2"}>
									<Link
										to={`https://mumbai.polygonscan.com/tx/${value}`}
										external
									>
										{value.substring(0, 10)}...
									</Link>
								</Typography>
							),
						},
						{
							key: "type",
							title: "type",
							render: value => (
								<Typography variant={"subtitle2"}>
									Тип: {value}
								</Typography>
							),
						},
						{
							key: "coins",
							title: "coins",
							render: ({amount, direction}) => (
								<Coins
									amount={amount}
									prepend={direction === "up" ? "+" : "-"}
									classes={{
										amount:
											direction === "up"
												? "!text-lime-600"
												: "!text-red-600",
									}}
								/>
							),
						},
					]}
					data={history}
				/>
			</Card>
		</>
	)
}
