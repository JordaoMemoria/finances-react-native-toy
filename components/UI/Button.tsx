import { memo } from 'react'
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native'
import { GlobalStyles } from '../../constants/styles'

interface Props {
	children: string
	mode?: 'flat'
	onPress: () => void
	style?: ViewStyle
}

export default memo(function Button({ children, onPress, mode, style }: Props) {
	return (
		<View style={style}>
			<Pressable
				onPress={onPress}
				style={({ pressed }) => pressed && pressedSty}
			>
				<View style={[button, mode === 'flat' && flat]}>
					<Text style={[buttonText, mode === 'flat' && flatText]}>
						{children}
					</Text>
				</View>
			</Pressable>
		</View>
	)
})

const { button, flat, buttonText, flatText, pressedSty } = StyleSheet.create({
	button: {
		borderRadius: 4,
		padding: 8,
		backgroundColor: GlobalStyles.colors.primary500,
	},
	flat: {
		backgroundColor: 'transparent',
	},
	buttonText: {
		color: 'white',
		textAlign: 'center',
	},
	flatText: {
		color: GlobalStyles.colors.primary200,
	},
	pressedSty: {
		opacity: 0.5,
		backgroundColor: GlobalStyles.colors.primary100,
		borderRadius: 4,
	},
})
