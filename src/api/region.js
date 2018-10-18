import 'whatwg-fetch';

const regionData = () => fetch('/api/region', {
  method: 'GET',
  credentials: 'same-origin',
});

export default regionData;
