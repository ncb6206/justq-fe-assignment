export interface IProductType {
  id: string;
  category_code: string;
  status: string;
  owner_product_code: string;
  product_name: string;
  price: string;
  main_image: string;
  origin: string;
  brand: string;
  model: string;
  keywords: string[];
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
