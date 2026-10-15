function requiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}`
    );
  }

  return value;
}

export const env = {
  baseURL: requiredEnv('BASE_URL'),
  username: requiredEnv('TEST_USER'), // Updated from USERNAME
  password: requiredEnv('TEST_PASS'), // Updated from PASSWORD
};