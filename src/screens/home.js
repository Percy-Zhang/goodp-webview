import React, { useEffect, useMemo } from 'react'
import { StyleSheet, View, Text, ScrollView, FlatList } from 'react-native-web'

import Header from '../components/Header'
import Carousel from '../components/Carousel'
import Category from '../components/Category'
import ProductItem from '../components/ProductItem'
import useFetchProductList from '../apis/useFetchProductList'

import constants from '../constants'

const { SCREEN_HEIGHT } = constants

export default function HomePage() {
	const { loading, data, getProductList } = useFetchProductList()

	useEffect(() => {
		getProductList()
	}, [])

	const refreshPage = async () => {
		await getProductList(true)
	}

	const loadMore = async () => {
		console.log('loadMore')
		await getProductList()
	}

	const extractKey = (item) => item.id

	const renderItem = useMemo(() => ({item, index}) => (
		<ProductItem item={item} index={index} /> 
	), [])


	return (
		<View style={styles.container}> 
			<Header />
			<ScrollView>
				<Carousel style={styles.margin} />
				<Category style={styles.margin} />
				<Category style={styles.margin} />
				<FlatList
					data={data}
					renderItem={renderItem}
					style={styles.flatList}
					// refreshControl={<RefreshControl onRefresh={refreshPage} refreshing={loading} />}
					// ListFooterComponent={<FooterComponent loading={loading} />}
					// ListEmptyComponent={<EmptyComponent loading={loading} />}
					keyExtractor={extractKey}
					onEndReached={loadMore}
					numColumns={2}
					initialNumToRender={10}
				/>
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		height: SCREEN_HEIGHT,
		backgroundColor: '#ddd',
	},
	margin: {
		margin: 20,
	},
	flatList: {
		marginHorizontal: '8%',
	},
})