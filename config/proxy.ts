/**
 * @name 代理的配置
 * @see 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * -------------------------------
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 *
 * @doc https://umijs.org/docs/guides/proxy
 */
export default {
  /**
   * 网关代理
   */
  dev: {
    '/api/iam/': {
      target: 'https://oauth2.meshed.cn',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
    '/api/workflow/': {
      target: 'http://localhost:9989',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
  /**
   * @name 详细的代理配置
   * @doc https://github.com/chimurai/http-proxy-middleware
   */
  test: {
    // localhost:8000/api/** -> https://preview.pro.ant.design/api/**
    '/api/iam/': {
      target: 'http://localhost:7989',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
    '/api/workflow/': {
      target: 'http://localhost:9989',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
  pre: {
    '/api/': {
      target: 'your pre url',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};
