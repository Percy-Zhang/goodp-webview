import React, { useMemo } from 'react'
import { StyleSheet, Text, TouchableOpacity, Image } from 'react-native-web'

import constants from '../constants'
import { formatPricing } from '../helpers'

const { PRIMARY } = constants
export default function ProductItem({ item, index }) {

	const name = item.item_name
	const price = `${formatPricing(item.item_price)} Ks`
	const source = { uri: item.attachments[0].image_url }

	const render = useMemo(() => (
		<TouchableOpacity style={styles.container}>
			<Image source={source} style={styles.image} resizeMode={'cover'} />
			<Text style={styles.name}>{name}</Text>
			<Text style={styles.price}>{price}</Text>
		</TouchableOpacity>
	), [])

	return render
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		borderWidth: 1,
		borderRadius: 6,
		marginHorizontal: 5,
		marginBottom: 20,
		paddingHorizontal: 5,
		textAlign: 'center',
		backgroundColor: 'white'
	},
	image: {
		alignSelf: 'center',
		margin: 10,
		height: 100,
		width: '50%',
	},
	name: {
		flex: 1,
	},
	price: {
		fontSize: 16,
		fontWeight: '600',
		color: PRIMARY,
		paddingVertical: 10,
	},
})