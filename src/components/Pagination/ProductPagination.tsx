import { IPagination } from '../../types/product';
import { Pagination } from 'antd';

const ProductPagination = ({
  onShowSizeChange,
  pageLength,
  currentPage,
}: IPagination) => {
  const pageSizeOptions = [5, 10, 30, 50, 100];
  return (
    <>
      <Pagination
        showSizeChanger
        pageSizeOptions={pageSizeOptions}
        onShowSizeChange={onShowSizeChange}
        defaultCurrent={currentPage}
        total={pageLength}
      />
    </>
  );
};

export default ProductPagination;
