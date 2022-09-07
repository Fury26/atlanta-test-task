import React from 'react';
import { Link } from 'react-router-dom';

import styles from './index.module.scss';

const Header: React.FC = () => {
	return (
		<div className={styles.header}>
			<Link to="/" reloadDocument>
				GitHub Searcher
			</Link>
		</div>
	);
};

export default Header;
