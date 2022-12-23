// dependencies
import { useState, useRef, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import LoaderContext from '../../context/LoaderContext';

const FormStep5 = ({ next, previous, form }) => {

  

  return (
    <div>
      <h5>Confirme os dados: </h5>
      <div className="d-flex flex-column gap-4">
        <div className='form-floating'>
          <input id="name" className="form-control" value={form.name} placeholder=" " readOnly />
          <label for="name">Nome:</label>
        </div>

        <h6>Mockups</h6>
        <div className="row gap-3">
          <div className="col">
            Frente:
            <img src={URL.createObjectURL(form.mockups?.front)} alt="" className="w-100" />
          </div>
          <div className="col">
            Costas:
            <img src={URL.createObjectURL(form.mockups?.back)} alt="" className="w-100" />
          </div>
        </div>

        <h6>SVG</h6>
        <div className="row gap-3">
          <div className="col">
            Frente:
            <img src={URL.createObjectURL(form.overlays?.front)} alt="" className="w-100" />
          </div>
          <div className="col">
            Costas:
            <img src={URL.createObjectURL(form.overlays?.back)} alt="" className="w-100" />
          </div>
        </div>

        <h6>Customização</h6>
        <table className="table table-striped align-middle table-borderless">
          <thead>
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">Índice</th>
            </tr>
          </thead>
          <tbody>
            {
              form.areas.map((area, i) => (
                <tr>
                  <td>{area.name}</td>
                  <td>{area.index}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
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
          type="submit"
        >
          Salvar
        </button>
      </div>
    </div>
  );
};

export default FormStep5;