import React, { useEffect, useRef } from 'react';

const useDidUpdate = (callback: () => void, dependecies: any[] = []) => {
	const isFirst = useRef(true);

	useEffect(() => {
		if (isFirst.current) {
			isFirst.current = false;
			return;
		}

		callback();
	}, dependecies);
};

export default useDidUpdate;
