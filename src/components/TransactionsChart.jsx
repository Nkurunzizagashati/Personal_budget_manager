import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Line } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	LineElement,
	PointElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { fetchExpenses } from '../services/expensesSlice';
import { fetchIncome } from '../services/incomeSlice';

// Register chart elements
ChartJS.register(
	CategoryScale,
	LinearScale,
	LineElement,
	PointElement,
	Title,
	Tooltip,
	Legend
);

const TransactionsChart = () => {
	const dispatch = useDispatch();

	// Get expenses and income data from Redux store
	const { expenses } = useSelector((state) => state.expenses);
	const { income } = useSelector((state) => state.income);
	const expensesStatus = useSelector(
		(state) => state.expenses.status
	);
	const incomeStatus = useSelector((state) => state.income.status);

	useEffect(() => {
		if (expensesStatus === 'idle') {
			dispatch(fetchExpenses());
		}
		if (incomeStatus === 'idle') {
			dispatch(fetchIncome());
		}
	}, [expensesStatus, incomeStatus, dispatch]);

	// Process data by week (assuming `date` field exists and is in 'YYYY-MM-DD' format)
	const groupByWeek = (data) => {
		const weeks = {
			'1st week': 0,
			'2nd week': 0,
			'3rd week': 0,
			'4th week': 0,
		};
		data.forEach((item) => {
			const date = new Date(item.date);
			const week = Math.ceil(date.getDate() / 7); // Get the week number
			if (week === 1) weeks['1st week'] += item.amount;
			if (week === 2) weeks['2nd week'] += item.amount;
			if (week === 3) weeks['3rd week'] += item.amount;
			if (week >= 4) weeks['4th week'] += item.amount;
		});
		return weeks;
	};

	const weeklyExpenses = groupByWeek(expenses);
	const weeklyIncome = groupByWeek(income);

	// Prepare the chart data
	const chartData = {
		labels: ['1st week', '2nd week', '3rd week', '4th week'],
		datasets: [
			{
				label: 'Expenses',
				data: Object.values(weeklyExpenses),
				borderColor: 'red',
				borderWidth: 1,
			},
			{
				label: 'Income',
				data: Object.values(weeklyIncome),
				borderColor: 'green',
				borderWidth: 1,
			},
		],
	};

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: 'top',
			},
			title: {
				display: true,
				text: 'Monthly Expenses and Income',
			},
		},
	};

	return (
		<div style={{ width: '400px', height: '300px' }}>
			{(expensesStatus === 'loading' ||
				incomeStatus === 'loading') && <p>Loading chart...</p>}
			{expensesStatus === 'succeeded' &&
				incomeStatus === 'succeeded' && (
					<Line data={chartData} options={options} />
				)}
			{(expensesStatus === 'failed' ||
				incomeStatus === 'failed') && <p>Error loading data</p>}
		</div>
	);
};

export default TransactionsChart;
