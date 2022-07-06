import React from 'react'
import { StyleSheet, View, Text } from 'react-native-web'

import constants from '../constants'

const { SCREEN_HEIGHT } = constants

export default function ProfilePage() {
	return (
		<View style={styles.container}>
			<Text>Profile</Text>
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