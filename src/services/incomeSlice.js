import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Fetch income from JSON server
export const fetchIncome = createAsyncThunk(
	'income/fetchIncome',
	async () => {
		const response = await fetch('http://localhost:5000/income');
		return await response.json();
	}
);

// Add new income to the JSON server
export const addIncome = createAsyncThunk(
	'income/addIncome',
	async (newIncome) => {
		const response = await fetch('http://localhost:5000/income', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newIncome),
		});
		return await response.json(); // Return the added income
	}
);

// Delete income from JSON server
export const deleteIncome = createAsyncThunk(
	'income/deleteIncome',
	async (incomeId) => {
		await fetch(`http://localhost:5000/income/${incomeId}`, {
			method: 'DELETE',
		});
		return incomeId; // Return the ID of the deleted income
	}
);

const incomeSlice = createSlice({
	name: 'income',
	initialState: {
		income: [],
		status: 'idle',
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			// Handle fetch income actions
			.addCase(fetchIncome.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchIncome.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.income = action.payload;
			})
			.addCase(fetchIncome.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			// Handle add income action
			.addCase(addIncome.fulfilled, (state, action) => {
				state.income.push(action.payload); // Add the new income to the state
			})
			// Handle delete income action
			.addCase(deleteIncome.fulfilled, (state, action) => {
				const incomeId = action.payload;
				state.income = state.income.filter(
					(income) => income.id !== incomeId
				); // Remove the deleted income from the state
			});
	},
});

export default incomeSlice.reducer;
