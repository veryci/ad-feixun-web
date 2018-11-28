import 'whatwg-fetch';

const dailyActive = ({ startTime, endTime, code, version }) => fetch(`/api/overview?startTime=${startTime}&endTime=${endTime}&code=${code}&version=${version}`);

export default dailyActive;