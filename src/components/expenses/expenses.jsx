const expenses = () => {
	return (
		<div className={StyleSheet.expensesMainContainer}>
			<h2 className={StyleSheet.expensesTitle}>Expenses</h2>
			<div className={StyleSheet.expenseAmount}>
				<h3>TOTAL EXPENSES: </h3>
				<span>$20</span>
			</div>
			<form action="">
				<input type="text" placeholder="Enter expense name" />
				<input
					type="number"
					placeholder="Enter expense amount"
				/>
				<input type="text" placeholder="Enter date" />
				<select name="" id=""></select>
				<button type="submit">Add Expense</button>
			</form>
		</div>
	);
};

export default expenses;
