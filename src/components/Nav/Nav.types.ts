import { IStyle } from '../BaseComponent'

export interface INavLinkGroup {
  name?: string;
  links: INavLink[];
}

export interface INavLink {
  name: string;
  url: string;
  key?: string;
  links?: INavLink[];
  isExpanded?: boolean;
  disabled?: boolean;
  [propertyName: string]: any;
}

export interface INavProps {

}

export interface INavStyles {

  /**
   * Style set for the root element.
   */
  root?: IStyle;

  /**
   * Style set for the link text container div element.
   */
  linkText?: IStyle;

  /**
   * Style set for the link element extending the
   * root style set for ActionButton component.
   */
  link?: IStyle;

  /**
   * Style set for the composite link container div element
   */
  compositeLink?: IStyle;

  /**
   * Style set for the chevron button inside the composite
   * link and group elements.
   */
  chevronButton?: IStyle;

  /**
   * Style set for the chevron icon inside the composite
   * link and group elements.
   */
  chevronIcon?: IStyle;

  /**
   * Style set for the nav links ul element.
   */
  navItems?: IStyle;

  /**
   * Style set for the nav links li element.
   */
  navItem?: IStyle;

  /**
   * Style set for the group root div.
   */
  group?: IStyle;

  /**
   * Style set for the group content div inside group.
   */
  groupContent?: IStyle;
}
