import { useState, useContext } from 'react'

import MyContext from '../components/MyContext'
import constants from '../constants'

const { MERCHANT_URL } = constants

export default () => {
	const [nextLink, setNextLink] = useState(`${MERCHANT_URL}/products?page=1`)
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(false)
	const myContext = useContext(MyContext)
	const paginate = 10

	const getProductList = async (reset) => {
		if (nextLink == null && !reset) return
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
			const link = reset
				? `${MERCHANT_URL}/products?paginate=${paginate}&page=1`
				: `${nextLink}&paginate=${paginate}`
			const response = await fetch(`${link}`, {
				signal: abortController.signal,
				method: 'GET',
				headers: {
					Authorization: `Bearer ${access_token}`,
				},
			})

			if (response.status >= 400 && response.status <= 500) {
				alert('Please contact Marathon for this problem.')
				clearTimeout(timeout)
				setLoading(false)

				return {status: false}
			}

			const responseData = await response.json()
			// console.log("FetchProductList:", responseData)  //debug

			if (responseData.status == 3) {
				alert('Session expired (2)')
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

				if (reset) {
					setData(responseData.data)
				} else {
					setData(data.concat(responseData.data))
				}
				setNextLink(responseData.links.next)

				return {status: true}
			}
		} catch (e) {
			setLoading(false)
			alert('Connection problem, please try again.')
			clearTimeout(timeout)
			console.log(e)

			return {status: false}
		}
	}

	const getProductById = async (id) => {
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
			const response = await fetch(`${MERCHANT_URL}/products/${id}`, {
				signal: abortController.signal,
				method: 'GET',
				headers: {
					Authorization: `Bearer ${access_token}`,
				},
			})

			if (response.status >= 400 && response.status <= 500) {
				alert('Please contact Marathon for this problem.')
				clearTimeout(timeout)
				setLoading(false)

				return {status: false}
			}

			const responseData = await response.json()
			// console.log("getProductById: getProductByIdAsync", responseData)  //debug

			if (responseData.status == 3) {
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

				return {status: true, payload: responseData.data}
			}
		} catch (e) {
			setLoading(false)
			clearTimeout(timeout)
			console.log(e)

			return {status: false}
		}
	}

	return {
		loading,
		data,
		getProductList,
		getProductById,
	}
}
