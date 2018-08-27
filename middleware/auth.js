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
		.then( response =>
		{
			if(response.status === 500) throw new Error('Unauthorized, reason: Internal server error.');
			if(response.status === 401) throw new Error('Unauthorized, reason: Wrong login credentials.');
			if(response.status !== 200) throw new Error('Unauthorized, reason: Unknown server error.');

			return response.json();
		})
		.then( json =>
		{
				context.store.dispatch('setAuthUser', json);
				resolve(true);
		})
		.catch( error => {
			reject(error.message);
			context.redirect("/auth");
		});
	})
}