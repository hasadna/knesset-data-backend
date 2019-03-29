const getDataAndCallback = require('../../services/data.service').getDataAndCallback;

module.exports = {
	// get committees summary for all knessets
	// https://app.redash.io/hasadna/queries/165441/source#284091
	all: (route, callback) => {
		const query = `
			SELECT "CommitteeSessionID", "KnessetNum", "TypeDesc", "committee_name"
			FROM committees_kns_committeesession
			LIMIT 1;
		`;
		getDataAndCallback(query, route, callback)
	},
	// get committees for specific knesset
	// https://app.redash.io/hasadna/queries/165441/source#284091
	byKnessetId: (route, callback, knessetNum) => {
		const query = `
			SELECT "CommitteeSessionID", "KnessetNum", "TypeDesc", "committee_name"
			FROM committees_kns_committeesession
			LIMIT 1;
		`;
		getDataAndCallback(query, route, callback)
	},
};