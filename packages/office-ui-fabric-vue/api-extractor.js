// @ts-check

const TypeDoc = require('typedoc')
const config = require('./config/api-extractor.config')

const app = new TypeDoc.Application()

// If you want TypeDoc to load tsconfig.json / typedoc.json files
app.options.addReader(new TypeDoc.TSConfigReader())
app.options.addReader(new TypeDoc.TypeDocReader())

app.bootstrap()

const project = app.convert(app.expandInputFiles(
  config.map(component => `types/components/${component}/${component}.types.d.ts`),
))

if (project) { // Project may not have converted correctly
  const outputDir = 'docs'

  // Alternatively generate JSON output
  app.generateJson(project, outputDir + '/components.api.json')
}
