import { useState, useContext } from 'react'

import MyContext from '../components/MyContext'
import constants from '../constants'

const { MERCHANT_URL } = constants

export default () => {
	const [loading, setLoading] = useState(false)
	const [cityList, setCityList] = useState([])
	const myContext = useContext(MyContext)

	const getCityList = async () => {
		setLoading(true)

		const abortController = new AbortController()

		const timeout = setTimeout(() => {
			alert('Connection timeout, please try again!')
			abortController.abort()
			setLoading(false)

			return {status: false}
		}, 20000)

		try {
			const access_token = myContext.mToken
			const response = await fetch(`${MERCHANT_URL}/cities`, {
				signal: abortController.signal,
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${access_token}`,
					Accept: 'application/json',
				},
			})

			if (response.status >= 400 && response.status <= 500) {
				alert('Please contact Marathon for this problem.')
				clearTimeout(timeout)
				setLoading(false)

				return {status: false}
			}

			const responseData = await response.json()

			if (responseData.status == 3) {
				alert('Session expired (3)')
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
				clearTimeout(timeout)
				setLoading(false)

				setCityList(responseData.data)

				return {status: true, payload: responseData.data}
			}
		} catch (e) {
			setLoading(false)
			alert('Connection problem, please try again.')
			clearTimeout(timeout)
			console.log(e)

			return {status: false}
		}
	}

	return {
		loading,
		cityList,
		getCityList,
	}
}
