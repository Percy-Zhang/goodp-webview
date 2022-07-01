import { useRef } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native-web'

import Header from '../components/Header'
import Carousel from '../components/Carousel'
import Category from '../components/Category'
import useCatchToken from '../hooks/useCatchToken'

function App() {
	const dataRef = useRef()
	const [token] = useCatchToken(dataRef)

	return (
		<View style={styles.container}> 
			<p ref={dataRef} id={'data'} hidden></p>
			<p>{token}</p>
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
