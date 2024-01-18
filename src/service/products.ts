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

    const response = await instance.get(
      'https://r1itcy4b28.execute-api.us-east-1.amazonaws.com/default/proxyRewrite',
      {
        params: {
          query: '신발',
          display: actSize,
          start: actPage,
          sort: 'sim',
          filter: 'medium',
        },
      },
    );

    if (type === 'length') return response.data.items.length;

    return response.data.items;
  } catch (error) {
    return error;
  }
};
