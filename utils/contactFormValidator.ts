import { FormValidatorResultType } from '@/types';

export function contactFormValidator(data: FormData): FormValidatorResultType {
	const results: Array<FormValidatorResultType> = [];

	data.forEach((value, key) => {
		if ( !value ) {
			results.push({
				field: key,
				error: true
			});
		}
	});
	
	const result: FormValidatorResultType = results[0] ?? {
		field: '',
		error: false
	}

	return result; 
}