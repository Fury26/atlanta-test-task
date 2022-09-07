import React from 'react';
import { Link } from 'react-router-dom';

import styles from './index.module.scss';

type Props = {
	name: string;
	url: string;
	forks: number;
	stars: number;
};

const ReposetoryRow: React.FC<Props> = ({ name, url, forks, stars }) => {
	return (
		<a className={styles.repo} href={url} target="_blank" rel="noreferrer">
			<span className={styles.repoName}>{name}</span>
			<div className={styles.repoNumbers}>
				<span>{forks} forks</span>
				<span>{stars} stars</span>
			</div>
		</a>
	);
};

export default ReposetoryRow;
