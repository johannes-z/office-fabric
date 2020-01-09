import { memoizeFunction } from '@uifabric-vue/utilities'
import { getIcon } from '@uifabric-vue/styling'

export interface IIconContent {
  children?: string;
  iconClassName?: string;
  fontFamily?: string;
}

export const getIconContent = memoizeFunction(
  (iconName?: string): IIconContent | null => {
    const { code, subset }: Pick<any, 'code'> & { subset: Partial<any> } = getIcon(iconName) || {
      subset: {},
      code: undefined,
    }

    if (!code) {
      return null
    }

    return {
      children: code,
      iconClassName: subset.className,
      fontFamily: subset.fontFace && subset.fontFace.fontFamily,
    }
  },
  undefined,
  // @ts-ignore
  true
)
