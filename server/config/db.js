import mongoose from 'mongoose';

const connectDB = async () => {
    const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
    if (!uri) {
        throw new Error('Missing MONGODB_URI (or MONGO_URI). It must start with "mongodb://" or "mongodb+srv://"');
    }

    try {
        await mongoose.connect(uri);
        console.log('Database connected successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err.message || err);
        throw err;
    }
}

export default connectDB;