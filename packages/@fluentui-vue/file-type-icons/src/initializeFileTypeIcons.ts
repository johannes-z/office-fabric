import { IIconOptions, registerIcons } from '@fluentui-vue/style-utilities'
import { h } from 'vue'
import { FileTypeIconMap } from './FileTypeIconMap'

const PREFIX = 'vue_'
const PNG_SUFFIX = '_png'
const SVG_SUFFIX = '_svg'

const DEFAULT_BASE_URL = 'https://spoprod-a.akamaihd.net/files/fabric-cdn-prod_20201125.001/assets/item-types/'
const ICON_SIZES: number[] = [16, 20, 24, 32, 40, 48, 64, 96]

export function initializeFileTypeIcons (baseUrl: string = DEFAULT_BASE_URL, options?: Partial<IIconOptions>): void {
  ICON_SIZES.forEach((size: number) => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    _initializeIcons(baseUrl, size, options)
  })
}

function _initializeIcons (baseUrl: string, size: number, options?: Partial<IIconOptions>): void {
  const iconTypes: string[] = Object.keys(FileTypeIconMap)
  const fileTypeIcons: { [key: string]: any } = {}

  iconTypes.forEach((type: string) => {
    const baseUrlSizeType = baseUrl + size + '/' + type
    fileTypeIcons[PREFIX + type + size + PNG_SUFFIX] = h('img', {
      attrs: {
        src: baseUrlSizeType + '.png',
        alt: '',
      },
    })
    fileTypeIcons[PREFIX + type + size + SVG_SUFFIX] = h('img', {
      attrs: {
        src: baseUrlSizeType + '.svg',
        alt: '',
      },
    })

    // For high resolution screens, register additional versions
    // Apply height=100% and width=100% to force image to fit into containing element

    // SVGs scale well, so you can generally use the default image.
    // 1.5x is a special case where both SVGs and PNGs need a different image.

    fileTypeIcons[PREFIX + type + size + '_1.5x' + PNG_SUFFIX] = h('img', {
      attrs: {
        src: baseUrl + size + '_1.5x/' + type + '.png',
        height: '100%',
        width: '100%',
      },
    })
    fileTypeIcons[PREFIX + type + size + '_1.5x' + SVG_SUFFIX] = h('img', {
      attrs: {
        src: baseUrl + size + '_1.5x/' + type + '.svg',
        height: '100%',
        width: '100%',
      },
    })

    fileTypeIcons[PREFIX + type + size + '_2x' + PNG_SUFFIX] = h('img', {
      attrs: {
        src: baseUrl + size + '_2x/' + type + '.png',
        height: '100%',
        width: '100%',
      },
    })
    fileTypeIcons[PREFIX + type + size + '_3x' + PNG_SUFFIX] = h('img', {
      attrs: {
        src: baseUrl + size + '_3x/' + type + '.png',
        height: '100%',
        width: '100%',
      },
    })
    fileTypeIcons[PREFIX + type + size + '_4x' + PNG_SUFFIX] = h('img', {
      attrs: {
        src: baseUrl + size + '_4x/' + type + '.png',
        height: '100%',
        width: '100%',
      },
    })
  })

  registerIcons(
    {
      fontFace: {},
      style: {
        width: size,
        height: size,
        overflow: 'hidden',
      },
      icons: fileTypeIcons,
    },
    options,
  )
}
