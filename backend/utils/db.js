import mongoose from 'mongoose';

const dbConnection = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URL);
		console.log('Connected to MongoDB');
	} catch (error) {
		console.error('Failed to connect to MongoDB', error);
		process.exit(1);
	}
};

export default dbConnection;
