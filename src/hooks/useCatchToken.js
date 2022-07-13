import { useState, useEffect } from 'react'

export default function useCatchToken(dataRef) {
	const [token, setToken] = useState(
		'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiOGQ3M2NlZWYwODQ4OTkzY2E1NmJkZTA3ODQyY2M1NjUwMTQwYzRmNmZlM2JhOGQ4YjI5Yjg0MDc1OTY3ZDdiYzhhNjc2YmM4MDU2ZTFkNzMiLCJpYXQiOjE2NTc2Nzk1NjYsIm5iZiI6MTY1NzY3OTU2NiwiZXhwIjoxNjg5MjE1NTY2LCJzdWIiOiIwNTAxOWI4Ny02MmI4LTQ5MTEtYjE0Ni03MzcxM2QyZmE2NzAiLCJzY29wZXMiOltdfQ.PJpPcI419PXIsVec-Po4eeazpzerUa2uoewR1w9Uk7QwydBK8bqYsxvX6zSkBWo50U3efohYLMX7O0215u6BMFFf3gdWUx20Oe2BIghBev8NRtgEkZ6Nr5esPiCZM4Ao51OGuUio_xOcCreLiyOQ5vNcCIFmzGmP_2bVMsxaRqynDoj8Ml7tcC9SPAff1bVyF43jUZ5tt22MuW4JW6mHMbErn4zEwV-tse5RFCP8JLZ9yqmWYFpfBsrOjO5YSB41a7ar6wsKqnH6zfa0CIEssTGzBisaMVeaA9GAQD7bfOQYeMY7rNIUu97KETf9OpfVSMK7pD7mzHWtz1vdBTYT_iZZzofCBR4z2DcYPd4vGMgc_n7V7h3sN8yZr7mxzVjphdkUUFX0YkiGYGkvTPcDqBYTqO6795UjZBZDKBKY6EjnWBUi5Qwb8oMrtbwO93qmCgXqYcxSCimdGZHgRGiI2uT8iQNjV3W_VHrRpMbSm2pk3HWFSTvqmX0G--NTr1jwTxmH_FPDJCasYHZT39uOuzrtRJP-cKHysSSznqLvGTsj2lLRbTuyC9dbz4N5A5ufpUpkLOlEJbE-ap6rQS-50YZ-nJaNlXdZffgFc37XD8Cs_QS8olk5kq2tgrdgnnb3cRGfQbfCuwWhJo7WcENEIgAVp3cfvuI-ZQej9TJtXgk'
	)
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
	}, [dataRef, refresh])

	useEffect(() => {
		const interval = setInterval(() => {
			setRefresh(refresh => !refresh)
		}, 200)

		setTimeout(() => {
			clearInterval(interval)
			dataRef.current.innerHTML = ''
		}, 2000)

		return () => clearInterval(interval)
	}, [])

	return [token]
}