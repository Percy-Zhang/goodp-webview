import { useState, useEffect } from 'react'

export default function useCatchToken(dataRef) {
	const [token, setToken] = useState()
	const [refresh, setRefresh] = useState(true)

	useEffect(() => {
		if (!!token) return
		if (!dataRef?.current?.innerHTML) return
		let data
		try {
			data = JSON.parse(dataRef.current.innerHTML)
		} catch (e) {
			console.log(e)
			return
		}
		if (data.valid !== true) return

		setToken(data.token)
		dataRef.current.innerHTML = ''
	}, [dataRef, refresh])

	useEffect(() => {
		const interval = setInterval(() => {
			setRefresh(refresh => !refresh)
		}, 200)
		return () => clearInterval(interval)
	}, [])

	return [token]
}