import { useNavigation } from '@react-navigation/native'
import { memo } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { GlobalStyles } from '../../constants/styles'
import { Expense, ExpensesOverviewNavigationProps } from '../../types'
import { getFomattedDate } from '../../util/date'

interface Props {
	expense: Expense
}

export default memo(function ExpenseItem({ expense }: Props) {
	const { navigate } = useNavigation<ExpensesOverviewNavigationProps>()

	const { desc, date, amount, id } = expense

	const onPress = () => {
		navigate('ManageExpense', { id })
	}

	return (
		<Pressable onPress={onPress} style={({ pressed }) => pressed && pressedSty}>
			<View style={item}>
				<View>
					<Text style={[textBase, description]}>{desc}</Text>
					<Text style={textBase}>{getFomattedDate(date)}</Text>
				</View>
				<View style={amountContainer}>
					<Text style={amountText}>{amount.toFixed(2)}</Text>
				</View>
			</View>
		</Pressable>
	)
})

const { item, textBase, description, amountText, amountContainer, pressedSty } =
	StyleSheet.create({
		pressedSty: {
			opacity: 0.5,
		},
		item: {
			padding: 12,
			marginVertical: 8,
			backgroundColor: GlobalStyles.colors.primary500,
			flexDirection: 'row',
			justifyContent: 'space-between',
			borderRadius: 6,
			elevation: 3,

			shadowColor: GlobalStyles.colors.gray500,
			shadowRadius: 4,
			shadowOffset: { width: 1, height: 1 },
			shadowOpacity: 0.4,
		},
		textBase: {
			color: GlobalStyles.colors.primary50,
		},
		description: {
			fontSize: 16,
			marginBottom: 4,
			fontWeight: 'bold',
		},
		amountContainer: {
			paddingHorizontal: 12,
			paddingVertical: 4,
			backgroundColor: 'white',
			justifyContent: 'center',
			alignItems: 'center',
			borderRadius: 4,
			minWidth: 80,
		},
		amountText: {
			color: GlobalStyles.colors.primary500,
			fontWeight: 'bold',
		},
	})
