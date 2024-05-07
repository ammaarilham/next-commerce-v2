import styled from "styled-components";
import CartIcon from "./icons/CartIcon";
import { StyledButton } from "./Button";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const ProductWrapper = styled.div``;

const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 20px;
  height: 120px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 100%;
    max-height: 80px;
  }
`;

const Title = styled(Link)`
  font-weight: normal;
  font-size: 1rem;
  font-weight: bold;
  color: inherit;
  text-decoration: none;
  margin: 0;

  @media screen and (min-width: 768px) {
    font-weight: normal;
    font-size: 0.9rem;
    color: inherit;
    text-decoration: none;
    margin: 0;
  }
`;

const ProductInfoBox = styled.div`
  margin-top: 10px;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;

  @media screen and (min-width: 768px) {
    display: flex;
    gap: 5px;
  }
`;

const Price = styled.div`
  font-size: 1.1rem;
  font-weight: 400;
  text-align: right;

  @media screen and (min-width: 768px) {
    font-size: 1.2rem;
    font-weight: 600;
    text-align: left;
  }
`;

export default function ProductBox({ _id, title, description, price, images }) {
  const { addProduct } = useContext(CartContext);
  const url = "/product/" + _id;

  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <div>
          <img src={images[0]} />
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url}> {title}</Title>
        <PriceRow>
          <Price>${price}</Price>
          <div>
            <StyledButton onClick={() => addProduct(_id)} outline primary={1}>
              <span className=""> Add</span>
              <CartIcon />
            </StyledButton>
          </div>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
}
