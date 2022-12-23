import { createContext } from "react";
import { Simulator } from "interfaces";

interface SimulatorContextInterface {
  context: Simulator,
  setContext: (fn: (state: Simulator) => Simulator) => void
};

const SimulatorContext = createContext<SimulatorContextInterface>({
  context: {
    colors: [],
    customizable_areas: [],
    images: {
      front: [],
      back: []
    },
    currentTemplate: null,
    currentTemplateRefs: {
      front: null,
      back: null,
      frontMask: null,
      backMask: null
    }
  },
  setContext: () => null
});

export default SimulatorContext;