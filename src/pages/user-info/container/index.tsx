import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import Input from '../../../components/debaunce-input';
import { getUserByName, searchUserRepositories } from '../../../github-api/requests';
import useDidUpdate from '../../../hooks/useDidUpdate';
import ReposetoryRow from '../reposetory-row';
import styles from './index.module.scss';

type User = Awaited<Promise<PromiseLike<ReturnType<typeof getUserByName>>>>;
type Reposetories = Awaited<Promise<PromiseLike<ReturnType<typeof searchUserRepositories>>>>;

const UserInfo = () => {
	const [user, setUser] = useState<User | null>(null);
	const [reposetories, setReposetoires] = useState<Reposetories>([]);
	const [repoName, setRepoName] = useState('');

	const { id } = useParams();
	const navigate = useNavigate();

	const getUser = useCallback(async () => {
		if (!id) {
			return navigate('/');
		}
		const res = await getUserByName(id);
		setUser(res);
	}, [id, navigate]);

	const searchRepositories = useCallback(async () => {
		if (!id) {
			return;
		}
		const res = await searchUserRepositories(id, repoName);
		console.log('res', res);

		setReposetoires(res);
	}, [id, repoName]);

	useEffect(() => {
		getUser();
	}, [getUser]);

	useEffect(() => {
		searchRepositories();
	}, [searchRepositories, repoName]);

	if (!user) {
		return null;
	}

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
			<Input initValue={repoName} onChange={(val) => setRepoName(val)} placeholder="Search reposetories" />
			<div className={styles.reposetories}>
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
