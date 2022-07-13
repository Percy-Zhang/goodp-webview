import React, { useMemo, useContext } from 'react'
import { StyleSheet, Text, TouchableOpacity, Image } from 'react-native-web'
import { Link, useNavigate } from 'react-router-dom'

import MyContext from './MyContext'
import constants from '../constants'
import { formatPricing } from '../helpers'

const { PRIMARY, PATH } = constants
export default function ProductItem({ item, index }) {
	const { setSelect } = useContext(MyContext)
	const navigate = useNavigate()

	const link = `${PATH.PRODUCT}${item.id}`
	const name = item.item_name
	const beforePrice = `${formatPricing(item.item_price)} Ks`
	const afterPrice = `${formatPricing(item.item_price - item.discount_amount)} Ks`
	const source = { uri: item.attachments[0].image_url }
	const isDiscount = beforePrice != afterPrice

	const onPress = () => {
		setSelect(item)
		navigate(link)
	}

	const render = useMemo(() => (
		<TouchableOpacity style={styles.container} onPress={onPress}>
			<Image source={source} style={styles.image} resizeMode={'contain'} />
			<Text style={styles.name}>{name}</Text>
			{isDiscount && <Text style={styles.discount}>{beforePrice}</Text>}
			<Text style={styles.price}>{afterPrice}</Text>
		</TouchableOpacity>
	), [])

	return render
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		textAlign: 'center',
		marginBottom: 20,
		borderWidth: 1,
		borderRadius: 16,
		marginHorizontal: 5,
		paddingHorizontal: 5,
		backgroundColor: 'white',
	},
	image: {
		alignSelf: 'center',
		margin: 10,
		height: 100,
		width: '100%',
	},
	name: {
		flex: 1,
	},
	discount: {
		fontSize: 12,
		fontWeight: '600',
		textDecorationLine: 'line-through',
		paddingTop: 5,
	},
	price: {
		fontSize: 16,
		fontWeight: '600',
		color: PRIMARY,
		paddingBottom: 10,
	},
})