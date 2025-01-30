import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// @import Components
import Login from '../screens/Login';
import Home from '../screens/Home';
// @import Context
import { useAuth } from '../contexts/Auth';
// TODO: Crete the new context to Sync contactss

const Stack = createNativeStackNavigator();

function StackNav() {
  const { user } = useAuth();
	console.log('User in stack:', user);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="Home" component={Home} />
      ) : (
				<Stack.Screen name="Login" component={Login} />
      )}
    </Stack.Navigator>
  );
}

export default StackNav;
