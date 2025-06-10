import axios from 'axios';
import type { DataProvider, GetListParams, GetListResult, RaRecord } from 'react-admin';

const dataProvider: DataProvider = {
  getList,
  getOne: async () => {},
  getMany: async () => {},
  getManyReference: async () => {},
  create: async () => {}
  update: async () => {}
  updateMany: async () => {},
  delete: async () => {},
  deleteMany: async () => {},
};

const getList: GetListResult = (resource: string, params: GetListParams) => {
  const response = await axios.get(`/${resource}`);
  const data = response.data;
  return data
}
