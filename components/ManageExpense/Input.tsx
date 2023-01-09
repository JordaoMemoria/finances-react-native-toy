import { memo } from 'react'
import {
	StyleSheet,
	Text,
	TextInput,
	TextInputProps,
	View,
	ViewStyle,
} from 'react-native'
import { GlobalStyles } from '../../constants/styles'

interface Props {
	label: string
	textInputConfig?: TextInputProps
	style?: ViewStyle
	valid: boolean
}

export default memo(function Input({
	label,
	textInputConfig,
	style,
	valid,
}: Props) {
	const inputStyles: any[] = [input]
	if (textInputConfig?.multiline) {
		inputStyles.push(inputMultiline)
	}

	return (
		<View style={[inputContainer, style]}>
			<Text style={[labelSt, !valid && invalidLabel]}>{label}</Text>
			<TextInput
				style={[inputStyles, !valid && invalidInput]}
				{...textInputConfig}
			/>
		</View>
	)
})

const {
	input,
	inputContainer,
	labelSt,
	inputMultiline,
	invalidLabel,
	invalidInput,
} = StyleSheet.create({
	inputContainer: {
		marginHorizontal: 4,
		marginVertical: 8,
	},
	labelSt: {
		fontSize: 12,
		color: GlobalStyles.colors.primary100,
		marginBottom: 4,
	},
	input: {
		backgroundColor: GlobalStyles.colors.primary100,
		color: GlobalStyles.colors.primary700,
		padding: 6,
		borderRadius: 6,
		fontSize: 18,
	},
	inputMultiline: {
		minHeight: 100,
		textAlignVertical: 'top',
	},
	invalidLabel: {
		color: GlobalStyles.colors.error500,
	},
	invalidInput: {
		backgroundColor: GlobalStyles.colors.error50,
	},
})
