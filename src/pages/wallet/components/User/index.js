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
import useApi from "../../../../api/useApi"
//import {useSnackbar} from "notistack"

//import format from "date-fns/format"
//import parse from "date-fns/parse"
//import eachDayOfInterval from "date-fns/eachDayOfInterval"
//import sub from "date-fns/sub"
//import {ru} from "date-fns/locale"

import Tab from "../../../../components/Tab"
import Tabs from "../../../../components/Tabs"
import Autocomplete from "../../../../components/Autocomplete"
import Grid from "@mui/material/Grid"
import Divider from "@mui/material/Divider"
import Card from "../../../../components/Card"
import FileUploadField from "../../../../components/FileUploadField"
import Button from "../../../../components/Button"
import Coins from "../../../../components/Coins"
import Image from "../../../../components/Image"
import TextField from "../../../../components/TextField"
import Typography from "../../../../components/Typography"
import Staff from "../../../../components/Staff"
import RadioGroup from "../../../../components/RadioGroup"
//import CheckboxGroup from "../../../../components/CheckboxGroup"
import CheckboxLabel from "../../../../components/CheckboxLabel"

export default function Profile(props) {
	const {user} = useContext(UserContext)
	const {searchUser} = useApi()

	//const [isChangingPassword, setIsChangingPassword] = useState(false)
	const [tab, setTab] = useState("send")
	const [email, setEmail] = useState("")
	const [sum, setSum] = useState("")
	const [userName, setUserName] = useState("")
	const [foundUser, setFoundUser] = useState(null)
	const [cardNumber, setCardNumber] = useState("")
	const [via, setVia] = useState("email")
	const [saveCard, setSaveCard] = useState(false)

	const [foundUsers, setFoundUsers] = useState([])

	const onChangeUserName = useCallback(
		async value => {
			const r = await searchUser({name: value})
			console.log(r)
		},
		[searchUser]
	)
	//const [file, setFile] = useState("")

	/*const {
		open: openChangePasswordDialog,
		close: closeChangePasswordDialog,
		props: changePasswordDialogProps,
		Component: ChangePasswordDialog,
	} = useDialog()*/

	/*const upload = useCallback(async () => {
		console.log(file)
		await uploadPhoto({file: file})
	}, [uploadPhoto, file])*/

	return (
		<Grid container spacing={3}>
			<Grid item xs={12} sm={12} md={5} lg={3}>
				{/*<FileUploadField
					onChange={setFile}
					name={"name"}
					value={file}
				/>*/}
				<UserContext.Consumer>
					{({user}) => (
						<Card>
							<Typography variant={"h5"} gutterBottom>
								{user.name}
							</Typography>
							<Typography
								variant={"body2"}
								emphasis={"medium"}
								className={"mb-6"}
							>
								Мой баланс
							</Typography>

							<Coins amount={user.coins} />
						</Card>
					)}
				</UserContext.Consumer>
			</Grid>
			<Grid item xs={12} sm={12} md={7} lg={9}>
				<Card className={"mb-6"}>
					<Typography variant={"h5"} className={"mb-6"}>
						Переводы и обмен монет
					</Typography>
					<Tabs
						className={"mb-6"}
						value={tab}
						onChange={(_, value) => setTab(value)}
					>
						<Tab
							label={"Перевести другому человеку"}
							value={"send"}
						/>
						<Tab
							label={"Обмен монет на рубли"}
							value={"exchange"}
						/>
					</Tabs>
					<Autocomplete
						options={[
							{a: 1, b: 2},
							{a: 2, b: 2},
							{a: 3, b: 2},
						]}
						getOptionLabel={option => String(option.a)}
						filterOptions={x => x}
						autoComplete
						label={"Text"}
						//includeInputInList
						//filterSelectedOptions
						value={foundUser}
						inputValue={userName}
						onInputChange={value => {
							onChangeUserName(value)
							setUserName(value)
						}}
						isOptionEqualToValue={(option, value) =>
							option.a === Number(value)
						}
						onChange={setFoundUser}
						renderOption={option => (
							<div key={option.a}>
								{option.a} {option.b}
							</div>
						)}
					/>
					{tab === "send" && (
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
					)}
					{tab === "send" ? (
						<Grid container spacing={3}>
							<Grid item xs={12} sm={6} md={12} lg={4}>
								{via === "email" ? (
									<TextField
										value={email}
										onChange={e => setEmail(e.target.value)}
										//icon={FiSearch}
										label={"Email получателя"}
									/>
								) : (
									<TextField
										value={userName}
										onChange={e =>
											setUserName(e.target.value)
										}
										//icon={FiSearch}
										label={"ФИО получателя"}
									/>
								)}
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
								<Staff
									name={"Ilya"}
									position={"Position"}
									image={"https://picsum.photos/40/40"}
									card
								/>
							</Grid>
						</Grid>
					) : (
						<Grid container spacing={3}>
							<Grid item xs={12} sm={12} md={12} lg={6}>
								<TextField
									value={cardNumber}
									onChange={e =>
										setCardNumber(e.target.value)
									}
									//icon={FiSearch}
									label={"Номер карты для вывода"}
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
					)}

					{tab === "exchange" && (
						<CheckboxLabel
							label={"Запомнить карту"}
							checked={saveCard}
							onChange={setSaveCard}
							className={"mt-4"}
						/>
					)}

					<Button variant={"primary"} className={"mt-4"}>
						{tab === "send" ? "Отправить" : "Обменять и вывести"}
					</Button>
				</Card>
			</Grid>
		</Grid>
	)
}
