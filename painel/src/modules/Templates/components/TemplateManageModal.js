import { useState, useContext } from "react";
import { Modal, CloseButton } from "react-bootstrap";
import { api } from "api";

// context
import LoaderContext from "context/LoaderContext";

const TemplateManageModal = ({ show, close, template, mutate }) => {
    const formDefaults = {
        name: ''
    };

    const [form, setForm] = useState(formDefaults);

    const { setIsLoading } = useContext(LoaderContext);

    const handleControlledInput = (evt) => {
        setForm(state => ({
            ...state,
            [evt.target.name]: evt.target.value
        }))
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        try {
            setIsLoading(true);
            const { data } = await api.put('templates/'+template.id, form);
            console.log(data.message);
            close();
            mutate();
        } catch (err) {
            console.log(err.response.data.message)
        }
        setIsLoading(false);
    };

    return (
        <Modal show={show}>
            <Modal.Body>
                <div className="d-flex justify-content-end">
                    <CloseButton className="shadow-none" onClick={close} />
                </div>
                <h5>Editando modelo:</h5>
                <form onSubmit={handleSubmit}>
                    <label className="d-flex align-items-center">
                        <span className="me-3">Nome:</span>
                        <input name="name" className="form-control" placeholder={template.name} autoComplete="off" onChange={handleControlledInput} />
                    </label>
                    <div className="d-flex justify-content-end mt-3">
                        <button type="submit" className="btn btn-dark rounded-0">Salvar</button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default TemplateManageModal;