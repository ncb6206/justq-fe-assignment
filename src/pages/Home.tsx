import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { FloatButton, Input } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
import { useNavigate } from 'react-router-dom';
import { SwapOutlined } from '@ant-design/icons';

import { GET } from '../service/products';
import usePageStore from '../stores/pageStore';
import useQueryStore from '../stores/queryStore';
import ProductPagination from '../components/Ui/Pagination/ProductPagination';
import PageComboBox from '../components/Ui/ComboBox/PageComboBox';
import Empty from '../components/Ui/Empty/Empty';
import ProductListScroll from '../components/List/ProductListScroll';
import ProductListPaging from '../components/List/ProductListPaging';

const { Search } = Input;

const HomePage = () => {
  const navigate = useNavigate();
  const { pagesize, setListLength } = usePageStore();
  const { query, setQuery } = useQueryStore();
  const [paging, setPaging] = useState(true);
  const params = new URLSearchParams(location.search);
  const value = params.get('query');

  const fetchProductLength = async () => {
    console.log('전체페이지 가져오기');
    const length = await GET({
      product: String(query),
      type: 'length',
      pagesize,
    });
    console.log(length);
    return length;
  };

  const { data: totalLength } = useQuery({
    queryKey: ['getProductsLength', query],
    queryFn: fetchProductLength,
  });

  const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
    console.log(info?.source, value);
    params.set('query', value);

    setQuery(value);
    navigate(`?${params.toString()}`);
  };

  const onTogglePage = () => {
    setPaging(state => !state);
  };

  useEffect(() => {
    if (value) {
      setQuery(value);
    }
  }, [setQuery, value]);

  useEffect(() => {
    if (totalLength >= 0) {
      setListLength(totalLength >= 1000 ? 1000 : totalLength);
    }
  }, [setListLength, totalLength]);

  return (
    <HomeDiv>
      <HomeHeader>
        <HeaderLeft>상품 목록</HeaderLeft>
        <HeaderRight>
          <Search
            placeholder="상품 검색"
            allowClear
            defaultValue={value || ''}
            onSearch={onSearch}
            style={{ width: 200 }}
          />
          <PageComboBox />
        </HeaderRight>
      </HomeHeader>
      {!query && <Empty alert="검색어를 입력해주세요!" />}
      {query && totalLength === 0 && <Empty alert="검색결과가 없습니다..." />}
      {query && paging && (
        <>
          <ProductListPaging />
          <ProductPagination />
        </>
      )}
      {query && !paging && <ProductListScroll />}
      <FloatButton
        icon={<SwapOutlined />}
        onClick={onTogglePage}
        tooltip={'Change View'}
      />
    </HomeDiv>
  );
};

const HomeDiv = styled.div`
  width: 60%;
  max-width: 45rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background-color: #ffffff;
  margin: 0 auto;
  margin-bottom: 1rem;
`;

const HomeHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
`;

const HeaderLeft = styled.span`
  font-size: 1.5rem;
`;

const HeaderRight = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  font-weight: 600;
`;

export default HomePage;
