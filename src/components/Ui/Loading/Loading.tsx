import { Space, Spin } from 'antd';
import styled from 'styled-components';

const Loading = () => {
  return (
    <SpaceLoading direction="vertical">
      <Space size="middle">
        <Spin size="large" />
      </Space>
    </SpaceLoading>
  );
};

const SpaceLoading = styled(Space)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
`;

export default Loading;
