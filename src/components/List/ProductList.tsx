import { ProductType } from '../../types/product';
import ProductListItem from '../Item/ProductListItem';

const ProductList = ({ productList }: { productList: ProductType[] }) => {
  return (
    <div>
      {productList.map(product => (
        <ProductListItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
