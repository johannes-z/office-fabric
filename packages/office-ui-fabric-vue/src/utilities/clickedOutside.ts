export function clickedOutside (e: Event, src: Element): boolean {
  return !src.contains(e.target as Node)
}
