import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native-web'

import constants from '../constants'
import { formatPricing } from '../helpers'

const { PRIMARY } = constants
const f = formatPricing

export default function CartItem(qty, item, remove) {
	const name = item.item_name
	const price = (item.item_price - item.discount_amount) * qty
	const uri = {uri: item.attachments[0].image_url}

	const onDelete = () => remove(item.id)
	
	const render = (
		<View style={styles.cartItem} key={item.id}>
			<View style={styles.qty}>
				<Text>{`x${qty}`}</Text>
			</View>

			<Image style={styles.image} source={uri} resizeMode={'contain'} />

			<View style={styles.details}>
				<Text>{name}</Text>
				<Text style={styles.price}>{`${f(price)} Ks`}</Text>
			</View>

			<TouchableOpacity style={styles.delete} onPress={onDelete}>
				<Text>X</Text>
			</TouchableOpacity>
		</View>
	)

	return render
}

const styles = StyleSheet.create({
	cartItem: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'white',
		marginBottom: 10,
		paddingHorizontal: 20,
		borderRadius: 20,
	},
	image: {
		width: 90,
		height: 90,
		marginHorizontal: 3,
		marginVertical: 10,
	},
	details: {
		flex: 1,
		height: '70%',
		justifyContent: 'space-evenly',
		marginRight: 15,
	},
	price: {
		color: PRIMARY,
	},
	delete: {
		alignSelf: 'flex-start',
		marginTop: 10,
	},
})