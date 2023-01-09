import { createContext, memo, useReducer } from 'react'
import {
	ActionReducer,
	Expense,
	ExpensesContextProps,
	ProviderProps,
} from '../types'

export const ExpensesContext = createContext<ExpensesContextProps>({
	expenses: [],
	addExpense: (e) => {},
	setExpenses: (expenses) => {},
	deleteExpense: (id) => {},
	updateExpense: (e) => {},
})

const expenseReducer = (state: Expense[], action: ActionReducer) => {
	switch (action.type) {
		case 'ADD':
			return [{ ...action.payload.expense! }, ...state]
		case 'SET':
			return action.payload.expenses!.reverse()
		case 'UPDATE':
			const expenseIndex = state.findIndex(
				(expense) => expense.id === action.payload.expense!.id
			)
			const expense = state[expenseIndex]
			const item = {
				...expense,
				...action.payload.expense!,
			}
			const expenses = [...state]
			expenses[expenseIndex] = item
			return expenses
		case 'DELETE':
			return state.filter((e) => e.id !== action.payload.id)
		default:
			return state
	}
}

export default memo(function ExpensesContextProvider({
	children,
}: ProviderProps) {
	const [expenses, dispatch] = useReducer(expenseReducer, [])

	const addExpense = (expense: Expense) => {
		dispatch({ type: 'ADD', payload: { expense } })
	}

	const setExpenses = (expenses: Expense[]) => {
		dispatch({ type: 'SET', payload: { expenses } })
	}

	const updateExpense = (expense: Expense) => {
		dispatch({ type: 'UPDATE', payload: { expense } })
	}

	const deleteExpense = (id: string) => {
		dispatch({ type: 'DELETE', payload: { id } })
	}

	const initialState = {
		expenses,
		addExpense,
		updateExpense,
		setExpenses,
		deleteExpense,
	}

	return (
		<ExpensesContext.Provider value={initialState}>
			{children}
		</ExpensesContext.Provider>
	)
})
