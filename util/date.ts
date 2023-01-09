export const getFomattedDate = (date: Date) => {
	return `${date.getFullYear()}-${convert(date.getMonth() + 1)}-${convert(
		date.getDate()
	)}`
}

const convert = (n: number) => {
	return n < 10 ? '0' + n : n
}

export const getDateMinusDays = (date: Date, days: number) => {
	return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days)
}

export const getDatePlusOne = (date: Date) => {
	return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
}
