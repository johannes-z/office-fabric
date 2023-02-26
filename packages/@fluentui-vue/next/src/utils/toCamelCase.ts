export const toCamelCase = (str: string) => {
  return str.toString() && str.split(' ').map((word, index) => {
    return (index === 0 ? word[0].toLowerCase() : word[0].toUpperCase()) + word.slice(1).toLowerCase()
  }).join('')
}
