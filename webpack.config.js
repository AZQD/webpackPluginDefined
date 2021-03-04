const BuildLogPlugin = require('./plugin/build-log-plugin.js');

module.exports = {
  plugins: [
    new BuildLogPlugin({
      filename: 'log.txt'
    })
  ],
};