import { IStyle } from '../BaseComponent'

export interface ILayerProps {

}

export interface ILayerStyles {
  /**
   * Style for the root element when fixed.
   */
  root?: IStyle;
  /**
   * Style for the Fabric component.
   */
  content?: IStyle;
}
