import { useEffect, ChangeEvent, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import usePageStore from '../../../stores/pageStore';
import styled from 'styled-components';

const PageDropdown = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const pageSizes = useMemo(() => [5, 10, 30, 50, 100], []);
  const pageSize = usePageStore(state => state.pageSize);

  const onChangePageSize = (event: ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(location.search);
    params.set('size', event.target.value);

    usePageStore.setState({ pageSize: Number(event.target.value) });
    navigate(`?${params.toString()}`);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const size = params.get('size');

    if (!size || isNaN(Number(size))) {
      usePageStore.setState({ pageSize: 10 });
      return;
    }

    if (pageSizes.includes(Number(size))) {
      usePageStore.setState({ pageSize: Number(size) });
    }
  }, [location.search, pageSizes]);

  return (
    <>
      <Select
        id="page"
        name="page"
        onChange={onChangePageSize}
        value={pageSize}
      >
        {pageSizes?.map(size => (
          <Option key={size} value={size}>
            {size}
          </Option>
        ))}
      </Select>
    </>
  );
};

const Select = styled.select`
  box-sizing: border-box;
  width: 5%.5;
  padding: 4px;
  font-size: 14px;
  border-radius: 6px;
`;

const Option = styled.option`
  padding: 4px;
  font-size: 14px;
  color: #fff;
  background: #272822;
`;

export default PageDropdown;
