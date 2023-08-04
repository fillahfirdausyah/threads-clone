import mongoose from 'mongoose';

let isConnected = false; // trach connection status

export const connectToDatabase = async () => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log('MongoDB is arleady connected');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'threadsclone',
    });

    isConnected = true;
    console.log('Mongodb Connected');
  } catch (error) {
    console.log(`Mongodb Connection Error: ${error}`);
  }
};
