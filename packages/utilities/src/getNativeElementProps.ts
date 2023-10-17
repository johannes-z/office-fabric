import {
  anchorProperties,
  audioProperties,
  buttonProperties,
  colGroupProperties,
  colProperties,
  formProperties,
  getNativeProps,
  htmlElementProperties,
  iframeProperties,
  imgProperties,
  inputProperties,
  labelProperties,
  liProperties,
  olProperties,
  optionProperties,
  selectProperties,
  tableProperties,
  tdProperties,
  textAreaProperties,
  thProperties,
  trProperties,
  videoProperties,
} from './properties'

const nativeElementMap: Record<string, Record<string, number>> = {
  label: labelProperties,
  audio: audioProperties,
  video: videoProperties,
  ol: olProperties,
  li: liProperties,
  a: anchorProperties,
  button: buttonProperties,
  input: inputProperties,
  textarea: textAreaProperties,
  select: selectProperties,
  option: optionProperties,
  table: tableProperties,
  tr: trProperties,
  th: thProperties,
  td: tdProperties,
  colGroup: colGroupProperties,
  col: colProperties,
  form: formProperties,
  iframe: iframeProperties,
  img: imgProperties,
}

/**
 * Given an element tagname and user props, filters the props to only allowed props for the given
 * element type.
 * @param tagName - Tag name (e.g. "div")
 * @param props - Props object
 * @param excludedPropNames - List of props to disallow
 */

export function getNativeElementProps<TAttributes extends Record<string, any>>(
  tagName: string,
  props: {},
  excludedPropNames?: string[],
): TAttributes {
  const allowedPropNames = (tagName && nativeElementMap[tagName]) || htmlElementProperties

  return getNativeProps(props, allowedPropNames, excludedPropNames)
}
