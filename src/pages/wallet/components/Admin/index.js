import React, {
	useContext,
	useCallback,
	useState,
	useEffect,
	useRef,
} from "react"
//import {useNavigate} from "react-router-dom"
//import {pluralize, numberWithSpaces} from "../../../js/utils"
import UserContext from "../../../../contexts/user"
//import useApi from "../../../../api/useApi"
//import {useSnackbar} from "notistack"

//import format from "date-fns/format"
//import parse from "date-fns/parse"
//import eachDayOfInterval from "date-fns/eachDayOfInterval"
//import sub from "date-fns/sub"
//import {ru} from "date-fns/locale"

import Tab from "../../../../components/Tab"
import Tabs from "../../../../components/Tabs"
import Grid from "@mui/material/Grid"
import Divider from "@mui/material/Divider"
import Card from "../../../../components/Card"
import Button from "../../../../components/Button"
import Coins from "../../../../components/Coins"
import Image from "../../../../components/Image"
import TextField from "../../../../components/TextField"
import Typography from "../../../../components/Typography"
import Staff from "../../../../components/Staff"
import RadioGroup from "../../../../components/RadioGroup"
//import CheckboxGroup from "../../../../components/CheckboxGroup"
import CheckboxLabel from "../../../../components/CheckboxLabel"
import SearchUser from "../../../../components/SearchUser"

export default function Profile(props) {
	const {user} = useContext(UserContext)
	//const {getUserScoresGraph, changePassword, setToken, resetToken} = useApi()

	//const [isChangingPassword, setIsChangingPassword] = useState(false)
	const [tab, setTab] = useState("user")
	const [sum, setSum] = useState("")
	const [privateKey, setPrivateKey] = useState("")
	const [foundUser, setFoundUser] = useState({})
	const [teamName, setTeamName] = useState("")
	const [via, setVia] = useState("email")
	const [teamStaff, setTeamStaff] = useState([])

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

	return (
		<Card className={"mb-6"}>
			<Typography variant={"h5"} className={"mb-6"}>
				Начислить монеты
			</Typography>
			<Tabs
				className={"mb-6"}
				value={tab}
				onChange={(_, value) => setTab(value)}
			>
				{/*<Tab label={"Начислить всем"} value={"all"} />*/}
				<Tab label={"Начислить человеку"} value={"user"} />
				<Tab label={"Начислить отделу"} value={"team"} />
			</Tabs>
			{/*{tab === "all" && (
				<Grid container spacing={3}>
					<Grid item xs={12} sm={12} md={6} lg={6}>
						<TextField
							value={sum}
							onChange={e => setSum(e.target.value)}
							//icon={FiSearch}
							label={"Сумма"}
						/>
					</Grid>
				</Grid>
			)}*/}

			{tab === "user" && (
				<>
					<RadioGroup
						className={"mb-4"}
						id={"via"}
						value={via}
						onChange={setVia}
						options={[
							{value: "email", label: "Перевод по email"},
							{value: "name", label: "Перевод по ФИО"},
						]}
						row
					/>

					<Grid container spacing={3}>
						<Grid item xs={12} sm={6} md={12} lg={4}>
							{via === "email" ? (
								<SearchUser
									key={"email"}
									onChange={setFoundUser}
									label={"Email получателя"}
									by={"email"}
								/>
							) : (
								<SearchUser
									key={"name"}
									onChange={setFoundUser}
									label={"ФИО получателя"}
									by={"name"}
								/>
							)}
						</Grid>
						<Grid item xs={12} sm={6} md={6} lg={4}>
							<TextField
								value={privateKey}
								onChange={e => setPrivateKey(e.target.value)}
								//icon={FiSearch}
								label={"Ваш private-key"}
							/>
						</Grid>
						<Grid item xs={12} sm={6} md={6} lg={4}>
							<TextField
								value={sum}
								onChange={e => setSum(e.target.value)}
								//icon={FiSearch}
								label={"Сумма"}
							/>
						</Grid>
						<Grid item xs={12} sm={6} md={6} lg={4}>
							<Staff {...foundUser} card />
						</Grid>
					</Grid>
				</>
			)}

			{tab === "team" && (
				<>
					<Grid container spacing={3} className={"mb-6"}>
						<Grid item xs={12} sm={12} md={12} lg={6}>
							<TextField
								value={teamName}
								onChange={e => setTeamName(e.target.value)}
								//icon={FiSearch}
								label={"Название команды"}
							/>
						</Grid>
						<Grid item xs={12} sm={12} md={12} lg={6}>
							<TextField
								value={sum}
								onChange={e => setSum(e.target.value)}
								//icon={FiSearch}
								label={"Сумма"}
							/>
						</Grid>
					</Grid>

					<Typography varian={"subtitle1"} className={"mb-4"}>
						Сотрудники в команде
					</Typography>
					<Grid container spacing={3}>
						{teamStaff.length > 0
							? teamStaff.map(staff => (
									<Grid
										key={staff.id}
										item
										xs={12}
										sm={6}
										md={4}
										lg={3}
									>
										<Staff {...staff} />
									</Grid>
							  ))
							: [...Array(9)].map((_, index) => (
									<Grid
										key={index}
										item
										xs={12}
										sm={6}
										md={4}
										lg={3}
									>
										<Staff card />
									</Grid>
							  ))}
					</Grid>
				</>
			)}

			<Button variant={"primary"} className={"mt-4"}>
				Начислить монеты
			</Button>
		</Card>
	)
}
