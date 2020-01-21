import { ITheme } from '@uifabric/styling';
import { IComboBoxStyles } from './ComboBox.types';
import { IButtonStyles } from '../Button/Button.types';
export declare const getOptionStyles: (theme: ITheme, customStylesForAllOptions?: Partial<any> | undefined, customOptionStylesForCurrentOption?: Partial<any> | undefined, isPending?: boolean | undefined, isHidden?: boolean | undefined) => Partial<any>;
export declare const getCaretDownButtonStyles: (theme: ITheme, customStyles?: Partial<IButtonStyles> | undefined) => IButtonStyles;
export declare const getStyles: (theme: ITheme, customStyles?: Partial<IComboBoxStyles> | undefined, comboBoxOptionWidth?: string | undefined) => Partial<IComboBoxStyles>;
//# sourceMappingURL=ComboBox.styles.d.ts.map