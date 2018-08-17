import 'whatwg-fetch';

const onlineData = () => fetch('/api/online', {
  method: 'GET',
  credentials: 'same-origin',
});

export default onlineData;
