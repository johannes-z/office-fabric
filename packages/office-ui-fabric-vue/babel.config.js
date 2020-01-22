module.exports = {
  presets: [
    [
      '@vue/cli-plugin-babel/preset',
      {
        corejs: false,
        useBuiltIns: false,
        polyfills: false,
        regenerator: false,
        exclude: ['transform-regenerator'],
      },
    ],
  ],
}
