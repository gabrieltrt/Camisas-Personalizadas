// dependencies
import { useEffect, useState, useRef, useContext } from "react";
import styled from "styled-components";
import { IoClose } from 'react-icons/io5';

// context
import PopupContext from "common/context/PopupContext";

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

interface Props {
  title: string,
  text: string
}

const Popup = ({ title, text }: Props) => {
  const [timeoutForClose, setTimeoutForClose] = useState<ReturnType<typeof setTimeout>>();
  const ref = useRef<HTMLDivElement>();

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
      <div className="flex justify-end">
        <button onClick={handleRemove}>
          <IoClose size={24} />
        </button>
      </div>
      <h5>{title}</h5>
      <p className="w-full whitespace-normal break-normal">{text}</p>
    </PopupCard>
  )
};

const Popups = () => {
  const { popups } = useContext(PopupContext);

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