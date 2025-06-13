import type {
  CreateParams,
  DataProvider,
  DeleteManyParams,
  DeleteParams,
  GetListParams,
  GetManyParams,
  GetManyReferenceParams,
  GetOneParams,
  UpdateManyParams,
  UpdateParams,
} from 'react-admin';

import { makeCall } from '@src/utils/api';

const getList = async (resource: string, _params: GetListParams) => {
  const response = await makeCall({ requireAuth: true, url: `${resource}`, method: 'get' });
  return response;
};

const getOne = async (resource: string, { id }: GetOneParams) => {
  const response = await makeCall({ requireAuth: true, url: `${resource}/${id}`, method: 'get' });
  return response;
};

const getMany = async (resource: string, { ids }: GetManyParams) => {
  const response = await makeCall({
    requireAuth: true,
    url: `${resource}`,
    method: 'get',
    params: { ids },
  });
  return response;
};

const getManyReference = async (resource: string, { target, id }: GetManyReferenceParams) => {
  const response = await makeCall({
    requireAuth: true,
    url: `${resource}/${id}`,
    method: 'get',
    params: { target },
  });
  return response;
};

const create = async (resource: string, { data }: CreateParams) => {
  const response = await makeCall({ requireAuth: true, url: `${resource}`, method: 'post', data });
  return response;
};

const update = async (resource: string, { id, data }: UpdateParams) => {
  const response = await makeCall({
    requireAuth: true,
    url: `${resource}/${id}`,
    method: 'put',
    data,
  });
  return response;
};

const updateMany = async (resource: string, { ids, data }: UpdateManyParams) => {
  const response = await makeCall({
    data,
    requireAuth: false,
    url: `${resource}`,
    method: 'put',
    params: { ids },
  });
  return response;
};

const deleteQueryFunction = async (resource: string, { id }: DeleteParams) => {
  const response = await makeCall({
    requireAuth: true,
    url: `${resource}/${id}`,
    method: 'delete',
  });
  return response;
};

const deleteManyQueryFunction = async (resource: string, { ids }: DeleteManyParams) => {
  const response = await makeCall({
    requireAuth: true,
    url: `${resource}`,
    method: 'delete',
    params: { ids },
  });
  return response;
};

const dataProvider: DataProvider = {
  getList,
  getOne,
  getMany,
  getManyReference,
  create,
  update,
  updateMany,
  delete: deleteQueryFunction,
  deleteMany: deleteManyQueryFunction,
};

export default dataProvider;
