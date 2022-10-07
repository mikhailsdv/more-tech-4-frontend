import React, {useCallback, useState} from "react"
import VisibilitySensor from "react-visibility-sensor"

const VisibilitySensor_ = props => {
	const {active: activeProp, once, ...rest} = props

	const [active, setActive] = useState(
		typeof activeProp === "boolean" ? activeProp : undefined
	)

	const onChange = useCallback(
		state => {
			if (once && state === true && active === undefined) {
				setActive(false)
			}
		},
		[once, active]
	)

	return <VisibilitySensor onChange={onChange} active={active} {...rest} />
}

export default VisibilitySensor_
