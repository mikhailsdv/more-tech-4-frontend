import React, {
	useContext,
	useCallback,
	useState,
	useEffect,
	useRef,
} from "react"
import {
	pluralize,
	getFirstAndLastName,
	numberWithSpaces,
	getImage,
} from "../../../js/utils"
import UserContext from "../../../contexts/user"
import useApi from "../../../api/useApi"
import classnames from "classnames"
import {useSnackbar} from "notistack"

import Grid from "@mui/material/Grid"
import SearchUser from "../../../components/SearchUser"
import Image from "../../../components/Image"
import TextField from "../../../components/TextField"
import Typography from "../../../components/Typography"
import Staff from "../../../components/Staff"
import Coins from "../../../components/Coins"
import Card from "../../../components/Card"
import Button from "../../../components/Button"

import styles from "./index.module.scss"
import image from "./image.png"

export default function Thanks(props) {
	const {createThanksgiving} = useApi()
	const {enqueueSnackbar} = useSnackbar()
	const [foundUser, setFoundUser] = useState({})
	const [why, setWhy] = useState("")
	const [coins, setCoins] = useState("")

	const send = useCallback(async () => {
		await createThanksgiving({
			user_id_to: foundUser.id,
			title: why,
			price: Number(coins),
		})
		enqueueSnackbar({
			variant: "success",
			message: "Благодарность отправлена!",
		})
	}, [foundUser.id])

	return (
		<Card>
			<Typography variant={"h5"} gutterBottom>
				Поблагодарить коллегу
			</Typography>

			<div className={styles.c}>
				<Image src={image} className={styles.image} />
				<div className={styles.i}>
					<Grid spacing={3} container>
						<Grid item xs={12} sm={12} md={7}>
							<SearchUser
								key={"email"}
								onChange={setFoundUser}
								label={"Email коллеги"}
								by={"email"}
							/>
						</Grid>
						<Grid item xs={12} sm={12} md={5}>
							<Staff {...foundUser} card />
						</Grid>
						<Grid item xs={12} sm={12} md={12}>
							<TextField
								value={why}
								onChange={e => setWhy(e.target.value)}
								//icon={FiSearch}
								label={"За что говорим «Спасибо»?"}
							/>
						</Grid>
						<Grid item xs={12} sm={12} md={12}>
							<TextField
								value={coins}
								onChange={e => setCoins(e.target.value)}
								//icon={FiSearch}
								label={"Добавьте монет"}
							/>
						</Grid>
					</Grid>
					<div className={"flex items-center mt-5"}>
						<Button
							variant={"primary"}
							disabled={!foundUser.id}
							onClick={send}
							className={"mr-5"}
						>
							Отправить
						</Button>
						<span>
							<Coins amount={500} inline /> +{" "}
							<Coins amount={coins || 0} inline /> ={" "}
							<Coins amount={500 + Number(coins || 0)} inline />
						</span>
					</div>
				</div>
			</div>
		</Card>
	)
}
