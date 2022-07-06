import React from 'react'
import { StyleSheet, View, Text } from 'react-native-web'

import constants from '../constants'

const { SCREEN_HEIGHT } = constants

export default function CartPage() {
	return (
		<View style={styles.container}>
			<Text>Cart</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		height: SCREEN_HEIGHT,
		backgroundColor: '#ddd',
		alignItems: 'center',
		justifyContent: 'center',
	},
})