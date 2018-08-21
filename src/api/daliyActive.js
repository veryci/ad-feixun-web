import 'whatwg-fetch';

const dailyActive = ({ a, b }) => fetch(`/overview?startTime=${a}&endTime=${b}`);

export default dailyActive;
