const getDataAndCallback = require('../../services/data.service').getDataAndCallback;

module.exports = {
  all: (route, callback) => {
    // DEMO QUERY - REMOVE WITH REAL QUERY
    const query = `
		SELECT "CommitteeSessionID", "KnessetNum", "TypeDesc", "committee_name"
		FROM committees_kns_committeesession
		LIMIT 1;
		`;
    getDataAndCallback(query, route, callback)
  },
  getById: (route, callback, memberId) => {
    // DEMO QUERY - REMOVE WITH REAL QUERY
    const query = `
		SELECT "CommitteeSessionID"
		FROM committees_kns_committeesession
		LIMIT 1;
		`;
    getDataAndCallback(query, route, callback)
  }
};