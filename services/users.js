import axiosClient from './client';

// TODO: Create this
export const login = async (email, password) => {
  try {
    const response = await axiosClient.post('auth/login', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    return { error: true, message: error?.response?.data?.message ?? '' };
  }
};
