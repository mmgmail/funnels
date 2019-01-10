let path = require('path');
module.exports = function() {
  return {
    devServer: {
      port: 8003,
      contentBase: path.join(__dirname, '../source/pages/index/')
    },
  };
};
