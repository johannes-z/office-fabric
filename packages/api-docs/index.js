// @ts-check

const sortBy = require('lodash.sortby')
const fs = require('fs')
const api = require('@uifabric-vue/office-ui-fabric-vue/docs/components.api.json')

const someComponent = require('@uifabric-vue/office-ui-fabric-vue/dist/office-ui-fabric-vue.cjs.js')

console.log(someComponent)

const components = api.children

function mapType (type) {
  if (type.type === 'stringLiteral') return `'${type.value}'`
  if (type.type === 'intrinsic') return type.name
  return type
}

function getDefaultValue (tags) {
  if (!tags) return undefined
  const defaultvalue = tags.find(t => t.tag.toLowerCase() === 'defaultvalue')
  if (!defaultvalue) return undefined
  return defaultvalue.text.replace(/\n/g, '')
}

function mapMember (member) {
  if (member.kindString === 'Type alias') {
    return {
      name: member.name,
      type: member.kindString,
      value: member.type.types.map(mapType).join(' | '),
    }
  } else if (member.kindString === 'Interface') {
    const properties = (member.children || []).map(property => {
      const { isOptional } = property.flags
      return {
        name: property.name + (isOptional ? '?' : ''),
        required: !isOptional,
        type: property.type.name
          ? property.type.name
          : property.type.types
            .map(mapType)
            .filter(t => t !== 'undefined')
            .join(' | '),
        description: property.comment.shortText,
        default: getDefaultValue(property.comment.tags),
      }
    })
    return {
      name: member.name,
      type: member.kindString,
      description: member.comment && member.comment.shortText,
      properties: sortBy(properties, [p => !p.required, 'name']),
    }
  }
}

components.filter(c => c.name.indexOf('Spinner.types') > -1).forEach(component => {
  const componentName = JSON.parse(component.name).split('/')[0]

  const componentApi = {
    name: componentName,
    members: (component.children || []).map(mapMember),
  }

  fs.writeFileSync(`./pages/${componentApi.name}.json`, JSON.stringify(componentApi, null, 4))

  console.log(componentApi)
})
