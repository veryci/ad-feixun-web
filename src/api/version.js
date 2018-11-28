import 'whatwg-fetch';

const version = () => fetch('/api/versions');

export default version;
