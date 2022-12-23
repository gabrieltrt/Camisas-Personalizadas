import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';

// components
import Button from '../components/Button';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const { identifier, password } = evt.target;

    const data = {
      identifier: identifier.value,
      password: password.value
    };

    try {
      setIsLoading(true);
      const res = await api.post('auth/admin', data);
      console.log(res.data.message);
      sessionStorage.setItem('authorization', 'bearer '+res.data.token);
      navigate('/')
    } catch (err) {
      console.log(err.response.data.message);
    }
    setIsLoading(false);
  };

  return (
    <div className='d-flex justify-content-center h-100 w-100'>
      <form 
        className="d-flex flex-column gap-2 shadow p-4 align-self-center" 
        style={{
          width: 600
        }}
        onSubmit={handleSubmit}
      >
        <h4>Entre no HPainel</h4>
        <div className="form-floating">
          <input 
            id="identifier" 
            name="identifier" 
            type="text" 
            className="form-control" 
            placeholder=" " 
            autoComplete="off"
          />
          <label htmlFor="identifier">Email ou nome de usuário</label>
        </div>
        <div className="form-floating">
          <input id="password" name="password" type="password" className="form-control" placeholder=" " />
          <label htmlFor="password">Senha</label>
        </div>
        <Button 
          active={isLoading}
          title="Entrar"
          type="submit" 
          className="btn btn-primary mx-5" 
          disabled={isLoading}
        />
      </form>
    </div>
  );
};

export default Login;