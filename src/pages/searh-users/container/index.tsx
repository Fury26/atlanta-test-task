import React, { useEffect, useState } from 'react';

import Input from '../../../components/debaunce-input';
import { searchUsersByName } from '../../../github-api/requests';
import useDidUpdate from '../../../hooks/useDidUpdate';
import UserRow from '../user-row';
import styles from './index.module.scss';

type T = Awaited<Promise<PromiseLike<ReturnType<typeof searchUsersByName>>>>;

const SearchUsers: React.FC = () => {
	const [searchName, setSearchName] = useState('');
	const [users, setUsers] = useState<T>([]);

	const updateUsers = async () => {
		const res = await searchUsersByName(searchName);
		setUsers(res);
		console.log('res', res);
	};

	useEffect(() => {
		updateUsers();
	}, [searchName]);

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
