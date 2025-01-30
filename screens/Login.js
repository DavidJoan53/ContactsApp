import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Alert,
} from 'react-native';
import { useAuth } from '../contexts/Auth';
import { Formik } from 'formik';
import * as Yup from 'yup';
// TODO: VCerify Vector Icons
// import Feather from '@expo/vector-icons/Feather';
// import CheckBox from '@react-native-community/checkbox';

const Login = ({ navigation }) => {
  const { handleLogin } = useAuth();

  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isSecureActive, setIsSecureActive] = useState(true);
  // const [rememberMe, setRememberMe] = useState(false);

  const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Please enter valid email')
      .required('Email Address is Required'),
    password: Yup.string()
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .required('Password is required'),
  });

  const loginFormInputs = [
    {
      label: 'Email',
      name: 'email',
      // leftIcon: <Feather name="mail" size={24} color="#999999" />,
      extraProps: {
        keyboardType: 'email-address',
      },
    },
    {
      label: 'Password',
      name: 'password',
      // leftIcon: <Feather name="lock" size={24} color="#999999" />,
      rightIcon: (
        <TouchableOpacity
          onPress={() => setIsSecureActive(!isSecureActive)}
          style={{
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            right: 10,
            top: 13,
            zIndex: 999,
          }}
        >
          {/* <Feather
            name={isSecureActive ? 'eye' : 'eye-off'}
            size={24}
            color="black"
          /> */}
					<Text>Feather</Text>
        </TouchableOpacity>
      ),
      extraProps: {
        secureTextEntry: isSecureActive,
      },
    },
  ];

  async function onSubmit(values) {
    setIsLoggingIn(true);
    const response = await handleLogin({
      email: values.email,
      password: values.password,
    });

    if (response?.error) {
      Alert.alert('Opps!', response.message, [
        {
          text: 'Try again',
          style: 'cancel',
        },
      ]);
    } else {
      // navigation.navigate('BottomNav');
			console.log('Todo bien');
    }
    setIsLoggingIn(false);
  }

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require('../assets/logos/auth_logo.png')}
          style={styles.image}
        />

        <View style={{ marginTop: 20 }}>
          <Text style={styles.title}>Log In</Text>
          <Text style={styles.subtitle}>
            Enter your email and password to continue{' '}
          </Text>
        </View>
      </View>
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{ email: '', password: '' }}
        onSubmit={onSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isValid,
        }) => (
          <>
            {loginFormInputs.map(
              ({ label, name, extraProps, leftIcon, rightIcon }, index) => (
                <View key={`${name}_${index}`} style={{ position: 'relative' }}>
                  <Text style={styles.inputLabel}>{label}</Text>

                  <View
                    key={`${name}_${index}`}
                    style={{ position: 'relative' }}
                  >
                    {rightIcon}
                    {/* {leftIcon && (
                      <View
                        key={`${name}_${index}`}
                        style={{
                          position: 'absolute',
                          justifyContent: 'center',
                          alignItems: 'center',
                          left: 10,
                          top: 13,
                        }}
                      >
                        {leftIcon}
                      </View>
                    )} */}

                    <TextInput
                      name={name}
                      placeholder={`Enter your ${label}`}
                      style={styles.input}
                      onChangeText={handleChange(name)}
                      onBlur={handleBlur(name)}
                      value={values[name]}
                      {...extraProps}
                    />
                  </View>

                  {errors[name] && (
                    <Text style={styles.errorText}>{errors[name]}</Text>
                  )}
                  {/* {name === 'password' && (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 20,
                      }}
                    >
                      <View style={styles.checkboxContainer}>
                        <CheckBox
                          style={styles.checkbox}
                          value={rememberMe}
                          onValueChange={() => setRememberMe(!rememberMe)}
                          onCheckColor="#33B8C9"
                          tintColor="#CCCCCC"
                          tintColors={{ true: '#33B8C9', false: '#CCCCCC' }}
                        />
                        <Text>Remember me</Text>
                      </View>
                    </View>
                  )} */}
                </View>
              ),
            )}

            <TouchableOpacity
              style={styles.button1}
              disabled={!isValid}
              onPress={handleSubmit}
            >
              {isLoggingIn && (
                <Text style={{ color: '#fff', fontSize: 18 }}>Loading...</Text>
              )}
              {!isLoggingIn && (
                <Text style={{ color: '#fff', fontSize: 18 }}>Login</Text>
              )}
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#FBFBFB',
    width: '100%',
    gap: 30,
    display: 'flex',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'left',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'left',
  },
  image: {
    width: 240,
    height: 80,
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'transparent',
    fontFamily: 'DM Sans',
    fontSize: 14,
    lineHeight: 18,
    color: '#000',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    padding: 10,
    flexDirection: 'row',
    width: '100%',
    height: 50,
    paddingLeft: 40,
  },
  button1: {
    backgroundColor: '#33B8C9',
    padding: 10,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
  },
  text: {
    color: '#222',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    lineHeight: 20,
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    position: 'absolute',
    top: 80,
  },
  inputLabel: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: '500',
    color: '#666666',
  },
  passwordContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#000',
    paddingBottom: 10,
  },
  inputStyle: {
    flex: 1,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'left',
    alignItems: 'center',
    gap: 10,
  },
});

export default Login;
