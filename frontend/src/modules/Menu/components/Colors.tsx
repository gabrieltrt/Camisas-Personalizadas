// dependencies
import { useState, useContext } from 'react';

// context
import SimulatorContext from "common/context/SimulatorContext";

interface ColorPickerProps {
  area: {
    id: number,
    name: string,
    index: number; 
  },
  colors: string[],
  active: boolean,
  onOpen: () => void
};

const ColorPicker = ({ area, colors, active, onOpen }: ColorPickerProps) => {
  const { context: simulatorContext, setContext: setSimulatorContext } = useContext(SimulatorContext);

  // lógica para a escolha de cores
  const handleColorPick = (color: string) => {
    
    setSimulatorContext((state) => {
      const colors = [...state.colors];
      colors[area.index] = color;

      return {
        ...state,
        colors: colors
      };
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <small className="text-gray-400">{area.name}</small>
      <button 
        className="border rounded"
        style={{
          backgroundColor: simulatorContext.colors[area.index] || '#fff',
          height: '25px',
          width: '25px',
          cursor: 'pointer'
        }}
        onClick={onOpen}
      />
      <div className={`${!active && 'hidden'} color-picker-accordion flex flex-wrap gap-1 border p-2 rounded`}>
        {
          colors.map((color, i) => (
            <button 
              key={i}
              className="border"
              style={{
                backgroundColor: color,
                height: '20px',
                width: '20px',
                flexShrink: 0,
                cursor: 'pointer'
              }} 
              onClick={() => {
                handleColorPick(color);
              }}
            />
          ))
        }
      </div>
    </div>
  );
};

const Colors = () => {
  // cores disponíveis. cliente disse não ser preciso adicionar método dinâmico de manusear cores
  const COLORS = ['#000', "#fff", '#ff0000', '#0000ff', '#000066', '#ffff00', '#ffcc00', '#00ff00', '#009933', '#ff6600', '#ff00ff', '#333333', '#999999', '#990000'];

  const [activePicker, setActivePicker] = useState<number>(-1);

  const { context: simulatorContext } = useContext(SimulatorContext);

  return (
    <>
      <h5 className="mb-3">
        <strong>Cor</strong>
      </h5>
      <div className="flex flex-col gap-3" style={{ overflowY: 'scroll' }}>
        {
          !simulatorContext.currentTemplate ?
          <p className="flex flex-col items-center text-gray-400">
            <strong>Nada aqui!</strong>
            <small>Selecione um modelo para continuar.</small>
          </p>:
          simulatorContext.customizable_areas?.map((area, i) => (
            <ColorPicker 
              key={i}
              area={area} 
              colors={COLORS} 
              active={activePicker === i}
              onOpen={() => setActivePicker(i)}
            />
          ))
        }
      </div>
    </>
  ) 
};

export default Colors;