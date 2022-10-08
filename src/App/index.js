import React, {
	Suspense,
	useState,
	useEffect,
	//useMemo,
	//useCallback,
	//useReducer,
	lazy,
} from "react"
import {
	Route,
	Routes,
	Navigate,
	//useNavigate,
	useLocation,
} from "react-router-dom"
import Helmet from "react-helmet"
import useApi from "../api/useApi"
import {useSnackbar} from "notistack"
//import useEffectOnce from "hooks/useEffectOnce"
//import {setUserParams} from "js/ym"
import {getFirstAndLastName} from "../js/utils"
import UserContext from "../contexts/user"
import AuthorizationContext from "../contexts/authorization"

import Container from "@mui/material/Container"
//import Box from "@mui/material/Box"
import Loading from "../components/Loading"
//import SelectSubject from "components/SelectSubject"
import Launch from "../components/Launch"
import Drawer from "../components/Drawer"
import Fab from "@mui/material/Fab"
//import BottomNavigation from "components/BottomNavigation"
//import Header from "components/Header"
//import ErrorMessageBody from "components/ErrorMessageBody"
//import TopProgressBar from "components/TopProgressBar"

//import PsychologyRoundedIcon from "@mui/icons-material/PsychologyRounded"
//import FactCheckRoundedIcon from "@mui/icons-material/FactCheckRounded"
//import BackupRoundedIcon from "@mui/icons-material/BackupRounded"
//import PersonRoundedIcon from "@mui/icons-material/PersonRounded"
//import SearchRoundedIcon from "@mui/icons-material/SearchRounded"

//import ComponentsPage from "../pages/components/App"
//import ProfilePage from "../pages/profile/App"
//import WalletPage from "../pages/wallet/App"
//import LoginPage from "../pages/login/App"
//import ShopPage from "../pages/shop/App"

import {TbComponents} from "react-icons/tb"
import {FaDollarSign} from "react-icons/fa"
import {MdQrCodeScanner, MdShoppingBasket} from "react-icons/md"
import {BsFillAwardFill} from "react-icons/bs"

import styles from "./index.module.scss"
import classnames from "classnames"

const drawerItems = [
	{
		title: "Мой кошелек",
		url: "/wallet",
		icon: FaDollarSign,
	},
	{
		title: "Shop",
		url: "/shop",
		icon: MdShoppingBasket,
	},
	{
		title: "Сканировать QR",
		url: "/qr",
		icon: MdQrCodeScanner,
	},
]

const allPages = [
	/*
	{
		name: "Testnik.kz",
		url: "/signup",
		component: lazy(() => import("../pages/signup/App")),
		private: false,
	},*/
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
		name: "Shop",
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
		name: "Вход",
		url: "/login",
		component: lazy(() => import("../pages/login/App")),
		//component: LoginPage,
		private: false,
	},
]
const publicPages = allPages.filter(page => !page.private)
const privatePages = allPages.filter(page => page.private)
/*const initialTabs = Object.fromEntries(
	[
		{
			url: "/prepare",
			icon: PsychologyRoundedIcon,
		},
		{
			url: "/session",
			icon: FactCheckRoundedIcon,
		},
		{
			url: "/upload",
			icon: BackupRoundedIcon,
		},
		{
			url: "/cabinet",
			icon: PersonRoundedIcon,
		},
		{
			url: "/search",
			icon: SearchRoundedIcon,
		},
	].map(item => {
		const id = item.url.replace("/", "")
		return [
			id,
			{
				...item,
				id,
				scrollTop: 0,
				name: allPages.find(page => page.url === item.url).name,
			},
		]
	})
)*/

const Root = ({className, ...rest}) => (
	<div className={classnames(styles.root, className)} {...rest} />
)

