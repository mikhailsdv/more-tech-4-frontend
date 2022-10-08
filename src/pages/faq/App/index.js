import React from "react"
import {wame} from "js/utils"

import Box from "@mui/material/Box"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import Typography from "@mui/material/Typography"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import Link from "components/Link"
import TextSuggestion from "components/TextSuggestion"

import LiveHelpRoundedIcon from "@mui/icons-material/LiveHelpRounded"
import logoMainSrc from "images/logo/logo-main.svg"

import styles from "./index.module.scss"

const accordion = [
	{
		title: "Что такое Тестник?",
		details:
			"Тестник — это сервис по подготовке к сессии преимущественно для студентов университета «Туран». За 5 лет мы собрали более 1300 сессионных тестов с ответами. Наша база позволяет найти ответы практически к любой сессии.",
	},
	{
		title: "Сколько стоит один тест?",
		details: (
			<>
				После регистрации вы сразу получаете доступ{" "}
				<b>абсолютно ко всей базе</b> тестов. Для вас также будет
				доступен поиск, режим пробной сессии и подготовки. Вы также
				можете загружать собственные тесты.
			</>
		),
	},
	{
		title: "Как зарегистрироваться?",
		details:
			"Регистрация осуществляется при помощи ключа. Стоимость индивидуального ключа – 599 тг. Оплата на карту Kaspi. После оплаты мы вышлем вам уникальный ключ, с помощью которого вы войдете на сайт. Для приобретения ключа свяжитесь нами в WhatsApp (смотрите вопрос ниже).",
	},
	{
		title: "Как с вами связаться?",
		details: (
			<>
				Очень просто — в{" "}
				<Link external to={wame()}>
					WhatsApp
				</Link>{" "}
				или{" "}
				<Link external to="https://instagram.com/testnik.kz/">
					Instagram
				</Link>
				.
			</>
		),
	},
	{
		title: "Как долго будет действовать мой аккаунт?",
		details:
			"Аккаунт будет активен до начала следующего периода сессий. Например, если вы приобретаете ключ 1-го мая 2022, то ваш аккаунт будет активен до 1 декабря 2022. Если вы приобретаете ключ 1-го декабря 2023, то ваш аккаунт будет активен до 1 мая 2024.",
	},
	{
		title: "Можно ли скачать предмет в формате Word?",
		details: "Увы, нет. Это противоречит философии сервиса.",
	},
	{
		title: "Есть приложение?",
		details:
			"Увы, нет. Мы сфокусированы на веб-технологиях, которые обеспечивают кроссплатформенность и простоту внедрения новых функций.",
	},
	{
		title: "Если я отправлю тест, как быстро его добавят?",
		details:
			"Процесс добавления занимает от одной минуты до одного часа. Правильно оформленные тесты и тесты в формате .docX добавляются гораздо быстрее.",
	},
	{
		title: "Можно ли приобрести один ключ для нескольких человек?",
		details: (
			<>
				Нет. Это запрещено согласно{" "}
				<Link internal to="/terms">
					условиям соглашения
				</Link>
				. Однако вы можете приобрести групповую подписку на 10 человек,
				которая на 15% выгоднее, чем индивидуальная.{" "}
				<Link
					external
					to={wame({
						message:
							"Привет. Меня интересует тарифный план «Группа».",
					})}
				>
					Подробнее.
				</Link>
			</>
		),
	},
	{
		title: "Мой аккаунт заблокировался, что мне делать?",
		details: (
			<>
				Без паники! Прежде всего{" "}
				<Link
					external
					to={wame({
						message:
							"Привет. Мой аккаунт в Тестнике заблокировался. Можно ли его как-то восстановить?",
					})}
				>
					свяжитесь с нами
				</Link>
				, аргументированно и взвешенно расскажите о действиях, после
				которых система вас заблокировала. Мы обязательно поможем (за
				исключением случаев грубого нарушения{" "}
				<Link internal to="/terms">
					соглашения
				</Link>
				).
			</>
		),
	},
	{
		title: "Я из другого университета, могу ли я пользоваться Тестником?",
		details: (
			<>
				Да, конечно. Мы всегда открыты к сотрудничеству и планируем
				расширяться.{" "}
				<Link
					external
					to={wame({
						message:
							"Привет. Я из другого университета, но тоже хочу пользоваться Тестником. Что для этого нужно сделать?",
					})}
				>
					Напишите нам
				</Link>
				.
			</>
		),
	},
	{
		title: "Можно ли добавить математику?",
		details:
			"Увы, нет. Тесты, содержащие формулы, не добавляются на сервис.",
	},
	{
		title: "Вы делаете скидки или акции?",
		details: (
			<>
				Постоянно! Следите за нами в{" "}
				<Link external to="https://instagram.com/testnik.kz">
					Instagram
				</Link>
				. Именно там мы объявляем об акциях и скидках.
			</>
		),
	},
]

const App = () => {
	return (
		<>
			<Box mt={4} mb={5} display="flex" justifyContent="center">
				<Link block internal to="/">
					<img src={logoMainSrc} alt="logo" className={styles.logo} />
				</Link>
			</Box>

			<Box mb={2}>
				<TextSuggestion icon={LiveHelpRoundedIcon} color="yellow">
					В этом разделе собраны наиболее частые вопросы, возникающие
					у новых пользователей Тестника. Если не нашли ответ на свой
					вопрос — 
					<Link external to={wame()}>
						свяжитесь с нами
					</Link>
					.
				</TextSuggestion>
			</Box>

			<div>
				{accordion.map(({title, details}, index) => (
					<Accordion key={title} className={styles.root}>
						<AccordionSummary
							expandIcon={
								<ExpandMoreIcon className={styles.expandIcon} />
							}
							className={styles.summary}
						>
							<Typography className={styles.title}>
								<div className={styles.index}>{index + 1}.</div>
								{title}
							</Typography>
						</AccordionSummary>
						<AccordionDetails className={styles.details}>
							<Typography className={styles.text}>
								{details}
							</Typography>
						</AccordionDetails>
					</Accordion>
				))}
			</div>
		</>
	)
}

export default App
