import { StyleSheet, View, Text, TouchableOpacity } from 'react-native-web'
import { useNavigate } from 'react-router-dom';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

import constants from '../constants'

const { PRIMARY } = constants

export default function Header({ title, showCart }) {
	const navigate = useNavigate()

	const goBack = () => navigate(-1)

	return (
		<View style={styles.header}>
			<View style={styles.headerRow}>
				<IconHoc Icon={ArrowBackIosIcon} style={styles.arrowIcon} onPress={goBack}/>
				<Text style={styles.headerTitle}>{title}</Text>
				<View style={{flex: 1}} />
				{ showCart && <IconHoc Icon={ShoppingCartIcon} style={styles.cartIcon} onPress={void 0}/>}
			</View>
		</View>
	)
}

const IconHoc = ({ Icon, style, onPress}) => (
	<TouchableOpacity onPress={onPress}><Icon style={style}/></TouchableOpacity>
)

const HEADER_MARGIN = 30

const styles = StyleSheet.create({
	header: {
		backgroundColor: PRIMARY,
		paddingHorizontal: HEADER_MARGIN,
		paddingVertical: 17,
		alignSelf: 'stretch',
	},
	headerRow: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	arrowIcon: {
		fontSize: 25,
		color: 'white'
	},
	headerTitle: {
		paddingLeft: 5,
		fontSize: 20,
		color: 'white',
	},
	cartIcon: {
		fontSize: 30,
		color: 'white',
	},
})
