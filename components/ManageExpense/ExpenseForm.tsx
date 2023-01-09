import { memo, useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import Input from './Input'
import Button from '../UI/Button'
import { Expense } from '../../types'
import { getFomattedDate, getDatePlusOne } from '../../util/date'
import { GlobalStyles } from '../../constants/styles'

interface Props {
	onCancel: () => void
	onConfirm: (e: Expense) => void
	expense?: Expense
}

export default memo(function ExpenseForm({
	onCancel,
	onConfirm,
	expense,
}: Props) {
	const [input, setInput] = useState({
		amount: {
			value: expense ? expense.amount.toString() : '',
			isValid: true,
		},
		date: {
			value: expense ? getFomattedDate(expense.date) : '',
			isValid: true,
		},
		desc: { value: expense ? expense.desc : '', isValid: true },
	})

	const updateInput = (property: string, text: string) => {
		setInput((prevInput) => {
			return {
				...prevInput,
				[property]: {
					value: text,
					isValid: true,
				},
			}
		})
	}

	const submitHandler = () => {
		const newExpense: Expense = {
			amount: +input.amount.value,
			date: getDatePlusOne(new Date(input.date.value)),
			desc: input.desc.value,
		}

		if (expense) {
			newExpense.id = expense.id
		}

		const amountIsValid = !isNaN(newExpense.amount) && newExpense.amount > 0
		const dateIsValid = newExpense.date.toString() !== 'Invalid Date'
		const descriptionIsValid = newExpense.desc.trim().length > 0

		if (!amountIsValid || !descriptionIsValid || !dateIsValid) {
			setInput((prev) => ({
				amount: { value: prev.amount.value, isValid: amountIsValid },
				date: { value: prev.date.value, isValid: dateIsValid },
				desc: { value: prev.desc.value, isValid: descriptionIsValid },
			}))
			return
		}

		onConfirm(newExpense)
	}

	const formIsValid =
		!input.amount.isValid || !input.date.isValid || !input.desc.isValid

	return (
		<View style={form}>
			<Text style={title}>Your Expense</Text>
			<View style={inputsRow}>
				<Input
					style={rowInput}
					label='Amount'
					valid={input.amount.isValid}
					textInputConfig={{
						keyboardType: 'decimal-pad',
						onChangeText: (e) => updateInput('amount', e),
						value: input.amount.value,
					}}
				/>
				<Input
					style={rowInput}
					label='Date'
					valid={input.date.isValid}
					textInputConfig={{
						placeholder: 'YYYY-MM-DD',
						maxLength: 10,
						onChangeText: (e) => updateInput('date', e),
						value: input.date.value,
					}}
				/>
			</View>
			<Input
				label='Description'
				valid={input.desc.isValid}
				textInputConfig={{
					multiline: true,
					onChangeText: (e) => updateInput('desc', e),
					value: input.desc.value,
				}}
			/>
			{formIsValid && (
				<Text style={errorText}>
					Invalid input values - please check your entered data!
				</Text>
			)}
			<View style={buttons}>
				<Button style={button} mode='flat' onPress={onCancel}>
					Cancel
				</Button>
				<Button style={button} onPress={submitHandler}>
					{expense ? 'Update' : 'Add'}
				</Button>
			</View>
		</View>
	)
})

const { inputsRow, rowInput, form, title, buttons, button, errorText } =
	StyleSheet.create({
		form: {
			marginTop: 40,
		},
		title: {
			fontSize: 24,
			fontWeight: 'bold',
			color: 'white',
			marginVertical: 24,
			textAlign: 'center',
		},
		inputsRow: {
			flexDirection: 'row',
			justifyContent: 'space-between',
		},
		rowInput: {
			flex: 1,
		},
		buttons: {
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
		},
		button: {
			minWidth: 120,
			marginHorizontal: 8,
		},
		errorText: {
			textAlign: 'center',
			color: GlobalStyles.colors.error500,
			margin: 8,
		},
	})
