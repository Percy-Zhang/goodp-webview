import { StyleSheet, View, Image } from 'react-native-web'

function Carousel({ style }) {
	return (
		<View style={[styles.container, style]}>
			<Image source={require('../assets/banner.png')} style={styles.banner} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		height: 160,
	},
	banner: {
		height: '100%',
		width: '100%',
	},
})

export default Carousel;
