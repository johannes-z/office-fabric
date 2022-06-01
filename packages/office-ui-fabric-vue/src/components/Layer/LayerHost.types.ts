import { IBaseProps } from '@/types'

/**
 * Represents a mounted layer host, and provides access to its `hostId` and root element.
 */
export interface ILayerHost {
  /**
   * The hostId for this host, to be propagatd to layers using Customizer.
   */
  hostId: string;
  /**
   * An element ref to the layer host's content root.
   * This is the element to which layers will be added.
   */
  // rootRef: React.MutableRefObject<HTMLDivElement | null>;
  /**
   * Notifies the layer host that layers may have been added or removed within its root element.
   */
  notifyLayersChanged(): void;
}

export interface ILayerHostProps extends IBaseProps {
  /**
   * Defines the id for the layer host that Layers can target (using the hostId property.)
   */
  hostId?: string;
}
