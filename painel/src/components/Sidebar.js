import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign, faShirt, faDoorOpen, faMessage } from '@fortawesome/free-solid-svg-icons'
import styled from "styled-components";

const Aside = styled.aside`
  background-color: #242423;
  height: 100%;
  width: 300px;
`;

const Avatar = styled.div`
  background: gray;
  height: 150px;
  width: 150px;
  margin: 0 auto;
  border-radius: 100%;
`;

const NavList = styled.ul`
  padding: 0;
  list-style: none;

  li {
    a, button {
      display: flex;
      align-items: center;
      background-color: #242423;
      color: #fff;
      width: 100%;
      padding: 1rem 2rem;
      border: 0;
      cursor: pointer;
      text-decoration: none;

      :hover {
        background-color: #1a1a19;
      }
    }
  }
`;

const Sidebar = () => {
  const [active, setActive] = useState(-1);
  const navigate = useNavigate();
  
  return (
    <Aside>
      <div style={{ margin: '60px 0' }}>
        <Avatar /> 
        <h5 className="text-white text-center mt-3">{}</h5>
      </div>
      <nav>
        <NavList>
          {
            [
              {
                title: 'Pedidos de orçamento',
                icon: faDollarSign,
                to: 'pedidos'
              },
              {
                title: 'Modelos',
                icon: faShirt,
                to: 'modelos'
              },
              {
                title: 'Mensagens',
                icon: faMessage,
                to: 'mensagens'
              },
              {
                title: 'Cupons promocionais',
                icon: faMessage,
                to: 'cupons'
              }
            ].map((option, i) => (
              <li key={i}>
                <Link 
                  to={option.to} 
                  style={active === i ? {
                    backgroundColor: '#1a1a19'
                  } : {}}
                  onClick={() => setActive(i)}
                >
                  <div className="d-flex justify-content-center align-items-center" style={{ width: '20px' }}>
                    <FontAwesomeIcon icon={option.icon} color="#fff" style={{ margin: '0 auto' }} />
                  </div>
                  <span className="ms-3">{option.title}</span>
                </Link>
              </li>
            ))
          }
          <li>
            <button 
              onClick={() => {
                sessionStorage.removeItem('authorization');
                navigate('/login');
              }}
            >
              <div className="d-flex justify-content-center align-items-center" style={{ width: '20px' }}>
                <FontAwesomeIcon icon={faDoorOpen} color="#fff" style={{ margin: '0 auto' }} />
              </div>
              <span className="ms-3">Sair</span>
            </button>
          </li>
        </NavList>
      </nav>
    </Aside>
  );
};

export default Sidebar;