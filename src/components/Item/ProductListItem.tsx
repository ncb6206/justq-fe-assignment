import styled from 'styled-components';
import { IProductType } from '../../types/product';

interface IProductListItemProps {
  product: IProductType;
}

const ProductListItem = ({ product }: IProductListItemProps) => {
  const searchGoogle = (productUrl: string) => {
    window.open(productUrl, '_blank');
  };

  return (
    <ProductListItemDiv>
      <ProductListItemImgDiv>
        <img src={product?.image} />
      </ProductListItemImgDiv>
      <ProductListItemDetailDiv>
        <DetailHeader>
          <HeaderBadge>
            {product.category2 && <span>origin : {product?.category2}</span>}
            {product.category3 && product.brand && <span> | </span>}
            {product.brand && <span>brand : {product?.brand}</span>}
            {!product.brand && product.category3 && product.category3 && (
              <span> | </span>
            )}
            {product.brand && product.category4 && <span> | </span>}
            {product.category4 && <span>model : {product?.category4}</span>}
          </HeaderBadge>
          <ProductName
            onClick={() => searchGoogle(product?.link)}
            dangerouslySetInnerHTML={{ __html: product?.title }}
          />
        </DetailHeader>
        <DetailBottom>
          <PriceSpan>
            {parseInt(product?.lprice).toLocaleString('ko-KR')}원
          </PriceSpan>
          <CategorySpan>카테고리 : {product?.category1}</CategorySpan>
        </DetailBottom>
      </ProductListItemDetailDiv>
    </ProductListItemDiv>
  );
};

const ProductListItemDiv = styled.div`
  display: flex;
  position: relative;
  padding: 0.2rem 0.5rem;
  border-bottom: 1px solid #ddd;

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
`;

const DetailHeader = styled.div``;

const ProductName = styled.p`
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
