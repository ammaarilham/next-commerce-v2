import styled from "styled-components";

const NewsletterContainer = styled.div`
  width: 65%;
  height: 40vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  padding: 0px 140px;
  margin: 100px auto;
  gap: 10px;
`;

const Title = styled.h1`
  color: black;
  font-size: 40px;
  font-weight: 900;
`;

const Description = styled.p`
  color: black;
  font-size: 20px;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  max-width: 730px;
  height: 50px;
  border-radius: 10px;
  border: 1px solid #e3e3e3;
`;

const Input = styled.input`
  width: 500px;
  margin-left: 30px;
  border: none;
  outline: none;
  color: #616161;
  font-family: "poppins";
  font-size: 16px;
`;

const SubscribeButton = styled.button`
  width: 210px;
  height: 50px;
  border-radius: 10px;
  background-color: white;
  font-size: 16px;
  color: black;
  cursor: pointer;
`;

const NewsLetter = () => {
  return (
    <NewsletterContainer>
      <Title>Get Exclusive Offers On Your Email!</Title>
      <Description>
        Subscribe to our newsletter and be updated with our community
      </Description>
      <InputContainer>
        <Input type="email" placeholder="Your Email ID" />
        <SubscribeButton>Subscribe</SubscribeButton>
      </InputContainer>
    </NewsletterContainer>
  );
};

export default NewsLetter;
