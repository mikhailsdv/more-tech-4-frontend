import React, {
	Fragment,
	useContext,
	useCallback,
	useState,
	useEffect,
	useRef,
} from "react"
import {useNavigate} from "react-router-dom"
import {
	pluralize,
	getFirstAndLastName,
	numberWithSpaces,
	getImage,
} from "../../../js/utils"
import UserContext from "../../../contexts/user"
import useApi from "../../../api/useApi"
import useDialog from "../../../hooks/useDialog"
import classnames from "classnames"
import {useSnackbar} from "notistack"
import useURLParams from "../../../hooks/useURLParams"

//import format from "date-fns/format"
//import parse from "date-fns/parse"
//import eachDayOfInterval from "date-fns/eachDayOfInterval"
//import sub from "date-fns/sub"
//import {ru} from "date-fns/locale"

import Grid from "@mui/material/Grid"
import Divider from "@mui/material/Divider"
import Card from "../../../components/Card"
import Button from "../../../components/Button"
import Image from "../../../components/Image"
import TextField from "../../../components/TextField"
import Typography from "../../../components/Typography"
import Staff from "../../../components/Staff"

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

const Info = props => {
	const {icon: Icon, className, children, ...rest} = props

	return (
		<div className={classnames(styles.info, className)} {...rest}>
			<Icon className={styles.icon} />
			{children}
		</div>
	)
}

export default function Profile(props) {
	const {user} = useContext(UserContext)
	const {whoami, who, listCoworkers, listAchievements} = useApi()
	const {enqueueSnackbar} = useSnackbar()
	const {id: idParam} = useURLParams()
	const userId = Number(idParam) || user.id
	const [userData, setUserData] = useState(idParam ? null : user)

	const [coworkers, setCoworkers] = useState(
		[...Array(6)].map((_, index) => ({
			id: index,
		}))
	)
	const [manager, setManager] = useState(null)

	useEffect(() => {
		;(async () => {
			const {error, users} = await listCoworkers({user_id: userId})
			if (error) {
				enqueueSnackbar({
					message: error,
					variant: "error",
				})
			} else {
				setCoworkers(users.filter(item => item.id !== userId))
				setManager(users.find(item => item.rights === 2))
				//setUser(data)
			}
		})()

		if (idParam) {
			;(async () => {
				setUserData(null)
				const {error, user, balance} = await who({user_id: idParam})
				if (error) {
					enqueueSnackbar({
						message: error,
						variant: "error",
					})
				} else {
					setUserData({
						...user,
						coins: balance.coinsAmount,
						matic: balance.maticAmount,
					})
				}
			})()
		}
	}, [listCoworkers, enqueueSnackbar, idParam, userId])

	//const [isChangingPassword, setIsChangingPassword] = useState(false)
	const [searchValue, setSearchValue] = useState("")

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
		<Grid container spacing={3}>
			<Grid item xs={12} sm={12} md={5} lg={3}>
				{userData && (
					<Card>
						<Image
							src={getImage(userData.photo_id)}
							className={classnames(styles.userpic, "mb-5")}
						/>
						<Typography variant={"h5"} gutterBottom>
							{getFirstAndLastName(userData)}
						</Typography>
						<Typography
							variant={"body2"}
							emphasis={"medium"}
							className={"mb-8"}
						>
							{userData.position}
						</Typography>

						<Typography
							variant={"subtitle1bold"}
							emphasis={"medium"}
							className={"mb-8"}
							component={"p"}
						>
							<StarIcon className={"text-yellow-400 mr-2"} />
							Поблагодарили: {userData.thanksgivings}{" "}
							{pluralize(
								userData.thanksgivings,
								"раз",
								"раза",
								"раз"
							)}
						</Typography>

						<Typography variant={"h6"} className={"mb-4"}>
							Адрес
						</Typography>
						<Info icon={MdOutlinePinDrop} className={"mb-8"}>
							<Typography variant={"body1"}>
								{userData.address}
							</Typography>
						</Info>

						<Typography variant={"h6"} className={"mb-4"}>
							Контакты
						</Typography>
						<Info icon={MdCall} className={"mb-4"}>
							<Typography variant={"body1"}>
								+{userData.phone}
							</Typography>
						</Info>
						<Info icon={MdOutlineMailOutline} className={"mb-8"}>
							<Typography variant={"body1"}>
								{userData.email}
							</Typography>
						</Info>

						<Typography variant={"h6"} className={"mb-4"}>
							Полезные ссылки
						</Typography>
						<Info icon={MdOutlineDraw} className={"mb-4"}>
							<Typography variant={"body1"}>Портфолио</Typography>
						</Info>
						<Info icon={MdSocialDistance}>
							<Typography variant={"body1"}>Habr</Typography>
						</Info>
					</Card>
				)}
			</Grid>
			<Grid item xs={12} sm={12} md={7} lg={9}>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={12} md={12} lg={8}>
						<Card className={"mb-6"}>
							<TextField
								value={searchValue}
								onChange={e => setSearchValue(e.target.value)}
								icon={FiSearch}
								label={"Поиск по сотрудникам"}
							/>
						</Card>

						<Card className={"mb-6"}>
							<Typography variant={"h5"} className={"mb-5"}>
								Обо мне
							</Typography>
							<Typography
								variant={"subtitle2bold"}
								className={"mb-1"}
								emphasis={"medium"}
								component={"p"}
							>
								Чем я занимаюсь в ВТБ
							</Typography>
							<Typography variant={"body1"} className={"mb-4"}>
								Продуктовый дизайнер с техническим бэкграундом.
								В ВТБ отвечаю за развитие программы лояльности к
								бренду.
							</Typography>

							<Divider />

							<Typography
								variant={"subtitle2bold"}
								className={"mb-1 mt-4"}
								emphasis={"medium"}
								component={"p"}
							>
								Предыдущее место работы
							</Typography>
							<Typography variant={"body1"} className={"mb-4"}>
								Яндекс
							</Typography>

							<Divider />

							<Typography
								variant={"subtitle2bold"}
								className={"mb-1 mt-4"}
								emphasis={"medium"}
								component={"p"}
							>
								Умею лучше всего
							</Typography>
							<Typography variant={"body1"}>
								Лучше всего разбираюсь в Android и в Web. 1,5
								года руководил технической командой, где
								научился понимать и общаться с разработкой. Год
								проработал со стартапами из Сколково, умею
								быстро проектировать MVP.
							</Typography>
						</Card>

						<Card>
							<Typography variant={"h5"} className={"mb-5"}>
								Ачивки
							</Typography>
						</Card>
					</Grid>
					<Grid item xs={12} sm={12} md={12} lg={4}>
						<Card className={"mb-6"}>
							<Typography variant={"h5"} className={"mb-5"}>
								Руководитель
							</Typography>

							<Divider />
							<Staff {...manager} />
							<Divider />
						</Card>
						<Card>
							<Typography variant={"h5"} gutterBottom>
								Коллеги
							</Typography>
							<Typography
								variant={"body2"}
								component={"p"}
								className={"mb-5"}
							>
								Название отдела / команды
							</Typography>

							<Divider />
							{coworkers.map(item => (
								<div key={item.id}>
									<Staff {...item} />
									<Divider />
								</div>
							))}
						</Card>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	)
}
