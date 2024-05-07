import styled from "styled-components";
import Center from "./Center";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import CartIcon from "./icons/CartIcon";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const Bg = styled.div`
  background-color: black;
  padding: 5px 0;
`;

const Title = styled.h1`
  margin: 0;
  color: white;
  font-size: 1.5rem;

  @media screen and (min-width: 768px) {
    font-size: 3rem;
  }
`;

const Desc = styled.p`
  color: #aaa;
  font-size: 0.8rem;
  text-align: justify;
  line-height: 1.5;

  @media screen and (min-width: 768px) {
    line-height: norma;
    text-align: left;
  }
`;

const ColumnWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  padding: 20px;

  img {
    max-width: 100%;
    display: block;
    margin: 0 auto;
  }

  div:nth-child(1) {
    order: 2;
  }

  @media screen and (min-width: 768px) {
    grid-template-columns: 0.9fr 1.1fr;
    gap: 40px;
    padding: none;

    div:nth-child(1) {
      order: 0;
    }
    img {
      max-width: 100%;
    }
  }
`;

const Column = styled.div`
  display: flex;
  align-items: center;

  div {
    text-align: left;
    line-height: 1.5;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;
`;

export default function Featured({ product }) {
  const { addProduct } = useContext(CartContext);
  function addFeaturedToCart() {
    addProduct(product._id);
  }
  console.log(product);
  return (
    <Bg>
      <Center>
        <ColumnWrapper>
          <Column>
            <div>
              <Title>{product.title}</Title>
              <Desc>{product.description}</Desc>

              <ButtonsWrapper>
                <ButtonLink
                  href={"/products/" + product._id}
                  outline={1}
                  white={1}
                  size=""
                >
                  Read more
                </ButtonLink>
                <Button primary={1} onClick={addFeaturedToCart}>
                  <CartIcon />
                  Add to cart
                </Button>
              </ButtonsWrapper>
            </div>
          </Column>
          <Column>
            <h2>
              <div>
                <img src={product.images[1]} alt="Product" />{" "}
                {/* Added alt attribute */}
              </div>
            </h2>
          </Column>
        </ColumnWrapper>
      </Center>
    </Bg>
  );
}
