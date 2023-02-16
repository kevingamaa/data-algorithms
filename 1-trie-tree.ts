type TrieFindResult<T> = { word: string; data: T };
class TrieNode<T> {
  public children: Map<string, TrieNode<T>>;
  public data: T;
  public endWord: boolean;
  private parent: TrieNode<T>;

  constructor(public key: string | null) {
    this.endWord = false;
    this.children = new Map<string, TrieNode<T>>();
  }

  public getWord(): TrieFindResult<T> {
    let output: string[] = [];
    let node: TrieNode<T> = this;

    while (node) {
      output.unshift(node.key as string);

      node = node.parent;
    }

    return {
      word: output.join(""),
      data: this.data,
    };
  }

  public setParent(parent: TrieNode<T>) {
    this.parent = parent;
    return this;
  }
}

class Trie<T = unknown> {
  private root: TrieNode<T>;
  constructor() {
    this.root = new TrieNode<T>(null);
  }

  insertWord(word: string, data?: T) {
    let node = this.root;

    word = word.toLowerCase();
    for (let i = 0; i < word.length; i++) {
      if (!node.children.has(word[i])) {
        node.children.set(word[i], new TrieNode<T>(word[i]).setParent(node));
      }

      node = node.children.get(word[i]) as TrieNode<T>;

      if (word.length - 1 === i) {
        if (data) {
          node.data = data;
        }

        node.endWord = true;
      }
    }
  }

  contains(word: string) {
    let node = this.root;
    word = word.toLowerCase();

    for (let i = 0; i < word.length; i++) {
      if (node.children.has(word[i])) {
        node = node.children.get(word[i]) as TrieNode<T>;
      } else {
        return false;
      }
    }

    return node.endWord;
  }

  find(prefix: string): TrieFindResult<T>[] {
    let node = this.root;
    const output: TrieFindResult<T>[] = [];

    prefix = prefix.toLowerCase();
    for (let i = 0; i < prefix.length; i++) {
      if (node.children.has(prefix[i])) {
        node = node.children.get(prefix[i]) as TrieNode<T>;
      } else {
        return output;
      }
    }

    this.findAllWords(node, output);

    return output;
  }

  private findAllWords(node: TrieNode<T>, output: TrieFindResult<T>[]) {
    if (node.endWord) {
      output.push(node.getWord());
    }

    for (let child of node.children.values()) {
      this.findAllWords(child, output);
    }
  }
}

const trie = new Trie<{ name: string }>();
trie.insertWord("Reinaldo", { name: "rein" });
trie.insertWord("Renata", { name: "kevin" });
trie.insertWord("Pedro", { name: "pedro" });
trie.insertWord("Vitor");
trie.insertWord("Reginaldo", { name: "Reginal" });

console.log(
  trie.find("Re").map(({ data }) => data),
  "dssa"
);
