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
//import useApi from "api/useApi"
//import {useSnackbar} from "notistack"
//import useEffectOnce from "hooks/useEffectOnce"
//import {setUserParams} from "js/ym"
import UserContext from "../contexts/user"
import AuthorizationContext from "../contexts/authorization"

import Container from "@mui/material/Container"
//import Box from "@mui/material/Box"
import Loading from "../components/Loading"
//import SelectSubject from "components/SelectSubject"
import Launch from "../components/Launch"
import Drawer from "../components/Drawer"
//import BottomNavigation from "components/BottomNavigation"
//import Header from "components/Header"
//import ErrorMessageBody from "components/ErrorMessageBody"
//import TopProgressBar from "components/TopProgressBar"

//import PsychologyRoundedIcon from "@mui/icons-material/PsychologyRounded"
//import FactCheckRoundedIcon from "@mui/icons-material/FactCheckRounded"
//import BackupRoundedIcon from "@mui/icons-material/BackupRounded"
//import PersonRoundedIcon from "@mui/icons-material/PersonRounded"
//import SearchRoundedIcon from "@mui/icons-material/SearchRounded"

import ComponentsPage from "../pages/components/App"
import ProfilePage from "../pages/profile/App"
import WalletPage from "../pages/wallet/App"
import LoginPage from "../pages/login/App"
//import PreparePage from "pages/prepare/App"
//import UploadPage from "pages/upload/App"
//import SearchPage from "pages/search/App"
//import BookmarksPage from "pages/bookmarks/App"
//import TopPage from "pages/top/App"

import {TbComponents} from "react-icons/tb"
import {FaDollarSign} from "react-icons/fa"
import {MdShoppingBasket} from "react-icons/md"
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
		title: "Awards",
		url: "/awards",
		icon: BsFillAwardFill,
	},
]

const allPages = [
	/*{
		name: "Сессия",
		url: "/session",
		component: SessionPage,
		private: true,
	},
	{
		name: "Подготовка",
		url: "/prepare",
		component: PreparePage,
		private: true,
	},
	{
		name: "Загрузить",
		url: "/upload",
		component: UploadPage,
		private: true,
	},
	{
		name: "Профиль",
		url: "/cabinet",
		component: CabinetPage,
		private: true,
	},
	{
		name: "Поиск",
		url: "/search",
		component: SearchPage,
		private: true,
	},
	{
		name: "Закладки",
		url: "/bookmarks",
		component: BookmarksPage,
		private: true,
	},
	{
		name: "Заявки",
		url: "/requests",
		component: RequestsPage,
		private: true,
	},
	{
		name: "Рейтинг лучших",
		url: "/top",
		component: TopPage,
		private: true,
	},
	{
		name: "Восстановить пароль",
		url: "/restore",
		component: lazy(() => import("../pages/restore/App")),
		private: false,
	},
	{
		name: "Testnik.kz",
		url: "/about",
		component: lazy(() => import("../pages/about/App")),
		private: false,
	},
	{
		name: "Условия соглашения",
		url: "/terms",
		component: lazy(() => import("../pages/terms/App")),
		private: false,
	},
	{
		name: "FAQ",
		url: "/faq",
		component: lazy(() => import("../pages/faq/App")),
		private: false,
	},
	{
		name: "Testnik.kz",
		url: "/signin",
		component: lazy(() => import("../pages/signin/App")),
		private: false,
	},
	{
		name: "Testnik.kz",
		url: "/signup",
		component: lazy(() => import("../pages/signup/App")),
		private: false,
	},*/
	{
		name: "Профиль",
		url: "/profile",
		component: ProfilePage,
		private: true,
	},
	{
		name: "Components",
		url: "/components",
		//component: lazy(() => import("../pages/components/App")),
		component: ComponentsPage,
		private: false,
	},
	{
		name: "Мой кошелек",
		url: "/wallet",
		component: WalletPage,
		private: true,
	},
	{
		name: "Shop",
		url: "/shop",
		component: ComponentsPage,
		private: true,
	},
	{
		name: "Awards",
		url: "/awards",
		component: ComponentsPage,
		private: true,
	},

	{
		name: "Вход",
		url: "/login",
		component: LoginPage,
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
	/*const navigate = useNavigate()
	const {enqueueSnackbar} = useSnackbar()
	const {token, getUserInfo} = useApi()
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
		useState(false)

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
		id: null,
		email: "example@mail.com",
		name: "Kernel Panic",
		phone: null,
		image: "https://picsum.photos/500/500",
		position: "Mental issues team",
		coins: 1234,
		role: "admin",
	})

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

	useEffect(() => {
		if (!isAuthorized) return
		;(async () => {
			try {
				const {status, data} = await getUserInfo()
				if (status) {
					setUser({
						...data,
						course: data.course || "",
					})
					setUserParams({
						UserID: String(data.id),
						email: data.email,
					})
				}
			} catch (err) {}
		})()
	}, [isAuthorized, getUserInfo])

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
