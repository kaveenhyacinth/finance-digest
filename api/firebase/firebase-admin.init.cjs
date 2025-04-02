const fs = require('fs');
const admin = require('firebase-admin');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

function getServiceAccount() {
  // Build an absolute path to the file located in the same directory
  const serviceAccountPath = path.join(__dirname, 'service-account.json');
  const serviceAccountData = fs.readFileSync(serviceAccountPath, 'utf-8');
  return JSON.parse(serviceAccountData);
}

function initializeFirebaseAdmin() {
  const serviceAccount = getServiceAccount();
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount), storageBucket: process.env.FIREBASE_BUCKET_URL,
  });
}

initializeFirebaseAdmin();

module.exports = admin;