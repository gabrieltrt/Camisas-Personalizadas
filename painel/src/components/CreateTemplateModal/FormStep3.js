// dependencies
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

// components
import Dropzone from "../Dropzone";

const FormStep3 = ({ next, previous, addToForm, form }) => {
  const filesDefaults = { 
    front: null,
    back: null
  };

  const [files, setFiles] = useState(filesDefaults);

  const handleSetFiles = (key, file) => {
    setFiles(state => ({ ...state, [key]: file }));
  };

  const handleAddToForm = () => {
    addToForm('overlays', files);
    next();
  };

  // função para setar os arquivos dos inputs
  const onFileInputChange = (evt) => {
    const file = evt.target.files[0];

    setFiles(state => ({ ...state, [evt.target.name]: file }));
  };

  useEffect(() => {
    addToForm('overlays', files);
  }, [files]);

  return (
    <div>
      <h5 className="text-center">Envie as sobreposições SVG</h5>
      <div className="d-flex gap-3 mt-3">
      <div className="d-flex flex-column w-100">
          <small>Frente:</small>
          <Dropzone 
            className={form.overlays?.front ? 'border-success' : ''}
            style={{ height: 125 }}  
            mimeTypes={[ 'image/svg+xml' ]}
            onValidDrop={(file) => handleSetFiles('front', file)}
            disabled={form.overlays?.front || false}
          >
            {
              form.overlays?.front &&
              <FontAwesomeIcon icon={solid('check')} size="lg" className='text-success' />
            }
          </Dropzone>
          <div className="text-center hide-on-tablet my-2">ou</div>
          <label className="btn btn-light rounded-0">
            {
              form.overlays?.front ?
              <FontAwesomeIcon icon={solid('check')} className="me-2 text-success" /> :
              <FontAwesomeIcon icon={solid('file-upload')} className="me-2 text-muted" /> 
              
            }
            <span className={form.overlays?.front ? 'text-success' : ''}>Selecione seu arquivo</span>
            <input className="d-none" name="front" type="file" disabled={form.overlays?.front || false} onChange={onFileInputChange} />
          </label>
        </div>
        <div className="d-flex flex-column w-100">
          <small>Costas:</small>
          <Dropzone 
            className={form.overlays?.back ? 'border-success' : ''}
            style={{ height: 125 }} 
            mimeTypes={[ 'image/svg+xml' ]}
            onValidDrop={(file) => handleSetFiles('back', file)}
            disabled={form.overlays?.back}
          >
            {
              form.overlays.back &&
              <FontAwesomeIcon icon={solid('check')} size="lg" className='text-success' />
            }
          </Dropzone>
          <div className="text-center hide-on-tablet my-2">ou</div>
          <label className="btn btn-light rounded-0">
            {
              form.overlays.back ?
              <FontAwesomeIcon icon={solid('check')} className="me-2 text-success" /> :
              <FontAwesomeIcon icon={solid('file-upload')} className="me-2 text-muted" /> 
              
            }
            <span className={form.overlays?.back ? 'text-success' : ''}>Selecione seu arquivo</span>
            <input className="d-none" name="back" type="file" disabled={form.overlays?.back || false} onChange={onFileInputChange} />
          </label>
        </div>
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
          disabled={!files.front || !files.back}
        >
          Próximo
        </button>
      </div>
    </div>
  );
};

export default FormStep3;