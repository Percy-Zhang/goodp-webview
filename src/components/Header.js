import { useState } from 'react'
import { StyleSheet, View, Text, TextInput, Image } from 'react-native-web'

function Header() {
	const [value, setValue] = useState()
	return (
		<View style={styles.header}>
			<View style={styles.headerRow1}>
				<Image source={require('../assets/fries_menu.png')} style={styles.menu}/>
				<Text style={styles.headerTitle}>Good P Market</Text>
				<View style={{flex: 1}} />
				<Image source={require('../assets/close_minus.png')} style={styles.minus}/>
			</View>
			<View style={styles.headerRow2}>
				<TextInput 
					style={styles.searchBar}
					value={value}
					onChangeText={setValue}
				/>
				<Image source={require('../assets/search.png')} style={styles.search}/>
			</View>
			
		</View>
	)
}

const HEADER_MARGIN = 20

const styles = StyleSheet.create({
	header: {
		backgroundColor: '#67ae3f',
		paddingHorizontal: HEADER_MARGIN,
		paddingVertical: 17,
	},
	headerRow1: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	menu: {
		height: 30,
		width: 30,
		marginRight: 15,
	},
	headerTitle: {
		fontSize: 18,
		color: 'white'
	},
	minus: {
		height: 25,
		width: 25,
	},
	headerRow2: {
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 50,
		backgroundColor: '#9cb',
		marginTop: 8,
		paddingHorizontal: 16,
		paddingVertical: 8,
	},
	searchBar: {
		flex: 1,
		outlineStyle: 'none',
	},
	search: {
		width: 25,
		height: 25,
	},
})

export default Header;
