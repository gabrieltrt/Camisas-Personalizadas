import { useState, useEffect, useContext, FormEvent, ChangeEvent } from 'react';
import { MutatorCallback } from 'swr';
import api from 'api';
import styled from 'styled-components';

// icons
import { AiOutlineWhatsApp, AiOutlineMail, AiOutlineCalendar } from 'react-icons/ai';
import { BsPerson } from 'react-icons/bs';
import { IoMdBusiness } from 'react-icons/io';
import { RiCoupon3Line } from 'react-icons/ri';

// context
import { LoaderContext, PopupContext } from 'common/context';
import { AxiosError } from 'axios';

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: .5rem;
  width: 100%;

  input {
    width: 100%;
  }
`;

interface FormInterface {
    cpf: string,
    cnpj: string,
    email: string,
    whatsapp: string,
    birthdate: string,
    discountCoupon: string,
    [key: string]: string
}

interface FormRegex {
    email: RegExp,
    whatsapp: RegExp,
    birthdate: RegExp,
    cpf: RegExp,
    cnpj: RegExp,
    [key: string]: any
}

interface Props {
    saveItems: () => void,
    mutateData?: MutatorCallback
}

const Form = ({ mutateData, saveItems }: Props) => {
    const formDefaults: FormInterface = {
        cpf: '',
        cnpj: '',
        email: '',
        whatsapp: '',
        birthdate: '',
        discountCoupon: ''
    };

    // validação para o formulário
    const regex: FormRegex = {
        email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        whatsapp: /^\d{11}$/,
        birthdate: /^\d{4}-\d{2}-\d{2}$/,
        cpf: /^\d{11}$/,
        cnpj: /^\d{14}$/
    };

    // 0 para pessoa física, 1 para pessoa jurírica
    const [formType, setFormType] = useState<1 | 0>(0);
    const [form, setForm] = useState<FormInterface>(formDefaults);
    const [canSubmit, setCanSubmit] = useState<boolean>(false);

    const { setIsLoading } = useContext(LoaderContext);
    const { dispatchPopup } = useContext(PopupContext);

    // funções de mascara
    const handleCpfMask = (value: string) => {
        if (!value) return '';
        let mask = value.replaceAll(/\D/g, '');
        mask = mask.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/g, "$1.$2.$3-$4");
        return mask;
    };

    const handleCnpjMask = (value: string) => {
        if (!value) return '';
        let mask = value.replaceAll(/\D/g, '');
        mask = mask.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/g, "$1.$2.$3.$4-$5");
        return mask;
    }

    const handleWhatsappNumberMask = (value: string) => {
        if (!value) return '';
        let mask = value.replaceAll(/\D/g, '');
        mask = mask.replace(/^(\d{2})(\d{1})(\d{4})(\d{4})$/g, "$1 $2 $3-$4");
        return mask;
    };

    // controla o valor de um input simples
    const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
        const target = evt.target;

        setForm({
        ...form,
        [evt.target.name]: target.value
        });
    };

    // controla o valor de um input que precisa de validação
    const handleValidableInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
        const target = evt.target;
        
        if (regex[target.name].test(target.value)) {
            target.classList.add('is-valid');
            target.classList.remove('is-invalid');
        } else {
            target.classList.remove('is-valid');
            target.classList.add('is-invalid');
        }
        
        handleInputChange(evt);
    };

    // valida todos os campos
    const validateFields = () => {
        for (let key in form) {
        
        if (form[key] && key !== 'discountCoupon')
            if (regex[key] && !regex[key].test(form[key]))
            return setCanSubmit(false);
        }
        setCanSubmit(true);
    };

    const handleSubmit = async (evt: FormEvent) => {
        evt.preventDefault();

        // filtro para não enviar campos nulos ou vazios
        for (let key in form) {
            if (!form[key]) {
                delete form[key];
            }
        }
    
        try {
          setIsLoading(true);
          saveItems();
          const { data } = await api.post('budgets', form);
          
          dispatchPopup('Sucesso', data.message);
          setForm(formDefaults);
        } catch (err: unknown) {
            if (err instanceof AxiosError) {
                dispatchPopup('Erro', err.response?.data.message);
            }
        }
        setIsLoading(false);
    
        mutateData && mutateData();
    };

    useEffect(() => {
        // valida todos os campos assim que o formulário muda
        console.log(form)
        validateFields();
    }, [form]);

    console.log(canSubmit)
    useEffect(() => {
        // deleta propriedades quando o tipo do formulário é mudado
        if (!formType) {
          form.cnpj = '';
        } else {
          form.cpf = '';
          form.birthdate = '';
        }
    }, [formType]);

    return (
        <form className='flex flex-col gap-3 mt-5' onSubmit={handleSubmit}>
            <div className="flex justify-between md:justify-start md:gap-3">
                <button 
                    type="button"
                    className={`border border-neutral-800 ${formType ? 'bg-transparent' : 'bg-neutral-800 text-white'} p-2`}
                    onClick={() => setFormType(0)}
                >
                    Pessoa física
                </button>
                <button 
                    type="button"
                    className={`border border-neutral-800 ${!formType ? 'bg-transparent' : 'bg-neutral-800 text-white'} p-2`}
                    onClick={() => setFormType(1)}
                >
                    Pessoa jurídica
                </button>
            </div>
            <small className="text-gray-600">Seus dados são importantes para podermos identificar você no sistema!</small>
            {
            !formType ?
            <div className="flex flex-col md:flex-row gap-3">
                <Label>
                    <BsPerson size={24} />
                    <div>
                        <small className="text-gray-600">CPF *</small>
                        <input 
                            name="cpf"
                            type="text"
                            className="border-0 border-b focus:ring-0 focus:border-gray-600"
                            placeholder="000.000.000-00" 
                            autoComplete="off"
                            value={handleCpfMask(form.cpf)}
                            onChange={handleValidableInputChange}
                        />
                    </div>
                </Label>
                <Label>
                    <AiOutlineCalendar size={24} />
                    <div>
                        <small className='text-gray-600'>Data de nascimento *</small>
                        <input 
                            name="birthdate"
                            type="date"
                            className="border-0 border-b focus:ring-0 focus:border-gray-600" 
                            placeholder="Data de nascimento *" 
                            autoComplete="off"
                            value={form.birthdate}
                            onChange={handleValidableInputChange}
                        />
                    </div>
                </Label>
            </div> :
            <Label>
                <IoMdBusiness size={24} />
                <div className="w-full">
                    <small className="text-gray-600">CNPJ *</small>
                    <input 
                        name="cnpj"
                        type="text"
                        className="border-0 border-b focus:ring-0 focus:border-gray-600"
                        autoComplete="off"
                        placeholder='00.000.000.0000-00'
                        value={handleCnpjMask(form.cnpj)}
                        onChange={handleValidableInputChange} 
                    />
                </div>
            </Label>
            }

            <div className="flex flex-col md:flex-row gap-3">
            <Label>
                <AiOutlineMail size={24} />
                <div>
                    <small className='text-gray-600'>E-mail *</small>
                    <input 
                        type="text"
                        name="email"
                        className="border-0 border-b focus:ring-0 focus:border-gray-600" 
                        placeholder="exemplo@gmail.com" 
                        autoComplete="off"
                        value={form.email}
                        onChange={handleValidableInputChange}
                    />
                </div>
            </Label>
            <Label>
                <AiOutlineWhatsApp size={24} />
                <div>
                    <small className='text-gray-600'>Whatsapp (com DDD) *</small>
                    <input 
                        type="text"
                        name="whatsapp"
                        className="border-0 border-b focus:ring-0 focus:border-gray-600"
                        placeholder="00 0 0000-0000" 
                        autoComplete="off"
                        value={handleWhatsappNumberMask(form.whatsapp)}
                        onChange={handleValidableInputChange}
                    />
                </div>
            </Label>
            </div>

            <Label>
                <RiCoupon3Line size={24} />
                <div>
                    <small>Cupom de desconto (opcional):</small>
                    <input 
                        type="text"
                        name="discountCoupon" 
                        className="border-0 border-b focus:ring-0 focus:border-gray-600"
                        placeholder='Ex: CUPOM100' 
                        autoComplete='off'
                        value={form.discountCoupon}
                        onChange={handleInputChange}
                    />
                </div>
            </Label>

            <button 
                type="submit"
                className="bg-amber-300 p-3 rounded self-end"
                disabled={!canSubmit}
            >
                Pedir orçamento
            </button>
        </form>
    );
};

export default Form;