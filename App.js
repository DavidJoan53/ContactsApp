import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import StackNav from './navigations/Stack';
import { PaperProvider } from 'react-native-paper';
// @import Providers
import { AuthProvider } from './contexts/Auth';
import { SyncProvider } from './contexts/Sync';

function App() {
  return (
    <NavigationContainer style={styles.container}>
			<AuthProvider>
				<SyncProvider>
					<PaperProvider>
						<StackNav/>
					</PaperProvider>
				</SyncProvider>
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
