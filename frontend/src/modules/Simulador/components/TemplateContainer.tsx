// dependencies
import { useEffect, useContext, useState, useMemo } from "react";
import { storage } from "api";
import SVG from 'react-inlinesvg';
import styled from "styled-components";

import { FiRotateCw } from 'react-icons/fi'

// context
import { SimulatorContext } from "common/context";

// components
import ResizableImage from "common/components/ResizableImage";
import ResetChangesModal from "./ResetChangesModal";

const Container = styled.div`
  display: flex;
  gap: 1rem;
  border-radius: .25rem;
  padding: .5rem;

  .template-img, .template-svg {
    width: 300px;
  }

  .template-svg {
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    mix-blend-mode: multiply;
  }

  .image-overlay {
    position: absolute;
    width: 150px;
    cursor: grab;

    &.grabbing{
      cursor: grabbing;
    }

    img {
      width: 100%;
    }

    button {
      position: absolute;
      visibility: hidden;
    }

    :hover {
      
      button {
        visibility: visible;
      }
    }
  }
`;

const TemplateContainer = () => {
  const [side, setSide] = useState('front');
  const [resetChangesModalShow, setResetChangesModalShow] = useState(false);
  const { context: simulatorContext, setContext: setSimulatorContext } = useContext(SimulatorContext);
  const { front, back } = simulatorContext.currentTemplateRefs;

  const removeImage = (side: string, id: number) => {
    const images = simulatorContext.images[side].filter(img => img.id !== id);

    setSimulatorContext(state => ({
      ...state,
      images: {
        ...state.images,
        [side]: images
      }
    }));
  };
  
  // handles color apply
  useEffect(() => {
    if (simulatorContext.currentTemplate) {
      front?.current &&
      Array.from(front.current/*.contentDocument?*/.querySelectorAll('path'))
      .forEach((path, i) => {
        path.style.fill = simulatorContext.colors[i] || '#fff'; 
      });

      back?.current &&
      Array.from(back.current/*.contentDocument?*/.querySelectorAll('path'))
      .forEach((path, i) => {
        path.style.fill = simulatorContext?.colors[i] || '#fff';
      });
    }

  }, [simulatorContext.colors]);

  if (!simulatorContext.currentTemplate)
  return (
    <h4 className="text-gray-400 mx-12">Selecione um modelo para começar.</h4>
  );

  return (
    <>
      <Container id="template-container" className="flex">
        <div style={{ minWidth: 275, height: 400 }} className={`templateFront ${side !== 'front' ? 'hide-on-tablet' : ''}`}>
          <div className="relative text-center flex-grow">
            
            <img className='template-img' src={`${storage}/${simulatorContext.currentTemplate?.mockup_front}`} alt="" tabIndex={-1} />
            {
              simulatorContext.currentTemplate?.overlay_front &&
              <SVG className="template-svg" src={`${storage}/${simulatorContext.currentTemplate?.overlay_front}`} innerRef={front}/>
            }
            <div
              className="absolute top-0 w-full h-full"
              style={{
                WebkitMaskImage: `url(${storage}/${simulatorContext.currentTemplate?.mockup_front})`,
                WebkitMaskSize: '100%'
              }}
            >
              {
                simulatorContext.images.front.map((image) => (
                  <ResizableImage 
                    key={image.id}
                    image={image} 
                    remove={() => removeImage('front', image.id)}
                  />
                ))
              }
            </div>
          </div>
          <div className='flex justify-center' data-html2canvas-ignore>
            <div className='bg-amber-300 rounded-full py-2 px-5 mt-3'>
              <strong>Frente</strong>
            </div>
          </div>
        </div>
        <div style={{ minWidth: 275, height: 400 }} className={`templateBack ${side !== 'back' ? 'hide-on-tablet' : ''}`}>
          <div className="relative text-center flex-grow">
            
            <img className='template-img' src={`${storage}/${simulatorContext.currentTemplate?.mockup_back}`} alt="" tabIndex={-1} />
            {
              simulatorContext.currentTemplate?.overlay_back &&
              <SVG className="template-svg" src={`${storage}/${simulatorContext.currentTemplate?.overlay_back}`} innerRef={back}/>
            }
            <div
              className="absolute top-0 w-full h-full"
              style={{
                WebkitMaskImage: `url(${storage}/${simulatorContext.currentTemplate?.mockup_back})`,
                WebkitMaskSize: '100%'
              }}
            >
              {
                simulatorContext.images.back.map((image) => (
                  <ResizableImage 
                    key={image.id}
                    image={image}
                    remove={() => removeImage('back', image.id)}
                  />
                ))
              }
            </div>
          </div>
          <div className='flex justify-center' data-html2canvas-ignore>
            <div className='bg-amber-300 rounded-full py-2 px-5 mt-3'>
              <strong>Costas</strong>
            </div>
          </div>
        </div>
      </Container>
      
      <div className="flex gap-3 justify-center">
        <ResetChangesModal show={resetChangesModalShow} setShow={setResetChangesModalShow} />
        <button 
          className="bg-red-600 p-3 rounded-full text-white font-bold"
          onClick={() => setResetChangesModalShow(true)}
        >
          Resetar alterações
        </button>
        <button 
          className="bg-gray-600 rounded-full p-4 lg:hidden"
          onClick={() => setSide(state => state === 'front' ? 'back' : 'front')}
        >
          <FiRotateCw className="text-white" />
        </button>
      </div>
    </>
  );
};

export default TemplateContainer;