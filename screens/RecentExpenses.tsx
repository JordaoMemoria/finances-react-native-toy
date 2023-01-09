import { useCallback, useContext, useEffect, useState } from 'react'
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'
import ErrorOverlay from '../components/UI/ErrorOverlay'
import LoadingOverlay from '../components/UI/LoadingOverlay'
import { ExpensesContext } from '../store/expenses-context'
import { getDateMinusDays } from '../util/date'
import { fetchExpenses } from '../util/http'

export default function RecentExpenses() {
	const [isFetching, setIsFetching] = useState<boolean>(true)
	const [error, setError] = useState<string>('')
	const { expenses, setExpenses } = useContext(ExpensesContext)

	const getExpenses = useCallback(async () => {
		setIsFetching(true)
		try {
			const expenses = await fetchExpenses()
			setExpenses(expenses)
		} catch (error) {
			setError((error as Error).message)
		}
		setIsFetching(false)
	}, [])

	useEffect(() => {
		getExpenses()
	}, [getExpenses])

	const recent = expenses.filter((expense) => {
		const today = new Date()
		const date7DaysAgo = getDateMinusDays(today, 7)
		return expense.date >= date7DaysAgo && expense.date <= today
	})

	if (error) {
		return <ErrorOverlay message={error} onConfirm={() => setError('')} />
	}

	if (isFetching) {
		return <LoadingOverlay />
	}

	return (
		<ExpensesOutput
			expensesPeriod='Last 7 Days'
			expenses={recent}
			fallbackText='No expenses registered for the last 7 days!'
		/>
	)
}
