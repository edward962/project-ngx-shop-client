const CompressionPlugin = require('compression-webpack-plugin');
// const PreloadWebpackPlugin = require('preload-webpack-plugin');
// TODO need fix
module.exports = (config) => {
  if (config.mode !== 'development') {
    config.plugins = [
      ...config.plugins,
      // new PreloadWebpackPlugin({
      //   rel: 'preload',
      //   as(entry) {
      //     if (/\.css$/.test(entry)) return 'style';
      //     if (/\.woff$/.test(entry)) return 'font';
      //     if (/\.png$/.test(entry)) return 'image';
      //     return 'script';
      //   },
      // }),
      new CompressionPlugin({
        test: /\.(js|css|html|svg|txt|eot|otf|ttf|gif)$/,
        filename(info) {
          let opFile = info.path.split('.'),
            opFileType = opFile.pop(),
            opFileName = opFile.join('.');
          return `${opFileName}.${opFileType}.gzip`;
        },
      }),
    ];
  }
  return config;
};
