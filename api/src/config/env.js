import dotenv from 'dotenv';

dotenv.config();

const env = {
  port: Number(process.env.PORT) || 4000,
  nodeEnv: process.env.NODE_ENV || 'development',
  finnhubApiKey: process.env.FINNHUB_API_KEY || '',
  firebase: {
    storageBucketUrl: process.env.FIREBASE_BUCKET_URL || '',
  },
  jwtSecret: process.env.JWT_SECRET || '',
};

export default env;