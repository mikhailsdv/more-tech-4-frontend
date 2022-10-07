import React, {useMemo} from "react"
import classnames from "classnames"
import {languageFlags} from "../../js/utils"

import MenuItem from "@mui/material/MenuItem"
import OutlinedInput from "@mui/material/OutlinedInput"
import Select from "@mui/material/Select"

import styles from "./index.module.scss"

const SubjectFilters = props => {
	const {
		course,
		setCourse,
		archived,
		setArchived,
		language,
		setLanguage,
		ordering,
		setOrdering,
		className,
		classes = {},
	} = props

	const selects = useMemo(
		() => [
			{
				name: "language",
				label: "Язык обучения",
				value: language,
				setValue: setLanguage,
				options: [
					{
						label: (
							<>
								<img
									src={languageFlags.ru}
									alt=""
									className={styles.flag}
								/>{" "}
								Русский
							</>
						),
						value: "ru",
					},
					{
						label: (
							<>
								<img
									src={languageFlags.en}
									alt=""
									className={styles.flag}
								/>{" "}
								Английский
							</>
						),
						value: "en",
					},
					{
						label: (
							<>
								<img
									src={languageFlags.kz}
									alt=""
									className={styles.flag}
								/>{" "}
								Казахский
							</>
						),
						value: "kz",
					},
				],
			},
			{
				name: "course",
				label: "Курс",
				value: course,
				setValue: setCourse,
				options: [
					{
						label: "1 курс",
						value: "1",
					},
					{
						label: "2 курс",
						value: "2",
					},
					{
						label: "3 курс",
						value: "3",
					},
					{
						label: "4 курс",
						value: "4",
					},
				],
			},
			{
				name: "archived",
				label: "По дате",
				value: archived,
				setValue: setArchived,
				options: [
					{
						label: "Новые",
						value: "0",
					},
					{
						label: "Архивированные",
						value: "1",
					},
				],
			},
			{
				name: "ordering",
				label: "Сортировка",
				value: ordering,
				setValue: setOrdering,
				options: [
					{
						label: "По алфавиту",
						value: "name",
					},
					{
						label: "По популярности",
						value: "used_count",
					},
					{
						label: "По дате добавления",
						value: "date",
					},
				],
			},
		],
		[
			course,
			setCourse,
			archived,
			setArchived,
			language,
			setLanguage,
			ordering,
			setOrdering,
		]
	)

	return (
		<div className={classnames(styles.root, className, classes.root)}>
			{selects.map(({name, options, label, value, setValue}) => (
				<Select
					data-filled={value !== ""}
					key={name}
					value={value}
					onChange={e => setValue(e.target.value)}
					className={styles.select}
					classes={{icon: styles.icon, filled: styles.filled}}
					displayEmpty
					input={
						<OutlinedInput
							classes={{
								root: styles.inputRoot,
								notchedOutline: styles.notchedOutline,
							}}
						/>
					}
				>
					<MenuItem value="" disabled>
						{label}
					</MenuItem>
					{options.map(option => (
						<MenuItem key={option.value} value={option.value}>
							{option.label}
						</MenuItem>
					))}
				</Select>
			))}
		</div>
	)
}

export default SubjectFilters
