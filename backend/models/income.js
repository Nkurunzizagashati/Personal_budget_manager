import mongoose from 'mongoose';

const IncomeSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
			maxLength: 50,
		},
		amount: {
			type: Number,
			required: true,
			trim: true,
		},
		category: {
			required: true,
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Category',
		},
		owner: {
			required: true,
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		date: {
			type: Date,
			default: Date.now,
		},
	},
	{ timestamps: true }
);

const Income = mongoose.model('income', IncomeSchema);

export default Income;
