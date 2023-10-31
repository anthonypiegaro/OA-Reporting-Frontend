import data from './fakeData';

export const fetchData = (type) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data[type]);
    }, 5000); // simulates a 1 second delay to mimic an actual network request
  });
};

export async function customFetch(url, options) {
  const response = await fetch(url, options);

  if (response.status === 401) {  // Unauthorized
    const refreshResponse = await fetch('/refresh-token', { method: 'POST' });
    const refreshToken = await refreshResponse.json();
    localStorage.setItem('token', refreshToken.token);

    options.headers.Authorization = `Bearer ${refreshToken.token}`;
    return fetch(url, options);
  }

  return response;
}