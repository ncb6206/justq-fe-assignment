import styled from 'styled-components';
import { IProductType } from '../../types/product';

const ProductListItem = ({ product }: { product: IProductType }) => {
  const searchGoogle = (productName: string) => {
    const url = `https://www.google.com/search?q=${productName}`;
    window.open(url, '_blank');
  };

  return (
    <ProductListItemDiv>
      <ProductListItemImgDiv>
        <img src={product?.main_image} />
      </ProductListItemImgDiv>
      <ProductListItemDetailDiv>
        <DetailHeader>
          <HeaderBadge>
            {product.origin && <span>origin : {product?.origin}</span>}
            {product.origin && product.brand && <span> | </span>}
            {product.brand && <span>brand : {product?.brand}</span>}
            {!product.brand && product.origin && product.model && (
              <span> | </span>
            )}
            {product.brand && product.model && <span> | </span>}
            {product.model && <span>model : {product?.model}</span>}
          </HeaderBadge>
          <ProductName onClick={() => searchGoogle(product?.product_name)}>
            {product?.product_name}
          </ProductName>
        </DetailHeader>
        <DetailBottom>
          <PriceSpan>
            {parseInt(product?.price).toLocaleString('ko-KR')}원
          </PriceSpan>
          <CategorySpan>카테고리 : {product?.category_code}</CategorySpan>
        </DetailBottom>
      </ProductListItemDetailDiv>
    </ProductListItemDiv>
  );
};

const ProductListItemDiv = styled.div`
  height: 70px;
  display: flex;
  position: relative;
  padding: 0 0.5rem;

  &:hover {
    background-color: #eeeeee;
  }
`;

const ProductListItemImgDiv = styled.div`
  width: 100px;
  height: 62px;
  margin-top: 0.3rem;
  margin-right: 1rem;

  img {
    position: relative;
    object-fit: contain;
    width: 100%;
    height: 100%;
    border-radius: 3px;
    background-color: #ffffff;
    transition: transform 0.2s;
    z-index: 1;

    &:hover {
      cursor: pointer;
      transform: scale(1.5);
      z-index: 3;
    }
  }
`;

const ProductListItemDetailDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  border-bottom: 1px solid #ddd;
  overflow: hidden;
`;

const DetailHeader = styled.div``;

const ProductName = styled.span`
  font-size: 1.5rem;

  &:hover {
    cursor: pointer;
  }
`;

const HeaderBadge = styled.div`
  display: flex;
  gap: 0.7rem;

  span {
    color: #005078;
    font-size: 0.9rem;
  }
`;

const DetailBottom = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 1rem;
`;

const PriceSpan = styled.span`
  font-size: 1.4rem;
  color: #f54d3d;
  font-weight: 600;
`;

const CategorySpan = styled.span`
  font-size: 1.3rem;
`;

export default ProductListItem;
