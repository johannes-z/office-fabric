import { IStyle } from '@uifabric/merge-styles'

export interface ILinkProps {
  // extends Partial<HTMLLinkElement & HTMLButtonElement>
  href?: string;
  disabled?: boolean;
}

export interface ILinkStyles {
  root?: IStyle;
}
