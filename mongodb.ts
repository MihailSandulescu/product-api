import mongoose from 'mongoose';

// Replace 'your-database-name' with your actual database name
const DB_URI = process.env.MONGO_CONNECTION_URI;
mongoose.connect(DB_URI);

export default mongoose;
