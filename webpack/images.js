const path = require('path');
module.exports = function() {
  return {
    module: {
      rules: [
        {
          test: /\.(png|jpg|svg|gif|ico|eot|ttf|woff|woff2|otf)$/,
          loader: 'file-loader',
          options: {
            name: 'images/[name].[ext]',
          },
        },
      ],
    },
  };
};
