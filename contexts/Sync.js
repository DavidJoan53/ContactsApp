import React from 'react';
import { createContext, useContext, useState } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import Contacts from 'react-native-contacts';
import { getContacts } from '../services/contacts';


const SyncContext = createContext();

export const SyncProvider = ({ children }) => {
	const [contacts, setContacts] = useState();
	const [pagination, setPagination] = useState(null);
	const [progress, setProgress] = useState(0);

	console.log('Contacts:', Contacts);

	const requestContactsPermission = async () => {
		if (Platform.OS === 'android') {
			const granted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS,
			);
			return granted === PermissionsAndroid.RESULTS.GRANTED;
		}
		return true;
	};

	const saveContactOnDevice = async (contact) => {
		console.log('saveContact:', contact);
		PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
			title: 'Contacts',
			message: 'This app would like to view your contacts.',
			buttonPositive: 'Please accept bare mortal',
	})
			.then((res) => {
					console.log('Permission: ', res);
					Contacts.getAll()
							.then((contacts) => {
									// work with contacts
									console.log(contacts);
							})
							.catch((e) => {
									console.log(e);
							});
			})
			.catch((error) => {
					console.error('Permission error: ', error);
			});
		// try {
		// 	const permissionGranted = await requestContactsPermission();
		// 	if (!permissionGranted) {
		// 		throw new Error('Permission not granted');
		// 	}

		// 	// const newContact = {
		// 	// 	givenName: contact.name,
		// 	// 	phoneNumbers: [{label: 'mobile', number: contact?.phone1 || contact?.phone2}],
		// 	// };
		// 	const newContact =
		// 	console.log('NewContact:', Contacts?.addContact);
		// 	await Contacts.addContact(newContact);
		// 	console.log('Contact saved:', newContact);
		// } catch (error) {
		// 	console.error('Error saving contact:', error);
		// }
	};

	const handleSyncContacts = async ({ params }) => {
		const response = await getContacts(params || { page: 1 });
		setContacts(response.data);
		const newPagination = {...response};
		delete newPagination.data;
		setPagination(newPagination);
		console.log('handleSyncContacts:', response);
		response.data.map(contact => {
			if(contact?.phone1 || contact?.phone2) {
				if(contact?.id === 2) {
					saveContactOnDevice(contact);
				}
				setProgress(((progress + 1) * 100) / pagination.total);
			}
		});
	};

	return (
		<SyncContext.Provider
			value={{
				pagination,
				progress,
				// requestContactsPermission,
				// saveContactOnDevice,
				handleSyncContacts,
			}}
		>
			{children}
		</SyncContext.Provider>
	);
};

export const useSync = () => useContext(SyncContext);
