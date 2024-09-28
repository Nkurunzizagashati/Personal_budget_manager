import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Pie } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	ArcElement,
	Tooltip,
	Legend,
} from 'chart.js';
import { fetchExpenses } from '../../services/expensesSlice';

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpensesPieChart = () => {
	const dispatch = useDispatch();

	const { expenses, status } = useSelector((state) => state.expenses);

	useEffect(() => {
		if (status === 'idle') {
			dispatch(fetchExpenses());
		}
	}, [status, dispatch]);

	const expensesByCategory = expenses.reduce((acc, expense) => {
		if (acc[expense.category]) {
			acc[expense.category] += expense.amount;
		} else {
			acc[expense.category] = expense.amount;
		}
		return acc;
	}, {});

	const labels = Object.keys(expensesByCategory);
	const values = Object.values(expensesByCategory);

	const chartData = {
		labels,
		datasets: [
			{
				label: 'Expenses',
				data: values,
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)',
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)',
				],
				borderWidth: 1,
			},
		],
	};

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: 'top',
			},
			tooltip: {
				enabled: true,
			},
		},
	};

	return (
		<div>
			{status === 'loading' && <p>Loading chart...</p>}
			{status === 'succeeded' && (
				<Pie data={chartData} options={options} />
			)}
			{status === 'failed' && <p>Error loading data</p>}
		</div>
	);
};

export default ExpensesPieChart;
