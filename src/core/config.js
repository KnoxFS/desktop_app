const path = require('path');
const fs = require('fs-extra');
const merge = require('lodash/merge');
const isEqual = require('lodash/isEqual');
const getAppDataPath = require('appdata-path');

const isProd = process.env.NODE_ENV === 'production';
const homedir = require('os').homedir();

// User config path
const userConfigFolder = path.join(getAppDataPath(), '.knox');
const userDataFolder = path.join(homedir, 'Knox Data');
const userConfigPath = path.join(userConfigFolder, 'config.json');

// Default config
let defaultConfig = {
  darkMode: false,
  debugMode: false,
  developmentMode: !isProd,
  logPath: userConfigFolder,
  userDataFolder,
  userConfigPath,
};

let userConfig;

try {
  fs.ensureFileSync(userConfigPath);
  fs.ensureDirSync(userDataFolder);

  const userConfigBuffer = fs.readFileSync(userConfigPath);

  userConfig = JSON.parse(userConfigBuffer.toString() || {});
  defaultConfig = merge(defaultConfig, userConfig);
} catch (err) {
  console.error('error reading user config file:', err);
}

try {
  if (!isEqual(userConfig, defaultConfig)) {
    fs.writeFileSync(userConfigPath, JSON.stringify(defaultConfig, null, 4));
  }
} catch (err) {
  console.error('error saving user config file:', err);
}

module.exports = defaultConfig;
