const path = require('path');
module.exports = function() {
  return {
    module: {
      rules: [
        {
          test: /\.(png|jpg|gif|svg)$/i,
          loader: 'file-loader',
          options: {
            name: 'images/[name].[ext]',
          },
        },
      ],
    },
  };
};
