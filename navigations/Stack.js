import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// @import Components
import Login from '../screens/Login';
import Home from '../screens/Home';
// @import Context
import { useAuth } from '../contexts/Auth';
// TODO: Crete the new context to Sync contacts

const Stack = createNativeStackNavigator();

function StackNav() {
  const { user, accessToken } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {accessToken ? (
        <Stack.Screen name="Home" component={Home} />
      ) : (
				<Stack.Screen name="Login" component={Login} />
      )}
    </Stack.Navigator>
  );
}

export default StackNav;
