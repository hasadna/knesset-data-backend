const express = require('express');
const app = express();
// set logger namespace: debugBase:currentFile
const debug = require('./services/log.service').debugBuilder(module.filename);

app.use((req, res, next) => {
  debug(`request url: ${req.url}`);
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
const PORT = process.env.PORT || 4000;	//process.env.PORT is used by heroku
app.listen(PORT,
    () => debug(`data server listening on port ${PORT}. try: [URL:PORT]/api/committees-by-knesset/`)
);