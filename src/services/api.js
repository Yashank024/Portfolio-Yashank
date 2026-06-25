import { config } from '@lib/config';

export async function fetchFromApi(endpoint, options = {}) {
  const url = `${config.apiBaseUrl}${endpoint}`;
  try {
    const response = await fetch(url, options);
    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
}
