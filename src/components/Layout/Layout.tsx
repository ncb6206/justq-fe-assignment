import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../Header/Header';

const Layout = () => {
  return (
    <Wrap>
      <Header />
      <Outlet />
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Layout;
