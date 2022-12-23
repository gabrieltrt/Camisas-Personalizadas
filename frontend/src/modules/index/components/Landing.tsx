import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import styled from 'styled-components';

import 'swiper/css';
import 'swiper/css/navigation';

const Card = styled.article`
    background: #fff;
    flex: 1;
    align-self: flex-start;
    padding: 3rem 1rem;
    text-align: center;
`;

const Landing = () => {
    return (
        <section>
            <h2 className="ml-16">Informações pré <br/> orçamento e pedido</h2>
            <svg className="text-zinc-800 w-full" viewBox="0 0 1920 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1920 0L0.5 99.5V100H1920V0Z" fill="currentColor"/>
            </svg>
            <div className='bg-zinc-800 py-5'>
                <div className="container mx-auto px-3">
                    <Swiper
                        modules={[Navigation]}
                        slidesPerView={1}
                        spaceBetween={16}
                        centeredSlides
                        loop
                        navigation
                        breakpoints={{
                            640: {
                                slidesPerView: 2
                            },
                            1280: {
                                slidesPerView: 3
                            }
                        }}
                    >
                        <SwiperSlide>
                            <Card>
                                <h4>Quantidade mínima</h4>
                                <p className='text-sm px-16'>
                                    Para iniciar a produção de um pedido, precisamos um mínimo de 50 camisetas.
                                    <br/><br/>
                                    Os valores na tabela do site em cada modelo, são para o mesmo padrão de estampa e cor. 
                                    <br/><br/>
                                    Para personalização de mais layouts, cores de tecido ou de modelos em um mesmo pedido, entre em contato com um de nossos consultores. 
                                    Eles são especialistas e poderão te ajudar a chegar em um melhor custo benefício para produção da sua camiseta. 
                                    <br/><br/>
                                    Nossa grade de tamanhos é sempre em números pares, exemplo: 
                                    <br/><br/>
                                    04P, 08M, 06G , 04GG
                                </p>
                            </Card>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Card>
                                <h4>Personalização</h4>
                                <p className='text-sm px-16'>
                                    Antes do fechamento do pedido, existe o momento de aprovação da arte a ser estampada, que funciona da seguinte forma:           
                                    <br/><br/>
                                    Nos envie os arquivos a serem aplicados como estampas, bem como as informações de posicionamento para montarmos um layout virtual para sua análise.            
                                    <br/><br/>
                                    Enviamos a você o layout dos modelos escolhidos, nas cores solicitadas já com as estampas nas dimensões finais de impressão.            
                                    <br/><br/>
                                    Você avalia, troca ideias com as pessoas envolvidas na compra e, se preciso, solicita alterações. Este processo de envio e retorno do layout dura até o 
                                    momento em que esteja seguro e satisfeito com o desenho da sua camiseta.
                                </p>
                            </Card>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Card>
                                <h4>Pagamento</h4>
                                <p className='text-sm px-16'>
                                    Transferência Bancária, MásterCard, Visa, Amex ou Elo nos seguintes formatos:
                                    <br/><br/>
                                    Pedidos a partir de R$ 1.100,00:
                                    <br/>
                                    50% na efetuação do pedido através de depósito ou transferência, saldo na data de envio através de depósito ou transferência.
                                    <br/><br/>
                                    Pedidos acima de R$ 1.999,00:
                                    <br/>
                                    Todas as opções anteriores mais a possibilidade de efetuar toda a compra em 3 parcelas no cartão.
                                    <br/><br/>
                                    Informações necessárias para venda através do cartão de crédito: nome completo conforme impresso no cartão. 
                                    Número completo do cartão impresso na frente do mesmo. Código de segurança do cartão impresso no verso ( 3 dígitos). Data de validade impresso na frente do cartão.
                                    <br/><br/>
                                    Para pagamentos com cartão de crédito é importante passar as informações do cartão na data de entrada do pedido.
                                </p>
                            </Card>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Card>
                                <h4>Envio</h4>
                                <p className='text-sm px-16'>
                                    <b>Condições de envio:</b>
                                    &nbsp;Frete pago pelo cliente.
                                    <br/><br/>O valor do frete é pago junto ao pedido.
                                    <br/><br/>
                                    <b>FORMAS DE ENVIO:</b>
                                    &nbsp;Junto ao orçamento disponibilizamos a melhor opção (Prazo X Preço) de frete.
                                    <br/><br/>
                                    Modalidades mais praticadas:
                                    <br/><br/>
                                    Correios
                                    <br/>
                                    Transportes terrestres
                                    <br/>
                                    Transportes aéreos prioritários
                                    <br/> 
                                    Prazo: variável de acordo com sua região e transportadora solicitada.
                                    <br/>
                                    * Ao solicitar orçamento, informe seu CEP para esta cotação.
                                </p>
                            </Card>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
            <svg className="text-zinc-800 w-full" viewBox="0 0 1920 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1920 100L0.5 0.5V0H1920V100Z" fill="currentColor"/>
            </svg>


        </section>
    );
};

export default Landing;