// dependencies
import { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

const FormStep4 = ({ next, previous, addToForm }) => {
  const areasDefaults = [
    { 
      name: 'Tronco', 
      index: 0 
    }
  ];

  const [areas, setAreas] = useState(areasDefaults);
  const [isAdding, setIsAdding] = useState(false);
  const inputAreaNameRef = useRef();
  const inputAreaIndexRef = useRef();
  
  const handleAddToForm = () => {
    addToForm('areas', areas);
    next();
  };

  return (
    <div>
      <h5 className="mb-0">Customização</h5>
      <small className="text-muted">Defina as áreas customizaveis neste modelo</small>
      <table className="table table-striped align-middle table-borderless">
        <thead>
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">Índice</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {
            areas.map((area, i) => (
              <tr key={i}>
                <td>{area.name}</td>
                <td>{area.index}</td>
                <td>
                  <button 
                    className="btn btn-danger rounded-0" 
                    type="button"
                    onClick={() => setAreas(state => state.filter((_, index) => index !== i ))}
                  >
                    <FontAwesomeIcon icon={solid('trash')} />
                  </button>
                </td>
              </tr>
            ))
          }
          {
            isAdding &&
            <tr>
              <td>
                <input ref={inputAreaNameRef} type="text" />
              </td>
              <td>
                <input ref={inputAreaIndexRef} type="number" style={{ width: 50 }} />
              </td>
            </tr>
          }
        </tbody>
      </table>
      <div className="d-flex justify-content-end">
        <button 
          className="btn btn-success rounded-0" 
          title="Adicionar"
          type="button"
          onClick={() => {
            if (isAdding) {
              const name = inputAreaNameRef.current.value;
              const index = inputAreaIndexRef.current.value;

              if (name && index)
                setAreas(state => [...state, { name, index }])
            }

            setIsAdding(!isAdding)
          }}
        >
          {
            !isAdding ?
            <FontAwesomeIcon icon={solid('plus')} /> :
            'Concluir'
          }
          
        </button>
      </div>
      <div className="d-flex justify-content-between mt-3">
        <button
          className="btn btn-danger rounded-0"
          type="button"
          onClick={previous}
        >
          Cancelar
        </button>
        <button 
          className="btn btn-dark rounded-0" 
          type="button"
          onClick={handleAddToForm}
          disabled={!areas.length}
        >
          Próximo
        </button>
      </div>
    </div>
  );
};

export default FormStep4;