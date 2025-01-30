import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './contexts/Auth';
import StackNav from './navigations/Stack';

function App() {
  return (
    <NavigationContainer style={styles.container}>
			<AuthProvider>
				<StackNav/>
			</AuthProvider>
		</NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});


export default App;
