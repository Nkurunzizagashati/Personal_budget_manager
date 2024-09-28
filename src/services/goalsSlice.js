import { createSlice } from '@reduxjs/toolkit';

const goalsSlice = createSlice({
	name: 'goals',
	initialState: {
		selectedGoalPercentage: 50, // Default goal set to 50%
	},
	reducers: {
		setGoal: (state, action) => {
			state.selectedGoalPercentage = action.payload;
		},
	},
});

export const { setGoal } = goalsSlice.actions;
export default goalsSlice.reducer;
