import { ComponentProps, memo } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

interface Props {
	icon: ComponentProps<typeof Ionicons>['name']
	color: string
	size: number
	onPress: () => void
}

export default memo(function IconButton({ color, icon, size, onPress }: Props) {
	return (
		<Pressable
			onPress={onPress}
			style={({ pressed }) => pressed && pressedEffect}
		>
			<View style={buttonContainer}>
				<Ionicons name={icon} color={color} size={size} />
			</View>
		</Pressable>
	)
})

const { buttonContainer, pressedEffect } = StyleSheet.create({
	buttonContainer: {
		borderRadius: 24,
		padding: 6,
		marginHorizontal: 8,
		marginVertical: 2,
	},
	pressedEffect: {
		opacity: 0.5,
	},
})
