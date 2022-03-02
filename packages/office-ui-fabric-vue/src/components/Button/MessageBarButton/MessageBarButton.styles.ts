import { concatStyleSets, getFocusStyle } from '@uifabric/styling';
import { memoizeFunction } from '@uifabric-vue/utilities';
import type { IButtonStyles } from '../Button.types';
import type { ITheme } from '@uifabric/styling';

export const getStyles = memoizeFunction(
  (theme: ITheme, customStyles?: IButtonStyles): IButtonStyles =>
    concatStyleSets(
      {
        root: [
          getFocusStyle(theme, {
            inset: 1,
            highContrastStyle: {
              outlineOffset: '-4px',
              outline: '1px solid Window',
            },
            borderColor: 'transparent',
          }),
          {
            height: 24,
          },
        ],
      },
      customStyles,
    ),
);
