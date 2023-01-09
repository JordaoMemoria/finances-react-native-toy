import { NativeStackScreenProps } from '@react-navigation/native-stack'

export interface Expense {
	id?: string
	desc: string
	amount: number
	date: Date
}

export type StackRootParamList = {
	ManageExpense: { id?: string }
	ExpensesOverview: undefined
}

export type ExpensesOverviewNavigationProps = NativeStackScreenProps<
	StackRootParamList,
	'ExpensesOverview'
>['navigation']

export type ManageExpenseRouteProps = NativeStackScreenProps<
	StackRootParamList,
	'ManageExpense'
>['route']

export type ManageExpenseNavigationProps = NativeStackScreenProps<
	StackRootParamList,
	'ManageExpense'
>['navigation']

export interface ExpensesContextProps {
	expenses: Expense[]
	addExpense: (e: Expense) => void
	setExpenses: (expenses: Expense[]) => void
	deleteExpense: (id: string) => void
	updateExpense: (e: Expense) => void
}

export interface ActionReducer {
	type: string
	payload: {
		id?: string
		expense?: Expense
		expenses?: Expense[]
	}
}

export interface ProviderProps {
	children: JSX.Element
}
