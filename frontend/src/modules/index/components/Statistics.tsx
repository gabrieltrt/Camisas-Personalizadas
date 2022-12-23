import styled from "styled-components";

const Text = styled.div`
  font-size: 4rem;
  font-weight: bold;
`;

const Statistics = () => {
  return (
    <section className="container mx-auto flex flex-col items-start lg:flex-row lg:items-center justify-evenly py-5 px-3">
      <div>
          <span role="heading" aria-level={3}>Camisetas Produzidas</span>
          <Text>14.000+</Text>
      </div>
      <div>
          <span role="heading" aria-level={3}>Clientes Atendidos</span>
          <Text>1.500.000+</Text>
      </div>
      <div>
          <span role="heading" aria-level={3}>Eventos Fornecidos</span>
          <Text>1.000+</Text>
      </div>
    </section>
  );
};

export default Statistics;