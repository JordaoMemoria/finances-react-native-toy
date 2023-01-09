import { memo } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { GlobalStyles } from '../../constants/styles'
import { Expense } from '../../types'

interface Props {
	periodName: string
	expenses: Expense[]
}

export default memo(function ExpensesSummary({ periodName, expenses }: Props) {
	const expensesSum = expenses.reduce((sum, expense) => sum + expense.amount, 0)

	return (
		<View style={container}>
			<Text style={period}>{periodName}</Text>
			<Text style={sum}>${expensesSum.toFixed(2)}</Text>
		</View>
	)
})

const { container, period, sum } = StyleSheet.create({
	container: {
		padding: 8,
		backgroundColor: GlobalStyles.colors.primary50,
		borderRadius: 6,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	period: {
		fontSize: 12,
		color: GlobalStyles.colors.primary400,
	},
	sum: {
		fontSize: 16,
		fontWeight: 'bold',
		color: GlobalStyles.colors.primary500,
	},
})
