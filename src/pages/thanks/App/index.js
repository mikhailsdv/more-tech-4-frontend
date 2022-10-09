import React, {useState, useCallback, useContext} from "react"
import useApi from "../../../api/useApi"
import {useSnackbar} from "notistack"
//import UserContext from "../../../contexts/user"
import useEffectOnce from "../../../hooks/useEffectOnce"
import AuthorizationContext from "../../../contexts/authorization"
import {useNavigate} from "react-router-dom"
import classnames from "classnames"
import QrReader from "react-qr-scanner"

import Card from "../../../components/Card"
import Typography from "../../../components/Typography"
import TextField from "../../../components/TextField"
import Button from "../../../components/Button"
import Coins from "../../../components/Coins"
import Image from "../../../components/Image"
import CheckboxLabel from "../../../components/CheckboxLabel"
import Container from "@mui/material/Container"

import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded"
import areaImage from "../../../images/other/area.svg"

import styles from "./index.module.scss"
import coffeeImage from "../../../images/other/coffee.png"
import lunchImage from "../../../images/other/lunch.png"

const images = {
	0: coffeeImage,
	1: lunchImage,
}

const App = () => {
	const {enqueueSnackbar} = useSnackbar()
	//const {setUser} = useContext(UserContext)
	const navigate = useNavigate()

	const [qrData, setQrData] = useState(null)
	const [isPaid, setIsPaid] = useState(false)

	const onScan = useCallback(
		data => {
			if (!data?.text || qrData) return
			try {
				const [image, price, name] = data.text.split(";")
				if (image && price && name) {
					setQrData({image, name, price})
				}
			} catch (e) {}
		},
		[qrData]
	)

	const pay = useCallback(() => {
		setIsPaid(true)
	}, [])

	const reset = useCallback(() => {
		setIsPaid(false)
		setQrData(null)
	}, [])

	return qrData ? (
		isPaid ? (
			<>
				<Card className={"text-center mb-4"}>
					<CheckCircleOutlineRoundedIcon
						className={classnames(styles.successIcon, "mt-4")}
					/>
					<Typography
						variant={"subtitle1bold"}
						component={"div"}
						emphasis={"medium"}
						className={"mb-4"}
					>
						Спасибо! Покупа
						<br />
						успешно оплачена.
					</Typography>
				</Card>
				<Button variant={"secondary"} fullWidth onClick={reset}>
					Назад
				</Button>
			</>
		) : (
			<>
				<Card className={"text-center mb-4"}>
					<img
						src={images[qrData.image]}
						alt={""}
						className={"mb-1"}
					/>
					<Coins
						amount={Number(qrData.price)}
						className={"mb-4"}
						classes={{amount: "text-5xl", icon: "text-5xl !top-2"}}
					/>
					<Typography varian={"subtitle1"} emphasis={"medium"}>
						{qrData.name}
					</Typography>
				</Card>
				<Button variant={"primary"} fullWidth onClick={pay}>
					Оплатить
				</Button>
			</>
		)
	) : (
		<Container maxWidth="sm" className={"px-0"}>
			<div className={styles.qrWrapper}>
				<img src={areaImage} alt={"area"} className={styles.area} />
				<QrReader
					delay={1000}
					constraints={{video: {facingMode: "environment"}}}
					//style={previewStyle}
					onError={console.error}
					onScan={onScan}
				/>
			</div>
			<Typography
				variant={"subtitle1"}
				component={"div"}
				emphasis={"medium"}
				className={"mt-4"}
				align={"center"}
			>
				Сканируйте QR с телефона
			</Typography>
		</Container>
	)
}

export default App
