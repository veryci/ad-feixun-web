import 'whatwg-fetch';

const dailyActive = ({ a, b }) => fetch(`api/overview?startTime=${a}&endTime=${b}`);

export default dailyActive;
