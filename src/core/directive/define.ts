import type { NamedGroupsArray } from 'xregexp'
import { defineDirective } from '.'

export default defineDirective({
  nested: false,
  name: '#define',
  pattern: /.*?#(?<directive>(?:un)?def(?:ine)?)\s*(?<key>.*)\s/gm,
  processor({ ctx }) {
    return (...args) => {
      const group = args[args.length - 1] as NamedGroupsArray
      if (group.directive === 'define')
        ctx.env[group.key] = true

      else if (group.directive === 'undef')
        delete ctx.env[group.key]

      return ''
    }
  },
})
