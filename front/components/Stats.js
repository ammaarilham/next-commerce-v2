import styled from "styled-components";

const Container = styled.div`
  background-color: #fff;
  padding: 6rem 0;
  width: 90%;
  margin: 10px auto;
  border-radius: 20px;

  @media (min-width: 640px) {
    padding: 8rem 0;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  max-width: 20rem;
  margin: 0 auto;
`;

const StatName = styled.div`
  font-size: 1rem;
  line-height: 1.75;
  color: #4b5563;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.2;
  color: #374151;

  @media (min-width: 640px) {
    font-size: 3rem;
  }
`;

const stats = [
  { id: 1, name: "Selling products", value: "2500+" },
  { id: 2, name: "Years in business", value: "5+ " },
  { id: 3, name: "Annual customers", value: "100,000+" },
];

export default function Stats() {
  return (
    <Container>
      <div className="">
        <Grid>
          {stats.map((stat) => (
            <StatItem key={stat.id}>
              <StatName>{stat.name}</StatName>
              <StatValue>{stat.value}</StatValue>
            </StatItem>
          ))}
        </Grid>
      </div>
    </Container>
  );
}
