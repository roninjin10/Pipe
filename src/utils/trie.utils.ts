type TrieChildren<T> = { [key in string]: (undefined | Trie<T>) }

export class Trie<T> {
  private readonly _children: TrieChildren<T> = {}
  private _item: T | null = null

  get children(): ReadonlyArray<Trie<T>> {
    return Object.values(this._children)
  }

  get item(): T | null {
    return this._item
  }

  public readonly findNode = (word: string, startIndex = 0): Trie<T> | null => {
    if (startIndex >= word.length) {
      return null
    }

    if (startIndex === word.length - 1) {
      return this
    }

    return this._children[word[startIndex]] || null
  }

  public readonly traverse = (cb: (node: Trie<T>) => void): void => {
    cb(this)
    this.children.forEach(child => child.traverse(cb))
  }

  public readonly addItems = (items: Record<string, T>): void =>
    Object.keys(items).forEach(word => this._addItem(items[word], word))

  public readonly findAllValues = (): Array<T> => {
    const allValues: Array<T> = []
    this.traverse(node => node.item && allValues.push(node.item))
    return allValues
  }

  private readonly _addItem = (item: T, word: string): void => {
    const _word = word.toLowerCase()

    if (_word === '') {
      this._item = item
      return
    }

    const nextLetter = _word[0]
    const restOfWord = _word.slice(1)

    this._children[nextLetter] = this._children[nextLetter] || new Trie<T>()

    this._children[nextLetter]!._addItem(item, restOfWord)
  }
}
