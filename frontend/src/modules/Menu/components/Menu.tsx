//dependencies
import { useEffect, useState, useRef, useContext } from 'react';
import { FaSyncAlt, FaTshirt, FaFillDrip, FaImage, FaDollarSign } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import api, { useApi } from 'api';
import html2canvas from 'html2canvas-add-mix-blend-mode';
import styled from 'styled-components';

// context
import { SimulatorContext, ModalContext, CartContext, PopupContext } from 'common/context';

// interface
import { Template } from 'interfaces';

// components
import Colors from './Colors';
import Templates from './Templates';
import ImageUpload from './ImageUpload';
import CartItem from 'interfaces/CartItem';
import { AxiosError } from 'axios';

const MENU_TEMPLATES = 0;
const MENU_COLOR  = 1;
const MENU_IMAGE  = 2;

const StyledMenu = styled.aside`
  display: flex;
  z-index: 1;

  ul {
    display: flex;
    flex-direction: column;
    align-self: flex-start;
    background-color: #3e3e3a;
    width: 100px;
    border-radius: .5rem;
    list-style: none;
    padding: 0;
    margin: 0;

    &.active {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    &:not(.active) + .custom {
      @media screen and (max-width: 768px) {
        display: none;
      }
    }

    li {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      color: #fff;
      height: 100px;
      width: 100px;
      max-width: 980px;
      border-radius: .5rem;
      text-align: center;
      line-height: 1.2;

      &.gold {
        background-color: #ffe600;
        color: #000;

        :hover, &.active {
          background-color: #f7df00;
        }
      }

      :hover, &.active {
        cursor: pointer;
        background-color: #31312b;
      }
    }
  }

  .custom {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    height: 600px;
    width: 400px;
    border: 1px solid #3e3e3a;
    border-radius: .25rem;
    border-top-left-radius: 0;

    @media screen and (max-width: 1366px) {
      width: 350px;
    }
  }

  @media screen and (max-width: 768px) {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;

    ul {
      flex-direction: row;
      justify-content: center;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      border-radius: 0;
    }

    .custom {
      height: 300px;
      width: 100%;
      margin-bottom: 100px;
    }
  }
`;

const Right = ({ type, close }: { type: number, close: () => void}) => {
  const { data: templates } = useApi<Template[]>('templates');

  return (
    <div className={`custom p-4 ${type === -1 ? 'invisible' : ''}`}>
      <div className="flex justify-end">
        <button type="button" title="Fechar" onClick={close}>
          <IoClose size={24} />
        </button>
      </div>
      {
        type === MENU_TEMPLATES ? 
        <Templates templates={templates} /> :
        type === MENU_COLOR ?
        <Colors /> :
        type === MENU_IMAGE ?
        <ImageUpload /> : null
      }
    </div>
  );
};

interface BudgetData {
  template_name: string,
  template_id: number,
  tissue: string,
  quantity: number,
  annex: string | Blob,
  [key: string]: any
}

const Menu = () => {
  const [activeMenu, setActiveMenu] = useState(-1);
  const { setContext: setModalContext } = useContext(ModalContext);
  const { context: simulatorContext } = useContext(SimulatorContext);
  const { dispatchPopup } = useContext(PopupContext);
  const { mutate: mutateCart } = useContext(CartContext);

  const commitBudget = async () => {

    if (!simulatorContext.currentTemplate)
      return dispatchPopup('Erro', 'Você não selecionou nenhum modelo.');

    // pega o container
    const node = document.querySelector('#template-container') as HTMLElement;
    const formData = new FormData();

    // cria um canvas
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 700;
    const ctx = canvas.getContext('2d');

    // cria uma imagem com o mockup da frente
    const canvasResultFront = await html2canvas(node.querySelector('.templateFront')!, { 
      useCORS: true,
      onclone: (_, element) => {
        // esconde o mockup das costas (questão de bugs no mobile)
        node?.querySelector('.templateBack')?.classList.add('hide-on-tablet');
        element.classList.remove('hide-on-tablet');
      }
    });

    // cria uma imagem com o mockup das costas
    const canvasResultBack = await html2canvas(node.querySelector('.templateBack')!, { 
      useCORS: true,
      onclone: (_, element) => {
        // esconde o mockup da frente (questão de bugs no mobile)
        node?.querySelector('.templateFront')?.classList.add('hide-on-tablet');
        element.classList.remove('hide-on-tablet');
      }
    });

    // preenche o canvas com branco
    ctx!.fillStyle = 'white';
    ctx?.fillRect(0, 0, 1200, 700);

    // renderiza os textos de identificação das cores
    ctx!.fillStyle = 'black';
    ctx!.font = '24px serif';
    ctx?.fillText('Cores:', 500, 100);
    ctx!.font = '16px serif';

    simulatorContext.colors.forEach((color, i) => {
      ctx?.fillText(simulatorContext.customizable_areas[i].name + ': ' + color, 500, 100 + 20 * (i+1));
    });

    // renderiza os mockups
    ctx?.drawImage(canvasResultFront, 100, 150);
    ctx?.drawImage(canvasResultBack, 800, 150);

    // transforma em blob
    const blob: Blob = await new Promise(resolve => canvas.toBlob((blob) => resolve(blob!)));

    const data: BudgetData = {
      template_name: simulatorContext.currentTemplate?.name!,
      template_id: simulatorContext.currentTemplate?.id!,
      tissue: 'Algodao',
      quantity: 1,
      annex: blob
    };

    for (let key in data) {
      formData.append(key, data[key]);
    }

    setModalContext(state => ({ ...state, CART: true }));

    try {
      await api.post('cart', formData);

      // adiciona o novo item ao carrinho local
      // id gerado com base no ultimo item do carrinho
      mutateCart((cart: CartItem[]) => [...cart, {
        id: cart[cart.length - 1].id + 1 || 0,
        annex: data.annex,
        tissue: data.tissue,
        template_name: data.template_name,
        quantity: data.quantity
      }], true);

    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatchPopup('Erro', err.response?.data.message);
      }
    }
  };

  return (
    <StyledMenu>
      <ul className={activeMenu !== -1 ? 'active' : ''}>
        {
          [
            {
              label: 'Modelos',
              icon: ({ size, className }: { size: number, className: string }) => <FaTshirt size={size} className={className} />,
              className: ''
            },
            {
              label: 'Cor',
              icon: ({ size, className }: { size: number, className: string }) => <FaFillDrip size={size} className={className} />,
              className: ''
            },
            {
              label: 'Imagem',
              icon: ({ size, className }: { size: number, className: string }) => <FaImage size={size} className={className} />,
              className: ''
            }
          ].map((item, i) => (
            <li 
              key={i} 
              role="button" 
              className={`${item.className} ${activeMenu === i ? 'active' : ''}`} 
              onClick={(evt) => setActiveMenu(i)}
            >

              <item.icon size={18} className="mb-2" />
              <small>{item.label}</small>
            </li>
          ))
        }
        <li className="gold">
          <button 
            className="h-full w-full flex flex-col items-center justify-center text-black cursor-pointer"
            onClick={commitBudget}
            disabled={!simulatorContext.currentTemplate}
          >
            <FaDollarSign size={18} className="mb-2" />
            <small>Adicionar ao carrinho</small>
          </button>
        </li>
      </ul>
      <Right type={activeMenu} close={() => setActiveMenu(-1)} />
    </StyledMenu>
  );
};

export default Menu;