import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_API_URL : process.env.REACT_APP_PROD_API_URL;
export async function getAllPeriods() {
  const { data } = await axios.get(`${baseURL}/period`);
  return data;
}

export async function addPeriod(period) {
  const { data } = await axios.post(`${baseURL}/period`, period);
  console.log(`added period: ${data.id}`);

  return data;
}

export async function updatePeriod(period) {
  const { data } = await axios.put(`${baseURL}/period/${period.id}`, period);
  return data;
}

export async function deletePeriod(id) {
  const { data } = await axios.delete(`${baseURL}/period/${id}`);
  return data;
}
