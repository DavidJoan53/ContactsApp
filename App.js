import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import StackNav from './navigations/Stack';
// @import Providers
import { AuthProvider } from './contexts/Auth';
import { PaperProvider } from 'react-native-paper';

function App() {
  return (
    <NavigationContainer style={styles.container}>
			<AuthProvider>
				<PaperProvider>
					<StackNav/>
				</PaperProvider>
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
