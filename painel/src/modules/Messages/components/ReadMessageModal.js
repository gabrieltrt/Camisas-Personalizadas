// dependencies
import { Modal, CloseButton } from "react-bootstrap";

const ReadMessageModal = ({ show, close, message, markAsRead }) => {

    return (
        <Modal show={show} size="lg">
            <Modal.Body>
                <div className="d-flex justify-content-end">
                    <CloseButton onClick={close} className="shadow-none" />
                </div>
                <h5>Lendo mensagem</h5>
                <div>
                    <small className="text-muted">Enviada por:</small> {message.name}<br />
                    <small className="text-muted">Email:</small> {message.email}<br />
                    <small className="text-muted">Assunto:</small> {message.subject}<br />
                    <p className="mt-3">
                        <small className="text-muted">Mensagem:</small>&nbsp;{message.message}
                    </p>
                </div>
                <div className="d-flex justify-content-between">
                    {
                        !message.read ?
                        <button className="btn btn-success rounded-0" onClick={() => markAsRead(message.id)}>
                            Marcar como lida
                        </button> :
                        <div className="alert alert-success m-0 py-2">Mensagem já lida</div>
                    }
                    <a role="button" href={`mailto:${message.email}`} target="_blank" rel="no-referrer" className="btn btn-dark rounded-0">
                        Entrar em contato
                    </a>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ReadMessageModal;