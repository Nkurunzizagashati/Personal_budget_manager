import styles from './Dashboard.module.css';
import ExpensesPieChart from './expenses/ExpensesPieChart';
import TransactionsChart from './TransactionsChart';
import { useSelector, useDispatch } from 'react-redux';
import { fetchExpenses } from '../services/expensesSlice';
import { fetchIncome } from '../services/incomeSlice';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { setGoal } from '../services/goalsSlice';

const Dashboard = () => {
	const dispatch = useDispatch();

	const {
		expenses,
		status: expensesStatus,
		error: expensesError,
	} = useSelector((state) => state.expenses);
	const {
		income,
		status: incomeStatus,
		error: incomeError,
	} = useSelector((state) => state.income);

	const selectedGoal = useSelector(
		(state) => state.goals.selectedGoalPercentage
	);

	useEffect(() => {
		if (expensesStatus === 'idle') {
			dispatch(fetchExpenses());
		}
		if (incomeStatus === 'idle') {
			dispatch(fetchIncome());
		}
	}, [dispatch, expensesStatus, incomeStatus]);

	if (expensesStatus === 'loading' || incomeStatus === 'loading') {
		return <div>Loading...</div>;
	}
	if (expensesStatus === 'failed') {
		return <div>Error: {expensesError.message}</div>;
	}
	if (incomeStatus === 'failed') {
		return <div>Error: {incomeError.message}</div>;
	}

	const totalIncome = income.reduce(
		(total, item) => total + item.amount,
		0
	);
	const totalExpenses = expenses.reduce(
		(total, item) => total + item.amount,
		0
	);
	const balance = totalIncome - totalExpenses;

	// SET GOAL

	const handleGoalChange = (event) => {
		const selectedValue = parseInt(event.target.value, 10);
		dispatch(setGoal(selectedValue));
	};

	return (
		<div className={styles.dashboardMainContainer}>
			<div className={styles.transactionsContainer}>
				<h2>Transactions</h2>

				<div className={styles.transactionsChartContainer}>
					<TransactionsChart
						expenses={expenses}
						income={income}
					/>
				</div>

				<div className={styles.transactionsOverview}>
					<div className={styles.transactionOverview}>
						<span>Total Income: </span>
						<span>${totalIncome}</span>
					</div>
					<div className={styles.transactionOverview}>
						<span>Total Expenses: </span>
						<span>${totalExpenses}</span>
					</div>
					<div className={styles.transactionOverview}>
						<span>Balance: </span>
						<span>${balance}</span>
					</div>
				</div>
			</div>

			<div className={styles.visualDiagramsContainer}>
				<div className={styles.goalSection}>
					<p>
						Goal: To use no more than <b>{selectedGoal}%</b>{' '}
						of the income
					</p>
					<select
						name="goal"
						id="goal"
						onChange={handleGoalChange}
						value={selectedGoal}
					>
						<option value="50">50%</option>
						<option value="75">75%</option>
						<option value="100">100%</option>
					</select>
				</div>
				<div className={styles.expensesHistory}>
					<div className={styles.expensesHistoryChart}>
						<h3>Expenses History</h3>
						<div className={styles.transactionsData}>
							{expenses.slice(-2).map((expense) => (
								<div
									key={expense.id}
									className={styles.expense}
								>
									<span>{expense.date}</span>
									<span>${expense.amount}</span>
								</div>
							))}
						</div>
						<Link
							to="/expenses"
							className={styles.linkToExpenses}
						>
							View all Expenses
						</Link>
					</div>

					<div className={styles.expensesChartContainer}>
						<ExpensesPieChart expenses={expenses} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
