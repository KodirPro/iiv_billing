const env = {
  NODE_ENV: 'production',
  DATABASE_URL:
    'postgresql://postgres:User@password@localhost:5432/billing?schema=public',

  PORT: 3000,
  CONSUMER: 'http://consumer-address',
  CONSUMER_LOGIN: 'consumer-login-name',
  CONSUMER_PASSWORD: 'consumer-login-password',
  GLOBAL_IPS: ['127.0.0.1', 'consumer-ip-address'],
  GLOBAL_REFERERS: ['http://localhost:3000'],

  PAYME_LOGIN: 'Paycom',
  PAYME_PASSWORD: 'payme-login-password',
  PAYME_IPS: ['internal-ip-address', 'payme-ip-address'],
  PAYME_REFERERS: ['http://test.paycom.uz'],

  UZUM_USERNAME: 'uzum-login-name',
  UZUM_PASSWORD: 'uzum-login-password',
  UZUM_SERVICE_ID: 1234,
  UZUM_IPS: [],
  UZUM_REFERERS: ['https://uzum.uz'],

  CLICK_SERVICE_ID: 1234,
  CLICK_MERCHANT_ID: 1234,
  CLICK_SECRET_KEY: 'click-secret-key',
  CLICK_MERCHANT_USER_ID: 1234,
  CLICK_IPS: ['click-ip-address'],
  CLICK_REFERERS: ['https://click.uz'],
};

// eslint-disable-next-line @typescript-eslint/no-require-imports
const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = Buffer.from('your-own-generated-key', 'utf-8'); // 32 byte
const iv = Buffer.from('your-own-generated-salt', 'utf-8'); // 16 byte

const encrypt = (text) => {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');

  encrypted += cipher.final('hex');

  return encrypted;
};

let result = '\n';

for (const [key, value] of Object.entries(env)) {
  result += `${key}=${
    ['NODE_ENV', 'DATABASE_URL'].includes(key)
      ? value
      : encrypt(typeof value === 'object' ? JSON.stringify(value) : `${value}`)
  }\n`;
}

console.log(result);
