const debugBase = require('debug')('oknesset');

module.exports.debugBuilder = (filename) => {
  // get only filename
  let namespace = filename.split(/[\\/]/).pop();
  // remove file extension
  namespace = namespace.substring(0, namespace.lastIndexOf('.'));
  return debugBase.extend(`[${namespace}]`);
};
