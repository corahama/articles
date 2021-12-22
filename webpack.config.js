const buildValidations = require('./build-utils/build-validations');
const commonConfig = require('./build-utils/webpack.common');

const merge = require('webpack-merge').merge;

// 'env' will contain the environment variable from 'scripts' section in 'package.json'.
module.exports = env => {
  // We use 'buildValidations' to check for the 'env' flag
  if (!env) {
    throw new Error(buildValidations.ERR_NO_ENV_FLAG);
  }

  // Select which Webpack configuration to use; development or production
  const envConfig = require(`./build-utils/webpack.${env.env}.js`);
  
  const mergedConfig = merge(
    commonConfig,
    envConfig,
  );

  return mergedConfig;
};