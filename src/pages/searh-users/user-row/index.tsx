import React from 'react';
import { Link } from 'react-router-dom';

import styles from './index.module.scss';

type Props = {
	avatarUrl: string;
	name: string;
	repoCount: number;
	id: string | number;
};

const UserRow: React.FC<Props> = ({ avatarUrl, name, repoCount, id }) => {
	return (
		<Link to={`users/${name}`} className={styles.row}>
			<img src={avatarUrl} />
			<span className={styles.rowName}>{name}</span>
			<span className={styles.rowRepoCount}>{repoCount}</span>
		</Link>
	);
};

export default UserRow;
