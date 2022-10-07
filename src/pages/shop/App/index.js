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
import Chip from "../../../components/Chip"
import Select from "../../../components/Select"
import MenuItem from "../../../components/MenuItem"
import Coins from "../../../components/Coins"
import IconButton from "../../../components/IconButton"
import RadioGroup from "../../../components/RadioGroup"
import Product from "../../../components/Product"
import CheckboxGroup from "../../../components/CheckboxGroup"
import Button from "../../../components/Button"
import Image from "../../../components/Image"
import TextField from "../../../components/TextField"
import Typography from "../../../components/Typography"
import Staff from "../../../components/Staff"

import {
	MdOutlineDeliveryDining,
	MdOutlineShoppingBag,
	MdFavoriteBorder,
} from "react-icons/md"
import styles from "./index.module.scss"

/*const filters {

}*/

export default function Shop(props) {
	const {user} = useContext(UserContext)
	const {whoami} = useApi()

	const [type, setType] = useState("all")
	const [items, setItems] = useState([])
	const [category, setCategory] = useState("merch")
	const [sort, setSort] = useState("popular")
	//const [isLoadingProfile, setIsLoadingProfile] = useState(true)

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
			<Grid item xs={12} sm={12} md={12} lg={12}>
				<UserContext.Consumer>
					{({user}) => (
						<Card className={styles.header}>
							<div className={styles.rightSide}>
								<Typography
									variant={"h5"}
									className={"mr-auto"}
								>
									Магазин
								</Typography>

								<Coins amount={user.coins} />
							</div>
							<IconButton
								variant={"secondary"}
								className={"mr-3"}
							>
								<MdOutlineDeliveryDining />
							</IconButton>
							<IconButton
								variant={"secondary"}
								className={"mr-3"}
							>
								<MdOutlineShoppingBag />
							</IconButton>
							<IconButton variant={"secondary"}>
								<MdFavoriteBorder />
							</IconButton>
						</Card>
					)}
				</UserContext.Consumer>
			</Grid>

			<Grid item xs={12} sm={12} md={5} lg={3}>
				<Card>
					<Typography variant={"h6"} className={"mb-4"}>
						Фильтры
					</Typography>

					<RadioGroup
						title={"Тип"}
						options={[
							{value: "all", label: "Показать все"},
							{value: "clothes", label: "Одежда"},
							{value: "backpack", label: "Рюкзаки"},
							{value: "cups", label: "Кружки"},
						]}
						value={type}
						onChange={setType}
						id={"type"}
						className={"mb-4"}
					/>

					<CheckboxGroup
						title={"Предмет"}
						options={[
							{value: "tshirt", label: "Футболки"},
							{value: "hoodie", label: "Худи"},
							{value: "trousers", label: "Брюки"},
						]}
						values={items}
						onChange={setItems}
						id={"items"}
					/>
				</Card>
			</Grid>

			<Grid item xs={12} sm={12} md={7} lg={9}>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={12} md={12} lg={12}>
						<Card className={styles.category}>
							<Typography
								variant={"h5"}
								className={classnames("mr-6", styles.title)}
							>
								Категория
							</Typography>
							<div className={styles.chips}>
								{[
									{
										value: "merch",
										label: "Мерч",
									},
									{
										value: "partner",
										label: "Партнерские товары",
									},
									{
										value: "colleagues",
										label: "Товары коллег",
									},
								].map(item => (
									<Chip
										key={item.value}
										isSelected={item.value === category}
										onClick={() => setCategory(item.value)}
										className={"mr-2"}
									>
										{item.label}
									</Chip>
								))}
							</div>
							<Select
								label={"Сортировка"}
								value={sort}
								onChange={e => setSort(e.target.value)}
								className={styles.sort}
							>
								<MenuItem value={"popular"}>
									Популярное
								</MenuItem>
								<MenuItem value={"expensive"}>
									Сначала дорогие
								</MenuItem>
								<MenuItem value={"cheap"}>
									Сначала дешевые
								</MenuItem>
							</Select>
						</Card>
					</Grid>

					<Grid item xs={12} sm={12} md={12} lg={12}>
						<Grid container spacing={3}>
							{[...Array(9)].map((_, index) => (
								<Grid
									key={index}
									item
									xs={12}
									sm={12}
									md={6}
									lg={4}
								>
									<Product
										image={`https://picsum.photos/500/500?random=${
											index + 1
										}`}
										title={"Футболка с логотипом"}
										description={"Сделана из 100% хлопка"}
										price={150 + index}
									/>
								</Grid>
							))}
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	)
}
