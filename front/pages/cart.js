import Center from "@/components/Center";
import Header from "@/components/Header";
import styled from "styled-components";
import Button from "@/components/Button";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/CartContext";
import axios from "axios";
import Table from "@/components/Table";
import Input from "@/components/Input";
import {
  Payhere,
  AccountCategory,
  Customer,
  PayhereCheckout,
  CheckoutParams,
} from "@payhere-js-sdk/client";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin-top: 40px;

  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr 0.8fr;
  }
`;

const Box = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  padding: 30px;
`;

const ProductInfoCell = styled.td`
  padding: 10px 0;
`;

const ProductImageBox = styled.div`
  width: 100px;
  height: 100px;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-width: 80px;
    max-height: 80px;
  }
`;

const QuantityLabel = styled.span`
  padding: 0 3px;
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

export default function CartPage() {
  const merchantId = "1226016"; // Replace with your actual merchant ID
  const returnUrl = "http://localhost:3000/payment-success";
  const cancelUrl = "http://localhost:3000/payment-cancel";

  const { cartProducts, addProduct, removeProduct } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  function moreOfThisProduct(id) {
    addProduct(id);
  }

  function lessOfThisProduct(id) {
    removeProduct(id);
  }

  let total = 0;

  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0;
    total += price;
  }

  const handlePayment = () => {
    const paymentData = {
      merchant_id: merchantId,
      return_url: returnUrl,
      cancel_url: cancelUrl,
      items: cartProducts.map((productId) => ({
        name: products.find((p) => p._id === productId)?.title || "Product",
        amount: products.find((p) => p._id === productId)?.price || 0,
        quantity: cartProducts.filter((id) => id === productId).length,
      })),
      currency: "USD",
      total: total,
      first_name: name,
      email: email,
      delivery_address: `${streetAddress}, ${city}, ${postalCode}, ${country}`,
    };

    Payhere.init(merchantId, AccountCategory.SANDBOX); // Initialize Payhere

    const customer = new Customer({
      // Create customer details object
      first_name: name,
      email: email,
      phone: "", // Add phone number if available
      address: `${streetAddress}, ${city}, ${postalCode}, ${country}`,
    });

    const checkoutData = new CheckoutParams(paymentData); // Create checkout parameters

    const checkout = new PayhereCheckout(
      customer,
      checkoutData,
      onPayhereCheckoutError
    ); // Create checkout instance
    checkout.start(); // Start the checkout process
  };
  
  const onPayhereCheckoutError = (errorMsg) => {
    // Error handling function
    console.error(errorMsg); // Log the error
    // You can handle the error as per your application's requirements, e.g., display an alert to the user
    alert("An error occurred during checkout. Please try again later.");
  };

  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <Box>
            <h2>Cart</h2>
            {!cartProducts?.length && <div>Your cart is empty</div>}

            {products?.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <ProductInfoCell>
                        <ProductImageBox>
                          <img src={product.images[0]} alt={product.title} />
                        </ProductImageBox>
                        {product.title}
                      </ProductInfoCell>
                      <td>
                        <Button onClick={() => lessOfThisProduct(product._id)}>
                          -
                        </Button>
                        <QuantityLabel>
                          {
                            cartProducts.filter((id) => id === product._id)
                              .length
                          }
                        </QuantityLabel>
                        <Button onClick={() => moreOfThisProduct(product._id)}>
                          +
                        </Button>
                      </td>
                      <td>
                        $
                        {cartProducts.filter((id) => id === product._id)
                          .length * product.price}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <td></td>
                    <td>${total}</td>
                  </tr>
                </tbody>
              </Table>
            )}
          </Box>
          {cartProducts?.length > 0 && (
            <Box>
              <h2>Order information</h2>

              <div>
                <Input
                  value={name}
                  type="text"
                  placeholder="Name..."
                  onChange={(ev) => setName(ev.target.value)}
                />
                <Input
                  value={email}
                  type="email"
                  placeholder="Email..."
                  onChange={(ev) => setEmail(ev.target.value)}
                />
                <CityHolder>
                  <Input
                    value={city}
                    type="text"
                    placeholder="City..."
                    onChange={(ev) => setCity(ev.target.value)}
                  />
                  <Input
                    value={postalCode}
                    type="text"
                    placeholder="Postal code..."
                    onChange={(ev) => setPostalCode(ev.target.value)}
                  />
                </CityHolder>
                <Input
                  value={streetAddress}
                  type="text"
                  placeholder="Street Address..."
                  onChange={(ev) => setStreetAddress(ev.target.value)}
                />
                <Input
                  value={country}
                  type="text"
                  placeholder="Country..."
                  onChange={(ev) => setCountry(ev.target.value)}
                />
                <Button block black onClick={handlePayment}>
                  Continue to payment
                </Button>
              </div>
            </Box>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  );
}
