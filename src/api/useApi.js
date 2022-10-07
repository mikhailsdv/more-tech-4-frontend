import {useRef, useCallback, useEffect} from "react"
import request from "./request"
import endpointsJSON from "./endpoints.json"

export default function useApi() {
	const token = useRef(
		window.localStorage.getItem("token") ||
			window.sessionStorage.getItem("token")
	)

	useEffect(() => {
		token.current &&
			request.interceptors.request.use(config => {
				config.headers.Authorization = `Token ${token.current}`
				return config
			})
	}, [])

	const endpoints = useRef(
		//проверка на совпадения урлов, параметров, отсутствия слешей и т.д.
		endpointsJSON.reduce((acc, endpoint) => {
			const {name, params, method, url, headers} = endpoint
			acc[name] = async (args = {}) => {
				const {data} = await request({
					url,
					method,
					[method === "get" ? "params" : "data"]:
						params &&
						params.reduce((acc, param) => {
							acc[param] = args[param]
							return acc
						}, {}),
					headers,
				})

				return data
			}
			return acc
		}, {})
	)

	const resetToken = useCallback(() => {
		window.localStorage.removeItem("token")
		window.sessionStorage.removeItem("token")
		token.current = null
		//request.defaults.headers.common.Authorization = undefined
		request.interceptors.request.use(config => {
			config.headers.Authorization = undefined
			return config
		})
	}, [])

	const setToken = useCallback(({token: tokenArg, isSession}) => {
		window[isSession ? "sessionStorage" : "localStorage"].setItem(
			"token",
			tokenArg
		)
		window[isSession ? "localStorage" : "sessionStorage"].removeItem(
			"token"
		)
		token.current = tokenArg
		request.interceptors.request.use(config => {
			config.headers.Authorization = `Token ${token.current}`
			return config
		})
	}, [])

	return {
		...endpoints.current,
		token: token.current,
		resetToken,
		setToken,
	}
}
