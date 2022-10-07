import React from "react"
import ReactDOM from "react-dom/client"
import "core-js/actual"
import {BrowserRouter} from "react-router-dom"
import reportWebVitals from "./reportWebVitals"
import {ScrollToTop} from "react-router-scroll-to-top"
import CssBaseline from "@mui/material/CssBaseline"
import {ThemeProvider} from "@mui/material/styles"
import {createTheme, StyledEngineProvider} from "@mui/material/styles"
import SnackbarProvider from "./components/SnackbarProvider"
import App from "./App"
import "./styles/globals.scss"

const theme = createTheme({
	palette: {
		primary: {
			main: "#0A2896",
		},
		background: {
			default: "#F3F7FA",
		},
	},
	shape: {
		borderRadius: 8,
	},
	typography: {
		fontSize: 14,
		fontFamily: `"Manrope", "Roboto", "Helvetica", "Arial", sans-serif`,
		h1: {
			fontSize: "96px",
			fontWeight: 300,
			lineHeight: "112px",
		},
		h2: {
			fontSize: "60px",
			fontWeight: 400,
			lineHeight: "72px",
		},
		h3: {
			fontSize: "50px",
			fontWeight: 600,
			lineHeight: "58px",
		},
		h4: {
			fontSize: "34px",
			fontWeight: 700,
			lineHeight: "36px",
		},
		h5: {
			fontSize: "24px",
			fontWeight: 700,
			lineHeight: "24px",
		},
		h6: {
			fontSize: "20px",
			fontWeight: 700,
			lineHeight: "24px",
		},
		subtitle1: {
			fontSize: "16px",
			fontWeight: 400,
			lineHeight: "24px",
		},
		subtitle1bold: {
			fontSize: "16px",
			fontWeight: 600,
			lineHeight: "24px",
		},
		subtitle2: {
			fontSize: "14px",
			fontWeight: 500,
			lineHeight: "24px",
		},
		subtitle2bold: {
			fontSize: "14px",
			fontWeight: 700,
			lineHeight: "24px",
		},
		body1: {
			fontSize: "16px",
			fontWeight: "400",
			lineHeight: "24px",
		},
		body2: {
			fontSize: "14px",
			fontWeight: "400",
			lineHeight: "20px",
		},
		button: {
			fontSize: "18px",
			fontWeight: "500",
			lineHeight: "20px",
			textTransform: "none",
		},
		caption: {
			fontSize: "12px",
			fontWeight: "400",
			lineHeight: "16px",
		},
		overline: {
			fontSize: "10px",
			fontWeight: "500",
			lineHeight: "16px",
		},
	},
	shadows: [...Array(25)].map(
		(item, index) =>
			`0 ${Math.round((index / 25) * 20)}px ${Math.round(
				2 + (index / 25) * 30
			)}px ${Math.round(((index + 1) / 25) * 2)}px rgba(0, 0, 0, 0.12)`
	),
})

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<BrowserRouter basename={process.env.REACT_APP_ROUTER_BASE_PATH}>
				<ScrollToTop>
					<StyledEngineProvider injectFirst>
						<SnackbarProvider>
							<CssBaseline />
							<App />
						</SnackbarProvider>
					</StyledEngineProvider>
				</ScrollToTop>
			</BrowserRouter>
		</ThemeProvider>
	</React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals()
