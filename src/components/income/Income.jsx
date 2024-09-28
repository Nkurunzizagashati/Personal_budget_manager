import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Income.module.css';
import {
	addIncome,
	fetchIncome,
	deleteIncome,
} from '../../services/incomeSlice';
import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';

const Income = () => {
	const dispatch = useDispatch();
	const income = useSelector((state) => state.income.income);
	const [incomeName, setIncomeName] = useState('');
	const [incomeAmount, setIncomeAmount] = useState('');
	const [incomeDate, setIncomeDate] = useState('');
	const [category, setCategory] = useState('');

	// Fetch income on component mount
	useEffect(() => {
		dispatch(fetchIncome());
	}, [dispatch]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const newIncome = {
			name: incomeName,
			amount: parseFloat(incomeAmount),
			date: incomeDate,
			category,
		};

		try {
			const resultAction = await dispatch(addIncome(newIncome));
			if (addIncome.fulfilled.match(resultAction)) {
				setIncomeName('');
				setIncomeAmount('');
				setIncomeDate('');
				setCategory('');
				alert('Income added successfully!');
			} else {
				alert('Failed to add income');
			}
		} catch (error) {
			console.error('Error adding income:', error);
		}
	};

	const totalIncome = income.reduce(
		(total, item) => total + item.amount,
		0
	);

	const handleDelete = async (incomeId) => {
		try {
			await dispatch(deleteIncome(incomeId));
			alert('Income deleted successfully!');
		} catch (error) {
			console.error('Error deleting income:', error);
		}
	};

	return (
		<div className={styles.expensesMainContainer}>
			<div className={styles.addExpenseContainer}>
				<h2 className={styles.expensesTitle}>INCOME</h2>
				<div className={styles.expenseAmount}>
					<p>TOTAL INCOME: </p>
					<p>${totalIncome.toFixed(2)}</p>
				</div>
				<form
					className={styles.expensesForm}
					onSubmit={handleSubmit}
				>
					<input
						type="text"
						placeholder="Enter income name"
						value={incomeName}
						onChange={(e) => setIncomeName(e.target.value)}
					/>
					<input
						type="number"
						placeholder="Enter income amount"
						value={incomeAmount}
						onChange={(e) =>
							setIncomeAmount(e.target.value)
						}
					/>
					<input
						type="date"
						placeholder="Enter date"
						value={incomeDate}
						onChange={(e) => setIncomeDate(e.target.value)}
					/>
					<select
						value={category}
						onChange={(e) => setCategory(e.target.value)}
					>
						<option value="">Select Category</option>
						<option value="income">Income</option>
						<option value="freelance">Freelance</option>
						<option value="others">Others</option>
					</select>
					<button
						type="submit"
						className={styles.submitButton}
					>
						Add Income
					</button>
				</form>
			</div>

			<div className={styles.expenseList}>
				{income.map((inc) => (
					<div key={inc.id} className={styles.expense}>
						<div className={styles.expenseDetails}>
							<p>Name: {inc.name}</p>
							<p>Date: {inc.date}</p>
							<p>Price: ${inc.amount.toFixed(2)}</p>
						</div>
						<div className={styles.expenseManagerBtn}>
							<FaEdit
								className={styles.editBtn}
								size={20}
							/>
							<MdDelete
								className={styles.deleteBtn}
								size={20}
								onClick={() => handleDelete(inc.id)}
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Income;
