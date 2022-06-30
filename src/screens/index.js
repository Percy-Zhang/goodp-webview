import { StyleSheet, View, Text, TextInput, Image, ScrollView } from 'react-native-web'

import Header from '../components/Header'
import Carousel from '../components/Carousel'
import Category from '../components/Category'


const arr = []
let i = 0
while (i++ < 100) arr.push(i)

function App() {
	window.addEventListener("message", message => {
		alert(message.data) 
	})
	
	return (
		<View style={styles.container}> 
			<Header />
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
