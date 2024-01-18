import { IPageParams } from '../types/product';
import instance from './config';

export const GET = async ({ type, pagesize, currentpage }: IPageParams) => {
  try {
    const actSize = pagesize ?? 0;
    const actPage = currentpage ?? 0;

    // const response = await instance.get(`/v1/search/shop.json`, {
    //   params: {
    //     query: '신발',
    //     display: actSize,
    //     start: actPage,
    //     sort: 'sim',
    //     filter: 'medium',
    //   },
    //   headers: {
    //     'X-Naver-Client-Id': import.meta.env.VITE_NAVER_CLIENT_ID,
    //     'X-Naver-Client-Secret': import.meta.env.VITE_NAVER_CLIENT_SECRET,
    //   },
    // });

    console.log(import.meta.env.VITE_PROXY_URL);

    const response = await instance.get(import.meta.env.VITE_PROXY_URL, {
      params: {
        query: '신발',
        display: actSize,
        start: actPage,
        sort: 'sim',
        filter: 'medium',
      },
    });

    if (type === 'length') return response.data.items.length;

    return response.data.items;
  } catch (error) {
    return error;
  }
};
