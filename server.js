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

// error handling
app.use((err, req, res, next) => {
	if (err) {
		res.send('ERROR');
	}
});

app.listen(3000,
	() => console.log('data server listening on port 3000. try: http://localhost:3000/api/members/')
);