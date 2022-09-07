import { createEvent, Store } from 'effector';
import { Reposetories } from 'github-api/requests';

import { State } from '.';

export const setReposetories = createEvent<Reposetories>();

export const addEvents = (store: Store<State>) =>
	store.on(setReposetories, (state, reposetories) => ({ ...state, reposetories }));
