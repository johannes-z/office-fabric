module.exports = {
  presets: [
    ['@vue/cli-plugin-babel/preset', {
      useBuiltIns: false,
      polyfills: false,
      exclude: ['transform-regenerator'],
    }],
  ],
}
