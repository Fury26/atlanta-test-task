import { createStore } from 'effector';
import { Reposetories } from 'github-api/requests';

import { addEvents } from './events';

export type State = {
	reposetories: Reposetories;
};

const $reposetoriesStore = addEvents(
	createStore<State>({
		reposetories: [],
	}),
);

export default $reposetoriesStore;
