import { IPageParams } from '../types/product';
import instance from './config';

export const GET = async ({
  product,
  type,
  pagesize,
  currentpage,
}: IPageParams) => {
  try {
    if (!product) {
      return null;
    }

    const actSize = pagesize ?? 0;
    const actPage = currentpage ?? 1;

    let response;

    if (import.meta.env.DEV) {
      response = await instance.get(`/v1/search/shop.json`, {
        params: {
          query: product,
          display: actSize,
          start: actPage,
          sort: 'sim',
          filter: 'medium',
        },
        headers: {
          'X-Naver-Client-Id': import.meta.env.VITE_NAVER_CLIENT_ID,
          'X-Naver-Client-Secret': import.meta.env.VITE_NAVER_CLIENT_SECRET,
        },
      });
    } else {
      response = await instance.get(import.meta.env.VITE_PROXY_URL, {
        params: {
          query: product,
          display: actSize,
          start: actPage,
          sort: 'sim',
          filter: 'medium',
        },
      });
    }

    if (type === 'length') return response.data.total;

    return response.data.items;
  } catch (error) {
    return error;
  }
};
