import { useEffect, useRef, useState } from 'react'

import Router from './router'
import MyContext from '../components/MyContext'
import useCatchToken from '../hooks/useCatchToken'
import useCart from '../hooks/useCart'
import useRequestLogin from '../apis/useRequestLogin'
import useFetchMasterRecord from '../apis/useFetchMasterRecord'
import { TextInput } from 'react-native-web'

export default function App() {
	const dataRef = useRef()
	const [token] = useCatchToken(dataRef)
	const cart = useCart({})
	const { mToken, login } = useRequestLogin()
	const { getMasterRecord, paymentOptions } = useFetchMasterRecord()

	const [select, setSelect] = useState()
	const initialValue = {
		token, 
		mToken, 
		paymentOptions,
		cart, 
		select, 
		setSelect,
	}

	useEffect(() => {
		!mToken && login()
	}, [])

	useEffect(() => {
		!!token && getMasterRecord(token)
	}, [token])

	return (
		<MyContext.Provider value={initialValue}>
			<p ref={dataRef} id={'data'} hidden />
			{/* <TextInput value={token} /> */}
			{mToken && <Router />}
		</MyContext.Provider>
	)
}