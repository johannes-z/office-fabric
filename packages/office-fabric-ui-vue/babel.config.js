module.exports = {
  presets: [
    [
      '@vue/cli-plugin-babel/preset',
      process.env.NODE_ENV === 'production'
        ? {
          useBuiltIns: false,
          polyfills: false,
          exclude: ['transform-regenerator'],
        }
        : {},
    ],
  ],
}
