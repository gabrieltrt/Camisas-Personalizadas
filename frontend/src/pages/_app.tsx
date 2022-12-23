import { useState, useRef, useEffect } from 'react';
import type { AppProps } from 'next/app'
import { useApi } from 'api';
import Layout from 'common/components/Layout'

import '../styles/tailwind.css'
import '../styles/globals.scss'

import { ModalContext, PopupContext, SimulatorContext, LoaderContext, CartContext } from 'common/context';

import { Simulator, Popup, CartItem } from 'interfaces';

export default function App({ Component, pageProps }: AppProps) {
  const templateBackRef = useRef<SVGAElement>(null);
  const templateFrontRef = useRef<SVGAElement>(null);

  const modalContextDefaults = {
    CART: false
  };

  const simulatorContextDefaults: Simulator = {
    colors: [],
    customizable_areas: [],
    images: {
      front: [],
      back: []
    },
    currentTemplate: null,
    currentTemplateRefs: {
      back: templateBackRef,
      front: templateFrontRef,
      backMask: null,
      frontMask: null
    }
  };
  
  const [simulatorContext, setSimulatorContext] = useState(simulatorContextDefaults);
  const [modalContext, setModalContext] = useState(modalContextDefaults);
  const [popups, setPopups] = useState<Popup[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // o carrinho está sendo chamado aqui para fins de ui otimista
  const { data: cart, mutate: mutateCart } = useApi<CartItem[]>('/cart');

  // dispara uma notificação
  const dispatchPopup = (title: string, text: string): void => {
    setPopups(state => ([
      ...state,
      {
        title,
        text
      }
    ]));
  };

  return (
    <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
      <CartContext.Provider value={{ cart, mutate: mutateCart }}>
        <ModalContext.Provider value={{ context: modalContext, setContext: setModalContext }}>
          <PopupContext.Provider value={{ popups, dispatchPopup }}>
            <SimulatorContext.Provider value={{ context: simulatorContext, setContext: setSimulatorContext }}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </SimulatorContext.Provider>
          </PopupContext.Provider>
        </ModalContext.Provider>
      </CartContext.Provider>
    </LoaderContext.Provider>
  
  );
}
