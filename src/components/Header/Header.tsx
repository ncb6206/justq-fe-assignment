import styled from 'styled-components';

const Header = () => {
  return (
    <HeaderDiv>
      <SpanDiv>
        <Span>Natest Shop</Span>
      </SpanDiv>
    </HeaderDiv>
  );
};

const HeaderDiv = styled.div`
  width: 100%;
  height: 15vh;
  margin-bottom: 5rem;
  background-image: url(https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80);
`;

const SpanDiv = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Span = styled.span`
  font-family: 'Montserrat', sans-serif;
  color: #ffffff;
  font-size: 4rem;
  user-select: none;
`;

export default Header;
