import React from 'react';
import DragAndDropContainer from '../components/DragAndDropContainer';
import FileCell from '../components/FileCell';
import Layout from '../components/Layout';
import { addFiles, SavedFile } from '../core/file-manager';
import useFolder from '../hooks/useFolder';

const FilesList: React.FC = () => {
  const { files } = useFolder();

  const renderFile = (file: SavedFile, i: number) => {
    return <FileCell key={i} file={file} />;
  };

  return (
    <Layout>
      <DragAndDropContainer onDrop={addFiles}>
        <div style={{ flex: 1, overflowX: 'hidden', overflow: 'scroll' }}>
          {files.map(renderFile)}
        </div>
      </DragAndDropContainer>
    </Layout>
  );
};

export default FilesList;
