import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native-web'
import { useNavigate, useParams } from 'react-router-dom'

import MyContext from '../components/MyContext'
import constants from '../constants'
import Header from '../components/Header'
import { formatPricing } from '../helpers'

import useFetchProductList from '../apis/useFetchProductList'

const { SCREEN_HEIGHT, PRIMARY } = constants
const f = formatPricing

export default function DetailsPage() {
	const { getProductById } = useFetchProductList()
	const { id } = useParams()
	const navigate = useNavigate()
	const { select: item, setSelect, cart } = useContext(MyContext)
	const [qty, setQty] = useState("1")

	useEffect(() => {
		(async () => {
			if (!!item) return
			const response = await getProductById(id)
			if (response.status) setSelect(response.payload)
		})()
	}, [])

	const changeQty = (newQty) => {
		if (parseInt(newQty) <= 0) return
		setQty(newQty)
	}

	const increment = () => changeQty(parseInt(qty) + 1)
	const decrement = () => changeQty(parseInt(qty) - 1)

	const handleBuy = () => {

	}

	const handleCart = async () => {
		cart.add(item.id, qty)
		cart.addInfo(item.id, item)
		navigate(-1)
	}

	if (!item) return <Text>error</Text>

	const source = { uri: item.attachments[0].image_url }
	const name = item.item_name
	const price = parseInt(item.item_price)
	const discount = parseInt(item.discount_amount)
	const discounted_price = discount ? price - discount : price
	return (
		<View style={styles.container}>
			<Header title={'Details'} showCart/>

			<View style={styles.imageWrapper}>
				<Image source={source} resizeMode={'contain'} style={styles.image}/>
				<Text style={styles.name}>{name}</Text>
				{discount 
					? <><Text style={styles.strikethrough}>{f(price)} Ks</Text>
						<Text style={styles.price}>{f(discounted_price)} Ks</Text></>
					: <Text style={styles.price}>{f(price)} Ks</Text>}
			</View>

			<View style={styles.flex} />

			<View style={styles.row}>
				<Text style={[styles.rowText, styles.rowName]}>{name}</Text>
				<Text style={styles.rowText}>x {f(qty)}</Text>
				<Text style={styles.rowText}> = </Text>
				<Text style={[styles.rowText, styles.rowPrice]}>{f(discounted_price * qty)} Ks</Text>
			</View>

			<View style={styles.footer}>
				<ButtonHoc label={'-'} style={styles.plusButton} color={'white'} onPress={decrement}/>
				<ButtonHoc label={` ${qty} `} style={styles.rowText} />
				<ButtonHoc label={'+'} style={styles.plusButton} color={'white'} onPress={increment} />
				<ButtonHoc label={'Buy'} style={styles.rectButton1} color={PRIMARY} onPress={handleBuy} />
				<ButtonHoc label={'Add to Cart'} style={styles.rectButton2} color={'white'} onPress={handleCart} />
			</View>
		</View>
	)
}

const ButtonHoc = ({ label, style, color, onPress }) => (
	<TouchableOpacity onPress={onPress} style={style}>
		<Text style={[styles.footerText, {color}]}>{label}</Text>
	</TouchableOpacity>
)

const styles = StyleSheet.create({
	container: {
		height: SCREEN_HEIGHT,
		backgroundColor: '#fff',
	},
	imageWrapper: {
		alignItems: 'center',
	},
	image: {
		width: '50%',
		height: 250,
	},
	name: {
		fontSize: 25,
		padding: 20,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	strikethrough: {
		textDecorationLine: 'line-through',
		fontSize: 20,
	},
	price: {
		color: PRIMARY,
		fontSize: 30,
		fontWeight: '600',
	},
	flex: {flex: 1},

	row: {
		flexDirection: 'row',
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderBottomWidth: 1,
	},
	rowText: {
		fontSize: 16,
		fontWeight: '600',
		paddingHorizontal: 5,
	},
	rowName: {
		flex: 1,
	},
	rowPrice: {
		minWidth: '23vw',
		textAlign: 'right'
	},

	footer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 10,
		paddingHorizontal: 20,
		marginVertical: 10,
	},
	plusButton: {
		backgroundColor: PRIMARY,
		height: 30,
		width: 30,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 30,
	},
	rectButton1: {
		flex: 1,
		paddingVertical: 5,
		marginLeft: 10,
		backgroundColor: 'white',
		borderWidth: 2,
		borderRadius: 5,
		borderColor: PRIMARY,
	},
	rectButton2: {
		flex: 1,
		paddingVertical: 5,
		marginLeft: 10,
		backgroundColor: PRIMARY,
		borderWidth: 2,
		borderRadius: 5,
		borderColor: PRIMARY,
	},
	footerText: {
		fontSize: '4vw',
		fontWeight: '600',
		textAlign: 'center',
	},
})