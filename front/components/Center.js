import styled from "styled-components";

const StyledDiv = styled.div`
  max-width: 800px;
  margin: auto 20px;

  @media screen and (min-width: 768px) {
    margin: 0px auto;
  }
`;

export default function Center({ children }) {
  return <StyledDiv>{children}</StyledDiv>;
}
