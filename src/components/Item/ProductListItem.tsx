import styled from 'styled-components';
import { IProductType } from '../../types/product';

const ProductListItem = ({ product }: { product: IProductType }) => {
  return (
    <ProductListItemDiv>
      <ProductListItemImgDiv>
        <img src={product?.main_image} />
      </ProductListItemImgDiv>
      <ProductListItemDetailDiv>
        <span>{product?.product_name}</span>
        <PriceSpan>{product?.price}원</PriceSpan>
      </ProductListItemDetailDiv>
    </ProductListItemDiv>
  );
};

const ProductListItemDiv = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  padding: 0.25rem 0.5rem;
`;

const ProductListItemImgDiv = styled.div`
  width: 100px;
  height: 62px;
  margin-right: 1rem;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    border-radius: 3px;
    background-color: #ffffff;
  }
`;

const ProductListItemDetailDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  border-bottom: 1px solid;

  span {
    font-size: 1.5rem;
  }
`;

const PriceSpan = styled.span`
  color: #f54d3d;
  font-weight: 600;
`;

export default ProductListItem;
