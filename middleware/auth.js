export default function(context)
{
	return new Promise((resolve, reject) =>
	{
		//console.log('Waiting for authentication...');
		setTimeout(() => {
			//console.log('Authenticated.');
			resolve(true)
		}, 0)
	})
}