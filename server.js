const express = require('express');
const app = express();
const glob = require( 'glob' );
const path = require( 'path' );
// set logger namespace: debugBase:currentFile
const debug = require('./services/log.service').debugBuilder(module.filename);

app.use((req, res, next) => {
  debug(`request url: ${req.url}`);
  next();
});

glob.sync( './api/**/*.route.js' ).forEach( function( file ) {
  app.use('/api', require( path.resolve( file ) ));
});

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