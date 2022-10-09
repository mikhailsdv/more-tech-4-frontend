import React, {useState, useCallback, useEffect, useRef} from "react"
import useApi from "../../../api/useApi"
import {useSnackbar} from "notistack"
import useDialog from "../../../hooks/useDialog"
import {sleep} from "../../../js/utils"

import Button from "../../../components/Button"
import Tooltip from "../../../components/Tooltip"
import Switch from "../../../components/Switch"
import Chip from "../../../components/Chip"
import Tab from "../../../components/Tab"
import Tabs from "../../../components/Tabs"
import Select from "../../../components/Select"
import TextField from "../../../components/TextField"
import MenuItem from "../../../components/MenuItem"
import Loading from "../../../components/Loading"
import ErrorMessageBody from "../../../components/ErrorMessageBody"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import Fab from "@mui/material/Fab"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"

import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded"
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded"
import EmailRoundedIcon from "@mui/icons-material/EmailRounded"
import {HiOutlineMail, HiMenu} from "react-icons/hi"
import {FiSearch} from "react-icons/fi"
import {FaDollarSign} from "react-icons/fa"
import {MdShoppingBasket} from "react-icons/md"
import {BsFillAwardFill} from "react-icons/bs"
import {TbComponents} from "react-icons/tb"

import styles from "./index.module.scss"

