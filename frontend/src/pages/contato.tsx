// dependencies
import { ChangeEvent, FormEvent, useState, useContext } from 'react';
import { NextPage } from 'next';
import { AxiosError } from 'axios';
import api from 'api';
import styled from "styled-components";

import Head from 'next/head';

import { PopupContext, LoaderContext } from 'common/context';

const Form = styled.form`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: #fff;
    border-radius: .5rem;
    padding: 1rem;
    filter: drop-shadow(0 0 1px gray);
    
    ::after {
        content: "";
        position: absolute;
        bottom: 100%;
        height: 0;
        width: 0;
        border: 1rem solid transparent;
        border-bottom-color: #fff;
    }
`;

const Label = styled.label`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    border: 1px solid #dee5ed;
    border-radius: 55rem;
    padding: .5rem;
    margin-top: .5rem;

    :focus {
        box-shadow: 0 0 5px 0px rgb(178,216,231); 
        border: 1px rgb(37,174,230) solid;
`;

const TextArea = styled.textarea`
    border: 1px solid #dee5ed;
    border-radius: .5rem;
    padding: .5rem;
    margin-top: .5rem; 
    resize: none;
`;

const Submit = styled.button`
    background-color: #333;
    color: #fff;
    border-radius: 55rem;
    border: none;
    padding: 1rem;
`;

interface Form {
    name: string,
    email: string,
    subject: string,
    message: string,
    [key: string]: string
}

const Contact: NextPage = () => {
    const formDefaults: Form = {
        name: '',
        email: '',
        subject: '',
        message: ''
    };

    const [form, setForm] = useState<Form>(formDefaults);

    const { dispatchPopup } = useContext(PopupContext);
    const { setIsLoading } = useContext(LoaderContext);

    const handleControlledInput = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm(state => ({
            ...state,
            [evt.target.name]: evt.target.value
        }))
    };

    const handleSubmit = async (evt: FormEvent) => {
        evt.preventDefault();

        // valida se há campos vazios
        for (let key in form) {
            if (!form[key])
                return;
        }

        try {
            setIsLoading(true);
            const { data } = await api.post('contacts', form);
            dispatchPopup('Sucesso', data.message);
            setForm(formDefaults);
        } catch (err: unknown) {
            if (err instanceof AxiosError) {
                dispatchPopup('Erro', err.response?.data.message);
            }
        }
        setIsLoading(false);
    };

    return (
        <>
            <Head>
                <title>Contato</title>
            </Head>
            <div className="bg-zinc-800 py-5 px-3">
                <Form onSubmit={handleSubmit} className="mx-auto w-full sm:w-96 xl:w-1/3 mt-12">
                    <h4>Fale conosco</h4>
                    <Label>
                        <small>Nome</small>
                        <Input 
                            type="text" 
                            name="name" 
                            value={form.name}
                            autoComplete="off" 
                            onChange={handleControlledInput} 
                        />
                    </Label>
                    <Label>
                        <small>E-mail</small>
                        <Input 
                            type="text" 
                            name="email" 
                            value={form.email}
                            autoComplete="off" 
                            className="" 
                            onChange={handleControlledInput} 
                        />
                    </Label>
                    <Label>
                        <small>Assunto</small>
                        <Input 
                            type="text" 
                            name="subject" 
                            value={form.subject}
                            autoComplete="off" 
                            onChange={handleControlledInput} 
                        />
                    </Label>

                    <Label>
                        <span>Mensagem</span>
                        <TextArea name="message" rows="3" value={form.message} onChange={handleControlledInput} />
                    </Label>
                    <Submit title="Enviar" type="submit">Enviar</Submit>

                </Form>
            </div>
            <svg className="text-zinc-800 w-full" style={{ transform: 'scaleX(-1)' }} viewBox="0 0 1920 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1920 100L0.5 0.5V0H1920V100Z" fill="currentColor" />
            </svg>
        </>
    );
}

export default Contact;