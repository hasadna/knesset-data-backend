// set logger namespace: debugBase:currentFile
const debug = require('./log.service').debugBuilder(module.filename);
const escape = require("pg-escape");

module.exports.requestToWhereClause = function(query, allowedNumFields, allowedStrFields) {
  var demands = [];
  for(let field in allowedNumFields) {
    field = allowedNumFields[field];
    if(typeof query[field] !== 'undefined') {
      demands.push('"' + field + "\"=" + Number(query[field]));
    }
    if(typeof query[field + "Start"] !== 'undefined') {
      demands.push('"' + field + "\">=" + Number(query[field + "Start"]));
    }
    if(typeof query[field + "End"] !== 'undefined') {
      demands.push('"' + field + "\"<=" + Number(query[field + "End"]));
    }
  }
  for(let field in allowedStrFields) {
    field = allowedStrFields[field];
    if(typeof query[field] !== 'undefined') {
      demands.push('"' + field + "\" LIKE " + escape("'%%%s%%'", query[field]));
    }
  }
  return demands.join(" AND ");
};