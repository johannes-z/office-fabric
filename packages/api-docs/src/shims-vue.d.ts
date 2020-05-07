declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare global {
  import { IRawStyle, IFontFace } from '@uifabric/merge-styles'

  interface IIconSubset {
    fontFace?: IFontFace;
    icons: {
      [key: string]: string | JSX.Element | any;
    };
    style?: IRawStyle;
  }
}
