import { Config } from 'bili'

const config: Config = {
  input: 'src/dev.ts',

  output: {
    dir: './dist',
    fileName: `office-ui-fabric-vue.[format][min].js`,
    moduleName: 'OfficeUIIFabric',
    extractCSS: true,
  },

  env: {
    NODE_ENV: 'production',
  },

  babel: {
    configFile: false,
  },

  plugins: {
    typescript2: {
      useTsconfigDeclarationDir: true,
    },
    vue: {
      css: {
        extract: true,
      },
    },
  },

}

export default config
