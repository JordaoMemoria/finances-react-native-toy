import { memo } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { GlobalStyles } from '../../constants/styles'
import Button from './Button'

interface Props {
	message: string
	onConfirm: () => void
}

export default memo(function ErrorOverlay({ message, onConfirm }: Props) {
	return (
		<View style={container}>
			<Text style={[text, title]}>An error occured!</Text>
			<Text style={text}>{message}</Text>
			<Button onPress={onConfirm}>Ok</Button>
		</View>
	)
})

const { container, text, title } = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 24,
		backgroundColor: GlobalStyles.colors.primary700,
	},
	text: {
		textAlign: 'center',
		marginBottom: 8,
		color: 'white',
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},
})
