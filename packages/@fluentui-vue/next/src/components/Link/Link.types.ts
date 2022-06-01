import { ITheme } from '@fluentui-vue/theme'
import { IStyle, IStyleFunctionOrObject } from '@fluentui/merge-styles'

/**
 * {@docCategory Link}
 */
export interface ILink {
  /** Sets focus to the link. */
  focus(): void;
}

/**
 * Link component props. All built-in props for `<a>` and `<button>` are supported (including
 * various event handlers) even if not listed below.
 * {@docCategory Link}
 */
export interface ILinkProps {
  /**
   * Optional callback to access the ILink interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: any// IRefObject<ILink>;

  /**
   * URL the link points to. If not provided, the link renders as a button (unless that behavior is
   * overridden using `as`).
   */
  href?: string;

  /**
   * Where to open the linked URL. Common values are `_blank` (a new tab or window),
   * `_self` (the current window/context), `_parent`, and `_top`.
   */
  target?: string;

  /**
   * Relationship to the linked URL (can be a space-separated list).
   * Most common values are `noreferrer` and/or `noopener`.
   */
  rel?: string;

  /**
   * Click handler for the link.
   */
  onClick?: (event: MouseEvent) => void;

  /**
   * Whether the link is disabled
   */
  disabled?: boolean;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<ILinkStyleProps, ILinkStyles>;

  /**
   * A component type or primitive that is rendered as the type of the root element.
   */
  as?: any // React.ElementType;

  /**
   * Built-in HTML attribute with different behavior depending on how the link is rendered.
   * If rendered as `<a>`, hints at the MIME type.
   * If rendered as `<button>`, override the type of button (`button` is the default).
   */
  type?: string;

  /**
   * Whether the link is styled with an underline or not.
   * Should be used when the link is placed alongside other text content.
   */
  underline?: boolean;

  /** Any other props for elements or a React component passed to `as` */
  // [key: string]: any;
}

/**
 * {@docCategory Link}
 */
export interface ILinkStyleProps {
  className?: string;
  isButton?: boolean;
  isDisabled?: boolean;
  isUnderlined?: boolean;
  theme: ITheme;
}

/**
 * {@docCategory Link}
 */
export interface ILinkStyles {
  root: IStyle;
}
