import 'whatwg-fetch';

const dailyActive = ({ startTime, endTime, code }) => fetch(`/api/overview?startTime=${startTime}&endTime=${endTime}&code=${code}`);

export default dailyActive;