const express = require('express');
const app = express();

// const apicache = require('apicache');
// let cache = apicache.middleware;
// app.use(cache('5 minutes'));

// json log middleware
app.use((req, res, next) => {
	console.log(`request url: ${req.url}`);
	next();
});

app.use('/api', require('./api/members/members.route'));
app.use('/api', require('./api/committees/committees.route'));
app.get('/api/news', (req, res) => {
	res.json({latestItems: 'latestItems'});	// TODO: implement route for latest items
});

// error handling
app.use((err, req, res, next) => {
	if (err) {
		res.send('ERROR');
	}
});

app.listen(4000,
	() => console.log('data server listening on port 4000. try: http://localhost:4000/api/members/')
);