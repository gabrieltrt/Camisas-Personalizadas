// dependencies
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useApi, storage } from "api";

// components
import TemplateCreateModal from "../components/CreateTemplateModal/CreateTemplateModal";
import TemplateManageModal from "modules/Templates/components/TemplateManageModal";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 1rem;
`;

const TemplateCard = styled.div`
  background-color: #fff;
  width: 100%;
  height: 300px;
  padding: 1rem;
  text-align: center;

  img {
    height: 200px;
  }
`;

const Templates = () => {
  //const [templates, setTemplates] = useState([]);
  const [createModalShow, setCreateModalShow] = useState(false);
  const [managingTemplateId, setManagingTemplateId] = useState(-1);

  const { data: templates, error, mutate } = useApi('templates');

  return (
    <section>
      <div className="mb-5">
        <h4>Modelos</h4>
        <button 
          className="btn btn-primary rounded-0 shadow my-3"
          onClick={() => setCreateModalShow(true)}
        >
          Novo modelo
        </button>
      </div>
      <GridContainer>
        {
          templates?.map((template) => (
            <>
              <TemplateCard className="card-shadow">
                <img src={`${storage}/${template.mockup_front}`} />
                <h6 className="mt-3" >{template.name}</h6>
                <small style={{ cursor: 'pointer' }} role="button" onClick={() => setManagingTemplateId(template.id)}>Clique para modificar este modelo</small>
              </TemplateCard>
              <TemplateManageModal 
                show={managingTemplateId === template.id} 
                close={() => setManagingTemplateId(-1)}
                template={template}
                mutate={mutate}
              />
            </>
          ))
        }
      </GridContainer>
      <TemplateCreateModal show={createModalShow} clsoe={() => setCreateModalShow(false)} />
    </section>
  )
};

export default Templates;