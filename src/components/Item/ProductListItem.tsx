import { ProductType } from '../../types/product';

const ProductListItem = ({ product }: { product: ProductType }) => {
  return (
    <div>
      {product.product_name} {product.price}원
    </div>
  );
};

export default ProductListItem;
