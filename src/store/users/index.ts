import { createStore } from 'effector';

import { User, Users } from '../../github-api/requests';
import { addEvents } from './events';

export type State = {
	users: Users;
	currentUser?: User;
};

const $usersStore = addEvents(
	createStore<State>({
		users: [],
	}),
);

export default $usersStore;
