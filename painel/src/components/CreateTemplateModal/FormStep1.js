import { useState } from 'react';

const FormStep1 = ({ next, previous, cancel, addToForm }) => {
  const [name, setName] = useState('');

  const handleAddToForm = () => {
    addToForm('name', name);
    next();
  };

  return (
    <div>
      <h5 className="text-center">Criar um novo modelo</h5>
      <div className="form-floating mt-3">
        <input 
          id="name" 
          name="name" 
          className="form-control" 
          placeholder=" " 
          autoComplete="off" 
          onChange={(evt) => setName(evt.target.value)}
        />
        <label for="name">Nome do modelo</label>
      </div>
      <div className="d-flex justify-content-between mt-3">
        <button
          className="btn btn-danger rounded-0"
          type="button"
          onClick={cancel}
        >
          Cancelar
        </button>
        <button 
          className="btn btn-dark rounded-0" 
          type="button"
          onClick={handleAddToForm}
          disabled={!name}
        >
          Próximo
        </button>
      </div>
    </div>
  );
};

export default FormStep1;