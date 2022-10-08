import React from "react"
import classnames from "classnames"

import Autocomplete from "@mui/material/Autocomplete"
import TextField from "../TextField"

import styles from "./index.module.scss"

const _Autocomplete = props => {
	const {
		value,
		inputValue,
		options,
		getOptionLabel,
		onChange,
		onInputChange,
		renderOption,
		label,
		className,
		...rest
	} = props

	return (
		<Autocomplete
			getOptionLabel={getOptionLabel}
			filterOptions={x => x}
			options={options}
			autoComplete
			//includeInputInList
			//filterSelectedOptions
			value={value}
			inputValue={inputValue}
			onChange={(_, value) => onChange(value)}
			onInputChange={(_, value) => {
				onInputChange(value)
			}}
			renderInput={params => (
				<TextField {...params} label={label} fullWidth />
			)}
			renderOption={(props, option) => renderOption(option)}
			{...rest}
		/>
	)
}

export default _Autocomplete
