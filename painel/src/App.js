// dependencies
import { useRef, useState, useContext, useEffect } from "react";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import { SWRConfig } from "swr";
import styled from "styled-components";
import { api, useApi } from './api';

//components
import Popups from "components/Popups";

// context
import UserContext from "context/UserContext";
import LoaderContext from "context/LoaderContext";
import PopupsContext from "context/PopupsContext";

import AppRoutes from "./AppRoutes";

import './style.scss';


const StartingAppScreen = styled.div`
  &.fadeout {
    animation: fadeout .7s 1;
  }

  @keyframes fadeout {
    to {
      opacity: 0
    }
  }
`;

const App = () => {
  const [user, setUser] = useState(null);
  const [popups, setPopups] = useState([]);
  const [isStarting, setIsStarting] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { data, error } = useApi('auth/admin', null, {
    revalidateOnFocus: false
  });
  
  const startingAppScreenRef = useRef();
  const navigate = useNavigate();

  const dispatchPopup = (config = { title: '', body: '' }) => {
    setPopups(state => [
      ...state,
      {
        title: config.title,
        body: config.body
      }
    ]);
  };

  useEffect(() => {
    if (!isStarting) {
      if (!user)
        navigate('/login');
      else
        navigate('/');

      startingAppScreenRef.current.classList.add('fadeout');
      setTimeout(() => {
        startingAppScreenRef.current.remove();
      }, 700);
    }
  }, [isStarting]);

  useEffect(() => {
    if (data) {
      setUser(data);
      setIsStarting(false);
    }

    if (error)
      setIsStarting(false);
  }, [data, error]);

  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false
      }}
    >
      <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
        <PopupsContext.Provider value={{ popups, dispatchPopup }}>
          <UserContext.Provider
            value={{
              context: user,
              setContext: setUser
            }}
          >

            <StartingAppScreen ref={startingAppScreenRef} className="d-flex h-100 w-100 bg-dark">
              <h1 className="w-100 text-white text-center align-self-center">HPainel</h1>
            </StartingAppScreen> 
            <div>
              {
                isLoading &&
                <div 
                  className="d-flex justify-content-center align-items-center w-100 h-100 position-fixed top-0 right-0" 
                  style={{ 
                    backgroundColor: 'rgb(0, 0, 0, .2)',
                    zIndex: 1080
                  }}
                >
                  <div className="spinner spinner-border" />
                </div>
              }
            
            </div>
            <Popups />
            <AppRoutes /> 
          </UserContext.Provider>
        </PopupsContext.Provider>
      </LoaderContext.Provider>
    </SWRConfig>
  );
};

export default App;
