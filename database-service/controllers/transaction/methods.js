const moment = require('moment/moment');

const calculateAnalyticsForYearPeriod = (transactions) => {
	// Create an object to store the balances for each month
	const monthlyBalances = {};

	// Initialize the previousBalance variable
	let previousBalance = 0;

	// Iterate through transactions
	transactions.forEach((transaction) => {
		// Extract year and month from the createdAt field
		const date = new Date(Number(transaction.createdAt) * 1000);
		const yearMonth = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;

		// Initialize the balance for the month if it doesn't exist
		if (!monthlyBalances[yearMonth]) {
			monthlyBalances[yearMonth] = 0;
		}

		// Add the transaction value to the balance for the month, considering the previous month's balance
		monthlyBalances[yearMonth] = previousBalance + transaction.value;

		// Update the previousBalance for the next iteration
		previousBalance = monthlyBalances[yearMonth];
	});
	let final = [];
	Object.keys(monthlyBalances).forEach((key) => {
		final.push({ x: key, y: monthlyBalances[key] });
	});
	return final;
};

const calculateAnalyticsForDaysPeriod = (transactions, days) => {
	// Create an object to store the balances for each day
	const dailyBalances = {};

	// Initialize the previousBalance variable
	let previousBalance = 0;

	// Iterate through transactions
	transactions.forEach((transaction) => {
		// Extract date and time from the createdAt field
		const date = new Date(Number(transaction.createdAt) * 1000);
		const yearMonthDay = date.toISOString().split('T')[0]; // Extracting only year-month-day

		// Initialize the balance for the day if it doesn't exist
		if (!dailyBalances[yearMonthDay]) {
			dailyBalances[yearMonthDay] = 0;
		}

		// Add the transaction value to the balance for the day, considering the previous day's balance
		dailyBalances[yearMonthDay] = previousBalance + transaction.value;

		// Update the previousBalance for the next iteration
		previousBalance = dailyBalances[yearMonthDay];
	});
	const currentDate = new Date();
	const sevenDaysAgo = new Date(currentDate.setDate(currentDate.getDate() - days));

	const filteredBalances = Object.keys(dailyBalances).reduce((filtered, date) => {
		const balanceDate = new Date(date);
		if (balanceDate >= sevenDaysAgo) {
			filtered[date] = dailyBalances[date];
		}
		return filtered;
	}, {});
	let final = [];
	Object.keys(filteredBalances).forEach((key) => {
		final.push({ x: key, y: filteredBalances[key] });
	});
	return final;
};

module.exports = {
	calculateAnalyticsForYearPeriod: calculateAnalyticsForYearPeriod,
	calculateAnalyticsForDaysPeriod: calculateAnalyticsForDaysPeriod,
};
