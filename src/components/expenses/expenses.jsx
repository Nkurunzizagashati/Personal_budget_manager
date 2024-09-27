import styles from './Expenses.module.css';

const Expenses = () => {
	return (
		<div className={styles.expensesMainContainer}>
			<h2 className={styles.expensesTitle}>EXPENSES</h2>
			<div className={styles.expenseAmount}>
				<p>TOTAL EXPENSES: </p>
				<p> $20</p>
			</div>
			<form action="" className={styles.expensesForm}>
				<input type="text" placeholder="Enter expense name" />
				<input
					type="number"
					placeholder="Enter expense amount"
				/>
				<input type="text" placeholder="Enter date" />
				<select name="" id=""></select>
				<button type="submit" className={styles.submitButton}>
					Add Expense
				</button>
			</form>
		</div>
	);
};

export default Expenses;
