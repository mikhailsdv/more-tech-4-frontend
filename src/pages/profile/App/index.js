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
	const {whoami} = useApi()
	const {enqueueSnackbar} = useSnackbar()

	const [isLoadingProfile, setIsLoadingProfile] = useState(true)

	/*useEffect(() => {
		;(async () => {
			setIsLoadingProfile(true)
			const {error, user} = await whoami()
			if (error) {
				enqueueSnackbar({
					message: error,
					variant: "error",
				})
			} else {
				//setUser(data)
			}
			setIsLoadingProfile(false)
		})()
	}, [whoami, enqueueSnackbar])*/

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
				<UserContext.Consumer>
					{({user}) => (
						<Card>
							<Image
								src={user.photo_url}
								className={classnames(styles.userpic, "mb-5")}
							/>
							<Typography variant={"h5"} gutterBottom>
								{user.name}
							</Typography>
							<Typography
								variant={"body2"}
								emphasis={"medium"}
								className={"mb-8"}
							>
								{user.position}
							</Typography>

							<Typography
								variant={"subtitle1bold"}
								emphasis={"medium"}
								className={"mb-8"}
								component={"p"}
							>
								<StarIcon className={"text-yellow-400 mr-2"} />
								Поблагодарили: 47{" "}
								{pluralize(47, "раз", "раза", "раз")}
							</Typography>

							<Typography variant={"h6"} className={"mb-4"}>
								Адрес
							</Typography>
							<Info icon={MdOutlinePinDrop} className={"mb-8"}>
								<Typography variant={"body1"}>
									{user.address}
								</Typography>
							</Info>

							<Typography variant={"h6"} className={"mb-4"}>
								Контакты
							</Typography>
							<Info icon={MdCall} className={"mb-4"}>
								<Typography variant={"body1"}>
									+{user.phone}
								</Typography>
							</Info>
							<Info
								icon={MdOutlineMailOutline}
								className={"mb-8"}
							>
								<Typography variant={"body1"}>
									{user.email}
								</Typography>
							</Info>

							<Typography variant={"h6"} className={"mb-4"}>
								Полезные ссылки
							</Typography>
							<Info icon={MdOutlineDraw} className={"mb-4"}>
								<Typography variant={"body1"}>
									Портфолио
								</Typography>
							</Info>
							<Info icon={MdSocialDistance}>
								<Typography variant={"body1"}>Habr</Typography>
							</Info>
						</Card>
					)}
				</UserContext.Consumer>
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
							<Staff
								name={"Илья Николаев"}
								position={"Product Design Lead"}
								image={"https://picsum.photos/40/40"}
							/>
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
							{staff}
						</Card>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	)
}
