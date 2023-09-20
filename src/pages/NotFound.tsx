import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Main>
      <h1 onClick={() => navigate('/')}>404 Not Found</h1>
      <p>
        잘못된 경로 접근으로 인한 에러입니다. <br />
        "404 Not Found" 문구를 클릭하여 home으로 이동해주세요 🤗
      </p>
    </Main>
  );
};

const Main = styled.main`
  width: 100%;
  padding-top: 100px;
  text-align: center;
  white-space: pre-wrap;
  letter-spacing: 1px;

  > h1 {
    font-size: 60px;
    cursor: pointer;
  }

  > p {
    font-size: 20px;
    font-weight: 300;
  }
`;

export default NotFoundPage;
