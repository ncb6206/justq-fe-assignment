import { useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Select } from 'antd';

import usePageStore from '../../../stores/pageStore';
import styled from 'styled-components';

const PageComboBox = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const pageSizes = useMemo(() => ['5', '10', '30', '50', '100'], []);
  const pageSizesObject = useMemo(
    () => pageSizes.map(value => ({ value: value, label: value })),
    [pageSizes],
  );
  const pagesize = usePageStore(state => state.pagesize);

  const onChangePagesize = (value: string) => {
    const params = new URLSearchParams(location.search);
    params.set('size', value);

    usePageStore.setState({ pagesize: Number(value) });
    navigate(`?${params.toString()}`);
  };

  const filterOption = (
    input: string,
    option?: { label: string; value: string },
  ) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const size = params.get('size');

    if (!size || isNaN(Number(size))) {
      usePageStore.setState({ pagesize: 10 });
      return;
    }

    if (pageSizes.includes(size)) {
      usePageStore.setState({ pagesize: Number(size) });
    }
  }, [location.search, pageSizes]);

  return (
    <>
      <SelectPage
        showSearch
        optionFilterProp="page"
        onChange={onChangePagesize}
        filterOption={filterOption}
        value={String(pagesize)}
        options={pageSizesObject}
      />
    </>
  );
};

const SelectPage = styled(Select)`
  box-sizing: border-box;
  width: 90px;
  font-size: 14px;
  border-radius: 6px;
`;

export default PageComboBox;
