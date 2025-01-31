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
		}
	};

	useEffect(() => {
		loadUser();
	}, []);

	const handleLogin = async ({ email, password }) => {
		const response = await login(email, password);
		if (response?.access_token) {
			await AsyncStorage.setItem('accessToken', response?.access_token);
			setAccessToken(response?.access_token);
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
