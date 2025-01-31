import React from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet, FlatList, Text, TouchableOpacity, View } from 'react-native';
import AntDesign from '@react-native-vector-icons/ant-design';
import SyncHomeAction from '../components/SyncHomeAction';
import { useSync } from '../contexts/Sync';

const Home = () => {
	const isUpToDate = false;

	const { pagination, progress, handleSyncContacts } = useSync();

	const options = [
		{
			id: 'syncAll',
			label: 'Sync All Contacts',
			iconName: 'sync',
			onPress: handleSyncContacts,
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
				<AntDesign
					size={72}
					name={isUpToDate ? 'check' : 'time'}
					color={isUpToDate ? '#4ade80' : '#fbbf24'}
					style={{ margin: 'auto'  }}
				/>
			</View>
			<View style={{ padding: 20, flex: 1, justifyContent: 'space-between' }}>
				{pagination && (
					<Text style={styles.progress}>
						{Math.round(progress * 1000) / 1000}% / 100%
					</Text>
				)}
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
	progress: {
		marginBottom: 10,
		textAlign: 'center',
		fontSize: 18,
		fontWeight: '800',
	},
	body: {
		display: 'flex',
		paddingHorizontal: 20,
		marginTop: 16,
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
