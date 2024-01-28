import { IPageParams } from '../types/product';
import instance from './config';

export const GET = async ({
  product,
  type,
  pagesize,
  currentpage,
}: IPageParams) => {
  try {
    const actProduct = product ?? '';
    const actSize = pagesize ?? 0;
    const actPage = currentpage ?? 0;

    let response;

    if (import.meta.env.DEV) {
      response = await instance.get(`/v1/search/shop.json`, {
        params: {
          query: actProduct,
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
          query: actProduct,
          display: actSize,
          start: actPage,
          sort: 'sim',
          filter: 'medium',
        },
      });
    }

    if (type === 'length') return response.data.items.length;

    return response.data.items;
  } catch (error) {
    return error;
  }
};
