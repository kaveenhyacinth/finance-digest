import finnhub from 'finnhub';
import env from './env.js';

const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = env.finnhubApiKey;
const finnhubClient = new finnhub.DefaultApi();

export default finnhubClient;