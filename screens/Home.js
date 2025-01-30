import React from 'react';
import { StyleSheet, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import SyncHomeAction from '../components/SyncHomeAction';

const Home = () => {
	const isUpToDate = false;

	const options = [
		{
			id: 'syncAll',
			label: 'Sync All Contacts',
			iconName: 'sync',
			onPress: () => console.log('Sync all'),
		},
		{
			id: 'syncOutdated',
			label: 'Sync Outdated Contacts',
			iconName: 'login',
			onPress: () => console.log('Sync One'),
		},
		{
			id: 'desync',
			label: 'Desync All Contacts',
			iconName: 'logout',
			onPress: () => console.log('Desync'),
		},
	];

	return (
		<View style={styles.container}>
			<Appbar.Header mode="small">
				<Appbar.Content
					title="Sync Contacts"
					titleStyle={styles.headerFont}
				/>
			</Appbar.Header>
			<View
				style={styles.body}
			>
				<Text style={{ fontSize: 16 }}>
					{isUpToDate
						? 'You are up to date with your contacts.'
						: 'Look like you are desynchronized with some contacts.'
					}
					</Text>
				{/* <AntDesign
					size={72}
					name={isUpToDate ? 'checkcircle' : 'clockcircleo'}
					color={isUpToDate ? '#4ade80' : '#fbbf24'}
					style={{ margin: 'auto'  }}
				/> */}
			</View>
			<View style={{ padding: 20, flex: 1, justifyContent: 'space-between' }}>
				<FlatList
					data={options}
					renderItem={({item}) => <SyncHomeAction option={item} />}
					contentContainerStyle={{ gap: 12 }}
				/>
			</View>
			<TouchableOpacity style={styles.logout}>
				<Text>Logout</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		flex: 1,
	},
	headerFont: { fontWeight: '700' },
	body: {
		display: 'flex',
		paddingHorizontal: 20,
		marginBottom: 20,
	},
	logout: {
		marginTop: 20,
		padding: 8,
		borderWidth: 1,
    borderColor: '#33B8C9',
    borderRadius: 12,
	},
});

export default Home;
