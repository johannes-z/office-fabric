# Props
| Name           | Type                               | Required | Default    | Description                                                                                                                             |
| :------------- | :--------------------------------- | :------- | :--------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| ariaLabel      | `string`                           | `false`  | `null`     | Alternative status label for screen reader.                                                                                             |
| ariaLive       | `'assertive' \| 'polite' \| 'off'` | `false`  | `'polite'` | Politeness setting for label update announcement.                                                                                       |
| label          | `string`                           | `false`  | `null`     | The label to show next to the Spinner. Label updates will be announced to the screen readers. Use ariaLive to control politeness level. |
| label-position | `SpinnerLabelPosition`             | `false`  | `'bottom'` | Position of the label in regards to the spinner animation.                                                                              |
| size           | `number`                           | `false`  | `20`       | The size of Spinner to render in pixels.                                                                                                |

## SpinnerLabelPosition
`export type SpinnerLabelPosition = 'top' | 'right' | 'bottom' | 'left';`


# Slots
| Name    | Props | Description                    |
| :------ | :---- | :----------------------------- |
| default | -     | Replaces the `label`-prop. |

# Events
*This component does not emit any events.*

# Methods
*This component does not expose any methods.*