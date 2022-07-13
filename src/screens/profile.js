import React from 'react'
import { StyleSheet, View, Text } from 'react-native-web'

import constants from '../constants'

const { SCREEN_HEIGHT_NAVBAR, SCREEN_WIDTH } = constants

export default function ProfilePage() {
	return (
		<View style={styles.container}>
			<View style={styles.body}>
				<Text>Profile</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		height: SCREEN_HEIGHT_NAVBAR,
		width: SCREEN_WIDTH,
		backgroundColor: '#ddd',
	},
	body: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
})