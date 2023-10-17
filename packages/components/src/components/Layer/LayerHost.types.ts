import type { HTMLAttributes, Ref } from 'vue'

/**
 * Represents a mounted layer host, and provides access to its `hostId` and root element.
 */
export interface ILayerHost {
  /**
   * The hostId for this host, to be propagatd to layers using Customizer.
   */
  hostId: string
  /**
   * An element ref to the layer host's content root.
   * This is the element to which layers will be added.
   */
  rootRef: Ref<HTMLDivElement | null>
  /**
   * Notifies the layer host that layers may have been added or removed within its root element.
   */
  notifyLayersChanged(): void
}

export interface ILayerHostProps extends HTMLAttributes {
  /**
   * Optional callback to access the ILayerHost interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  // componentRef?: IRefObject<ILayerHost>;

  /**
   * Defines the id for the layer host that Layers can target (using the hostId property.)
   */
  id?: string
}
