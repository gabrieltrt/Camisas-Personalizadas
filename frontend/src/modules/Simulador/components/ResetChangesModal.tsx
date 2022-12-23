// dependencies
import { useContext } from 'react';
import { Modal } from 'flowbite-react';

// context
import SimulatorContext from 'common/context/SimulatorContext';

interface Props {
  show: boolean,
  setShow: (state: boolean) => void
};

const ResetChangesModal = ({ show, setShow }: Props) => {
  const { context: simulatorContext, setContext: setSimulatorContext } = useContext(SimulatorContext);
  
  const handleAccept = () => {
    setSimulatorContext((state) => ({
      ...state,
      colors: state.colors.map(() => '#fff'),
      images: {
        front: [],
        back: []
      }
    }));

    setShow(false);
  };


  return (
    <Modal show={show}>
      <Modal.Body>
        <p className="text-center">Tem certeza de que deseja resetar as suas mudanças neste modelo?</p>
        <div className="flex justify-between mt-4">
          <button 
            type="button"
            className="bg-red-600 rounded p-2 text-white"
            onClick={() => setShow(false)}
          >
            Cancelar
          </button>
          <button 
            type="button" 
            className="bg-amber-300 rounded p-2" 
            onClick={handleAccept}
          >
            Sim, continue
          </button>
        </div>
      </Modal.Body>
        
    </Modal>
  );
};

export default ResetChangesModal;