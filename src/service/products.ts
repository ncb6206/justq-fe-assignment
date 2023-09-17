import { IPageParams } from '../types/product';
import instance from './config';

export const GET = async ({ type, limit, page }: IPageParams) => {
  try {
    const actPage = page ?? 0;
    const actLimit = limit ?? 0;
    const response = await instance.get(`/`);
    console.log(
      response.data,
      response.data.slice(actPage * actLimit, (actPage + 1) * actLimit),
    );

    if (type === 'length') return response.data.length;

    return response.data.slice(actPage * actLimit, (actPage + 1) * actLimit);
  } catch (error) {
    return error;
  }
};
