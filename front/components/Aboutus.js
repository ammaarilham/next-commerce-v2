import styled from "styled-components";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  max-width: 1050px;
  margin: 100px auto;
  padding: 20px;

  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const SingleDiv = styled.div`
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  display: flex;
  justify-content: center;

  img {
    width: 100%;
    height: auto;
    border-radius: 10px;
  }
`;

const SingleDiv2 = styled.div`
  padding: 5px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  font-size: 0.9rem;
  text-align: justify;

  @media screen and (min-width: 768px) {
    font-size: 0.8rem;
    padding: 2px;
    font-size: 1rem;
    box-shadow: none;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  margin: 10px 5px;
  font-weight: 800;
  text-align: left;

  @media screen and (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

const InsideDiv = styled.div`
  padding: 5px;
`;

export default function AboutUs() {
  return (
    <>
      <Wrapper>
        <SingleDiv2>
          <InsideDiv>
            <Title>What do you know about us? </Title>
            <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
            inventore nobis illum repellat dolorum voluptatum repellendus,
            laborum corporis harum expedita neque ratione eligendi ipsam vero
            officia, est totam ab maxime odio assumenda nesciunt velit soluta.
            Et ab, iure laborum optio neque magnam enim maxime dolorem
            cupiditate ratione ipsa nemo veritatis sapiente libero dolore dicta
            esse facilis mollitia similique vitae magni unde incidunt ducimus.
            Quae obcaecati aliquid omnis quasi deserunt inventore beatae ex
            quibusdam consequatur natus fuga, distinctio unde quaerat,
            dignissimos quas labore nobis praesentium. Maxime consequatur
            possimus ratione culpa minima quo sequi
          </InsideDiv>
        </SingleDiv2>
        <SingleDiv>
          <img
            src="https://gizmo-next-ecommerce.s3.amazonaws.com/1709612052737.png"
            alt=""
          />
        </SingleDiv>
      </Wrapper>
    </>
  );
}
