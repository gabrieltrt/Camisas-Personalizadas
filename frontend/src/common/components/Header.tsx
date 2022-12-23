// dependencies
import { useState, useContext } from 'react';
import styled from "styled-components";
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { FiMenu } from 'react-icons/fi';
import Dropdown from 'common/components/Dropdown';

// components
import CartModal from 'modules/Cart/components/CartModal';

// context
import ModalContext from 'common/context/ModalContext';

// images
import Link from 'next/link';

const StyledHeader = styled.header`
  position: sticky;
  height: 80px;
  background: #fff;
  border-bottom: 1px solid #dee2e6;
  z-index: 45;

  .header-item {
    color: gray;
    text-decoration: none;
    transition: color ease-out .15s;
    :hover {
      color: #000;
    }
  }
`;

const Header = () => {
  const { setContext: setModalContext } = useContext(ModalContext);

  return (
    <StyledHeader>
      <div className='container mx-auto h-full flex justify-between items-center px-4'>
        <Link href="/" className="no-underline text-amber-400 uppercase">
          <strong>Monster Physique</strong>
        </Link>
        <nav className="hide-on-tablet">
          <ul className='list-unstyled flex gap-11 h-100 items-center'>
            <li>
              <Link href="/" className='header-item'>Home</Link>
            </li>
            <li>
              <Link href="produtos" className='header-item'>Produtos</Link>
            </li>
            <li>
              <Link href="contato" className='header-item'>Contato</Link>
            </li>
            <li>
              <Link href="simulador" className='header-item'>Simulador</Link>
            </li>
          </ul>
        </nav>
        <button 
          className="border-0 p-0 hide-on-tablet"
          title="Carrinho de compras"
          onClick={() => setModalContext(state => ({ ...state, CART: true }))}
        >
          <AiOutlineShoppingCart className='header-item' style={{ fontSize: 24 }} />
        </button>
        <Dropdown className="show-on-tablet" togglerTitle={<FiMenu size={24} />}>
          <ul className='list-unstyled flex flex-col gap-3 whitespace-nowrap'>
            <li className="active:bg-gray-100">
              <Link href="/" className='header-item'>Home</Link>
            </li>
            <li>
              <Link href="produtos" className='header-item'>Produtos</Link>
            </li>
            <li>
              <Link href="contato" className='header-item'>Contato</Link>
            </li>
            <li>
              <Link href="simulador" className='header-item'>Simulador</Link>
            </li>
            <li>
              <button 
                className="flex gap-3 border-0 p-0 header-item"
                title="Carrinho de compras"
                onClick={() => setModalContext(state => ({ ...state, CART: true }))}
              >
                Carrinho de compras
              </button>
            </li>
          </ul>
        </Dropdown>
      </div>
      <CartModal />

    </StyledHeader>
  );
};

export default Header;