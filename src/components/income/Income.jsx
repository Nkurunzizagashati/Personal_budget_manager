import styles from './Expenses.module.css';

const Income = () => {
	return (
		<div className={styles.expensesMainContainer}>
			<h2 className={styles.expensesTitle}>EXPENSES</h2>
			<div className={styles.expenseAmount}>
				<p>TOTAL INCOME: </p>
				<p> $20</p>
			</div>
			<form action="" className={styles.expensesForm}>
				<input type="text" placeholder="Enter income name" />
				<input
					type="number"
					placeholder="Enter income amount"
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

export default Income;
