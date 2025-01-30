import React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { login } from '../services/users';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	const loadUser = () => {
		const accessToken = AsyncStorage.getItem('accessToken');
		if (accessToken) {
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
		if (response?.token) {
			// const newUser = {
			// 	...response,
			// 	token: response?.token,
			// };
			// await AsyncStorage.setItem('accessToken', response?.token);
			// setUser(newUser);
			// loadUser();
		}
		return response;
	};

	// const handleRegister = async ({ email, password, name }) => {
	//   const response = await register(email, password, name);
	//   if (response?.token) {
	//     const user = {
	//       ...response,
	//       token: response?.token,
	//     };
	//     await SecureStore.setItemAsync('accessToken', response?.token);
	//     setUser(user);
	//     loadUser();
	//   }
	//   return response;
	// };

	const handleLogout = async () => {
		setUser(null);
		await AsyncStorage.removeItem('accessToken');
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				setUser,
				handleLogin,
				handleLogout,
				// handleRegister,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
