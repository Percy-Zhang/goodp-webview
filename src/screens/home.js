import React, { useEffect, useMemo } from 'react'
import { StyleSheet, View, Text, ScrollView, FlatList } from 'react-native-web'

import MainHeader from '../components/MainHeader'
import Carousel from '../components/Carousel'
import Category from '../components/Category'
import ProductItem from '../components/ProductItem'
import useFetchProductList from '../apis/useFetchProductList'

import constants from '../constants'

const { SCREEN_HEIGHT_NAVBAR } = constants

export default function HomePage() {
	const { loading, data, getProductList } = useFetchProductList()

	useEffect(() => {
		getProductList()
	}, [])

	const refreshPage = async () => {
		await getProductList(true)
	}

	const loadMore = async () => {
		await getProductList()
	}


	const renderItem = useMemo(() => ({item, index}) => (
		<ProductItem key={item.id} item={item} index={index} /> 
	), [])


	return (
		<View style={styles.container}> 
			<MainHeader />
			<ScrollView>
				<Carousel style={styles.margin} />
				<Category style={styles.margin} />
				<Category style={styles.margin} />
				<FlatList
					style={styles.flatList}
					data={data}
					renderItem={renderItem}
					onEndReached={loadMore}
					numColumns={2}
					initialNumToRender={4}
				/>
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		height: SCREEN_HEIGHT_NAVBAR,
		backgroundColor: '#ddd',
	},
	margin: {
		margin: 20,
	},
	flatList: {
		marginHorizontal: '8%',
	},
})