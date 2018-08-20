import 'whatwg-fetch';

const dailyActive = () => fetch('/api/active', {
  method: 'POST',
  credentials: 'same-origin',
});

export default dailyActive;
