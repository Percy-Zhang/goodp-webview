import { StyleSheet, View, Image } from 'react-native-web'

function Category({ style }) {
	return (
		<View style={[styles.container, style]}>
			<Image source={require('../assets/banner.png')} style={styles.banner} />
			<Image source={require('../assets/banner.png')} style={styles.banner} />
			<Image source={require('../assets/banner.png')} style={styles.banner} />
			<Image source={require('../assets/banner.png')} style={styles.banner} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		backgroundColor: 'white',
		padding: 20,
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	banner: {
		width: '20%',
		height: '80px',
		backgroundColor: 'green'
	},
})

export default Category;
