import axiosClient from './client';

// TODO: Create this
export const login = async (email, password) => {
  try {
		console.log('Before Axios call', email, password);
    const response = await axiosClient.post('auth/login', {
      email,
      password,
    });
		console.log('Login response:', response);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return { error: true, message: error?.response?.data?.message ?? '' };
  }
};
