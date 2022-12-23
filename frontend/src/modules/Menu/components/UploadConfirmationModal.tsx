// dependencies
import { useContext } from 'react';
import { Modal } from 'flowbite-react';

// context
import SimulatorContext from 'common/context/SimulatorContext';

interface Props {
  show: boolean,
  setShow: (newstate: boolean) => void,
  file: File
}

const ImageUploadConfirmationModal = ({ show, setShow, file }: Props) => {
  const { context: simulatorContext, setContext: setSimulatorContext } = useContext(SimulatorContext);

  const handleSideChoose = (side: string) => {
    const images = simulatorContext.images[side];
    const id = !images.length ? 0 : (images[images.length - 1].id) + 1;
    const image = {
      id,
      src: URL.createObjectURL(file),
    };
    setSimulatorContext((state) => {
      const newState = { 
        ...state, 
        images: { 
          ...state.images,
          [side]: [
            ...state.images[side],
            image
          ]
        }
      };

      return newState;
    })
    setShow(false);
  };

  return (
    <Modal show={show}>
      <Modal.Body>
        <p className="text-center">Selecione o lado onde deseja inserir esta imagem</p>
        <div className="flex justify-center gap-4 mt-3">
          <button type="button" className="bg-amber-300 p-2 rounded-full" onClick={() => handleSideChoose('front')}>Frente</button>
          <button type="button" className="bg-amber-300 p-2 rounded-full" onClick={() => handleSideChoose('back')}>Costas</button>
        </div>
      </Modal.Body>
    </Modal>
  );

};

export default ImageUploadConfirmationModal;