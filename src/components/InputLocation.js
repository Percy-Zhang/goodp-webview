import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native-web'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'

import useFetchCitiesList from '../apis/useFetchCitiesList'
import useFetchZonesList from '../apis/useFetchZonesList'


export default function InputLocation() {
	const {cityList, getCityList} = useFetchCitiesList()
	const {zoneList, getZoneList} = useFetchZonesList()

	const [loading, setLoading] = useState(true)
	const [city, setCity] = useState()
	const [zone, setZone] = useState()

	useEffect(() => {
		(async () => {
			await getCityList()
			await getZoneList()
			setLoading(false)
		})()
	}, [])

	const filteredCityList = cityList.filter((city) => city.id == 64)
	const filteredZoneList = zoneList.filter((zone) => zone?.city?.id == city?.id)

	const renderCity = (params) => renderInput(params, 'City')
	const onCityChange = (e, value) => setCity(value)
	
	const renderZone = (params) => renderInput(params, 'Zone')
	const onZoneChange = (e, value) => setZone(value)

	const getName = (obj) => obj.name_mm ?? ''
	
	return (
		<View style={styles.container}>
			<View style={styles.selectWrapper}>
				<Autocomplete
					options={filteredCityList}
					value={city}
					onChange={onCityChange}
					getOptionLabel={getName}
					style={styles.select}
					renderInput={renderCity}
					loading={loading}
				/>
				<View style={styles.selectGap}/>
				<Autocomplete
					options={filteredZoneList}
					value={zone}
					onChange={onZoneChange}
					getOptionLabel={getName}
					style={styles.select}
					renderInput={renderZone}
					loading={loading}
				/>
			</View>

			<TextField label={'Address'} multiline/>
		</View>
	)
}

const renderInput = (params, label) =>  {
	return (
		<TextField {...params} label={label}/>
	)
}

const styles = StyleSheet.create({
	container: {
		
	},
	selectWrapper: {
		flexDirection: 'row',
		justifyContent: 'stretch',
		paddingVertical: 20,
	},
	select: {
		flex: 1,
	},
	selectGap: {
		width: 10,
	},
})