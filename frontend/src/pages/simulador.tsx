// dependencies
import { useEffect, useState, useRef, useContext } from 'react'
import { GetServerSideProps, NextPage } from 'next';
import api, { useApi } from 'api';
import styled from 'styled-components';

// context
import SimulatorContext from 'common/context/SimulatorContext';

// components
import Head from 'next/head';
import Menu from 'modules/Menu/components/Menu';
import TemplateContainer from 'modules/Simulador/components/TemplateContainer';

import { Template } from 'interfaces';

const Container =  styled.div`
  display: flex;
  margin-top: 3rem;

  @media screen and (max-width: 1366px) {
    margin-top: 1rem;
  }

  @media screen and (max-width: 768px) {
    justify-content: center;
  }

  @media screen and (max-width: 400px) {
    width: 100%;
    margin: 0 !important;

    section {
      width: 100%;
    }
  }
`;

interface Props {
  templates: Template[]
}

const Simulator: NextPage<Props> = () => {
  
  return (
    <main className="container mx-auto">
      <Head>
        <title>Simulador</title>
      </Head>
      <Container className="mx-4">
        <Menu />
        <section className="bg-white border rounded-1 flex flex-col justify-center p-3">
          <TemplateContainer />            
        </section>
      </Container>
    </main>
  );
};

export default Simulator;