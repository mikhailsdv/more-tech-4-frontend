import React from "react"
import {SnackbarProvider} from "notistack"
import SnackbarMessage from "../SnackbarMessage"
import Slide from "@mui/material/Slide"

//import "./index.scss"

const SnackbarProvider_ = props => {
	return (
		<SnackbarProvider
			anchorOrigin={{
				vertical: "bottom",
				horizontal: "right",
			}}
			autoHideDuration={5000}
			TransitionComponent={Slide}
			content={(key, message) => (
				<SnackbarMessage id={key} {...message} />
			)}
			{...props}
		/>
	)
}

export default SnackbarProvider_
