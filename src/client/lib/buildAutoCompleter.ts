import { Trie } from './Trie'
import { ObjectWithValues } from './types'

type AutoComplete<T> = (prefix: string) => T[]

export const buildAutoCompleter = <T>(items: ObjectWithValues<T>): AutoComplete<T> => {
  const trie = new Trie<T>()

  trie.addItems(items)

  return prefix => {
    const prefixNode = trie.findNode(prefix)

    if (!prefixNode) {
      return []
    }
    return prefixNode.findAllValues()
  }
}
