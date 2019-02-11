const express = require('express');
const app = express();

// log middleware
app.use((req, res, next) => {
	// TODO: replace with debug
	console.log(`request url: ${req.url}`);
	next();
});

app.use('/api', require('./api/members/members.route'));
app.use('/api', require('./api/committees/committees.route'));
app.use('/api', require('./api/news/news.route')); // TODO: implement route for latest items

// error handling
// app.use((err, req, res) => {
// 	if (err) {
// 		res.send('ERROR');
// 	}
// });

app.listen(4000,
	() => debug('data server listening on port 4000. try: http://localhost:4000/api/committees-by-knesset/')
);