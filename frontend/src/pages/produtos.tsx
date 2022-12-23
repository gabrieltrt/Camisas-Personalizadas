// dependencies
import { useState, useContext } from 'react';
import { NextPage } from 'next';
import styled from "styled-components";
import { useApi, storage } from 'api';

// interfaces
import { Template, Simulator } from 'interfaces';

// context
import { SimulatorContext, LoaderContext } from 'common/context';

// components
import Link from 'next/link';
import Head from 'next/head';

// utils
import { selectTemplate } from 'utils';

const Card = styled.article`
    position: relative;
    display: flex;
    flex-direction: column;
    background: #fff;
    height: 400px;
    flex: 1;
    overflow: hidden;
    
    :hover {
        .simulate {
            opacity: 1;
        }

        img {
            transition: transform .3s ease-in-out;
            transform: scale(1);
        }
    }
`;

const Button = styled(Link)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: opacity ease-out .3s;
`;

const Mockup = styled.img`
    width: 200px;
`;

const Products: NextPage = () => {
    const { data: templates } = useApi<Template[]>('templates');

    const { setContext: setSimulatorContext } = useContext(SimulatorContext);
    const { setIsLoading } = useContext(LoaderContext);

    return (
        <div className='py-5'>
            <Head>
                <title>Produtos</title>
            </Head>
            <div className="container mx-auto">
                <h4 className='text-center'>Nossos produtos</h4>
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-3">
                    {
                        templates?.map((template) => (
                            <Card className="shadow-lg rounded" key={template.id}>
                                <div className="flex-grow p-3">
                                    <h6>{template.name}</h6>
                                    <div className="flex justify-center items-center">
                                        <Button 
                                            href="/simulador"
                                            className="bg-amber-200 p-3 rounded-full simulate whitespace-nowrap z-10 ease-in-out" 
                                            onClick={() => selectTemplate(template, setIsLoading, setSimulatorContext)}
                                        >
                                            Simular camiseta
                                        </Button>
                                        <Mockup className="scale-75" src={`${storage}/${template.mockup_front}`} alt="" />
                                    </div>
                                </div>
                                <div className='flex justify-center bg-gray-800 gap-3 py-4'>
                                    <div className="flex flex-col text-center">
                                        <small className='text-white'>50-96PÇ</small>
                                        <strong className='text-white'>R$ 10.00</strong>
                                    </div>
                                    <div className="flex flex-col text-center">
                                        <small className='text-white'>50-96PÇ</small>
                                        <strong className='text-white'>R$ 10.00</strong>
                                    </div>
                                    <div className="flex flex-col text-center">
                                        <small className='text-white'>50-96PÇ</small>
                                        <strong className='text-white'>R$ 10.00</strong>
                                    </div>
                                    <div className="flex flex-col text-center">
                                        <small className='text-white'>50-96PÇ</small>
                                        <strong className='text-white'>R$ 10.00</strong>
                                    </div>
                                </div>
                            </Card>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default Products;