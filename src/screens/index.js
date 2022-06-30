import { useState, useEffect } from 'react'
import { StyleSheet, View, Text, TextInput, Image, ScrollView } from 'react-native-web'

import Header from '../components/Header'
import Carousel from '../components/Carousel'
import Category from '../components/Category'


const arr = []
let i = 0
while (i++ < 100) arr.push(i)

console.log('v 0.1.2')

function App() {
	const [count, setCount] = useState(0)
	const [test, setTest] = useState()
	useEffect(() => {
		const onMessage = message => {
			console.log('\n\nSTART')
			// alert(message.data)
			try {
				const m = JSON.parse(message.data)
				if (m.type != "debug") {
					return
				}
			} catch (e){
				return
			}
			// console.log('T2', message)
			console.log('T3', message.data)
			console.log('T4', window)
			setTest(JSON.stringify(message.origin))
			setCount(c => c + 1)
		}

		window.addEventListener("message", onMessage)
		return () => window.removeEventListener("message", onMessage)
	}, [])
	

	return (
		<View style={styles.container}> 
			<Header />
			<p>count: {count}</p>
			<p>origin: {test}</p>
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
