// dependencies
import { ChangeEvent, useState, useContext } from 'react';
import { Alert } from 'flowbite-react';

// components
import ImageUploadConfirmationModal from './UploadConfirmationModal';
import Dropzone from 'common/components/Dropzone';

// context
import { SimulatorContext, PopupContext } from 'common/context';

const ImageUpload = () => {
  const [confirmationModalShow, setConfirmationModalShow] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const { context: simulatorContext } = useContext(SimulatorContext);
  const { dispatchPopup } = useContext(PopupContext);

  const handleValidUpload = (file: File) => {
    setFile(file);
    setConfirmationModalShow(true);
  };

  return (
    <>
      <h5 className="font-bold">Upload de imagem</h5>

      {
        !simulatorContext.currentTemplate ?
        <p className="flex flex-col items-center text-gray-400">
          <strong>Nada aqui!</strong>
          <small>Selecione um modelo para continuar.</small>
        </p> : 
        <div className="flex flex-col items-center" style={{ overflowY: 'scroll' }}>
          <Alert color="warning" style={{ borderStyle: 'dashed' }}>
            Formatos suportados: PNG, JPG, SVG e PDF
          </Alert>

          <Dropzone
            className="hide-on-tablet w-full mt-4"
            style={{ minHeight: '150px' }} 
            mimeTypes={['image/png', 'image/jpeg', 'image/svg+xml']}
            onValidDrop={handleValidUpload}
            onUnsupportedDrop={() => dispatchPopup('Erro', 'Essa extensão não é suportada.')}
          />
          <ImageUploadConfirmationModal 
            show={confirmationModalShow} 
            setShow={setConfirmationModalShow} 
            file={file!}
          />
          <strong className='hide-on-tablet my-3'>ou</strong>
          <label role="button" className="bg-amber-300 rounded-full p-3">
            <span>Selecione o arquivo</span>
            <input 
              type="file" 
              className="hidden" 
              accept={['image/png', 'image/jpeg', 'image/svg+xml'].join(',')}
              onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                handleValidUpload(evt.target?.files![0]);
                evt.target.value = '';
              }}
            />
          </label>
        </div>
      }
      
    </>
  );
};

export default ImageUpload;