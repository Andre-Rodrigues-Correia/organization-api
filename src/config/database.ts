import mongoose from 'mongoose';
import logger from '../common/logger/logger';

const connectDB = async () => {
  const databaseUrl =
    process.env.ENVIRONMENT === 'prod'
      ? process.env.PROD
      : process.env.MONGO_URL_LOCAL;

  if (!databaseUrl) {
    throw new Error('Database URL not found');
  }

  await mongoose.connect(databaseUrl);
  logger.info('Connection to database successful');
};

export { connectDB };