export default function App(props) {
	const {isOverscrolled} = props

	const {
		open: openDialog,
		close: closeDialog,
		props: dialogProps,
		Component: Dialog,
	} = useDialog()

	const {enqueueSnackbar} = useSnackbar()

	const [isLoadingDialog, setIsLoadingDialog] = useState(false)
	const [switchState, setSwitchState] = useState(false)
	const [smallButtons, setSmallButtons] = useState(false)
	const [selectValue, setSelectValue] = useState("")
	const [tab, setTab] = useState("1")

	const openSnackbar = useCallback(async () => {
		enqueueSnackbar({
			title: "Error",
			message: "This is an example of error snackbar.",
			variant: "error",
		})
		await sleep(300)
		enqueueSnackbar({
			title: "Success",
			message: "This is an example of success snackbar.",
			variant: "success",
		})
		await sleep(300)
		enqueueSnackbar({
			title: "Warning",
			message: "This is an example of warning snackbar.",
			variant: "warning",
		})
	}, [enqueueSnackbar, closeDialog])

	return (
		<>
			<Dialog
				{...dialogProps}
				maxWidth={"sm"}
				title="Dialog Example"
				actions={
					<>
						<Button variant="primary" small onClick={closeDialog}>
							To be
						</Button>
						<Button
							variant="negative"
							small
							onClick={closeDialog}
							iconBefore={RemoveCircleRoundedIcon}
						>
							Or not to be
						</Button>
					</>
				}
			>
				It uses body1 as typography element.
			</Dialog>

			{/*<Fab
				className={"fixed left-4 top-4 bg-white"}
				onClick={() => setDrawerOpen(true)}
			>
				<HiMenu />
			</Fab>*/}

			<div className={"mb-10 mt-10 w-full overflow-hidden"}>
				{[
					"h1",
					"h2",
					"h3",
					"h4",
					"h5",
					"h6",
					"subtitle1",
					"subtitle1bold",
					"subtitle2",
					"subtitle2bold",
					"body1",
					"body2",
					"button",
					"caption",
					"overline",
				].map(variant => (
					<div key={variant} className={"w-full mb-4"}>
						<Typography variant={variant}>
							{variant}/Manrope
						</Typography>
					</div>
				))}
			</div>

			<Typography variant={"h4"} className={"mb-1"}>
				Button Primary
			</Typography>
			<Typography variant={"h6"} className={"mb-4"}>
				Small Buttons{" "}
				<Switch
					checked={smallButtons}
					onChange={() => setSmallButtons(prev => !prev)}
					//className={"mb-10"}
				></Switch>
			</Typography>
			<Grid container spacing={3} className={"mb-10"}>
				<Grid item xs={12} sm={4} md={3}>
					<Button small={smallButtons} variant="primary">
						Button Primary
					</Button>
				</Grid>
				<Grid item xs={12} sm={4} md={3}>
					<Button
						small={smallButtons}
						variant="primary"
						iconBefore={AddCircleOutlineRoundedIcon}
					>
						Icon Before
					</Button>
				</Grid>
				<Grid item xs={12} sm={4} md={3}>
					<Button
						small={smallButtons}
						variant="primary"
						iconAfter={AddCircleOutlineRoundedIcon}
					>
						Icon After
					</Button>
				</Grid>
				<Grid item xs={12} sm={4} md={3}>
					<Button small={smallButtons} variant="primary" isLoading>
						Icon After
					</Button>
				</Grid>
				<Grid item xs={12} sm={4} md={3}>
					<Button small={smallButtons} variant="primary" disabled>
						Disabled
					</Button>
				</Grid>
			</Grid>

			<Typography variant={"h4"} className={"mb-4"}>
				Button Secondary
			</Typography>
			<Grid container spacing={3} className={"mb-10"}>
				<Grid item xs={12} sm={4} md={3}>
					<Button small={smallButtons} variant="secondary">
						Secondary
					</Button>
				</Grid>
				<Grid item xs={12} sm={4} md={3}>
					<Button
						small={smallButtons}
						variant="secondary"
						iconBefore={AddCircleOutlineRoundedIcon}
					>
						Icon Before
					</Button>
				</Grid>
				<Grid item xs={12} sm={4} md={3}>
					<Button
						small={smallButtons}
						variant="secondary"
						iconAfter={AddCircleOutlineRoundedIcon}
					>
						Icon After
					</Button>
				</Grid>
				<Grid item xs={12} sm={4} md={3}>
					<Button small={smallButtons} variant="secondary" isLoading>
						Icon After
					</Button>
				</Grid>
				<Grid item xs={12} sm={4} md={3}>
					<Button small={smallButtons} variant="secondary" disabled>
						Disabled
					</Button>
				</Grid>
			</Grid>

			<Typography variant={"h4"} className={"mb-4"}>
				Button NoBorder
			</Typography>
			<Grid container spacing={3} className={"mb-10"}>
				<Grid item xs={12} sm={4} md={3}>
					<Button small={smallButtons} variant="no-border">
						No Border
					</Button>
				</Grid>
				<Grid item xs={12} sm={4} md={3}>
					<Button
						small={smallButtons}
						variant="no-border"
						iconBefore={AddCircleOutlineRoundedIcon}
					>
						Icon Before
					</Button>
				</Grid>
				<Grid item xs={12} sm={4} md={3}>
					<Button
						small={smallButtons}
						variant="no-border"
						iconAfter={AddCircleOutlineRoundedIcon}
					>
						Icon After
					</Button>
				</Grid>
				<Grid item xs={12} sm={4} md={3}>
					<Button small={smallButtons} variant="no-border" isLoading>
						Icon After
					</Button>
				</Grid>
				<Grid item xs={12} sm={4} md={3}>
					<Button small={smallButtons} variant="no-border" disabled>
						Disabled
					</Button>
				</Grid>
			</Grid>

			<Typography variant={"h4"} className={"mb-1"}>
				Tooltip
			</Typography>
			<Typography variant={"body1"} className={"mb-4"}>
				Hover the buttons
			</Typography>
			<Grid container spacing={3} className={"mb-10"}>
				<Grid item xs={12} sm={4} md={3}>
					<Tooltip title={"Tooltip content goes here"}>
						<span className={"inline-block"}>
							<Button variant={"primary"} small>
								Top
							</Button>
						</span>
					</Tooltip>
				</Grid>
				<Grid item xs={12} sm={4} md={3}>
					<Tooltip
						placement={"right"}
						title={"Tooltip content goes here"}
					>
						<span className={"inline-block"}>
							<Button variant={"primary"} small>
								Right
							</Button>
						</span>
					</Tooltip>
				</Grid>
				<Grid item xs={12} sm={4} md={3}>
					<Tooltip
						placement={"bottom"}
						title={"Tooltip content goes here"}
					>
						<span className={"inline-block"}>
							<Button variant={"primary"} small>
								Bottom
							</Button>
						</span>
					</Tooltip>
				</Grid>
				<Grid item xs={12} sm={4} md={3}>
					<Tooltip
						placement={"left"}
						title={"Tooltip content goes here"}
					>
						<span className={"inline-block"}>
							<Button variant={"primary"} small>
								Left
							</Button>
						</span>
					</Tooltip>
				</Grid>
			</Grid>

			<Typography variant={"h4"} className={"mb-4"}>
				Dialog
			</Typography>
			<Button
				onClick={openDialog}
				small
				variant="primary"
				className={"mb-10"}
			>
				Open Dialog
			</Button>

			<Typography variant={"h4"} className={"mb-4"}>
				Snackbar
			</Typography>
			<Button
				onClick={openSnackbar}
				small
				variant="primary"
				className={"mb-10"}
			>
				Open Snackbar
			</Button>

			<Typography variant={"h4"} className={"mb-4"}>
				Switch
			</Typography>
			<div className={"mb-10"}>
				<Switch
					checked={switchState}
					onChange={() => setSwitchState(prev => !prev)}
					//className={"mb-10"}
				></Switch>
			</div>

			<Typography variant={"h4"} className={"mb-4"}>
				Chips
			</Typography>
			<div className={"mb-10"}>
				<Chip isSelected={true} className={"mr-2 mb-2"}>
					Selected
				</Chip>
				<Chip
					isSelected={true}
					className={"mr-2 mb-2"}
					onDelete={() => {}}
				>
					Delete
				</Chip>
				<Chip className={"mr-2 mb-2"}>Non Selected</Chip>
				<Chip className={"mr-2 mb-2"} onDelete={() => {}}>
					Non Selected Delete
				</Chip>
			</div>

			<Typography variant={"h4"} className={"mb-4"}>
				Tabs
			</Typography>
			<Tabs
				className={"mb-10"}
				value={tab}
				onChange={(_, value) => setTab(value)}
			>
				<Tab label={"Label"} value={"1"} />
				<Tab label={"Label 2"} value={"2"} />
				<Tab label={"Label 3"} value={"3"} />
			</Tabs>

			<Typography variant={"h4"} className={"mb-4"}>
				Radio
			</Typography>
			<FormControl className={"mb-10"}>
				<FormLabel id="demo-radio-buttons-group-label">
					Gender
				</FormLabel>
				<RadioGroup
					aria-labelledby="demo-radio-buttons-group-label"
					defaultValue="female"
					name="radio-buttons-group"
				>
					<FormControlLabel
						value="female"
						control={<Radio />}
						label="Female"
					/>
					<FormControlLabel
						value="male"
						control={<Radio />}
						label="Male"
					/>
					<FormControlLabel
						value="other"
						control={<Radio />}
						label="Attack Helicopter"
					/>
				</RadioGroup>
			</FormControl>

			<Typography variant={"h4"} className={"mb-4"}>
				TextField
			</Typography>
			<Grid container spacing={3} className={"mb-10"}>
				<Grid item xs={12} sm={4} md={3}>
					<TextField placeholder={"Placeholder"} label={"Simple"} />
				</Grid>
				<Grid item xs={12} sm={4} md={3}>
					<TextField
						placeholder={"Placeholder"}
						helperText={"Helper text"}
						label={"Label"}
					/>
				</Grid>
				<Grid item xs={12} sm={4} md={3}>
					<TextField
						placeholder={"Placeholder"}
						label={"With icon"}
						icon={FiSearch}
					/>
				</Grid>
				<Grid item xs={12} sm={4} md={3}>
					<TextField
						placeholder={"Placeholder"}
						helperText={"Error text"}
						label={"Label"}
						error
					/>
				</Grid>
				<Grid item xs={12} sm={4} md={3}>
					<TextField
						placeholder={"Placeholder"}
						label={"Error without text"}
						error
					/>
				</Grid>
				<Grid item xs={12} sm={4} md={3}>
					<TextField
						placeholder={"Placeholder"}
						helperText={"Error text"}
						label={"Error with icon"}
						icon={HiOutlineMail}
						error
					/>
				</Grid>
			</Grid>

			<Typography variant={"h4"} className={"mb-4"}>
				Select
			</Typography>
			<Grid container spacing={3} className={"mb-10"}>
				<Grid item xs={12} sm={4} md={3}>
					<Select
						value={selectValue}
						label={"Simple Select"}
						onChange={e => setSelectValue(e.target.value)}
					>
						<MenuItem value={"1"}>Option 1</MenuItem>
						<MenuItem value={"2"}>Option 2</MenuItem>
						<MenuItem value={"3"}>Option 3</MenuItem>
					</Select>
				</Grid>
				<Grid item xs={12} sm={4} md={3}>
					<Select
						disabled
						value={selectValue}
						label={"Disabled"}
						onChange={e => setSelectValue(e.target.value)}
					>
						<MenuItem value={"1"}>Option 1</MenuItem>
						<MenuItem value={"2"}>Option 2</MenuItem>
						<MenuItem value={"3"}>Option 3</MenuItem>
					</Select>
				</Grid>
				<Grid item xs={12} sm={4} md={3}>
					<Select
						value={selectValue}
						label={"With helper text"}
						helperText={"Helper text"}
						onChange={e => setSelectValue(e.target.value)}
					>
						<MenuItem value={"1"}>Option 1</MenuItem>
						<MenuItem value={"2"}>Option 2</MenuItem>
						<MenuItem value={"3"}>Option 3</MenuItem>
					</Select>
				</Grid>
				<Grid item xs={12} sm={4} md={3}>
					<Select
						value={selectValue}
						label={"Error"}
						error
						onChange={e => setSelectValue(e.target.value)}
					>
						<MenuItem value={"1"}>Option 1</MenuItem>
						<MenuItem value={"2"}>Option 2</MenuItem>
						<MenuItem value={"3"}>Option 3</MenuItem>
					</Select>
				</Grid>
				<Grid item xs={12} sm={4} md={3}>
					<Select
						value={selectValue}
						label={"Error with helper"}
						error
						helperText={"Helper text"}
						onChange={e => setSelectValue(e.target.value)}
					>
						<MenuItem value={"1"}>Option 1</MenuItem>
						<MenuItem value={"2"}>Option 2</MenuItem>
						<MenuItem value={"3"}>Option 3</MenuItem>
					</Select>
				</Grid>
			</Grid>
		</>
	)
}
