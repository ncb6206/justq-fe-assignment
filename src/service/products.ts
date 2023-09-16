import { PageParams } from '../types/product';
import instance from './config';

export const GET = async ({ limit, page }: PageParams) => {
  try {
    const response = await instance.get(`/`);
    console.log(
      response.data,
      response.data.slice(page * limit, (page + 1) * limit),
    );
    return response.data.slice(page * limit, (page + 1) * limit);
  } catch (error) {
    return error;
  }
};
