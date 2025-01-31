import axiosClient from './client';

export const getContacts = async (params) => {
	try {
    const response = await axiosClient.get(`user/contacts?${new URLSearchParams(params)}`);
    return response.data;
  } catch (error) {
    return { error: true, message: error?.response?.data?.message ?? '' };
  }
};
