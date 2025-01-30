import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { List } from 'react-native-paper';
import AntDesign from '@react-native-vector-icons/ant-design';

const SyncHomeAction = ({ option }) => {
	return (
		<TouchableOpacity onPress={option.onPress}>
			<List.Item
				title={option.label}
				titleStyle={styles.text}
				style={styles.container}
				left={() => (<View
						style={styles.icon}
					>
						{/* <AntDesign name={option.iconName} size={24} /> */}
						<AntDesign name="home" size={50} color="blue" />
					</View>
				)}
			/>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 20,
		borderWidth: 1,
		borderColor: 'black',
		borderRadius: 12,
	},
	text: { fontSize: 16 },
	icon: {
		flexDirection: 'row',
		alignItems: 'center',
	},
});

export default SyncHomeAction;
