const baseURL = 'https://oknesset.org';
const fetch = require('node-fetch');
const NanoCache = require('nano-cache');
const cache = new NanoCache({
	ttl: 60000,                      // max aged for cache entry - ttl 60 seconds
	bytes : 100 * NanoCache.SIZE.MB, // max memory use for data
});

module.exports.getData = (route) => {
	cache.clearExpired();	// deletes all expired key with their values to free up memory

	const cachedData = cache.get(route);	// get from cache if available

	if(cachedData) {
		return new Promise((resolve) => resolve(cachedData));	// returned cached data
	} else {
		console.log(`fetch data: ${baseURL}/${route}`);
		return fetch(`${baseURL}/${route}`)
			.then(res => res.json())
			.then(data => cache.set(route, data));	// save to cache and return data
	}
};