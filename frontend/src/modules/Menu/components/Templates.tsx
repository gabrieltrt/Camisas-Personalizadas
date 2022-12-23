// dependencies
import { useEffect, useContext } from "react";
import styled from "styled-components";
import api, { useApi, storage } from "api";

// context
import { SimulatorContext, LoaderContext } from 'common/context';

// interface
import { Template } from "interfaces";

// utils
import { selectTemplate } from "utils";

const TemplateItem = styled.div`
  :hover {
    background-color: #f8f9fa;
    cursor: pointer;
  }
`;

interface Props {
  templates: Template[]
}

const Templates = ({ templates }: Props) => {
  //const { data: templates, error } = useApi<Template[]>('templates');
  const { setContext: setSimulatorContext } = useContext(SimulatorContext);
  const { setIsLoading } = useContext(LoaderContext);

  return (
    <>
      <h5 className="mb-3">
        <strong>Modelos</strong>
      </h5>
      <div className="grid grid-cols-2 mx-12 gx-0 gap-3 justify-center" style={{ overflowY: 'scroll' }}>
        {
          templates?.map((template) => (
            <TemplateItem 
              className="text-center p-2 rounded"
              key={template.id}
              onClick={() => selectTemplate(template, setIsLoading, setSimulatorContext)}
            >
              <img className="inline mb-3" style={{ height: '100px' }} src={`${storage}/${template.mockup_front}`} alt="" />
              <p style={{ lineHeight: 1.2 }}>
                <small className="mt-2 uppercase">{template.name}</small>
              </p>
            </TemplateItem>
          ))
        }
      </div>
    </>
  );
};

export default Templates;