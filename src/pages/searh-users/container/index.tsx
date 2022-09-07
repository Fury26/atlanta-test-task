import React, { useCallback, useEffect, useState } from 'react';
import { useStore } from 'effector-react';
import { searchUsersByName } from 'github-api/requests';
import $store from 'store/users';
import { setSearchUser, setUsers } from 'store/users/events';

import useDidUpdate from 'hooks/useDidUpdate';

import Input from 'components/debaunce-input';
import Loader from 'components/loader';

import UserRow from '../user-row';
import styles from './index.module.scss';

const SearchUsers: React.FC = () => {
	const [searchName, setSearchName] = useState('');
	const { users, searchUser, isLoading } = useStore($store);

	const updateUsers = useCallback(async () => {
		setSearchUser(searchName);
		const res = await searchUsersByName(searchName);
		setUsers(res);
	}, [searchName]);

	useDidUpdate(() => {
		updateUsers();
	}, [updateUsers, searchName]);

	useEffect(() => {
		!users?.length && updateUsers();
	}, []);

	const loader = isLoading ? (
		<div className={styles.loader}>
			<Loader />
		</div>
	) : null;

	return (
		<div className={styles.container}>
			<Input initValue={searchUser} placeholder="Search by users name" onChange={(val) => setSearchName(val)} />
			<div className={styles.containerUsers}>
				{loader}

				{users?.map((user) => (
					<UserRow
						name={user.login}
						repoCount={user.public_repos || 0}
						avatarUrl={user.avatar_url}
						key={user.id}
						id={user.id}
					/>
				))}
			</div>
		</div>
	);
};

export default SearchUsers;
