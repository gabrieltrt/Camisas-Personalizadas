import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper';
import styled from 'styled-components';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Depoiments = () => {
    return (
        <>
            <svg className="text-zinc-800 w-100" viewBox="0 0 1920 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1920 0L0.5 99.5V100H1920V0Z" fill="currentColor" />
            </svg>
            <div className="bg-zinc-800 text-white px-3">
                <section className="container mx-auto py-5">
                    <h3>Depoimentos</h3>
                    <Swiper
                        modules={[Pagination, Autoplay]}
                        slidesPerView={1}
                        spaceBetween={16}
                        loop
                        autoplay={{
                            delay: 5000
                        }}
                        pagination={{
                            clickable: true
                        }}
                        style={{
                            height: 400
                        }}
                    >
                        {
                            [
                                {
                                    name: 'Flavia Benck',
                                    text: 'Oi pessoal! Meu nome é Flavia Benck, sou gerente da academia Natacenter de Porto Alegre. Estou aqui para falar que somos clientes da Monster Physique a mais ou menos 7 anos, nossos alunos super curtem. Não só porque...'
                                },
                                {
                                    name: 'Marinho Falhari',
                                    text: 'Sou Marinho Falhari, proprietário do estúdio MFT de Bragança paulista. Queria deixar aqui meu reconhecimento a qualidade de serviço da empresa Monster Physique. Em 2008, quando fizemos nosso primeiro evento na região, contamos com os serviços desta empresa que sempre nos atendeu rapidamente...'
                                },
                                {
                                    name: 'Santiago Mendonça',
                                    text: 'Meu nome é Santiago Mendonça, sou responsável técnico pela equipe Pro Runner. Em 2008, quando começamos os trabalhos em Criciúma, conheci a Monster Physique. Naquele tempo em diante eu conto com a qualidade e o atendimento que considero os melhores do mercado, e isto que já passei por algumas situações...'
                                }
                            ].map(({ name, text }, i) => (
                                <SwiperSlide key={i}>
                                    <div className='flex flex-col h-full px-5'>
                                        <h5>{name}</h5>
                                        <p className="max-w-4xl">{text}</p>
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </section>
            </div>
        </>
    );
}

export default Depoiments;