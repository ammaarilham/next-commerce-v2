import styled from "styled-components";

const BannerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  width: 95%;
  margin: 50px auto;
  box-shadow: 3px 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #0c1208; /* Change as per your design */
`;

const TextContainer = styled.div`
  max-width: 50%;
  z-index: 5rem;
  padding: 2rem;
  position: relative;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: -2rem;
    height: 100%;
    width: 0.5rem;
    background-color: #ff0000; /* Red line */
  }
`;

const BannerText = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  color: #ccc; /* Change as per your design */
`;

const BannerDescription = styled.p`
  margin-top: 1.5rem;
  font-size: 1.2rem;
  color: #eee; /* Change as per your design */
`;

const MoreInfo = styled.p`
  margin-top: 2rem;
  font-size: 1rem;
  color: #eee; /* Change as per your design */
`;

const ImageContainer = styled.div`
  max-width: 50%;
`;

const BannerImage = styled.img`
  width: 90%;
  height: auto;
`;

const Banner = () => {
  return (
    <BannerContainer>
      <TextContainer>
        <BannerText>Exclusive Offer!</BannerText>
        <BannerDescription>
          Hurry up! Limited stock available. Get your hands on the latest S23
          Ultra.
        </BannerDescription>
        <MoreInfo>
          Buy now and get free shipping on all orders. Offer valid until stocks
          last.
        </MoreInfo>
      </TextContainer>
      <ImageContainer>
        <BannerImage
          src="https://gizmo-next-ecommerce.s3.amazonaws.com/1707654572895.jpg"
          alt="S23 Ultra"
        />
      </ImageContainer>
    </BannerContainer>
  );
};

export default Banner;
