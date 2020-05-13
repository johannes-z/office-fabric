import { IRawStyle, IFontFace } from '@uifabric/merge-styles'
import { CreateElement } from 'vue'
import { registerIcons as originalRegisterIcons, IIconOptions } from '@uifabric/styling'

export interface IIconSubset {
  fontFace?: IFontFace;
  icons: {
    [key: string]: (h: CreateElement) => string | JSX.Element;
  };
  style?: IRawStyle;
}

export function registerIcons (iconSubset: IIconSubset, options?: Partial<IIconOptions>): void {
  // @ts-ignore
  originalRegisterIcons(iconSubset, options)
}
