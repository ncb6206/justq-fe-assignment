import { IPageParams } from '../types/product';
import instance from './config';

export const GET = async ({ type, pagesize, currentpage }: IPageParams) => {
  try {
    const actSize = pagesize ?? 0;
    const actPage = currentpage ?? 0;
    const response = await instance.get(`/`);

    if (type === 'length') return response.data.length;

    return response.data.slice((actPage - 1) * actSize, actPage * actSize);
  } catch (error) {
    return error;
  }
};
