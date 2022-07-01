import { useEffect, useRef, useState } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native-web'

// import { BottomNavigation, BottomNavigationAction } from '@mui/material'

import Header from '../components/Header'
import Carousel from '../components/Carousel'
import Category from '../components/Category'
import useCatchToken from '../hooks/useCatchToken'
import useRequestLogin from '../apis/useRequestLogin'
import constants from '../constants'

const { PRIMARY } = constants

function App() {
	const [route, setRoute] = useState(0)
	const dataRef = useRef()
	const [token] = useCatchToken(dataRef)
	const { mToken, login, loading } = useRequestLogin()

	useEffect(() => {
		login()
	}, [])

	return (
		<View style={styles.container}> 
			<p ref={dataRef} id={'data'} hidden></p>
			<Header />
			<ScrollView>
				<Carousel style={styles.margin} />
				<Category style={styles.margin} />
				<Category style={styles.margin} />
				<Carousel style={styles.margin} />
				<Category style={styles.margin} />
			</ScrollView>
			{/* <BottomNavigation
				showLabels
				value={route}
				style={styles.bottomNav}
				onChange={(event, newValue) => {
					setRoute(newValue);
				}}
			>
				<BottomNavigationAction label='Home' />
				<BottomNavigationAction label='Store' />
				<BottomNavigationAction label='Cart' />
				<BottomNavigationAction label='Profile' />
			</BottomNavigation> */}
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

	bottomNav: {
		backgroundColor: PRIMARY
	},
})

export default App;