const App = () => {
	const location = useLocation()
	const {token, whoami} = useApi()
	const {enqueueSnackbar} = useSnackbar()
	/*const navigate = useNavigate()
	const params = useURLParams()

	const tabsReducer = (state, newState) => {
		const {id, ...newProps} = newState

		return {
			...state,
			[id]: {
				...state[id],
				...newProps,
			},
		}
	}
	const [tabs, dispatchTabs] = useReducer(tabsReducer, initialTabs)
	const tabsValues = useMemo(() => Object.values(tabs), [tabs])
	//const tabsKeys = useMemo(() => Object.keys(tabs), [tabs])
	const [isOverscrolled, setIsOverscrolled] = useState(false)*/

	const [isAuthorized, setIsAuthorized] = useState(true)
	const [isVerifyingAuthorization, setIsVerifyingAuthorization] =
		useState(true)

	const [drawerOpen, setDrawerOpen] = useState(false)
	/*const [currentTab, setCurrentTab] = useState({})
	useEffect(
		() => setCurrentTab(tabs[location.pathname.replace("/", "")] || {}),
		[location.pathname, tabs]
	)*/
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
		address: "Москва",
		coins: 100,
		photo_url: "https://picsum.photos/500/500",
		email: "ilya@vtb.ru",
		first_name: "Илья",
		last_name: "Николаев",
		middle_name: "Витальевич",
		phone: "79772671124",
		team_id: 1,
		first_and_last_name: "Илья Николаев",
		rights: "admin",
	})

	useEffect(() => {
		if (!isAuthorized) return
		;(async () => {
			const {user, error} = await whoami()
			setIsAuthorized(true)
			/*if (error || !user) {
				setIsAuthorized(false)
			} else {
				//setUser(user)
				//getFirstAndLastName
				setIsAuthorized(true)
			}*/
			setIsVerifyingAuthorization(false)
		})()
	}, [isAuthorized, whoami, enqueueSnackbar])

	/*const onChangeTab = useCallback(
		newTabId => {
			currentTab.id &&
				dispatchTabs({
					id: currentTab.id,
					scrollTop: document.documentElement.scrollTop,
				})
			if (newTabId !== currentTab.id) {
				navigate(newTabId)

				requestAnimationFrame(
					() =>
						(document.documentElement.scrollTop =
							tabs[newTabId].scrollTop)
				)
			}
		},
		[navigate, currentTab.id, tabs]
	)

	useEffectOnce(() => {
		;(async () => {
			try {
				const {status, data} = await getUserInfo()
				if (status) {
					setUser({
						...data,
						course: data.course || "",
					})
					setIsAuthorized(true)
					if (location.pathname === "/signin") {
						navigate("/")
					}
				} else {
					setIsAuthorized(false)
					if (location.pathname === "/") {
						navigate(token ? "/signin" : "/about")
					}
				}
			} catch (err) {
				setIsAuthorized(false)
				if (location.pathname === "/") {
					navigate(token ? "/signin" : "/about")
				}
				enqueueSnackbar({
					message: (
						<ErrorMessageBody
							message="Не удалось авторизоваться."
							errors={{
								message: err.message,
								res: err.response,
							}}
						/>
					),
					variant: "error",
				})
			}
			setIsVerifyingAuthorization(false)
		})()
	}, [
		setUser,
		navigate,
		getUserInfo,
		token,
		location.pathname,
		enqueueSnackbar,
	])

	useEffect(() => {
		let previousScroll = 0
		let translate = 0
		let previousDirection = "down"
		const upBreakpoint = 1
		const downBreakpoint = 56

		const onScroll = () => {
			const currentScroll = document.documentElement.scrollTop
			const difference = currentScroll - previousScroll
			const currentDirection = difference > 0 ? "down" : "up"
			const directionChanged = previousDirection !== currentDirection

			translate += difference

			if (directionChanged) {
				translate = 0
			}
			if (currentScroll <= downBreakpoint) {
				setIsOverscrolled(false)
			} else {
				if (translate >= downBreakpoint) {
					setIsOverscrolled(true)
				} else if (translate <= -upBreakpoint) {
					setIsOverscrolled(false)
				}
			}

			previousDirection = currentDirection
			previousScroll = currentScroll
		}

		window.addEventListener("scroll", onScroll)

		return () => window.removeEventListener("scroll", onScroll)
	}, [])*/

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
