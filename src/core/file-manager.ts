import fs from 'graceful-fs';
import config from './config';

export interface SavedFile {
  name: string;
  isDirectory: boolean;
  path?: string;
}

export const getFileList = (path = config.userDataFolder): SavedFile[] => {
  const dirent = fs.readdirSync(path, { withFileTypes: true });

  return dirent
    .filter((e) => e.name[0] !== '.')
    .map((e) => {
      return {
        name: e.name,
        isDirectory: e.isDirectory(),
        path: `${path}/${e.name}`,
      };
    });
};

export const addFiles = (files: { name: string; path: string }[]): void => {
  files.forEach(({ name, path }) => {
    fs.rename(path, `${config.userDataFolder}/${name}`, () => null);
  });
};
