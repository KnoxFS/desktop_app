import fs from 'fs-extra';
import { useCallback, useEffect, useState } from 'react';
import config from '../core/config';
import { getFileList, SavedFile } from '../core/file-manager';

const useFolder = (
  path = config.userDataFolder
): { timestamp: number; files: SavedFile[] } => {
  const [timestamp, setTimestamp] = useState(0);
  const [files, setFiles] = useState<SavedFile[]>(getFileList());

  const update = () => {
    setTimestamp(new Date().getSeconds());
    setFiles(getFileList());
  };

  const watchFiles = useCallback(() => {
    const watcher = fs.watch(path, () => {
      watcher.close();

      update();

      // resurrecting watcher after 1 sec
      setTimeout(watchFiles, 500);
    });
  }, [path]);

  useEffect(() => {
    watchFiles();
  }, [watchFiles]);

  return { timestamp, files };
};

export default useFolder;
