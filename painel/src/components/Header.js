import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #242423;
  height: 60px;
  padding: 0 2rem 0 0;
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
`;

const Header = () => {
  const [formmatedCurrentTime, setFormmatedCurrentTime] = useState('');

  const formatCurrentTime = () => {
    const date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();

    h = h < 10 ? '0'+h : h;
    m = m < 10 ? '0'+m : m;
    s = s < 10 ? '0'+s : s;

    setFormmatedCurrentTime(`${h}:${m}:${s}`);
  };

  useEffect(() => {
    formatCurrentTime();
    const interval = setInterval(() => {
      formatCurrentTime();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <StyledHeader>
      <Button>
        <FontAwesomeIcon icon={solid('arrow-left')} color="#fff" size="xl" />
      </Button>
      <strong className='text-white'>
        {formmatedCurrentTime}
      </strong>
    </StyledHeader>
  );
};

export default Header;