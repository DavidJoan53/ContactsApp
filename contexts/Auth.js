import React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { login } from '../services/users';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [accessToken, setAccessToken] = useState(null);

	const loadUser = async () => {
		const oldAccessToken = await AsyncStorage.getItem('accessToken');
		if (oldAccessToken) {
			setAccessToken(oldAccessToken);
			// const userData = await getUser();
			// setUser({ ...userData });
		}
	};

	useEffect(() => {
		loadUser();
	}, []);

	const handleLogin = async ({ email, password }) => {
		const response = await login(email, password);
		console.log('Response:', response);
		if (response?.access_token) {
			// const newUser = {
			// 	...response,
			// 	token: response?.token,
			// };
			await AsyncStorage.setItem('accessToken', response?.access_token);
			setAccessToken(response?.access_token);
			// setUser(newUser);
			// loadUser();
		}
		return response;
	};

	const handleLogout = async () => {
		setUser(null);
		await AsyncStorage.removeItem('accessToken');
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				accessToken,
				setUser,
				handleLogin,
				handleLogout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
