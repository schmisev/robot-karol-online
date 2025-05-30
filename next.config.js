const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

console.log('  > Warning about headers is expected.')

module.exports = withBundleAnalyzer({
  output: 'export',
  // necessary for pyodide to work in a webworker, for dev
  // set proper headers in production
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Cross-Origin-Embedder-Policy', value: 'require-corp' },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
        ],
      },
    ]
  },
})
