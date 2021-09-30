import axios from 'axios';
import Config from 'react-native-config';

const Api = axios.create({
  baseURL: Config.API_URL,
});

Api.defaults.headers.common['Content-Type'] = 'application/json';

export default Api;
