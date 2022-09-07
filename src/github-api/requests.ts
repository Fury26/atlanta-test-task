import { octokit } from '.';

export const searchUsersByName = async (username: string) => {
	const res = await octokit.request('GET /search/users', { q: `${username} in:user` });

	return res.data.items;
};

export const getUserByName = async (username: string) => {
	const res = await octokit.request('GET /users/{username}', { username });

	return res.data;
};

export const searchUserRepositories = async (username: string, repoName: string = '') => {
	const res = await octokit.request('GET /users/{username}/repos', { q: `${repoName} in:name`, username });

	return res.data;
};