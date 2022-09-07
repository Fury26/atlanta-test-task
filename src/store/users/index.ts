import { createStore } from 'effector';

import { User, Users } from '../../github-api/requests';
import { addEvents } from './events';

export type State = {
	users?: Users;
	currentUser?: User;
	searchUser: string;
	isLoading: boolean;
};

const $usersStore = addEvents(createStore<State>({ searchUser: '', isLoading: false }));

export default $usersStore;
