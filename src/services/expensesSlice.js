import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchExpenses = createAsyncThunk(
	'expenses/fetchExpenses',
	async () => {
		const response = await fetch('http://localhost:5000/expenses');
		const data = await response.json();
		return data;
	}
);

export const addExpense = createAsyncThunk(
	'expenses/addExpense',
	async (newExpense) => {
		const response = await fetch('http://localhost:5000/expenses', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newExpense),
		});
		return await response.json();
	}
);

export const deleteExpense = createAsyncThunk(
	'expenses/deleteExpense',
	async (expenseId) => {
		await fetch(`http://localhost:5000/expenses/${expenseId}`, {
			method: 'DELETE',
		});
		return expenseId;
	}
);

const expensesSlice = createSlice({
	name: 'expenses',
	initialState: {
		expenses: [],
		status: 'idle',
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchExpenses.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchExpenses.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.expenses = action.payload;
			})
			.addCase(fetchExpenses.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(addExpense.fulfilled, (state, action) => {
				state.expenses.push(action.payload);
			})
			.addCase(deleteExpense.fulfilled, (state, action) => {
				const expenseId = action.payload;
				state.expenses = state.expenses.filter(
					(expense) => expense.id !== expenseId
				);
			});
	},
});

export default expensesSlice.reducer;
