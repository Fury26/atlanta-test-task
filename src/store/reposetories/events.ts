import { createEvent, Store } from 'effector';
import { Reposetories } from 'github-api/requests';

import { State } from '.';

export const setReposetories = createEvent<Reposetories>();
export const setSearchName = createEvent<string>();
export const setIsLoading = createEvent<boolean>();

export const addEvents = (store: Store<State>) =>
	store
		.on(setReposetories, (state, reposetories) => ({ ...state, reposetories }))
		.on(setIsLoading, (state, isLoading) => ({ ...state, isLoading }))
		.on(setSearchName, (state, searchName) => ({ ...state, searchName }));
