import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	addExpense,
	fetchExpenses,
	deleteExpense, // Import the deleteExpense thunk
} from '../../services/expensesSlice';
import styles from './Expenses.module.css';
import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';

const Expenses = () => {
	const dispatch = useDispatch();
	const expenses = useSelector((state) => state.expenses.expenses); // Select expenses from the Redux store
	const [expenseName, setExpenseName] = useState('');
	const [expenseAmount, setExpenseAmount] = useState('');
	const [expenseDate, setExpenseDate] = useState('');
	const [category, setCategory] = useState('');

	// Fetch expenses on component mount
	useEffect(() => {
		dispatch(fetchExpenses());
	}, [dispatch]);

	// Handle form submission for adding new expense
	const handleSubmit = async (e) => {
		e.preventDefault();

		const newExpense = {
			name: expenseName,
			amount: parseFloat(expenseAmount),
			date: expenseDate,
			category,
		};

		// Dispatch the addExpense action
		try {
			const resultAction = await dispatch(addExpense(newExpense));
			if (addExpense.fulfilled.match(resultAction)) {
				// Reset the form
				setExpenseName('');
				setExpenseAmount('');
				setExpenseDate('');
				setCategory('');
				alert('Expense added successfully!');
			} else {
				alert('Failed to add expense');
			}
		} catch (error) {
			console.error('Error adding expense:', error);
		}
	};

	// Handle deleting an expense
	const handleDelete = async (expenseId) => {
		if (
			window.confirm(
				'Are you sure you want to delete this expense?'
			)
		) {
			try {
				await dispatch(deleteExpense(expenseId)); // Dispatch the delete action
				alert('Expense deleted successfully!');
			} catch (error) {
				console.error('Error deleting expense:', error);
			}
		}
	};

	// Calculate total expenses
	const totalExpenses = expenses.reduce(
		(total, item) => total + item.amount,
		0
	);

	return (
		<div className={styles.expensesMainContainer}>
			<div className={styles.addExpenseContainer}>
				<h2 className={styles.expensesTitle}>EXPENSES</h2>
				<div className={styles.expenseAmount}>
					<p>TOTAL EXPENSES: </p>
					<p>${totalExpenses.toFixed(2)}</p>{' '}
					{/* Display total expenses */}
				</div>
				<form
					className={styles.expensesForm}
					onSubmit={handleSubmit}
				>
					<input
						type="text"
						placeholder="Enter expense name"
						value={expenseName}
						onChange={(e) => setExpenseName(e.target.value)}
					/>
					<input
						type="number"
						placeholder="Enter expense amount"
						value={expenseAmount}
						onChange={(e) =>
							setExpenseAmount(e.target.value)
						}
					/>
					<input
						type="date"
						placeholder="Enter date"
						value={expenseDate}
						onChange={(e) => setExpenseDate(e.target.value)}
					/>
					<select
						value={category}
						onChange={(e) => setCategory(e.target.value)}
					>
						<option value="">Select Category</option>
						<option value="food">Food</option>
						<option value="transportation">
							Transportation
						</option>
						<option value="education">Education</option>
						<option value="entertainment">
							Entertainment
						</option>
						<option value="others">Others</option>
					</select>
					<button
						type="submit"
						className={styles.submitButton}
					>
						Add Expense
					</button>
				</form>
			</div>
			<div className={styles.expenseList}>
				{expenses.map((expense) => (
					<div key={expense.id} className={styles.expense}>
						<div className={styles.expenseDetails}>
							<p>{expense.name}</p>
							<p>Date: {expense.date}</p>
							<p>Price: ${expense.amount.toFixed(2)}</p>
						</div>
						<div className={styles.expenseManagerBtn}>
							<FaEdit
								className={styles.editBtn}
								size={20}
							/>
							<MdDelete
								className={styles.deleteBtn}
								size={20}
								onClick={() => handleDelete(expense.id)} // Call handleDelete on click
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Expenses;
