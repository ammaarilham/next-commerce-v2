import styled from "styled-components";

export default function Footer() {
  const CopyWrightText = styled.div`
    padding: 20px;
    color: black;
    text-center;
    justify-content: center;
    align-items: center;
    color:#aaa; 
  `;

  const Div = styled.div`
    background: #eee;
    margin-top: 50px;
    width: 90%;
    text-align: center;
    display: flex;
    justify-content: center;
    margin: 0px auto;
  `;
  return (
    <Div>
      <CopyWrightText>
        © 2024 GIZMO Online Store. All rights reserved. Powered by{" "}
        <b>algoTech</b>
      </CopyWrightText>
    </Div>
  );
}
