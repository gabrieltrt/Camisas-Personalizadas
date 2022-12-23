// dependencies
import { useEffect, useState, useRef, useContext } from "react";
import { CloseButton } from "react-bootstrap";
import styled from "styled-components";

// context
import PopupsContext from "context/PopupsContext";

const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background: blue;
  width: 400px;
  margin-top: 40px;
  z-index: 1066;
`;

const PopupCard = styled.article`
  background-color: #fff;
  height: 150px;
  padding: .5rem;
`;

const Popup = ({ title, body }) => {
  const [timeoutForClose, setTimeoutForClose] = useState();
  const ref = useRef();

  const handleRemove = () => {
    ref.current?.remove();
  };

  // inicia o tempo para o popup ser destruido
  const initTimeoutForClose = () => {
    const timeout = setTimeout(() => {
      handleRemove();
    }, 5000);

    setTimeoutForClose(timeout);
  };

  // para o tempo para o popup ser destruido
  const stopTimeoutForClose = () => {
    clearTimeout(timeoutForClose);
  };

  useEffect(() => {
    initTimeoutForClose();

    return () => {
      stopTimeoutForClose();
    };
  }, []);

  return (
    <PopupCard 
      ref={ref} 
      className="border shadow-lg" 
      onMouseOver={stopTimeoutForClose} 
      onMouseLeave={initTimeoutForClose}
    >
      <div className="d-flex justify-content-end">
          <CloseButton onClick={handleRemove}  />
      </div>
      <h5>{title}</h5>
      <p className="w-100">{body}</p>
    </PopupCard>
  )
};

const Popups = () => {
  const { popups } = useContext(PopupsContext);

  if (!popups.length)
    return <></>;

  return (
    <PopupContainer>
      {
        popups.map((popup, i) => (
          <Popup key={i} {...popup} />
        ))
      }
    </PopupContainer>
  );
};

export default Popups;