import 'whatwg-fetch';

const dailyActive = ({ startTime, endTime }) => fetch(`/api/overview?startTime=${startTime}&endTime=${endTime}`);

export default dailyActive;
