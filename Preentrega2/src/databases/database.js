import mongoose from 'mongoose';
const connectionString = process.env.MONGO_ATLAS_SRV || 'mongodb://localhost:27017/'

export const initMongoDB = async () => {
  try {
    console.log('Database connection');
    console.log(connectionString)
    await mongoose.connect(connectionString);

    console.log('On line');
  } catch (error) {
    console.log(`ERROR => ${error}`);
    return error;
  }
};