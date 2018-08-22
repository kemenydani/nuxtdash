export default function(context)
{
	return new Promise((resolve, reject) =>
	{
		return fetch('/api/auth', {
			method: 'GET',
			credentials : 'include',
			headers : {
				'Content-Type': 'application/json',
				'X-Requested-With' : 'XMLHttpRequest',
			}
		})
		.then( response => response.json() )
		.then( userData =>
		{
			console.log(userData)
				context.store.dispatch('setAuthUser', userData);
				resolve(true)
		})
		.catch( error => {
			console.error('Unauthorized: ' + error.message);
			reject('Unauthorized');
		})
		/*
		//console.log('Waiting for authentication...');
		setTimeout(() => {
			//console.log('Authenticated.');
			resolve(true)
		}, 0)*/
	})
}