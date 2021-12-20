import { Customizations } from './Customizations'
import { CustomizerContext } from './CustomizerContext'
import type { ISettings } from './Customizations'

import { inject, provide, reactive, watchEffect } from '@vue/composition-api'

export function useCustomizationSettings (properties: string[], scopeName?: string): ISettings {
  const forceUpdate = useForceUpdate
  // @ts-ignore
  const { customizations } = inject(CustomizerContext, () => {
    const obj = reactive({
      customizations: {
        inCustomizerContext: false,
        settings: {},
        scopedSettings: {},
      },
    })
    provide(CustomizerContext, obj)
    return obj
  }, true)
  const { inCustomizerContext } = customizations
  watchEffect(() => {
    if (!inCustomizerContext) {
      Customizations.observe(forceUpdate)
    }
    return () => {
      if (!inCustomizerContext) {
        Customizations.unobserve(forceUpdate)
      }
    }
  })

  return Customizations.getSettings(properties, scopeName, customizations)
}

const useForceUpdate = () => {}
