import styled, { css } from "styled-components";

export const ButtonStyle = css`
  border: 0;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  font-weight: bold;
  font-family: "poppins", sans-serif;
  gap: 5px;

  svg {
    height: 17px;
  }

  ${(props) =>
    props.white &&
    !props.outline &&
    css`
      background-color: #fff;
      color: #000;
    `}

  ${(props) =>
    props.white &&
    props.outline &&
    css`
      background-color: transparent;
      color: #fff;
      border: 1px solid white;
    `}


${(props) =>
    props.size === "l" &&
    css`
      font-size: 1.2rem;
      padding: 10px 20px;
      gap: 5px;
      svg {
        height: 22px;
      }
    `}

${(props) =>
    props.primary &&
    !props.outline &&
    css`
      background-color: #5542f6;
      color: #fff;
      border: 1px solid #5542f6;
    `}

    ${(props) =>
    props.primary &&
    props.outline &&
    css`
      background-color: transparent;
      color: #5542f6;
      border: 1px solid #5542f6;
    `}

    ${(props) =>
    props.block &&
    css`
      display: block;
      width: 100%;
    `}

    ${(props) =>
    props.black &&
    css`
      background-color: black;
      color: white;
    `}
`;

export const StyledButton = styled.button`
  ${ButtonStyle}
`;

export default function Button({ children, ...rest }) {
  return <StyledButton {...rest}>{children}</StyledButton>;
}
