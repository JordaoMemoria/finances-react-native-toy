import { useContext, useLayoutEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import ExpenseForm from '../components/ManageExpense/ExpenseForm'
import IconButton from '../components/UI/IconButton'
import LoadingOverlay from '../components/UI/LoadingOverlay'
import { GlobalStyles } from '../constants/styles'
import ErrorOverlay from '../components/UI/ErrorOverlay'
import { ExpensesContext } from '../store/expenses-context'
import {
	ManageExpenseRouteProps,
	ManageExpenseNavigationProps,
	Expense,
} from '../types'
import {
	storeExpense,
	updateExpense as upExp,
	deleteExpense as delFirebase,
} from '../util/http'

interface Props {
	navigation: ManageExpenseNavigationProps
	route: ManageExpenseRouteProps
}

export default function ManageExpense({ navigation, route }: Props) {
	const {
		deleteExpense: dE,
		updateExpense,
		addExpense,
		expenses,
	} = useContext(ExpensesContext)
	const [isFetching, setIsFetching] = useState<boolean>(false)
	const [error, setError] = useState<string>('')

	const id = route.params?.id

	let currentExpense
	if (id) {
		currentExpense = expenses.find((e) => e.id === id)
	}

	useLayoutEffect(() => {
		navigation.setOptions({
			title: id ? 'Edit Expense' : 'Add Expense',
		})
	}, [navigation, id])

	const deleteExpense = async () => {
		setIsFetching(true)
		try {
			await delFirebase(id!)
			dE(id!)
			navigation.goBack()
		} catch (error) {
			setError((error as Error).message)
		}
	}

	const confirmHandler = async (e: Expense) => {
		setIsFetching(true)
		try {
			if (id) {
				updateExpense(e)
				await upExp(e)
			} else {
				const id = await storeExpense(e)
				e.id = id
				addExpense(e)
			}
			navigation.goBack()
		} catch (error) {
			setError((error as Error).message)
			setIsFetching(false)
		}
	}

	if (error) {
		return <ErrorOverlay message={error} onConfirm={() => setError('')} />
	}
	if (isFetching) {
		return <LoadingOverlay />
	}

	return (
		<View style={container}>
			<ExpenseForm
				onCancel={() => navigation.goBack()}
				onConfirm={confirmHandler}
				expense={currentExpense}
			/>
			{id && (
				<View style={deleteContainer}>
					<IconButton
						icon='trash'
						size={36}
						color={GlobalStyles.colors.error500}
						onPress={deleteExpense}
					/>
				</View>
			)}
		</View>
	)
}

const { container, deleteContainer } = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
		backgroundColor: GlobalStyles.colors.primary800,
	},

	deleteContainer: {
		marginTop: 16,
		paddingTop: 8,
		borderTopWidth: 2,
		borderTopColor: GlobalStyles.colors.primary200,
		alignItems: 'center',
	},
})
