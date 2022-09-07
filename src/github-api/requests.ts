import { setIsLoading as setLoadingRepo } from 'store/reposetories/events';
import { setIsLoading } from 'store/users/events';

import { octokit } from '.';

export const searchUsersByName = async (username: string) => {
	setIsLoading(true);
	const res = await octokit.request('GET /search/users', { q: `${username} in:user` });
	setIsLoading(false);
	return res.data.items;
};

export const getUserByName = async (username: string) => {
	const res = await octokit.request('GET /users/{username}', { username });

	return res.data;
};

export const searchUserRepositories = async (username: string, repoName: string = '') => {
	setLoadingRepo(true);
	const q = repoName ? `${repoName} in:name ` : '';
	const res = await octokit.request('GET /search/repositories', {
		q: q + `user:${username}`,
	});
	setLoadingRepo(false);

	return res.data.items;
};

export type Users = Awaited<Promise<PromiseLike<ReturnType<typeof searchUsersByName>>>>;
export type Reposetories = Awaited<Promise<PromiseLike<ReturnType<typeof searchUserRepositories>>>>;
export type User = Awaited<Promise<PromiseLike<ReturnType<typeof getUserByName>>>>;
