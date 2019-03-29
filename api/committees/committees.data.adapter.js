const getDataAndCallback = require('../../services/data.service').getDataAndCallback;

module.exports = {
	// get committees summary for all knessets
	// https://app.redash.io/hasadna/queries/165441/source#284091
	all: (route, callback) => {
		const query = `
		select committees.knesset_num, committees.knesset_name, committees.num_committees, sessions.num_sessions from (
			select k.knesset_num, k.knesset_name, count(1) num_committees
			from (
				select "KnessetNum" knesset_num, "Name" knesset_name from knesset_kns_knessetdates
				group by "KnessetNum", "Name"
			) k, committees_kns_committee c
			where c."KnessetNum" = k.knesset_num
			group by k.knesset_num, k.knesset_name
		) committees, (
			select k.knesset_num, k.knesset_name, count(1) num_sessions
			from (
				select "KnessetNum" knesset_num, "Name" knesset_name from knesset_kns_knessetdates
				group by "KnessetNum", "Name"
			) k, committees_kns_committeesession s
			where s."KnessetNum" = k.knesset_num
			group by k.knesset_num, k.knesset_name
		) sessions
		where committees.knesset_num = sessions.knesset_num
		order by knesset_num desc
		`;
		getDataAndCallback(query, route, callback)
	},
	// get committees for specific knesset
	// https://app.redash.io/hasadna/queries/165441/source#284091
	byKnessetId: (route, callback, knessetNum) => {
		const query = `
		select s.num_sessions, c.*
		from committees_kns_committee c, (
			select s."CommitteeID" committee_id, count(1) num_sessions
			from committees_kns_committeesession s
			where s."KnessetNum" = ${knessetNum}
			group by s."CommitteeID"
		) s
		where c."CommitteeID" = s.committee_id
		order by s.num_sessions desc
		`;
		getDataAndCallback(query, route, callback)
	},
	// get data for specific committee
	// MOCK DATA
	byCommitteeId: (route, callback, knessetNum, committeeId) => {
		const query = `
		SELECT "CommitteeSessionID", "KnessetNum", "TypeDesc", "committee_name"
		FROM committees_kns_committeesession
		LIMIT 1;
		`;
		getDataAndCallback(query, route, callback)
	},
	// get data for specific committee meeting
	// MOCK DATA
	byMeetingId: (route, callback,  knessetNum, committeeId, meetingId) => {
		const query = `
		SELECT "CommitteeSessionID", "KnessetNum", "TypeDesc", "committee_name"
		FROM committees_kns_committeesession
		WHERE "KnessetNum" = ${knessetNum}
		ORDER BY "StartDate" desc
		`;
		getDataAndCallback(query, route, callback)
	}
};