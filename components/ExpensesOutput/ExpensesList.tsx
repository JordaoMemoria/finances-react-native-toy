import { memo } from 'react'
import { FlatList } from 'react-native'
import { Expense } from '../../types'
import ExpenseItem from './ExpenseItem'

interface renderItemProps {
	item: Expense
}

const renderExpenseItem = ({ item }: renderItemProps) => {
	return <ExpenseItem expense={item} />
}

interface Props {
	expenses: Expense[]
}

export default memo(function ExpensesList({ expenses }: Props) {
	return (
		<FlatList
			data={expenses}
			renderItem={renderExpenseItem}
			keyExtractor={(item) => item.id}
		/>
	)
})
