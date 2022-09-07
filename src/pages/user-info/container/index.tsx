import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useStore } from 'effector-react';
import { getUserByName, searchUserRepositories } from 'github-api/requests';
import $reposetoriesStore from 'store/reposetories';
import { setReposetories, setSearchName } from 'store/reposetories/events';
import $usersStore from 'store/users';
import { setCurrentUser } from 'store/users/events';

import useDidUpdate from 'hooks/useDidUpdate';

import Input from 'components/debaunce-input';
import Loader from 'components/loader';

import ReposetoryRow from '../reposetory-row';
import styles from './index.module.scss';

const UserInfo = () => {
	const { currentUser: user } = useStore($usersStore);
	const { reposetories, searchName, isLoading } = useStore($reposetoriesStore);
	const [repoName, setRepoName] = useState('');

	const { id } = useParams();
	const navigate = useNavigate();

	const getUser = useCallback(async () => {
		if (!id) {
			return navigate('/');
		}
		const res = await getUserByName(id);
		setCurrentUser(res);
	}, [id, navigate]);

	useEffect(() => {
		setSearchName(repoName);
	}, [repoName]);

	const searchRepositories = useCallback(
		async (defaultName?: string) => {
			if (!id) {
				return;
			}
			const name = defaultName || repoName;
			const res = await searchUserRepositories(id, name);
			setReposetories(res);
		},
		[id, repoName],
	);

	useEffect(() => {
		if (user?.login === id) {
			return;
		}
		getUser();
	}, [getUser, id, user?.login]);

	useDidUpdate(() => {
		searchRepositories();
	}, [searchRepositories, repoName]);

	useEffect(() => {
		if (reposetories.length && id === user?.login) {
			return;
		}
		searchRepositories(searchName);
	}, []);

	if (!user) {
		return null;
	}

	if (user.login !== id) {
		return (
			<div className={styles.loader}>
				<Loader />
			</div>
		);
	}

	const loader = isLoading ? (
		<div className={styles.reposetoriesLoader}>
			<Loader />
		</div>
	) : null;

	return (
		<div className={styles.container}>
			<div className={styles.infoBlock}>
				<img src={user.avatar_url} />
				<div className={styles.infoBlockTexts}>
					<span>{user.login}</span>
					<span>{user.email || 'Email not found'}</span>
					<span>{user.location || 'Location not found'}</span>
					<span>{user.created_at}</span>
					<span>{user.followers} followers</span>
					<span>{user.following} following</span>
				</div>
			</div>
			<p className={styles.bio}>{user.bio || 'Bio is not specified'}</p>
			<Input initValue={searchName || repoName} onChange={(val) => setRepoName(val)} placeholder="Search reposetories" />
			<div className={styles.reposetories}>
				{loader}
				{reposetories.map((repo) => (
					<ReposetoryRow
						key={repo.id}
						name={repo.name}
						url={repo.html_url}
						forks={repo.forks_count || 0}
						stars={repo.stargazers_count || 0}
					/>
				))}
			</div>
		</div>
	);
};

export default UserInfo;
