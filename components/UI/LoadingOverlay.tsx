import { memo } from 'react'
import { ActivityIndicator, View, StyleSheet } from 'react-native'
import { GlobalStyles } from '../../constants/styles'

export default memo(function LoadingOverlay() {
	return (
		<View style={container}>
			<ActivityIndicator size='large' color='white' />
		</View>
	)
})

const { container } = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 24,
		backgroundColor: GlobalStyles.colors.primary700,
	},
})
