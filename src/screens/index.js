import { useState, useEffect, useRef } from 'react'
import { StyleSheet, View, Text, TextInput, Image, ScrollView } from 'react-native-web'

import Header from '../components/Header'
import Carousel from '../components/Carousel'
import Category from '../components/Category'


const arr = []
let i = 0
// while (i++ < 100) arr.push(i)

console.log('v 0.1.5')

function App() {
	const [token, setToken] = useState()
	const dataRef = useRef()

	useEffect(() => {
		if (!dataRef?.current?.innerHTML) return
		const data = JSON.parse(dataRef.current.innerHTML)
		if (!data.valid) return

		setToken(data.token)
	}, [dataRef?.current?.innerHTML])

	return (
		<View style={styles.container}> 
			<Header />
			<p ref={dataRef} id={'data'} hidden></p>
			<p>token: {token}</p>
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
