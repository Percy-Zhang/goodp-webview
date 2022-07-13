import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native-web'

import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material'

import InputLoaction from '../components/InputLocation'
import Header from '../components/Header'
import MyContext from '../components/MyContext'
import constants from '../constants'
import { formatPricing } from '../helpers'

const { SCREEN_HEIGHT, SCREEN_WIDTH } = constants

export default function CheckoutPage() {
	const [city, setCity] = useState({})
	const [zone, setZone] = useState({})

	const InputLocationComponent = InputLoaction(city, setCity, zone, setZone)

	const { paymentOptions } = useContext(MyContext)


	const [methodIndex, setMethodIndex] = useState(0)
	const [option, setOption] = useState()

	const [methods, setMethods] = useState([])
	// [
	// 	{
	// 		"id": "221623af-8941-4ba0-92cf-d3bf12930753",
	// 		"option": "Cash",
	// 		"method": "Post-Paid",
	// 		"active": true,
	// 		"discount_percentage": null
	// 	},
	// 	{
	// 		"id": "68df81b6-7d69-483e-9a21-900255e1649b",
	// 		"option": "GoodBalance",
	// 		"method": "Pre-Paid",
	// 		"active": true,
	// 		"discount_percentage": 5
	// 	},
	// 	{
	// 		"id": "fa46e01c-3e63-4a80-a8a6-589fe480593e",
	// 		"option": "GoodBalance",
	// 		"method": "Post-Paid",
	// 		"active": true,
	// 		"discount_percentage": null
	// 	}
	// ]
	useEffect(() => {
		console.log('\n Start')
		let uniqueMethods = []
		for (let paymentOption of paymentOptions) {
			const uniqueMethod = paymentOption.method
			if (uniqueMethods.includes(uniqueMethod)) continue
			else uniqueMethods.push(uniqueMethod)
		}
		setMethods(uniqueMethods)
	}, [paymentOptions])
	
	return (
		<View style={styles.container}>
			<Header title={'Confirm Order'} />

			<View style={styles.body}>
				{InputLocationComponent}
				<Text>{option}</Text>

				<FormControl>
					<View style={{
						flexDirection: 'row',
						}}>
						{
							methods.map((method, index) => {
								return (
									<TouchableOpacity onPress={() => setMethodIndex(index)}
									style={{
										flex: 1, 
										padding: 10, 
										textAlign: 'center',
									}}>
										<FormLabel>{method}</FormLabel>
									</TouchableOpacity>
								)
						})
						}
					</View>
					<RadioGroup
						value={option}
						onChange={(e, value) => setOption(value)}
					>
						{paymentOptions.filter(option => option.method == methods[methodIndex]).map(option => {
							const value = option.option
							return <FormControlLabel value={value} control={<Radio />} label={value} />
						})}
					</RadioGroup>
				</FormControl>
			</View>



		</View>
	)
}


const styles = StyleSheet.create({
	container: {
		height: SCREEN_HEIGHT,
		width: SCREEN_WIDTH,
		backgroundColor: '#ddd',
	},
	body: {
		padding: 20,
	},
})