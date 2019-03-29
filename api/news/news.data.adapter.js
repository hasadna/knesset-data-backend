const getData = require('../../services/data.service').getData;

module.exports = {
  all: (callback) => {
    // should be ordered by latest meetings (return latest 10 items)
    const latestCommittees = getData('committees/knesset-20.json');
    // add here:
    // latest laws (1) latest votes (2) etc. - add all requests to Promise.all
    Promise.all([latestCommittees])
        .then(data => callback(data));
  }
};