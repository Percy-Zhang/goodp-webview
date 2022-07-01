import { useState } from 'react'
import constants from '../constants'

export default function useRequestLogin() {
	const { MERCHANT_URL } = constants
	const [loading, setLoading] = useState()
	const [mToken, setMToken] = useState()

	const login = async () => {
		setLoading(true)

		const abortController = new AbortController()

		const timeout = setTimeout(() => {
			alert('Connection timeout, please try again!')
			abortController.abort()
			setLoading(false)

			return {status: false}
		}, 20000)

		try {
			const response = await fetch(`${MERCHANT_URL}/auth/login`, {
				signal: abortController.signal,
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: JSON.stringify({
					username: 'mkitchen',
					password: 'secret',
				}),
			})

			if (response.status >= 400 && response.status <= 500) {
				alert('Please contact Marathon for this problem.')
				clearTimeout(timeout)
				setLoading(false)

				return {status: false}
			}

			const responseData = await response.json()
			// console.log("useLogin:", responseData)  //debug

			if (responseData.status == 2) {
				alert('Login error')
				clearTimeout(timeout)
				setLoading(false)

				return {status: false}
			}

			if (responseData.status == 1) {
				setMToken(responseData.data.access_token)
				clearTimeout(timeout)
				setLoading(false)

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
		login,
		loading,
		mToken,
	}
}
