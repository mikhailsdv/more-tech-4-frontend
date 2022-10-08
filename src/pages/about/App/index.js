import React, {useState, useEffect, useCallback} from "react"
import CountUp from "react-countup"
import classnames from "classnames"
import useApi from "api/useApi"
import {wame} from "js/utils"
import {reachGoal} from "js/ym"
import {useSnackbar} from "notistack"

import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import CardContent from "@mui/material/CardContent"
import Divider from "@mui/material/Divider"
import Button from "components/Button"
import Card from "components/Card"
import CardTitle from "components/CardTitle"
import Carousel from "components/Carousel"
import Link from "components/Link"
import VisibilitySensor from "components/VisibilitySensor"

import logoMainSrc from "images/logo/logo-main.svg"
import HowToRegRoundedIcon from "@mui/icons-material/HowToRegRounded"
import LiveHelpRoundedIcon from "@mui/icons-material/LiveHelpRounded"
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded"
import ChangeCircleRoundedIcon from "@mui/icons-material/ChangeCircleRounded"
import TipsAndUpdatesRoundedIcon from "@mui/icons-material/TipsAndUpdatesRounded"
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded"
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded"
import NewspaperRoundedIcon from "@mui/icons-material/NewspaperRounded"
import PhotoFilterRoundedIcon from "@mui/icons-material/PhotoFilterRounded"
import PsychologyRoundedIcon from "@mui/icons-material/PsychologyRounded"
import GroupRoundedIcon from "@mui/icons-material/GroupRounded"
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded"
import SearchRoundedIcon from "@mui/icons-material/SearchRounded"
import PersonRoundedIcon from "@mui/icons-material/PersonRounded"

import styles from "./index.module.scss"
import animateCSS from "styles/animate.module.scss"

const screenshots = [...Array(17)].map((_, index) =>
	require(`images/screenshots/${index + 1}.png`)
)
const features = [
	{
		title: "Варианты ответов перемешиваются",
		description:
			"Это не позволяет вашему мозгу искать «легкие пути» и повышает эффективность запоминания.",
		icon: ChangeCircleRoundedIcon,
	},
	{
		title: "Подсказки",
		description:
			"Вы можете активировать подсказку и оставить только 2 варианта ответа из 5.",
		icon: TipsAndUpdatesRoundedIcon,
	},
	{
		title: "Все предметы хранятся в облаке",
		description:
			"Больше не нужно хранить файлы у себя на телефон или компьютере. Мы обо всем позаботимся.",
		icon: CloudUploadRoundedIcon,
	},
	{
		title: "Нужен только браузер",
		description:
			"Пользуйтесь Тестником с любых устройств. Ничего не нужно устанавливать. Просто войдите на сайт.",
		icon: LanguageRoundedIcon,
	},
	{
		title: "Никакой рекламы",
		description:
			"Мы против рекламы во всех ее проявлениях. Никаких всплывающих окон, никаких баннеров.",
		icon: NewspaperRoundedIcon,
	},
	{
		title: "Приятный дизайн",
		description:
			"Простой минималистичный интерфейс. Ничего лишнего. Как вы любите.",
		icon: PhotoFilterRoundedIcon,
	},
	{
		title: "Вовлечение ассоциативного мышления",
		description:
			"Позитивные и негативные цвета, используемые в интерфейсе, активизируют вашу зрительную память и помогают запоминать быстрее.",
		icon: PsychologyRoundedIcon,
	},
]

const plans = [
	{
		name: "Студент",
		color: "blue",
		icon: PersonRoundedIcon,
		price: 599,
		description: `1 аккаунт. После регистрации вы получите доступ сразу ко всем нашим тестам.`,
		message: "Привет. Меня интересует тарифный план «Студент».",
	},
	{
		name: "Группа",
		color: "yellow",
		icon: GroupRoundedIcon,
		price: 4999,
		description: `10 аккаунтов. Экономия 15%. После регистрации вы получите доступ сразу ко всем нашим тестам.`,
		message: "Привет. Меня интересует тарифный план «Группа».",
	},
]

const TitleSubtitle = props => {
	const {title, subtitle} = props

	return (
		<div className={styles.titleSubtitle}>
			<Typography variant="h6" className={styles.title}>
				{title}
			</Typography>
			<Typography className={styles.subtitle}>{subtitle}</Typography>
		</div>
	)
}

const Feature = props => {
	const {title, description, className, icon: Icon} = props

	return (
		<Card className={classnames(styles.feature, className)}>
			<CardContent>
				<CardTitle className={styles.title}>
					<Icon className={styles.icon} /> {title}
				</CardTitle>
				<Typography className={styles.description}>
					{description}
				</Typography>
			</CardContent>
		</Card>
	)
}

