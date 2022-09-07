import React, { useCallback, useEffect, useState } from 'react';
import { useStore } from 'effector-react';
import { searchUsersByName } from 'github-api/requests';
import $store from 'store/users';
import { setUsers } from 'store/users/events';

import useDidUpdate from 'hooks/useDidUpdate';

import Input from 'components/debaunce-input';

import UserRow from '../user-row';
import styles from './index.module.scss';

const SearchUsers: React.FC = () => {
	const [searchName, setSearchName] = useState('');
	const { users } = useStore($store);

	const updateUsers = useCallback(async () => {
		const res = await searchUsersByName(searchName);
		setUsers(res);
	}, [searchName]);

	useDidUpdate(() => {
		updateUsers();
	}, [updateUsers, searchName]);

	useEffect(() => {
		!users.length && updateUsers();
	}, []);

	return (
		<div className={styles.container}>
			<Input placeholder="Search by users name" onChange={(val) => setSearchName(val)} />
			{users.map((user) => (
				<UserRow
					name={user.login}
					repoCount={user.public_repos || 0}
					avatarUrl={user.avatar_url}
					key={user.id}
					id={user.id}
				/>
			))}
		</div>
	);
};

export default SearchUsers;
