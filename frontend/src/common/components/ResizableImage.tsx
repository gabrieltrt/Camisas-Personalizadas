// dependencies
import { useContext } from 'react';
import { MouseEvent } from 'react';

// components
import { ResizableBox } from 'react-resizable';
import { IoResize, IoClose } from 'react-icons/io5';

import SimulatorContext from 'common/context/SimulatorContext';

// interfaces
import { Image as ImageInterface } from 'interfaces'

import Image from 'next/image'

interface Props {
    image: ImageInterface,
    remove: () => void
};

const ResizableImage = ({ image, remove }: Props) => {

    // funções usadas para a lógica de posicionamento da imagem (ainda bugado no mobile)
    const handleMove = (evt: MouseEvent) => {
        const currentTarget = evt.currentTarget as HTMLDivElement;
        const offset = [
          currentTarget.offsetLeft - evt.clientX,
          currentTarget.offsetTop - evt.clientY
        ];

        currentTarget.style.left = (offset[0]) + 'px';
        currentTarget.style.top = (offset[1]) + 'px';
    };

    const handleMouseDown = (evt: MouseEvent) => {
        const currentTarget = evt.currentTarget as HTMLDivElement;
        const target = evt.target as HTMLElement;

        if (target.matches('button') || target.matches('svg'))
          return;

        const offset = [
          currentTarget.offsetLeft - evt.clientX,
          currentTarget.offsetTop - evt.clientY
        ];

        currentTarget.classList.add('grabbing');
        currentTarget.onmousemove = (evt): any => {
  
          currentTarget.style.left = (evt.clientX + offset[0]) + 'px';
          currentTarget.style.top = (evt.clientY + offset[1]) + 'px';
      };
    };

    const handleMouseUp = (evt: MouseEvent) => {
        const target = evt.currentTarget as HTMLDivElement;
        target.classList.remove('grabbing');

        target.onmousemove = null;
    }

    // compatibilidade com mobile
    const handleTouchMove = (evt: TouchEvent) => {
      const currentTarget = evt.currentTarget as HTMLDivElement;
      const offset = [
        currentTarget.offsetLeft - evt.touches[0].clientX,
        currentTarget.offsetTop - evt.touches[0].clientY,
      ];

      console.log(evt.touches[0].clientX)

      currentTarget.style.left = (evt.touches[0].clientX + offset[0]) + 'px';
      currentTarget.style.top = (evt.touches[0].clientY + offset[1]) + 'px';
  };

    const handleTouchStart = (evt: TouchEvent) => {
        console.log('touch');
        const currentTarget = evt.currentTarget as HTMLDivElement;
        const target = evt.target as HTMLElement;

        if (target.matches('button') || target.matches('svg'))
          return;

        const offset = [
          currentTarget.offsetLeft - evt.touches[0].clientX,
          currentTarget.offsetTop - evt.touches[0].clientY,
        ];

        currentTarget.classList.add('grabbing');

        currentTarget.ontouchmove = (evt: TouchEvent) => {
    
          currentTarget.style.left = (evt.touches[0].clientX + offset[0]) + 'px';
          currentTarget.style.top = (evt.touches[0].clientY + offset[1]) + 'px';
        };
    };

    const handleTouchEnd = (evt: TouchEvent) => {
        const target = evt.currentTarget as HTMLDivElement;
        target.classList.remove('grabbing');

        target.ontouchmove = null;
    };
  
    return (
      <ResizableBox 
        axis="x"
        handle={
          <button 
            className="flex justify-center items-center p-0 bg-white border-0 rounded-full right-0 bottom-0"
            style={{
              width: 25,
              height: 25,
              cursor: 'nwse-resize'
            }}
          >
            <IoResize style={{ transform: 'scaleX(-1)' }} />
          </button>
        }
        width={150}
        className="image-overlay absolute p-3"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button 
          className="flex justify-center items-center bg-red-600 border-0 rounded-full text-white top-0 right-0 p-0"
          style={{
            width: 25,
            height: 25
          }}
          onClick={remove}
        >
          <IoClose />
        </button>
        <img src={image.src} alt="Imagem" draggable="false" />
      </ResizableBox>
    )
};

export default ResizableImage;