import { IStyle } from '@/types/IStyle'

export interface ILinkProps {
  // extends Partial<HTMLLinkElement & HTMLButtonElement>
  href?: string;
  disabled?: boolean;
}

export interface ILinkStyles {
  root: IStyle;
}
