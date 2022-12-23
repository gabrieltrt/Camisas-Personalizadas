import { useState, useContext } from "react";
import { useApi } from "api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import styled from "styled-components";
import { api } from "api";

// components
import ReadMessageModal from "modules/Messages/components/ReadMessageModal";

// context
import LoaderContext from "context/LoaderContext";
import PopupsContext from "context/PopupsContext";

const Card = styled.article`
    max-height: 195px;
    padding: .5rem;
    border: 1px solid #dee2e6;
    border-left: .25rem solid #dee2e6;
    border-radius: .5rem;
    overflow: hidden;
    transition: transform .2s ease-in-out;

    :hover {
        box-shadow: 0 .5rem 1rem -.5rem #00000025;
        transform: translateY(-.5rem);
        cursor: pointer;
    }
`;

const Messages = () => {
    const [messageReadingId, setMessageReadingId] = useState(-1);
    const { data: messages, mutate } = useApi('contacts');
    const { setIsLoading } = useContext(LoaderContext);
    const { dispatchPopup } = useContext(PopupsContext);

    const readMessage = (id) => {
        setMessageReadingId(id);
    };

    const stopReading = () => {
        setMessageReadingId(-1);
    };

    const markAsRead = async (id) => {
        setIsLoading(true);
        await api.put('contacts/'+id);
        dispatchPopup({ title: 'Sucesso', body: 'Mensagem marcada como lida.' })
        setIsLoading(false);
        stopReading();
        mutate();
    };

    return (
        <section>
            <h4>Mensagens</h4>
            <div className="d-grid gap-3" style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
                {
                    !messages?.length ? 
                    <h5 className="text-muted mt-5">Não há mensagens.</h5> :
                    messages?.map((message) => (
                        <>
                            <Card className={`${message.read ? 'border-success' : 'border-danger'}`} key={message.id} onClick={() => readMessage(message.id)}>
                                <div className={`d-flex align-items-center ${message.read ? 'text-success' : 'text-danger'}`}>
                                    {
                                        message.read ?
                                        <FontAwesomeIcon icon={solid('check')} size="lg" className="me-3" /> :
                                        <FontAwesomeIcon icon={solid('xmark')} size="lg" className="me-3" />
                                    }
                                    <small>
                                        {
                                            message.read ?
                                            'Lida' : 'Não lida'
                                        }
                                    </small>
                                </div>
                                <div className="d-flex flex-column gap-3">
                                    <div className="d-flex flex-column">
                                        <small>De: {message.name}</small>
                                        <small>Email: {message.email.toLowerCase()}</small>
                                    </div>
                                    <div>
                                        <small>Assunto: {message.subject}</small>
                                        <p 
                                        style={{ 
                                            display: '-webkit-box',
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: 'vertical',
                                            lineHeight: 1.2,
                                            overflow: 'hidden'
                                        }}
                                        >{message.message}</p>
                                    </div>
                                </div>
                                
                            </Card>
                            <ReadMessageModal show={messageReadingId === message.id} close={stopReading} message={message} markAsRead={markAsRead} />
                        </>
                    ))
                }
            </div>
        </section>
    );
};

export default Messages;