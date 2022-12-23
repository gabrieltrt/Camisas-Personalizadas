import { useContext } from "react";
import { Modal, CloseButton } from "react-bootstrap";
import { useApi, storage } from "api";
import styled from "styled-components";

import PopupsContext from "context/PopupsContext";

const BudgetsManageModal = ({ show, close, user }) => {
    const { data: budgetsFromUser } = useApi(`members/${user.id}/budgets`);

    const { dispatchPopup } = useContext(PopupsContext);

    const handleMarkAsDone = (id) => {
        dispatchPopup({
            title: 'Sucesso',
            body: 'Orçamento marcado como concluído.'
        });
    };

    return (
        <Modal show={show} size="lg">
            <Modal.Body>
                <div className="d-flex justify-content-end">
                    <CloseButton onClick={close} />
                </div>
                <h5 className="my-3 fw-light">Pedidos de: {user.email}</h5>
                <table className="table ">
                    <thead>
                        <tr>
                            <th className="text-center">
                                <small className="fw-normal text-muted">Anexo</small>
                            </th>
                            <th className="text-center">
                                <small className="fw-normal text-muted">Modelo</small>
                            </th>
                            <th className="text-center">
                                <small className="fw-normal text-muted">Tecido</small>
                            </th>
                            <th className="text-center">
                                <small className="fw-normal text-muted">Quantidade</small>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            budgetsFromUser?.map((budget) => (
                                <tr key={budget.id}>
                                    <td>
                                        <img style={{ height: 100 }} src={`${storage}/${budget.annex}`} alt="" />
                                    </td>
                                    <td className="align-middle text-center">{budget.template_name}</td>
                                    <td className="align-middle text-center">{budget.tissue}</td>
                                    <td className="align-middle text-center">{budget.quantity}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <div className="d-flex justify-content-between">
                    <button className="btn btn-dark" onClick={() => handleMarkAsDone(user.id)}>Marcar como concluído</button>
                    <a href={`https://wa.me/55${user.phone}`} className="btn btn-success">Entrar em contato</a>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default BudgetsManageModal;