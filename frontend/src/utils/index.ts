import { useContext } from "react";
import api from "api";

// interfaces
import { Template, Image, Simulator } from "interfaces"; 
import { AxiosError } from "axios";

// injeção dos contextos pois não é possível usa-los aqui
export const selectTemplate = async (template: Template, setIsLoading: (state: boolean) => void, setSimulatorContext: (fn: (state: Simulator) => Simulator) => void) => {
    try {
      setIsLoading(false);
      const { data: customizable_areas } = await api.get(`/custom_areas/${template.id}`);
      setSimulatorContext(state => ({
        ...state, 
        colors: [],
        currentTemplate: template,
        images: {
          front: [] as Image[],
          back: [] as Image[]
        },
        customizable_areas
      }));
      
    } catch (err: unknown) {
        if (err instanceof AxiosError)
            console.log(err.response?.data.message);
    }
    setIsLoading(false);
  };