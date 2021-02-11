import { ipcRenderer } from 'electron';
import React from 'react';
import styled from 'styled-components';
import { SavedFile } from '../core/file-manager';
import FileIcon from './FileIcon';

interface CProps {
  file: SavedFile;
}

const FileContainer = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const FileCell: React.FC<CProps> = ({ file }) => {
  const dragFile = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    ipcRenderer.send('ondragstart', file.path);
  };

  return (
    <FileContainer draggable onDragStart={dragFile}>
      <FileIcon file={file} />
      {file.name}
    </FileContainer>
  );
};

export default FileCell;
