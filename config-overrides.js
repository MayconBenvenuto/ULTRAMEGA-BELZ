const { GenerateSW } = require('workbox-webpack-plugin');

module.exports = {
  webpack: function override(config) {
    // Configuração para suportar TypeScript
    config.resolve.extensions = [...config.resolve.extensions, '.ts', '.tsx'];
    
    // Adiciona o plugin do Workbox
    config.plugins.push(
      new GenerateSW({
        clientsClaim: true,
        skipWaiting: true,
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5MB
        runtimeCaching: [
          {
            urlPattern: /^https?.*/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'offlineCache',
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 24 * 60 * 60, // 24 horas
              },
            },
          },
        ],
      })
    );

    return config;
  },
};
