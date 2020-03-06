import React, {useEffect, useRef} from 'react';

import { MdWarning, MdError, MdInfo } from "react-icons/md"

const Alert = (props) => {
	const alert = useRef()

	const deleteAlertAfterAnimationComplete = () => {
		setTimeout(() => alert.current.remove(), 2500)
	}

	const getIconByType = (type) => {
		if (type === 'warning') {
			return <MdWarning />
		} else if (type === 'error') {
			return <MdError />
		} else {
			return <MdInfo />
		}
	}

	const className = 'alert-' + props.type
					+ ' '
					+ ((props.className) ? props.className : '')

	useEffect(() => {
		deleteAlertAfterAnimationComplete()
	}, [])

	return (
		<div className={className} ref={alert}>
			<i className="flex mr-m">{getIconByType(props.type)}</i>
			<p>{props.message}</p>
		</div>
	)
}

export default Alert