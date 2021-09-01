import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_API_URL : process.env.REACT_APP_PROD_API_URL;
const periods = '/warehouse';
export default async function getAllWarehouses() {
  const { data } = await axios.get(baseURL + periods);
  return data;
}
