class TrieNode {
  public children: Map<string, TrieNode>;
  public endWord: boolean;
  private parent: TrieNode;

  constructor(public key: string | null) {
    this.endWord = false;
    this.children = new Map<string, TrieNode>();
  }

  public getWord() {
    let output: string[] = [];
    let node: TrieNode = this;

    while (node) {
      output.unshift(node.key as string);
      node = node.parent;
    }
    return output.join("");
  }

  public setParent(parent: TrieNode) {
    this.parent = parent;
    return this;
  }
}

class Trie {
  private root: TrieNode;
  constructor() {
    this.root = new TrieNode(null);
  }

  insertWord(word: string) {
    let node = this.root;

    word = word.toLowerCase();
    for (let i = 0; i < word.length; i++) {
      if (!node.children.has(word[i])) {
        node.children.set(word[i], new TrieNode(word[i]).setParent(node));
      }

      node = node.children.get(word[i]) as TrieNode;

      if (word.length - 1 === i) {
        node.endWord = true;
      }
    }
  }

  contains(word: string) {
    let node = this.root;
    word = word.toLowerCase();

    for (let i = 0; i < word.length; i++) {
      if (node.children.has(word[i])) {
        node = node.children.get(word[i]) as TrieNode;
      } else {
        return false;
      }
    }

    return node.endWord;
  }

  find(prefix: string): string[] {
    let node = this.root;
    const output: string[] = [];

    prefix = prefix.toLowerCase();
    for (let i = 0; i < prefix.length; i++) {
      if (node.children.has(prefix[i])) {
        node = node.children.get(prefix[i]) as TrieNode;
      } else {
        return output;
      }
    }

    this.findAllWords(node, output);

    return output;
  }

  private findAllWords(node: TrieNode, output: string[]) {
    if (node.endWord) {
      output.push(node.getWord());
    }

    for (let child of node.children.values()) {
      this.findAllWords(child, output);
    }
  }
}

const trie = new Trie();
trie.insertWord("Reinaldo");
trie.insertWord("Renata");
trie.insertWord("Pedro");
trie.insertWord("Vitor");
trie.insertWord("Reginaldo");

console.log(trie.find("Re"));
