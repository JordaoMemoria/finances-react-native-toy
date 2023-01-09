import axios from 'axios'
import { Expense } from '../types'

const URL = 'https://react-native-expenses-460bd-default-rtdb.firebaseio.com/'

export const storeExpense = async (expense: Expense) => {
	const response = await axios.post(URL + 'expenses.json', expense)
	return response.data.name
}

export const fetchExpenses = async () => {
	const response = await axios.get(URL + 'expenses.json')

	const expenses = []
	for (const key in response.data) {
		const expense: Expense = {
			id: key,
			amount: response.data[key].amount,
			date: new Date(response.data[key].date),
			desc: response.data[key].desc,
		}
		expenses.push(expense)
	}
	return expenses
}

export const updateExpense = async (expense: Expense) => {
	const { id, amount, date, desc } = expense
	return await axios.put(URL + `/expenses/${id!}.json`, { desc, date, amount })
}

export const deleteExpense = async (id: string) => {
	return await axios.delete(URL + `/expenses/${id}.json`)
}
