import { setIsLoading as setLoadingRepo } from 'store/reposetories/events';
import { setIsLoading } from 'store/users/events';

import { octokit } from '.';

export const searchUsersByName = async (username: string) => {
	setIsLoading(true);

	// to get reposetories count we need to fetch users all reposetories(because public_repos is not returned by server, but it should via docs), which too long.

	// const getUsers = async () => {
	// 	return (await octokit.request('GET /search/users', { q: `${username} in:user` })).data.items[0];
	// };
	// type Item = Awaited<Promise<PromiseLike<ReturnType<typeof getUsers>>>> & { repos_count?: number };
	// type Res = {
	// 	data: {
	// 		items: Item[];
	// 		total_count: number;
	// 		incomplete_results: boolean;
	// 	};
	// 	url: string;
	// 	headers: any;
	// 	status: 200;
	// };
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
