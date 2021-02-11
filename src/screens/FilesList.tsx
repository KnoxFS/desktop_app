import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import DragAndDropContainer from '../components/DragAndDropContainer';
import FileIcon from '../components/FileIcon';
import { addFiles, getFileList, SavedFile } from '../core/file-manager';
import useFolder from '../hooks/useFolder';

const FileContainer = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const FilesList: React.FC = () => {
  const [files, setFiles] = useState(getFileList());
  const folderTimestamp = useFolder();

  useEffect(() => {
    setFiles(getFileList());
  }, [folderTimestamp]);

  const renderFile = (file: SavedFile, i: number) => {
    return (
      <FileContainer key={i}>
        <FileIcon file={file} />
        {file.name}
      </FileContainer>
    );
  };

  return (
    <DragAndDropContainer onDrop={addFiles}>
      <div style={{ flex: 1, overflowX: 'hidden', overflow: 'scroll' }}>
        {files.map(renderFile)}
      </div>
    </DragAndDropContainer>
  );
};

export default FilesList;
