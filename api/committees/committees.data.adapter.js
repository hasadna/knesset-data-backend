const getData = require('../../services/data.service').getData;

module.exports = {
	all: (callback) => {
		getData('committees/index.json')
			.then(data => callback(data));
	},
	getById: (id, callback) => {
		getData(`committees/${id}.json`)
			.then(data => callback(data));
	},
	getByMeeting: (meetingId, callback) => {
		const meetingRoute = meetingId.replace(/-/g, '/');
		console.log(`/meetings/${meetingRoute}.json`);

		getData(`meetings/${meetingRoute}.json`)
			.then(data => callback(data));
	}
};