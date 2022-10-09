import React, {useContext, useState} from "react"
import UserContext from "../../../contexts/user"
import useApi from "../../../api/useApi"
import classnames from "classnames"
import useDialog from "../../../hooks/useDialog"

import Grid from "@mui/material/Grid"
import Card from "../../../components/Card"
import Chip from "../../../components/Chip"
import Typography from "../../../components/Typography"
import Tab from "../../../components/Tab"
import Tabs from "../../../components/Tabs"
import Course from "../../../components/Course"
import QuestionCard from "../../../components/QuestionCard/Session"

import styles from "./index.module.scss"
import test from "./test.json"
import Button from "../../../components/Button"

export default function Shop(props) {
	const [tab, setTab] = useState("unfinished")
	const [category, setCategory] = useState("required")
	const [isCourseOpen, setIsCourseOpen] = useState(false)
	const [showTest, setShowTest] = useState(false)

	const {
		open: openDialog,
		close: closeDialog,
		props: dialogProps,
		Component: Dialog,
	} = useDialog()

	if (showTest) {
		return (
			<>
				<Dialog
					{...dialogProps}
					maxWidth={"sm"}
					title="Прздавляем! Вы набрали больше 80% и получили ачивку."
					actions={
						<>
							<Button
								variant="primary"
								small
								onClick={closeDialog}
							>
								Ок
							</Button>
						</>
					}
				>
					Всего вопросов: 25
					<br />
					Правильных: 21
					<br />
					Неправильных: 4<br />
					<br />
					<b>Процент: 84%</b>
					<br />
					<b>
						За успешную сдачу теста вы получили ачивку «Гуру
						безопасности» и 1500 монет
					</b>
				</Dialog>

				<Card className={"mb-4"}>
					<dib className={"py-1 px-2 bg-sky-600 rounded-md"}>
						<Typography
							variant={"caption"}
							className={classnames("!text-white")}
						>
							Не завершен
						</Typography>
					</dib>
					<Typography
						variant={"h5"}
						className={classnames("mb-5 mt-4", styles.title)}
					>
						Кибербезопасность в банке
					</Typography>
					<Typography variant={"body1"} emphasis={"medium"}>
						Находим и эксплуатировать уязвимости ОС и веб-приложений
					</Typography>
				</Card>

				{test.slice(0, 25).map((item, index) => (
					<QuestionCard
						key={index}
						isSessionPassed={false}
						onSelectVariant={() => {}}
						id={index}
						is_saved={false}
						variants={item.variants}
						question={item.question}
						index={index}
						className={"mb-4"}
					/>
				))}
				<Card className={"mt-2"}>
					<Button fullWidth variant={"primary"} onClick={openDialog}>
						Сдать тест
					</Button>
				</Card>
			</>
		)
	} else if (isCourseOpen) {
		return (
			<Grid container spacing={3}>
				<Grid item xs={12} sm={12} md={12} lg={12}>
					<Card className={"mb-6"}>
						<Typography
							variant={"subtitle1"}
							className={classnames("mb-3", styles.title)}
						>
							Курс
						</Typography>
						<Typography
							variant={"h5"}
							className={classnames("mb-5", styles.title)}
						>
							Кибербезопасность в банке
						</Typography>
						<Typography
							variant={"h6"}
							emphasis={"medium"}
							className={classnames("mb-3", styles.title)}
						>
							3/8 мудолей
						</Typography>
						<div
							className={
								"relative w-full h-4 rounded-full overflow-hidden bg-gray-200"
							}
						>
							<div
								className={classnames(
									"w-1/5 h-full rounded-full",
									styles.gradientbg
								)}
							></div>
						</div>
					</Card>

					<Card className={"mb-4"}>
						<dib className={"py-1 px-2 bg-sky-600 rounded-md"}>
							<Typography
								variant={"caption"}
								className={classnames("!text-white")}
							>
								Не завершен
							</Typography>
						</dib>
						<Typography
							variant={"h5"}
							className={classnames("mb-5 mt-4", styles.title)}
						>
							Кибербезопасность в банке
						</Typography>
						<Typography variant={"body1"} emphasis={"medium"}>
							Находим и эксплуатировать уязвимости ОС и
							веб-приложений
						</Typography>
					</Card>

					<Card className={"mb-4"}>
						<dib className={"py-1 px-2 bg-sky-600 rounded-md"}>
							<Typography
								variant={"caption"}
								className={classnames("!text-white")}
							>
								Не завершен
							</Typography>
						</dib>
						<Typography
							variant={"h5"}
							className={classnames("mb-5 mt-4", styles.title)}
						>
							Кибербезопасность в банке
						</Typography>
						<Typography variant={"body1"} emphasis={"medium"}>
							Находим и эксплуатировать уязвимости ОС и
							веб-приложений
						</Typography>
					</Card>

					<Card className={"mb-4"}>
						<dib className={"py-1 px-2 bg-green-600 rounded-md"}>
							<Typography
								variant={"caption"}
								className={classnames("!text-white")}
							>
								Завершен
							</Typography>
						</dib>
						<Typography
							variant={"h5"}
							className={classnames("mb-5 mt-4", styles.title)}
						>
							Кибербезопасность в банке
						</Typography>
						<Typography variant={"body1"} emphasis={"medium"}>
							Находим и эксплуатировать уязвимости ОС и
							веб-приложений
						</Typography>
					</Card>
					<Card>
						<Button
							fullWidth
							variant={"primary"}
							onClick={() => setShowTest(true)}
						>
							Начать тестирование
						</Button>
					</Card>
				</Grid>
			</Grid>
		)
	} else {
		return (
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
									value: "required",
									label: "Обязательные курсы",
								},
								{
									value: "additional",
									label: "Дополнительное обучение",
								},
								{
									value: "colleagues",
									label: "Избранное",
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
					</Card>
				</Grid>

				<Grid item xs={12} sm={12} md={12} lg={12}>
					<Card>
						<Tabs
							className={"mb-6"}
							value={tab}
							onChange={(_, value) => setTab(value)}
						>
							<Tab label={"Незавершенные"} value={"unfinished"} />
							<Tab label={"Завершенные"} value={"finished"} />
						</Tabs>
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
									<Course
										image={`https://random.imagecdn.app/500/500?random=${
											index + 1
										}`}
										title={"Кибербезопасность в банке"}
										description={
											"Вы научитесь искать уязвимости, предотвращать угрозы и обеспечивать безопасность IT-систем. "
										}
										onOpen={() => setIsCourseOpen(true)}
									/>
								</Grid>
							))}
						</Grid>
					</Card>
				</Grid>
			</Grid>
		)
	}
}
