import { createStore } from 'effector';
import { Reposetories } from 'github-api/requests';

import { addEvents } from './events';

export type State = {
	reposetories: Reposetories;
	searchName: string;
	isLoading: boolean;
};

const $reposetoriesStore = addEvents(createStore<State>({ reposetories: [], searchName: '', isLoading: false }));

export default $reposetoriesStore;
