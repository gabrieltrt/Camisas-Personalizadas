// dependencies
import { useState, useEffect, useContext, ChangeEvent, FormEvent } from 'react';
import { Modal } from "flowbite-react";
import styled from 'styled-components';
import api, { useApi, storage } from 'api';

// icons
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { IoClose } from 'react-icons/io5';
import { FaTrashAlt } from 'react-icons/fa';
import Form from './Form';

// context
import { PopupContext, ModalContext, LoaderContext, CartContext } from 'common/context';

// interface
import CartItem from 'interfaces/CartItem';

const Table = styled.table`
  width: 100%;
  tbody tr {
    height: 50px;
    
    td {
      padding: .5rem;

      .trash-btn {
        color: gray;
        transition: color ease .5s;
      }
    }

    :nth-child(even) {
      background-color: #f7f7f7;
    }
  }
`;


const CartModal = () => {
  const { context: modalContext, setContext: setModalContext } = useContext(ModalContext);
  const { cart, mutate } = useContext(CartContext);

  // controla mudanças nos itens. ex: troca de tecido
  const items: CartItem[] = [];

  // salva possiveis mudanças nos itens do carrinho
  const saveItems = async () => {
    await api.put('cart', { items });
  };

  const close = () => {
    saveItems();
    setModalContext(state => ({ ...state, CART: false }))
  };

  return (
    <Modal 
      show={modalContext?.CART}
      position="top-right"
      size="4xl"
      // dialogClassName="h-100 my-0 me-0" 
      // contentClassName="rounded-0 h-100"
    >
      <Modal.Body className="px-3 lg:p-6">
        <div className="flex justify-end mb-4">
          <button onClick={close} className="shadow-none">
            <IoClose size={24} className="text-gray-400" />
          </button>
        </div>

        <h4 className="flex items-center mb-4">
          <AiOutlineShoppingCart className="mr-3" />
          Meu carrinho
        </h4>
        {
          !cart?.length ?
          <div className="flex justify-center items-center" style={{ height: 400 }}>
            <span className="text-gray-500">Não há itens no seu carrinho.</span>
          </div> :
          <>
            <section className='mb-5'>
              <Table className="border-b table-auto text-xs">
                <thead>
                  <tr className="bg-gray-50 p-2">
                    <th className='hide-on-mobile'>
                      <small>Anexo</small>
                    </th>
                    <th>
                      <small>Modelo</small>
                    </th>
                    <th>
                      <small>Tecido</small>
                    </th>
                    <th>
                      <small>Quantidade</small>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    cart?.map((item: CartItem, i: number) => {
                      items[i] = item;

                      return (
                        <tr key={item.id}>
                          <td className='hide-on-mobile'>
                            {
                              <img 
                                className="h-24" 
                                src={item.annex instanceof Blob ? URL.createObjectURL(item.annex) : `${storage}/${item.annex}`} 
                                alt="" 
                              />
                            }
                          </td>
                          <td>
                            <small className="uppercase text-xs md:text-sm">{item.template_name}</small>
                          </td>
                          <td>
                            <small>
                              <select 
                                defaultValue={item.tissue}
                                className="focus:ring-0 focus:border-gray-600 text-xs p-1 md:text-sm"
                                onChange={(evt: ChangeEvent<HTMLSelectElement>) => {
                                  items[i].tissue = evt.target.value;
                                }}
                              >
                                <option value="algodão">Algodão</option>
                                <option value="helanca">Helanca</option>
                                <option value="poliamida uv">Poliamida UV</option>
                              </select>
                            </small>
                          </td>
                          <td>
                            <input 
                              className="focus:ring-0 focus:border-gray-600 text-xs p-1 w-16 md:text-sm"
                              style={{ width: 75 }}
                              type="number" 
                              defaultValue={item.quantity}
                              onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                                if (evt.target.value[0] === '0') {
                                  evt.target.value = evt.target.value.substring(1);
                                }

                                if (evt.target.value.length < 1) 
                                  evt.target.value = '0';

                                items[i].quantity = parseInt(evt.target.value);
                              }}
                            />
                          </td>
                          <td>
                            <button className="border-0 trash-btn"
                              onClick={() => {
                                api.delete(`/cart/${item.id}`);
                                mutate((cart) => cart.filter((it) => it.id !== item.id), false);
                              }}
                            >
                              <FaTrashAlt className="hover:text-red-600" />
                            </button>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </Table>
            </section>
            <Form mutateData={mutate} saveItems={saveItems} />
          </>
        }
      </Modal.Body>
    </Modal>
  );
};

export default CartModal;