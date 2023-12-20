'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const { Webpack } = require('@embroider/webpack');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    name: 'ember-temp',
    hinting: false,
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  const TerserPlugin = require('terser-webpack-plugin');
  return require('@embroider/compat').compatBuild(app, Webpack, {
    staticAddonTestSupportTrees: true,
    staticAddonTrees: true,
    staticHelpers: true,
    staticComponents: true,
    staticModifiers: true,
    // from ember internals, this is needed
    // allowUnsafeDynamicComponents: true,
    staticEmberSource: false,
    packagerOptions: {
      webpackConfig: {
        mode: 'production',
        optimization: {
          minimize: true,
          minimizer: [
            new TerserPlugin({
              terserOptions: {
                ecma: 2020,
                toplevel: true,
                compress: {
                  toplevel: true,
                  ecma: 2020,
                  hoist_funs: true,
                  sequences: false,
                  module: true,
                  passes: 4,
                },
                output: {
                  semicolons: false,
                },
              },
            }),
          ],
        },
      },
    },
  });
};
