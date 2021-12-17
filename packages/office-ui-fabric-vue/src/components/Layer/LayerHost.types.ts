import { IBaseProps } from '@/types'

export interface ILayerHostProps extends IBaseProps {
  /**
   * Defines the id for the layer host that Layers can target (using the hostId property.)
   */
  hostId?: string;
}
