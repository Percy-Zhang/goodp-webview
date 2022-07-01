import { useState, useContext } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { showMessage } from 'react-native-flash-message'

import AppContext from '../components/AppContext'
import { MERCHANT_URL } from '../config.json'

export default () => {
	const [nextLink, setNextLink] = useState(`${MERCHANT_URL}/products?page=1`)
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(false)
	const myContext = useContext(AppContext)
	const paginate = 10

	const getProductList = async (reset) => {
		if (nextLink == null && !reset) return
		setLoading(true)

		const abortController = new AbortController()

		const timeout = setTimeout(() => {
			showMessage({
				message: 'Error',
				description: 'Connection timeout, please try again!',
				type: 'warning',
			})

			abortController.abort()
			setLoading(false)
			return
		}, 20000)

		try {
			const access_token = await AsyncStorage.getItem('merchant_token')
			const link = reset
				? `${MERCHANT_URL}/products?paginate=${paginate}&page=1`
				: `${nextLink}&paginate=${paginate}`
			const response = await fetch(`${link}`, {
				signal: abortController.signal,
				method: 'GET',
				headers: {
					//   'Content-Type': 'application/json',
					Authorization: `Bearer ${access_token}`,
				},
			})

			if (response.status >= 400 && response.status <= 500) {
				showMessage({
					message: 'Error',
					description: 'Please contact Marathon for this problem.',
					type: 'danger',
				})

				clearTimeout(timeout)
				setLoading(false)

				return false
			}

			const responseData = await response.json()
			// console.log("MerchantProductHook:", responseData)  //debug

			if (responseData.status == 3) {
				clearTimeout(timeout)
				setLoading(false)
			}

			if (responseData.status == 2) {
				showMessage({
					message: 'Error',
					description: 'Something went wrong.',
					type: 'warning',
				})

				clearTimeout(timeout)
				setLoading(false)
			}

			if (responseData.status == 1) {
				clearTimeout(timeout)
				setLoading(false)

				if (reset) {
					setData(responseData.data)
				} else {
					setData(data.concat(responseData.data))
				}
				setNextLink(responseData.links.next)

				return true
			}
		} catch (e) {
			setLoading(false)

			showMessage({
				message: 'Error',
				description: 'Connection problem, please try again.',
				type: 'warning',
			})

			console.log(e)

			clearTimeout(timeout)
			return false
		}
	}

	const getProductByIdAsync = async (id) => {
		setLoading(true)

		const abortController = new AbortController()

		const timeout = setTimeout(() => {
			showMessage({
				message: 'Error',
				description: 'Connection timeout, please try again!',
				type: 'warning',
			})

			abortController.abort()
			setLoading(false)
			return
		}, 20000)

		try {
			const access_token = await AsyncStorage.getItem('merchant_token')

			const response = await fetch(`${MERCHANT_URL}/products/${id}`, {
				signal: abortController.signal,
				method: 'GET',
				headers: {
					//   'Content-Type': 'application/json',
					Authorization: `Bearer ${access_token}`,
				},
			})

			if (response.status >= 400 && response.status <= 500) {
				showMessage({
					message: 'Error',
					description: 'Please contact Marathon for this problem.',
					type: 'danger',
				})

				clearTimeout(timeout)
				setLoading(false)

				return false
			}

			const responseData = await response.json()
			// console.log("MerchantProductHook: getProductByIdAsync", responseData)  //debug

			if (responseData.status == 3) {
				clearTimeout(timeout)
				setLoading(false)
			}

			if (responseData.status == 2) {
				showMessage({
					message: 'Error',
					description: 'Something went wrong.',
					type: 'warning',
				})

				clearTimeout(timeout)
				setLoading(false)
			}

			if (responseData.status == 1) {
				clearTimeout(timeout)
				setLoading(false)
				return responseData.data
			}
		} catch (e) {
			setLoading(false)

			showMessage({
				message: 'Error',
				description: 'Connection problem, please try again.',
				type: 'warning',
			})

			console.log(e)

			clearTimeout(timeout)
			return false
		}
	}

	return {
		loading,
		data,
		getProductList,
		getProductByIdAsync,
	}
}
