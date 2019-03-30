const getDataAndCallback = require('../../services/data.service').getDataAndCallback;

const legislationSelectQuery = `SELECT "BillID", "KnessetNum", "Name", "PrivateNumber", "StatusID", "PostponementReasonDesc", "LastUpdatedDate", "SubTypeID", "SubTypeDesc",
array(
  select i."FirstName"||' '||i."LastName"
  from
      bills_kns_billinitiator bi,
      members_mk_individual i
  where
      bi."PersonID" = i."PersonID"
      and bi."BillID" = s."BillID"
) bill_initiators,
array(
SELECT     "FilePath"
FROM       bills_kns_documentbill
WHERE      "BillID" = s."BillID"
ORDER BY   "GroupTypeID"
) files`;
module.exports = {
  // get committees summary for all knessets
  // https://app.redash.io/hasadna/queries/165441/source#284091
  all: (route, callback, _, page = 0, where = "true") => {
    const query = legislationSelectQuery + `
      FROM bills_kns_bill s
      WHERE ${where}
      ORDER BY "BillID" desc
      LIMIT 20
      OFFSET ` + (page*20) +`;
      `;
    getDataAndCallback(query, route, callback)
  },
  // get committees for specific knesset
  // https://app.redash.io/hasadna/queries/165441/source#284091
  byKnessetNum: (route, callback, knessetNum, page = '0', where = "true") => {
    const query = legislationSelectQuery + `
    FROM bills_kns_bill s
    where "KnessetNum" = ${knessetNum} AND ${where}
    ORDER BY "BillID" DESC
    LIMIT 20
    OFFSET ` + (page*20) +`;
    `;
    getDataAndCallback(query, route, callback)
  },
  countByKnessetNum: (route, callback, _1, _2) => {
    const query = `
    SELECT "KnessetNum", n."Name", count(*) as num_bills
    FROM bills_kns_bill b
    LEFT JOIN (
        SELECT "Name", "KnessetNum"
        FROM knesset_kns_knessetdates d
        GROUP BY "KnessetNum", "Name"
    ) n using("KnessetNum")
    GROUP BY "KnessetNum", n."Name"
    ORDER BY "KnessetNum" desc;
    `;
    getDataAndCallback(query, route, callback)
  },
};