import { useState, useEffect, useRef } from 'react'
import { StyleSheet, View, Text, TextInput, Image, ScrollView } from 'react-native-web'

import Header from '../components/Header'
import Carousel from '../components/Carousel'
import Category from '../components/Category'


const arr = []
let i = 0
// while (i++ < 100) arr.push(i)

console.log('v0.1.7')

function App() {
	const [token, setToken] = useState()
	const [debug, setDebug] = useState(true)
	const dataRef = useRef()

	useEffect(() => {
		if (!!token) return
		if (!dataRef?.current?.innerHTML) return
		let data;
		try {
			data = JSON.parse(dataRef.current.innerHTML)
		} catch (e) {
			console.log(e)
			return
		}
		if (!data.valid) return
		setToken(data.token)
	}, [dataRef, debug])

	useEffect(() => {
		const interval = setInterval(() => {
			setDebug(debug => !debug)
		}, 200)
		return () => clearInterval(interval)
	}, [])


	return (
		<View style={styles.container}> 
			<Header />
			<p ref={dataRef} id={'data'}></p>
			<p>token: {token}</p>
			<p>debug: {JSON.stringify(debug)}</p>
			<ScrollView>
				<Carousel style={styles.margin} />
				<Category style={styles.margin} />
				<Category style={styles.margin} />
				<Carousel style={styles.margin} />
				<Category style={styles.margin} />
			</ScrollView>
		</View>
	)
}

const HEADER_MARGIN = 30

const styles = StyleSheet.create({
	container: {
		height: '100vh',
		backgroundColor: '#ddd',
	},
	margin: {
		margin: 20,
	},
})

export default App;
