import 'module-alias/register';
import dotenv from 'dotenv';
import app from './app';
import logger from './common/logger/logger';
import { connectDB } from './config/database';

dotenv.config({ path: 'src/config/.env' });

const port = process.env.PORT || 8080;

async function startServer() {
  try {
    await connectDB();
    app.listen(port, () => {
      logger.info(`Server is running on port ${port}`);
    });
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
}

startServer();
