import { IProductType } from '../../types/product';

const ProductListItem = ({ product }: { product: IProductType }) => {
  return (
    <div>
      {product.product_name} {product.price}원
    </div>
  );
};

export default ProductListItem;
