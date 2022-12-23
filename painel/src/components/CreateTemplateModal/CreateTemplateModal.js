// dependencies
import { useState, useRef, useContext } from "react";
import { Modal } from "react-bootstrap";
import { api } from "api";

// components
import FormStep1 from "./FormStep1";
import FormStep2 from "./FormStep2";
import FormStep3 from "./FormStep3";
import FormStep4 from "./FormStep4";
import FormStep5 from "./FormStep5";

import LoaderContext from "../../context/LoaderContext";
import PopupsContext from "context/PopupsContext";

const CreateTemplateModal = ({ show, close }) => {
  const formDefaults = {
    name: '',
    mockups: {
      front: null,
      back: null
    },
    overlays: {
      front: null,
      back: null
    },
    areas: []
  };

  const [form, setForm] = useState(formDefaults)
  const [step, setStep] = useState(0);
  const MAX_STEP = 5;

  const { setIsLoading } = useContext(LoaderContext);
  const { dispatchPopup } = useContext(PopupsContext);

  const steps = [
    FormStep1,
    FormStep2,
    FormStep3,
    FormStep4,
    FormStep5
  ];

  // adiciona o campo ao formulário
  const addToForm = (key, value) => {
    setForm(state => ({ ...state, [key]: value }));
  };

  // vai até a proxima etapa
  const next = () => {
    if (step + 1 !== MAX_STEP)
      setStep(state => state + 1);
  };

  // volta pra etapa anterior
  const previous = () => {
    if (step - 1 !== -1)
      setStep(state => state - 1);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    // como o array é 0-based, diminui-se 1
    // se o passo atual não for o ultimo, vai para o proximo
    if (step !== MAX_STEP - 1) {
      return next();
    }

    // submit do formulário
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('mockup_front', form.mockups.front);
    formData.append('mockup_back', form.mockups.back);
    formData.append('overlay_front', form.overlays.front);
    formData.append('overlay_back', form.overlays.back);
    
    form.areas.forEach((area) => {
      // JSON.stringify para poder manusear melhor os dados no backend
      formData.append('custom_areas[]', JSON.stringify(area));
    });

    try {
      setIsLoading(true);
      const { data } = await (await api.post('templates', formData, { headers: { 'Content-Type': 'multipart/form-data; boundary='+formData._boundary } })).data;
      dispatchPopup({
        title: 'Sucesso',
        body: data.message
      });
      
    } catch (err) {
      console.log(err)
      dispatchPopup({
        title: 'Erro',
        body: err.response.data.message
      });
    }
    setIsLoading(false);

  };

  console.log(form)

  return (
    <Modal show={show}>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          {
            steps.filter((_, i) => i === step).map((StepElem) => (
              <StepElem addToForm={addToForm} next={next} previous={previous} close={close} form={form} />
            ))
          }
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateTemplateModal;