export interface IProductType {
  title: string;
  link: string;
  image: string;
  lprice: string;
  hprice?: string;
  mallName: string;
  productId: string;
  productType: string;
  brand: string;
  maker: string;
  category1?: string;
  category2?: string;
  category3?: string;
  category4?: string;
}

export interface IPageParams {
  type: 'length' | 'data';
  pagesize?: number;
  currentpage?: number;
}

export interface IPaginationDivProps {
  page: number;
  currentpage: number;
}
