import styled from 'styled-components';

interface EmptyProps {
  alert: string;
}

const Empty = ({ alert }: EmptyProps) => {
  return (
    <EmptyDiv>
      <AlertP>{alert}</AlertP>
    </EmptyDiv>
  );
};

const EmptyDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5rem 0;
`;

const AlertP = styled.p`
  font-size: 2.25rem;
  line-height: 2.5rem;
`;

export default Empty;
