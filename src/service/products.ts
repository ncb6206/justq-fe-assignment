import { IPageParams } from '../types/product';
import instance from './config';

export const GET = async ({ type, pageSize, currentPage }: IPageParams) => {
  try {
    const actSize = pageSize ?? 0;
    const actPage = currentPage ?? 0;
    const response = await instance.get(`/`);
    console.log(
      response.data,
      response.data.slice((actPage - 1) * actSize, actPage * actSize),
    );

    if (type === 'length') return response.data.length;

    return response.data.slice((actPage - 1) * actSize, actPage * actSize);
  } catch (error) {
    return error;
  }
};
