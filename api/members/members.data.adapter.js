const getData = require('../../services/data.service').getData;

module.exports = {
	all: (callback) => {
		getData('members/index.json')
			.then(data => callback(data));
	},
	getById: (id, callback) => {
		getData(`members/${id}.json`)
			.then(data => callback(data));
	}
};