import { useContext, useState } from "react";
import { api, useApi } from "api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import styled from "styled-components";

// context
import LoaderContext from "context/LoaderContext";
import PopupsContext from "context/PopupsContext";

const Coupons = () => {
    const { setIsLoading } = useContext(LoaderContext);
    const { dispatchPopup } = useContext(PopupsContext);
    const { data: coupons, mutate } = useApi('/coupons');

    const handleCouponCreate = async (evt) => {
        evt.preventDefault();

        try {
            setIsLoading(true);
            await api.post('/coupons', { code: evt.target.code.value });
            evt.target.code.value = '';
            mutate();
        } catch (err) {
            dispatchPopup({ title: 'Erro', body: err.response.data.message });
        }
        setIsLoading(false);
    };

    return (
        <section>
            <h4>Cupons promocionais</h4>
            <form onSubmit={handleCouponCreate} className="mt-4">
                <h6 className="fw-light">Criar novo cupom</h6>
                <div className="d-flex gap-3">
                    <input className="form-control w-50 rounded-0" name="code" type="text" autoComplete="off" placeholder="Digite o codigo do cupom"/>
                    <button className="btn btn-dark rounded-0" type="submit" title="Criar">
                        Criar
                    </button>
                </div>
            </form>
            <h5 className="mt-4">Cupons existentes</h5>
            <div className="d-flex gap-3">
                {
                    !coupons?.length ?
                    <small className="text-muted">Você ainda não criou nenhum cupom.</small> :
                    coupons?.map((coupon) => {
                        const date = new Date(coupon.created_at);
                        const created_at = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

                        return (
                            <div className="position-relative bg-white rounded-4 border p-3" key={coupon.id}>
                                <div>{coupon.code}</div>
                                <small className="text-muted">Criado dia: {created_at}</small>
                                <button 
                                    className="position-absolute top-0 end-0 btn text-danger shadow-none rounded-circle" 
                                    title="Apagar"
                                    onClick={async () => {
                                        mutate((coupons) => coupons.filter((c) => c.id !== coupon.id), false);
                                        await api.delete(`/coupons/${coupon.id}`);
                                    }}
                                >
                                    <FontAwesomeIcon icon={solid('xmark')} />
                                </button>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    );
};

export default Coupons;