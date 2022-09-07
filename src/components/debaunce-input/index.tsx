import React, { useState } from 'react';
import { useDebounce } from 'use-debounce';

import useDidUpdate from '../../hooks/useDidUpdate';
import styles from './index.module.scss';

type Props = {
	placeholder?: string;
	onChange: (val: string) => void;
	initValue?: string;
	debounceDelay?: number;
};

const Input: React.FC<Props> = ({ placeholder, onChange, initValue = '', debounceDelay = 1000 }) => {
	const [text, setText] = useState(initValue);
	const [debouncedText] = useDebounce(text, debounceDelay);

	useDidUpdate(() => {
		onChange(debouncedText);
	}, [debouncedText]);

	return <input className={styles.input} onChange={(e) => setText(e.target.value)} value={text} placeholder={placeholder} />;
};

export default Input;
