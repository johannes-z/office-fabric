import { Config } from 'bili'
import path from 'path'

const projectRoot = path.resolve(__dirname)

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
    alias: {
      resolve: ['.jsx', '.js', '.vue', '.ts'],
      entries: [
        { find: /^@\/(.*)/, replacement: path.resolve(projectRoot, 'src/$1') },
      ],
    },
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
