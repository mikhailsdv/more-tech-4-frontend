import React, {useCallback, useState} from "react"
import classnames from "classnames"
import {getFirstAndLastName} from "../../js/utils"

import Staff from "../Staff"
import Autocomplete from "../Autocomplete"
import useApi from "../../api/useApi"

const SearchUser = props => {
	const {onChange, by, label, className, ...rest} = props

	const {searchUser} = useApi()

	const [foundUser, setFoundUser] = useState(null)
	const [foundUsers, setFoundUsers] = useState([])

	const _onChange = useCallback(value => {
		setFoundUser(value)
		onChange(value)
	}, [])

	const onChangeUserName = useCallback(
		async value => {
			const {users} = await searchUser({[by]: value})
			if (users !== undefined) {
				setFoundUsers(users)
			}
		},
		[searchUser]
	)

	return (
		<Autocomplete
			options={foundUsers}
			getOptionLabel={option => getFirstAndLastName(option)}
			//open={foundUsers.length > 0}
			filterOptions={x => x}
			autoComplete
			label={label}
			//includeInputInList
			//filterSelectedOptions
			value={foundUser}
			onInputChange={onChangeUserName}
			isOptionEqualToValue={(option, value) => option.id === value.id}
			onChange={_onChange}
			renderOption={(props, option) => (
				<Staff
					key={option.id}
					{...option}
					card
					link={false}
					{...props}
				/>
			)}
		/>
	)
}

export default SearchUser
