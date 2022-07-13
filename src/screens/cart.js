import React, { useContext, useState } from 'react'
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native-web'

import Header from '../components/Header'
import CartItem from '../components/CartItem'
import MyContext from '../components/MyContext'
import constants from '../constants'
import { formatPricing } from '../helpers'
import { useNavigate } from 'react-router-dom'

const { SCREEN_HEIGHT, SCREEN_WIDTH, PRIMARY, IMAGE, PATH } = constants
const f = formatPricing

// IMPORTANT
// must update state here when cart updates
export default function CartPage() {
	const { cart } = useContext(MyContext)
	const navigate = useNavigate()
	const [_, refresh] = useState(true)

	const isEmpty = cart.getTotalQty() == 0

	const totalPrice = cart.getTotalPrice()
	const goBack = () => navigate(-1)
	const onCheckout = () => navigate(PATH.CHECKOUT)
	const onDelete = (id) => {
		cart.remove(id)
		refresh(r => !r)
	}
	const renderItem = (id) => CartItem(cart.data[id], cart.info[id], onDelete)

	return (
		<View style={styles.container}>
			<Header title={'Cart'} />
			<Text>{JSON.stringify(cart.data.length)}</Text>

			{!isEmpty ? <>
				<ScrollView style={styles.scrollview}>
					<Text style={styles.qty}>{`Total quantity: ${cart.getTotalQty()}`}</Text>
					{Object.keys(cart.data).map(renderItem)}
				</ScrollView>

				<View style={styles.footer}>
					<FooterRow>
						<Text style={[styles.botTxt]}>Item Price</Text>
						<Text style={[styles.botTxt, styles.primary]}>{`${f(totalPrice)} Ks`}</Text>
					</FooterRow>

					<TouchableOpacity style={styles.botButton} onPress={onCheckout}>
						<Text style={styles.white}>{`Payment method and Address`}</Text>
					</TouchableOpacity>
				</View>
			</> : 
			<View style={styles.empty}>
				<Image source={IMAGE.EMPTY_CART} style={styles.image} resizeMode={'contain'} />
				<Text>{`${'Your cart is empty'}`}</Text>
				<TouchableOpacity style={styles.botButton} onPress={goBack}>
					<Text style={styles.white}>{`Buy`}</Text>
				</TouchableOpacity>
			</View>
			}
		</View>
	)
}

const FooterRow = ({ children }) => {
	return (
		<View style={styles.row}>
			{children[0]}
			{<View style={styles.flex} />}
			{children[1]}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		height: SCREEN_HEIGHT,
		width: SCREEN_WIDTH,
		backgroundColor: '#ddd',
	},
	qty: {
		marginBottom: 5,
		color:'#777',
	},
	scrollview: {
		marginTop: 20,
		marginHorizontal: 20,
	},
	footer: {
		backgroundColor: 'white',
		paddingVertical: 15,
		marginTop: 2,
	},
	line: {
		borderBottomWidth: 1,
		marginHorizontal: 10,
		marginVertical: 5,
	},
	botTxt: {
		fontSize: 16,
		fontWeight: '600',
	},
	botButton: {
		backgroundColor: PRIMARY,
		borderRadius: 10,
		marginTop: 10,
		marginHorizontal: 20,
		paddingVertical: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},
	white: {
		color: 'white',
	},
	primary: {
		color: PRIMARY,
	},
	row: {
		flexDirection: 'row',
		paddingHorizontal: 20,
		paddingVertical: 2,
	},
	flex: {
		flex: 1,
	},

	empty: {
		alignItems: 'stretch',
		marginTop: '10vh',
		textAlign: 'center',
	},
	image: {
		alignSelf: 'center',
		width: '80vw',
		height: '30vh',
	}

})