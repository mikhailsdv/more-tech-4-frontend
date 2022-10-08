import React, {useState, useEffect, useCallback, useRef} from "react"
import classnames from "classnames"

import Box from "@mui/material/Box"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import Skeleton from "@mui/material/Skeleton"
import TableRow from "@mui/material/TableRow"
import TableContainer from "@mui/material/TableContainer"
import Tooltip from "../Tooltip"

import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"

import styles from "./index.module.scss"

const Table_ = props => {
	const {
		containerHeight,
		columns,
		data: rawData,
		isLoading,
		className,
		classes = {},
		onClickTableBody,
		emptyText = "Нет данных",
		...rest
	} = props

	const defaultSortColumnIndex = columns.findIndex(
		column => column.defaultSortOrder
	)
	const [isMobile, setIsMobile] = useState(false)
	const [sort, setSort] = useState(() => {
		if (defaultSortColumnIndex !== -1) {
			return {
				columnKey: columns[defaultSortColumnIndex].key,
				order: columns[defaultSortColumnIndex].defaultSortOrder,
			}
		}
		return {
			columnKey: null,
			order: null,
		}
	})

	const sorter = useCallback(
		sortState => {
			if (sortState.columnKey !== null) {
				const sortByColumn = columns.find(
					column => column.key === sortState.columnKey
				)
				if (sortByColumn) {
					if (sortState.order === "desc") {
						return rawData
							.slice()
							.sort(sortByColumn.sorter)
							.reverse()
					} else {
						return rawData.slice().sort(sortByColumn.sorter)
					}
				} else {
					setSort({
						columnKey: null,
						order: null,
					})
					return rawData
				}
			} else {
				return rawData
			}
		},
		[rawData, columns]
	)
	const [data, setData] = useState(() => sorter(sort))
	const onSort = columnKey => {
		if (sort.columnKey === columnKey) {
			if (sort.order === "asc") {
				setSort({
					columnKey: columnKey,
					order: "desc",
				})
			} else if (sort.order === "desc") {
				/*setSort({
					columnKey: null,
					order: null
				})*/
				setSort({
					columnKey: columnKey,
					order: "asc",
				})
			}
		} else {
			setSort({
				columnKey: columnKey,
				order: "asc",
			})
		}
	}

	const onResize = useCallback(() => {
		const width = document.documentElement.offsetWidth
		if (width < 768 && !isMobile) {
			setIsMobile(true)
		} else if (width >= 768 && isMobile) {
			setIsMobile(false)
		}
	}, [isMobile])

	useEffect(() => {
		const sortedData = sorter(sort)
		setData(sortedData)
	}, [sorter, sort, rawData])

	useEffect(() => {
		onResize()
		window.addEventListener("resize", onResize)

		return () => {
			window.removeEventListener("resize", onResize)
		}
	}, [onResize])

	return (
		<Box
			{...rest}
			className={classnames(styles.root, className, classes.root)}
		>
			<TableContainer
				className={classnames(styles.container, classes.container)}
				style={{
					maxHeight: containerHeight
						? `${containerHeight}px`
						: "unset",
				}}
			>
				<Table stickyHeader>
					<TableBody>
						{data.length > 0 &&
							data.map(dataItem => (
								<TableRow
									key={dataItem.id}
									data-disabled={dataItem.disabled}
								>
									{columns.map(column => {
										const TableBodyCellProps =
											column.TableBodyCellProps || {}
										const {
											className,
											...TableBodyCellPropsRest
										} = TableBodyCellProps

										return (
											<TableCell
												key={column.key}
												className={classnames(
													styles.cell,
													className
												)}
												onClick={
													column.sortable
														? () =>
																onSort(
																	column.key
																)
														: undefined
												}
												data-sticky={Boolean(
													column.sticky
												)}
												{...TableBodyCellPropsRest}
											>
												{isLoading ? (
													<Skeleton
														variant="rect"
														width="100%"
														height={16}
													/>
												) : column.render ? (
													column.render(
														dataItem[column.key]
													)
												) : (
													dataItem[column.key]
												)}
											</TableCell>
										)
									})}
								</TableRow>
							))}
						{data.length === 0 && (
							<TableRow>
								<TableCell colSpan={columns.length}>
									<Box py={2} textAlign="center">
										<p className={styles.noDataText}>
											{emptyText}
										</p>
									</Box>
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	)
}

export default Table_
