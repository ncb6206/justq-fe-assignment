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
  limit?: number;
  page?: number;
}
export interface IProductListItem {
  currentPage: number;
  pageSizes: number;
}

export interface IPagination extends IProductListItem {
  onShowSizeChange: (current: number, size: number) => void;
  pageLength: number;
}
