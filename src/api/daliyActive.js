import 'whatwg-fetch';

const dailyActiveData = () => fetch('/api/active', {
  method: 'POST',
  credentials: 'same-origin',
});

export default dailyActiveData;
