import Center from "@/components/Center";
import ProductImages from "@/components/ProductImages";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import styled from "styled-components";
import Button from "@/components/Button";
import CartIcon from "@/components/icons/CartIcon";
import { useContext } from "react";
import { CartContext } from "@/components/CartContext";
import Header from "@/components/Header";

const Title = styled.h2`
  font-size: 1.5em;
  margin: 30px 0 20px;
  font-weight: 900;
`;

const Box = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 30px;
`;

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin-top: 40px;
  margin-bottom: 50px;

  @media screen and (min-width: 768px) {
    grid-template-columns: 0.8fr 1.2fr;
    margin-bottom: 0;
  }
`;

const ProDesc = styled.p`
  line-height: 1.5;
  text-align: justify;
`;

const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  margin-top: 40px;
`;

const Price = styled.div`
  font-size: 1.4rem;
`;

export default function ProductPage({ product }) {
  const { addProduct } = useContext(CartContext);
  return (
    <>
      <Header />
      <Center>
        <ColWrapper>
          <Box>
            {/* <img src={product.images?.[0]} alt="" /> */}
            <ProductImages images={product.images} />
          </Box>
          <div>
            <Title>{product.title}</Title>
            <ProDesc>{product.description}</ProDesc>
            <PriceRow>
              <div>
                <Price>${product.price}</Price>
              </div>

              <Button onClick={() => addProduct(product._id)} black>
                <CartIcon /> Add to Cart
              </Button>
            </PriceRow>
          </div>
        </ColWrapper>
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const product = await Product.findById(id);

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}
