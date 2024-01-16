import { IPageParams } from '../types/product';
import instance from './config';

export const GET = async ({ type, pagesize, currentpage }: IPageParams) => {
  try {
    const actSize = pagesize ?? 0;
    const actPage = currentpage ?? 0;
    const response = await instance.get(
      `https://openapi.naver.com/v1/search/shop.json`,
      {
        params: {
          query: '신발',
          display: actSize,
          start: actPage,
          sort: 'sim',
          filter: 'medium',
        },
        headers: {
          'X-Naver-Client-Id': 'uyMURTnvXMhM8p07GkHJ',
          'X-Naver-Client-Secret': 'mT42P9gciB',
        },
      },
    );

    if (type === 'length') return response.data.items.length;

    return response.data.items;
  } catch (error) {
    return error;
  }
};
