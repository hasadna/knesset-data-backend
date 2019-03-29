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
    SELECT "BillID", "KnessetNum", "Name", "PrivateNumber", "StatusID", "PostponementReasonDesc", "LastUpdatedDate", array(
      select i."FirstName"||' '||i."LastName"
      from
          bills_kns_billinitiator bi,
          members_mk_individual i
      where
          bi."PersonID" = i."PersonID"
          and bi."BillID" = s."BillID"
  ) bill_initiators
    FROM bills_kns_bill s
    where "KnessetNum" = ${knessetNum}
    LIMIT 10;
  `;
    getDataAndCallback(query, route, callback)
  },
  countByKnessetNum: (route, callback) => {
    const query = `
    SELECT count(*), "KnessetNum"
    FROM bills_kns_bill
    GROUP BY "KnessetNum"
    ORDER BY "KnessetNum" desc;
  `;
    getDataAndCallback(query, route, callback)
  },
};