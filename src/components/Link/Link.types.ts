import { IStyle } from '../BaseComponent'

export interface ILinkProps {
  // extends Partial<HTMLLinkElement & HTMLButtonElement>
  href?: string;
  disabled?: boolean;
}

export interface ILinkStyles {
  root: IStyle;
}
