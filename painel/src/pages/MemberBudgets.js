// dependencies
import { useEffect, useRef, useState, forwardRef } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { brands } from "@fortawesome/fontawesome-svg-core/import.macro";
import InfiniteScroll from "react-infinite-scroll-component";
import styled from "styled-components";
import { api, useApi } from '../api';

import BudgetsManageModal from 'modules/Budgets/components/BudgetsManageModal';

const MemberBudgets = (props) => {
  const [activeModalId, setActiveModalId] = useState(-1);
  const loadingRef = useRef();

  const { data: usersWithBudgets, error } = useApi('budgets/users');

  const closeBudgetsManageModal = () => {
    setActiveModalId(-1);
  };

  return (
    <section>
      <h4 className="mb-5">Pedidos de orçamento</h4>
      <table className="container-sm table">
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Email</th>
            <th scope='col'>Whatsapp</th>
            <th scope='col' />
          </tr>
        </thead>
        <tbody>
          {
            usersWithBudgets?.map((user, i) => (
              <tr key={user.id}>
                <th scope="row">#</th>
                <td>{user?.email}</td>
                <td>{user?.phone}</td>
                <td>
                  <button className="btn btn-dark rounded-0" onClick={() => setActiveModalId(i)}>Pedidos</button>
                </td>
                <BudgetsManageModal show={activeModalId === i} close={closeBudgetsManageModal} user={user} />
              </tr>
            ))
          }
        </tbody>
      </table>
      {/* <div ref={loadingRef} className='d-flex justify-content-center mt-4'>
        <div className="spinner-border mx-auto" />
      </div> */}
    </section>
      
  );
};

export default MemberBudgets;