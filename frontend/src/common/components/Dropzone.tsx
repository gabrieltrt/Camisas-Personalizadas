import { useEffect, DragEvent, ReactNode } from "react";
import styled from "styled-components";

const StyledDropzone = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8f9fa;
  height: 100%;
  width: 100%;.
  max-width: 980px;
  border-style: dashed;
  border-width: 1px;
  border-color: #dee2e6;
  border-radius: .375rem;
`;

interface Props {
  style?: object,
  className?: string,
  mimeTypes?: string[],
  onValidDrop: (file: File) => void,
  onUnsupportedDrop: () => void,
  children?: ReactNode
}

const Dropzone = ({ style, className, mimeTypes, onValidDrop, onUnsupportedDrop, children }: Props) => {
  const preventDefaut = (evt: Event) => evt.preventDefault();

  const handleDrop = (evt: DragEvent) => {
    evt.preventDefault();

    const file = evt.dataTransfer.files[0];

    if (mimeTypes && mimeTypes?.includes(file.type))
      onValidDrop(file);
    else
      onUnsupportedDrop();
  };

  return (
    <StyledDropzone 
      style={style}
      className={className}
      onDrag={preventDefaut}
      onDragOver={preventDefaut}
      onDrop={handleDrop}
    >
      {
        children ||
        <small>Arraste e solte o seu arquivo aqui</small>
      }
    </StyledDropzone>
  );
};

export default Dropzone;