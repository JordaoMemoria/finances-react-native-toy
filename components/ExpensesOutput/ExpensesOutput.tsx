import { memo } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { GlobalStyles } from '../../constants/styles'
import { Expense } from '../../types'
import ExpensesList from './ExpensesList'
import ExpensesSummary from './ExpensesSummary'

interface Props {
	expenses: Expense[]
	expensesPeriod: string
	fallbackText: string
}

export default memo(function ExpensesOutput({
	expenses,
	expensesPeriod,
	fallbackText,
}: Props) {
	return (
		<View style={container}>
			<ExpensesSummary periodName={expensesPeriod} expenses={expenses} />
			{expenses.length > 0 ? (
				<ExpensesList expenses={expenses} />
			) : (
				<Text style={infoText}>{fallbackText}</Text>
			)}
		</View>
	)
})

const { container, infoText } = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 24,
		paddingTop: 24,
		backgroundColor: GlobalStyles.colors.primary700,
	},
	infoText: {
		color: 'white',
		fontSize: 16,
		textAlign: 'center',
		marginTop: 32,
	},
})
