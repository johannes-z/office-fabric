import { memoizeFunction } from '@uifabric-vue/utilities';
import { mergeStyleSets, ITheme } from '@uifabric/styling';

/**
 * @deprecated use getStyles exported from VerticalDivider.styles.ts
 */
export const getDividerClassNames = memoizeFunction(
  // tslint:disable-next-line:deprecation
  (theme: ITheme): any => {
    return mergeStyleSets({
      wrapper: {
        display: 'inline-flex',
        height: '100%',
        alignItems: 'center'
      },
      divider: {
        width: 1,
        height: '100%',
        backgroundColor: theme.palette.neutralTertiaryAlt
      }
    });
  }
)
