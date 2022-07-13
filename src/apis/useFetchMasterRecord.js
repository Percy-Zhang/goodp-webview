import { useState, useContext } from 'react'

import constants from '../constants'

const { GOODP_URL } = constants

export default () => {
	const [paymentOptions, setPaymentOptions] = useState()
	const [nrcs, setNrcs] = useState()
	const [loading, setLoading] = useState(false)

	const getMasterRecord = async (token) => {
		setLoading(true)

		const abortController = new AbortController()

		const timeout = setTimeout(() => {
			alert('Connection timeout, please try again!')
			abortController.abort()
			setLoading(false)

			return {status: false}
		}, 20000)

		try {
			const response = await fetch(`${GOODP_URL}/get_master_records`, {
				signal: abortController.signal,
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})

			if (response.status >= 400 && response.status <= 500) {
				alert('Please contact Marathon for this problem.')
				clearTimeout(timeout)
				setLoading(false)

				return {status: false}
			}

			const responseData = await response.json()
			//   console.log("useMasterRecord:", responseData)  //debug

			if (responseData.status == 3) {
				alert('Session expired (1)')
				clearTimeout(timeout)
				setLoading(false)

				return {status: false}
			}

			if (responseData.status == 2) {
				alert('Something went wrong.')
				clearTimeout(timeout)
				setLoading(false)

				return {status: false}
			}

			if (responseData.status == 1) {
				setPaymentOptions(responseData.data.payment_options)
				setNrcs(responseData.data.nrc)

				clearTimeout(timeout)
				setLoading(false)
				return {status: true, payload: responseData.data}
			}
		} catch (e) {
			setLoading(false)
			alert('Connection problem, please try again.')
			alert(e)
			clearTimeout(timeout)
			console.log(e)

			return {status: false}
		}
	}

	return {
		loading,
		getMasterRecord,
		paymentOptions,
		nrcs,
	}
}
