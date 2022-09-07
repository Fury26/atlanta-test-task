import { createEvent, Store } from 'effector';

import { User, Users } from '../../github-api/requests';
import { State } from '.';

export const setUsers = createEvent<Users>();
export const setCurrentUser = createEvent<User>();
export const setSearchUser = createEvent<string>();
export const setIsLoading = createEvent<boolean>();

export const addEvents = (store: Store<State>) =>
	store
		.on(setUsers, (state, users) => ({ ...state, users }))
		.on(setSearchUser, (state, searchUser) => ({ ...state, searchUser }))
		.on(setIsLoading, (state, isLoading) => ({ ...state, isLoading }))
		.on(setCurrentUser, (state, currentUser) => ({ ...state, currentUser }));
