import fs from 'fs-extra';
import { useState } from 'react';
import config from '../core/config';

const useFolder = (path = config.userDataFolder): number => {
  const [timestamp, setTimestamp] = useState(0);

  fs.watch(path, () => {
    setTimestamp(new Date().getSeconds());
  });

  return timestamp;
};

export default useFolder;
