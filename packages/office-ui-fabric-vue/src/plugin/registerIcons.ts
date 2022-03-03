import { IRawStyle, IFontFace } from '@uifabric/merge-styles'
import { CreateElement, VNode } from 'vue'
import { registerIcons as originalRegisterIcons, IIconOptions } from '@uifabric/styling'

export interface IIconSubset {
  fontFace?: IFontFace;
  icons: {
    [key: string]: (h: CreateElement) => any | Element | string | JSX.Element | VNode;
  };
  style?: IRawStyle;
}

export function registerIcons (iconSubset: IIconSubset, options?: Partial<IIconOptions>): void {
  // @ts-ignore
  originalRegisterIcons(iconSubset, options)
}
