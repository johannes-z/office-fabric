import Vue from 'vue'
import { Prop, Component } from 'vue-property-decorator'

function merge (obj: any, key: string, val: any) {
  if (!val) return obj
  if (val instanceof Array) {
    val.forEach(v => merge(obj, key, v))
  } else if (typeof val === 'string') {
    obj[key].class.push(val)
  } else if (typeof val === 'object') {
    obj[key].style.push(val)
  }
  return obj
}

function checkKey (obj: any, key: string) {
  if (!(key in obj)) {
    obj[key] = {
      class: [],
      style: [],
    }
  }
}

export type IStyleObj<T> = {
  [K in keyof T]: {
    class: any
    style: any
  }
}

type StyleEntry = string | boolean | Partial<CSSStyleDeclaration>
export type IStyle = StyleEntry | Array<StyleEntry>

// @ts-ignore
@Component
export default abstract class BaseComponent<IProps = {}, IStyles = {}> extends Vue {
  $style!: { [K in keyof IStyles]: any } & { [key: string]: string }
  $props!: IProps

  @Prop({ default: void 0 }) readonly classes?: IStyles
  @Prop({ default: void 0 }) readonly styles?: IStyles

  abstract get baseStyles (): IStyles

  get css (): IStyleObj<IStyles> {
    return this.compile(this.baseStyles, this.classes, this.styles)
  }

  private compile (base?: IStyles, classes?: IStyles, styles?: IStyles): IStyleObj<IStyles> {
    var merged: any = {}

    ;[base, classes, styles].forEach(obj => {
      for (let key in obj) {
        var entry = obj[key]

        checkKey(merged, key)
        merge(merged, key, entry)
      }
    })

    return merged
  }
}
