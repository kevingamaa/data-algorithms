### 1° Trie tree

#### concept of structure of a tree
This algorithm take each letter in one word and build a tree based on the variation of names.

Imagine we have three names starting with "Re"

```typescript
["Reinaldo", "Renata", "Reginaldo"]
```
null
R 
e
i n g
n a i
a t n
l a a
d   l
o   d
    o 


the tree always starts with "null" and then go searching in each child node for the next letter, imagine we type a prefix "Re", the algorithm will find the "R" and then "e" and then with a recursion functionality will take all the words built with this start prefix.