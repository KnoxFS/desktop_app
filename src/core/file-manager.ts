import fs from 'graceful-fs';
import config from './config';

export interface SavedFile {
  name: string;
  isDirectory: boolean;
}

export const getFileList = (): SavedFile[] => {
  const dirent = fs.readdirSync(config.userDataFolder, { withFileTypes: true });

  return dirent
    .filter((e) => e.name[0] !== '.')
    .map((e) => {
      return { name: e.name, isDirectory: e.isDirectory() };
    });
};

export const addFiles = (files: { name: string; path: string }[]): void => {
  files.forEach(({ name, path }) => {
    fs.rename(path, `${config.userDataFolder}/${name}`, () => null);
  });
};