const PlanCard = props => {
	const {name, color, icon: Icon, price, description, message} = props
	return (
		<VisibilitySensor partialVisibility once minTopValue={100}>
			{({isVisible}) => (
				<div
					className={classnames(
						styles.plan,
						isVisible
							? classnames(
									animateCSS.animated,
									animateCSS.fadeInUp,
									name === "Группа"
										? animateCSS.delay05s
										: null
							  )
							: classnames(
									animateCSS.animated,
									animateCSS.fadeOutDown
							  )
					)}
					data-color={color}
				>
					<div className={styles.content}>
						<div className={styles.name}>
							<Icon className={styles.icon} /> «{name}»
						</div>
						<div className={styles.price}>{price}₸</div>
						<div className={styles.description}>{description}</div>
					</div>
					<Link
						external
						to={wame({message})}
						className={styles.mtAuto}
					>
						<Button wide variant="white" className={styles.button}>
							Выбрать
						</Button>
					</Link>
				</div>
			)}
		</VisibilitySensor>
	)
}

const App = () => {
	const {getWelcomeInfo} = useApi()
	const {enqueueSnackbar} = useSnackbar()

	const [welcomeInfo, setWelcomeInfo] = useState({
		questions: 179679,
		searches: 1242,
		subjects: 1204,
		users: 1334,
	})
	const digits = [
		{
			title: welcomeInfo.questions,
			subtitle: "Ответов в базе",
			icon: CheckCircleRoundedIcon,
		},
		{
			title: welcomeInfo.subjects,
			subtitle: "Предметов с ответами",
			icon: LiveHelpRoundedIcon,
		},
		{
			title: welcomeInfo.users,
			subtitle: "Активных пользователей",
			icon: GroupRoundedIcon,
		},
		{
			title: welcomeInfo.searches,
			subtitle: "Поисковых запросов",
			icon: SearchRoundedIcon,
		},
	]

	const onClickHeart = useCallback(() => {
		reachGoal("heart_click")
		enqueueSnackbar({
			message: <span className={styles.bigHeart}>👀❤️</span>,
		})
	}, [enqueueSnackbar])

	useEffect(() => {
		;(async () => {
			try {
				const {status, data} = await getWelcomeInfo()
				if (status) {
					setWelcomeInfo(data)
				}
			} catch (err) {}
		})()
	}, [getWelcomeInfo])

	return (
		<>
			<div className={styles.logoWrapper}>
				<img src={logoMainSrc} alt="logo" className={styles.logo} />
			</div>
			<Box mb={3}>
				<TitleSubtitle
					title={
						<div className={styles.textAlignCenter}>Привет 👋</div>
					}
					subtitle={
						<div className={styles.textAlignCenter}>
							Testnik — сервис по подготовке к сессии,
							разработанный для студентов Турана. Готовься к
							сессии с удовольствием вместе с Testnik!
						</div>
					}
				/>
			</Box>

			<Box mb={3}>
				<div className={styles.buttons}>
					<Link internal block to="/signup">
						<Button
							wide
							variant="primary"
							iconAfter={HowToRegRoundedIcon}
						>
							Зарегистрироваться
						</Button>
					</Link>
					<Link internal block to="/signin">
						<Button wide variant="faded">
							Войти
						</Button>
					</Link>
				</div>
			</Box>

			<Box mb={3}>
				<Carousel
					images={[
						screenshots[0],
						screenshots[3],
						screenshots[4],
						screenshots[8],
					]}
				/>
			</Box>

			<Divider className={styles.divider} />

			<Box my={3}>
				<Box mb={2}>
					<TitleSubtitle
						title="Что там по цифрам?"
						subtitle="Все это только благодаря вашей поддержке. Пользователи Тестника однозначно самые передовые и современные студенты!"
					/>
				</Box>

				<div className={styles.digits}>
					{digits.map(({subtitle, title, icon: Icon}) => (
						<div key={subtitle} className={styles.digit}>
							<div className={styles.title}>
								<Icon className={styles.icon} />{" "}
								<VisibilitySensor
									partialVisibility
									once
									minTopValue={80}
								>
									{({isVisible}) => (
										<CountUp
											delay={300}
											separator=","
											end={isVisible ? title : 0}
										/>
									)}
								</VisibilitySensor>
							</div>
							<div className={styles.subtitle}>{subtitle}</div>
						</div>
					))}
				</div>
			</Box>

			<Divider className={styles.divider} />

			<Box my={3}>
				<Box mb={2}>
					<TitleSubtitle
						title="Прайсинг"
						subtitle="Самые студенческие цены на свете 🎓 Подписка обойдется вам не дороже чашечки кофе."
					/>
				</Box>

				<div className={styles.plans}>
					{plans.map(item => (
						<PlanCard key={item.name} {...item} />
					))}
				</div>
			</Box>

			<Divider className={styles.divider} />

			<Box my={3}>
				<Box mb={2}>
					<TitleSubtitle
						title="Мгновенный поиск"
						subtitle="Находите ответы по первым буквам вопроса. В нашей огромной базе найдется все!"
					/>
				</Box>

				<Carousel
					images={[screenshots[4], screenshots[6], screenshots[11]]}
				/>
			</Box>

			<Divider className={styles.divider} />

			<Box my={3}>
				<Box mb={2}>
					<TitleSubtitle
						title="Режим пробной сессии"
						subtitle="Выдаются 25 случайных вопросов по предмету. После сдачи вы узнаете процент правильных ответов, а также допущенные ошибки."
					/>
				</Box>

				<Carousel
					images={[screenshots[1], screenshots[12], screenshots[13]]}
				/>
			</Box>

			<Divider className={styles.divider} />

			<Box my={3}>
				<Box mb={2}>
					<TitleSubtitle
						title="Ночной режим"
						subtitle="Мы знаем, что вы готовитесь по ночам и беспокоимся о ваших глазках. Ночной режим автоматически подстроится под настройки устройства."
					/>
				</Box>

				<Carousel
					images={[
						screenshots[2],
						screenshots[5],
						screenshots[10],
						screenshots[6],
						screenshots[13],
					]}
				/>
			</Box>

			<Divider className={styles.divider} />

			<Box my={3}>
				<Box mb={2}>
					<TitleSubtitle
						title="Загружайте свои тесты"
						subtitle="Если у вас есть файл с тестом, вы можете отправить его в Тестник и он станет доступен в общей базе."
					/>
				</Box>

				<Carousel images={[screenshots[5], screenshots[14]]} />
			</Box>

			<Divider className={styles.divider} />

			<Box my={3}>
				<Box mb={2}>
					<TitleSubtitle
						title="Все еще сомневаетесь?"
						subtitle={`Нам доверяют более ${
							Math.floor(welcomeInfo.users / 100) * 100
						} студентов по всему университету. Попробовав Тестник однажды, вы больше никогда не захотите готовиться без него 😅. Вот, что еще у нас в арсенале:`}
					/>
				</Box>

				<div className={styles.features}>
					{features.map((item, index) => (
						<VisibilitySensor
							key={item.title}
							once
							partialVisibility
							minTopValue={80}
						>
							{({isVisible}) => (
								<Box key={item.title} mb={2}>
									<Feature
										{...item}
										className={
											isVisible
												? classnames(
														animateCSS.animated,
														animateCSS.fadeInUp,
														animateCSS.delay02s
												  )
												: classnames(
														animateCSS.animated,
														animateCSS.fadeOutDown
												  )
										}
									/>
								</Box>
							)}
						</VisibilitySensor>
					))}
				</div>
			</Box>

			<Divider className={styles.divider} />

			<Box my={3}>
				<Box mb={2}>
					<TitleSubtitle
						title="Закладки"
						subtitle="Вы можете сохранять сложные вопросы в закладки, чтобы позже подучить их отдельно."
					/>
				</Box>

				<Carousel images={[screenshots[15], screenshots[16]]} />
			</Box>

			<Divider className={styles.divider} />

			<Box my={3}>
				<Box mb={2}>
					<TitleSubtitle
						title="Testnik в соцсетях"
						subtitle="Мы часто проводим акции в Instagram, делаем скидки и всячески поощряем активных пользователей. Подпишись, чтобы не пропустить важных новостей."
					/>
				</Box>

				<div className={styles.buttons}>
					<Link
						external
						targetBlank
						block
						to="https://instagram.com/testnik.kz"
					>
						<Button
							wide
							variant="primary"
							className={styles.instagram}
							onClick={() => reachGoal("instagram")}
						>
							Instagram
						</Button>
					</Link>
					<Link
						external
						targetBlank
						block
						to="https://twitter.com/testnikkz"
					>
						<Button
							wide
							variant="primary"
							className={styles.twitter}
						>
							Twitter
						</Button>
					</Link>
					<Link external targetBlank block to={wame()}>
						<Button
							wide
							variant="primary"
							className={styles.whatsapp}
						>
							WhatsApp
						</Button>
					</Link>
				</div>
			</Box>

			<Divider className={styles.divider} />

			<Box my={3}>
				<Box mb={2}>
					<TitleSubtitle
						title="Остались вопросы?"
						subtitle={
							<>
								Мы собрали список самых частых вопросов,
								возникающих у новых пользователей Тестника. Если
								не нашли ответ на свой вопрос —{" "}
								<Link
									external
									to={wame({
										message:
											"Привет. Мой аккаунт в Тестнике заблокировался. Можно ли его как-то восстановить?",
									})}
								>
									свяжитесь с нами
								</Link>
								.
							</>
						}
					/>
				</Box>

				<div className={styles.buttons}>
					<Link external block targetBlank to="/faq">
						<Button
							wide
							variant="primary"
							iconAfter={LiveHelpRoundedIcon}
						>
							Часто задаваемые вопросы
						</Button>
					</Link>
					<Link external block targetBlank to="/terms">
						<Button
							wide
							variant="faded"
							iconAfter={SecurityRoundedIcon}
						>
							Пользовательское соглашение
						</Button>
					</Link>
				</div>
			</Box>

			<Box mt={10}>
				<div className={styles.textAlignCenter}>
					<span className={styles.heart} onClick={onClickHeart}>
						❤️
					</span>
				</div>
			</Box>
		</>
	)
}

export default App
