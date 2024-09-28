import { configureStore } from '@reduxjs/toolkit';
import expensesReducer from './expensesSlice';
import incomeReducer from './incomeSlice';
import goalsReducer from './goalsSlice';

const store = configureStore({
	reducer: {
		expenses: expensesReducer,
		income: incomeReducer,
		goals: goalsReducer,
	},
});

export default store;
