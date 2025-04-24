import { PostRequestResponseType } from '@/types';

export function postRequest(path: string, data: FormData, headers: Record<string, string> = {}): Promise<PostRequestResponseType> {
	const config = useRuntimeConfig();
	const apiUrl = config.public.API_PAGES_DATA_URL;

	return fetch(apiUrl + path, {
		method: 'POST',
		headers: headers,
		body: data
	}).then((response) => {
		return response.json();
	}).then((data) => {
		return data;
	});
}