import { useState } from "react";
import styled from "styled-components";

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: 5px;
`;

const ImageButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const ImageButton = styled.div`
  ${(props) =>
    props.active
      ? `border: 2px solid black `
      : ` box-shadow: 2px 0px 4px rgba(0, 0, 0, 0.3)`}

  box-shadow: 2px 0px 4px rgba(0, 0, 0, 0.3);
  height: 50px;
  cursor: pointer;
  border-radius: 5px;
`;

const BigImage = styled.img`
  max-width: 100%;
  max-height: 200px;
`;

const ImageWrapper = styled.div`
  text-align: center;
  height: 280px;
`;

export default function ProductImage({ images }) {
  const [activeImage, setActiveImage] = useState(images?.[0]);

  return (
    <>
      <ImageWrapper>
        <BigImage src={activeImage} />
      </ImageWrapper>

      <ImageButtons>
        {images.map((image) => (
          <ImageButton
            key={image}
            active={image === activeImage}
            onClick={() => setActiveImage(image)}
          >
            <Image src={image} alt="" />
          </ImageButton>
        ))}
      </ImageButtons>
    </>
  );
}
