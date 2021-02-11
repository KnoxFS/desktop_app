import React from 'react';
import { FcFile, FcFolder } from 'react-icons/fc';
import { SavedFile } from '../core/file-manager';

interface CProps {
  file: SavedFile;
}

const FileIcon: React.FC<CProps> = ({ file }) => {
  const { isDirectory } = file;

  if (isDirectory) {
    return <FcFolder size={30} className="mr-2" />;
  }

  return <FcFile size={30} className="mr-2" />;
};

export default FileIcon;
