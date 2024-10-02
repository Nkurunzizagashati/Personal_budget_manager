import mongoose from 'mongoose';

const dbConnection = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URL);
		console.log('Connected to DB');
	} catch (error) {
		console.error('Failed to connect to DB', error);
		process.exit(1);
	}
};

export default dbConnection;
