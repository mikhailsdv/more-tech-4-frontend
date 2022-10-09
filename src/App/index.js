import React, {Suspense, useState, useEffect, lazy} from "react"
import {Route, Routes, Navigate, useLocation} from "react-router-dom"
import Helmet from "react-helmet"
import useApi from "../api/useApi"
import {useSnackbar} from "notistack"
import UserContext from "../contexts/user"
import AuthorizationContext from "../contexts/authorization"

import Container from "@mui/material/Container"
import Loading from "../components/Loading"
import Launch from "../components/Launch"
import Drawer from "../components/Drawer"

//import ComponentsPage from "../pages/components/App"
//import ProfilePage from "../pages/profile/App"
//import WalletPage from "../pages/wallet/App"
//import LoginPage from "../pages/login/App"
//import ShopPage from "../pages/shop/App"

import {TbComponents} from "react-icons/tb"
import {FaDollarSign} from "react-icons/fa"
import {MdQrCodeScanner, MdShoppingBasket} from "react-icons/md"
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded"

import styles from "./index.module.scss"
import classnames from "classnames"

const drawerItems = [
	{
		title: "Мой кошелек",
		url: "/wallet",
		icon: FaDollarSign,
	},
	{
		title: "Магазин",
		url: "/shop",
		icon: MdShoppingBasket,
	},
	{
		title: "Сканировать QR",
		url: "/qr",
		icon: MdQrCodeScanner,
	},
	{
		title: "Обучение",
		url: "/learn",
		icon: SchoolRoundedIcon,
	},
]

const allPages = [
	{
		name: "Профиль",
		url: "/profile",
		component: lazy(() => import("../pages/profile/App")),
		//component: ProfilePage,
		private: true,
	},
	{
		name: "Components",
		url: "/components",
		component: lazy(() => import("../pages/components/App")),
		//component: ComponentsPage,
		private: false,
	},
	{
		name: "Мой кошелек",
		url: "/wallet",
		component: lazy(() => import("../pages/wallet/App")),
		//component: WalletPage,
		private: true,
	},
	{
		name: "Магазин",
		url: "/shop",
		component: lazy(() => import("../pages/shop/App")),
		//component: ShopPage,
		private: true,
	},
	{
		name: "Сканировать QR",
		url: "/qr",
		component: lazy(() => import("../pages/qr/App")),
		//component: LoginPage,
		private: true,
	},
	{
		name: "Обучение",
		url: "/learn",
		component: lazy(() => import("../pages/learn/App")),
		//component: LearnPage,
		private: true,
	},
	{
		name: "Вход",
		url: "/login",
		component: lazy(() => import("../pages/login/App")),
		//component: LoginPage,
		private: false,
	},
]
const publicPages = allPages.filter(page => !page.private)
const privatePages = allPages.filter(page => page.private)

const Root = ({className, ...rest}) => (
	<div className={classnames(styles.root, className)} {...rest} />
)

const App = () => {
	const location = useLocation()
	const {whoami} = useApi()

	const [isAuthorized, setIsAuthorized] = useState(true)
	const [isVerifyingAuthorization, setIsVerifyingAuthorization] =
		useState(true)
	const [drawerOpen, setDrawerOpen] = useState(false)
	const [currentPage, setCurrentPage] = useState({})
	useEffect(
		() =>
			setCurrentPage(
				allPages.find(item => item.url === location.pathname) || {}
			),
		[location.pathname]
	)

	const [user, setUser] = useState({
		id: 1,
		address: "",
		coins: 0,
		photo_id: "",
		email: "",
		first_name: "",
		last_name: "",
		middle_name: "",
		phone: "",
		team_id: null,
		rights: 1,
	})

	useEffect(() => {
		if (!isAuthorized) return
		;(async () => {
			const {user, balance, error} = await whoami()
			//setIsAuthorized(true)
			if (error || !user) {
				setIsAuthorized(false)
			} else {
				setUser({
					...user,
					coins: balance.coinsAmount,
					matic: balance.maticAmount,
				})
				setIsAuthorized(true)
			}
			setIsVerifyingAuthorization(false)
		})()
	}, [isAuthorized, whoami])

	const title = currentPage.name || "VTB"

	return (
		<AuthorizationContext.Provider
			value={{
				isAuthorized,
				setIsAuthorized,
			}}
		>
			<UserContext.Provider
				value={{
					user,
					setUser,
				}}
			>
				{isVerifyingAuthorization && <Launch />}

				<Routes>
					<Route
						path="/*"
						element={
							isAuthorized ? (
								<>
									<Helmet>
										<title>{title}</title>
									</Helmet>
									<Drawer
										items={drawerItems}
										open={drawerOpen}
										setState={setDrawerOpen}
									/>
									<Root>
										<Container
											maxWidth={false}
											className={styles.container}
										>
											<Routes>
												{privatePages.map(page => (
													<Route
														key={page.url}
														path={page.url}
														element={
															<Suspense
																fallback={
																	<Loading />
																}
															>
																<page.component />
															</Suspense>
														}
													/>
												))}

												<Route
													path="*"
													element={
														<Navigate to="/profile" />
													}
												/>
											</Routes>
										</Container>
									</Root>
								</>
							) : (
								<Navigate to="/login" />
							)
						}
					/>

					{publicPages.map(page => (
						<Route
							key={page.url}
							path={page.url}
							element={
								<Root className={styles.px0}>
									<Suspense fallback={<Loading />}>
										<page.component />
									</Suspense>
								</Root>
							}
						/>
					))}
				</Routes>
			</UserContext.Provider>
		</AuthorizationContext.Provider>
	)
}

export default App
