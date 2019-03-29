const getDataAndCallback = require('../../services/data.service').getDataAndCallback;

module.exports = {
  // get committees summary for all knessets
  // https://app.redash.io/hasadna/queries/165441/source#284091
  all: (route, callback) => {
    const query = `
			SELECT "BillID", "KnessetNum", "Name", "PrivateNumber", "StatusID", "PostponementReasonDesc", "LastUpdatedDate"
      FROM bills_kns_bill
      ORDERBY "BillID" desc
      LIMIT 10;
		`;
    getDataAndCallback(query, route, callback)
  },
  // get committees for specific knesset
  // https://app.redash.io/hasadna/queries/165441/source#284091
  byKnessetNum: (route, callback, knessetNum) => {
    const query = `
    SELECT "BillID", "KnessetNum", "Name", "PrivateNumber", "StatusID", "PostponementReasonDesc", "LastUpdatedDate"
    FROM bills_kns_bill
    where "KnessetNum" = ${knessetNum}
    LIMIT 10;
  `;
    getDataAndCallback(query, route, callback)
  },
};