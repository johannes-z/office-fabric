module.exports = {
  presets: [
    [
      '@vue/cli-plugin-babel/preset',
      process.env.BUILD_TYPE === 'module'
        ? {
          useBuiltIns: false,
          polyfills: false,
        }
        : {},
    ],
  ],
}
