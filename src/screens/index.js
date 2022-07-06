import { useEffect, useRef, useState } from 'react'

import Router from './router'
import MyContext from '../components/MyContext'
import useCatchToken from '../hooks/useCatchToken'
import useRequestLogin from '../apis/useRequestLogin'

export default function App() {
	const dataRef = useRef()
	const [token] = useCatchToken(dataRef)
	const { mToken, login, loading } = useRequestLogin()

	const [cart, setCart] = useState({})
	const initialValue = {mToken, cart, setCart}

	useEffect(() => {login()}, [])

	return (
		<MyContext.Provider value={initialValue}>
			<p ref={dataRef} id={'data'} hidden />
			{mToken && <Router />}
		</MyContext.Provider>
	)
}