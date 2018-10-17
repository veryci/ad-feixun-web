import 'whatwg-fetch';

const dailyActive = (time) => fetch(`/api/overview?time=${time}`);

export default dailyActive;
