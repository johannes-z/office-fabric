import { IStyle } from '@uifabric/merge-styles'

export interface IActivityItemStyles {
  /**
   * Styles applied to the root activity item container.
   */
  root?: IStyle;

  /**
   * Styles applied to the root activity item container.
   */
  pulsingBeacon?: IStyle;

  /**
   * Styles applied to the main container of the activity's description.
   */
  activityContent?: IStyle;

  /**
   * Styles applied to the persona of the user that did this activity.
   */
  activityPersona?: IStyle;

  /**
   * Styles applied to the activity's description.
   */
  activityText?: IStyle;

  /**
   * Styles applied to the icon indicating the type of the activity. Only shown when personas are unavailable.
   */
  activityTypeIcon?: IStyle;

  /**
   * Styles applied to the text of comments.
   */
  commentText?: IStyle;

  /**
   * Styles applied to personas when two users are involved in a single activity.
   */
  doublePersona?: IStyle;

  /**
   * Styles applied to root in the compact variant.
   */
  isCompactRoot?: IStyle;

  /**
   * Styles applied to personas and icons in the compact variant.
   */
  isCompactIcon?: IStyle;

  /**
   * Styles applied to main text container in the compact variant.
   */
  isCompactContent?: IStyle;

  /**
   * Styles applied to personas in the compact variant.
   */
  isCompactPersona?: IStyle;

  /**
   * Styles applied to a wrapper around personas in the compact variant.
   */
  isCompactPersonaContainer?: IStyle;

  /**
   * Styles applied to the container of the persona image or activity type icon.
   */
  personaContainer?: IStyle;

  /**
   * Styles applied to the timestamp at the end of each activity item.
   */
  timeStamp?: IStyle;

  /**
   * Styles applied to the timestamp in compact mode.
   * This can occur if a host overrides the render behavior to force the timestamp to render.
   */
  isCompactTimeStamp?: IStyle;
}
