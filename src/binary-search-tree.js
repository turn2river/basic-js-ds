const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.tree = null
  }

  root() {
    return this.tree
  }

  add(data) {
    let leaf = new Node(data)
    if (!this.tree) {
      this.tree = leaf
      return this.tree
    }
    const addLeaf = (node, leaf) => {
      if (leaf.data < node.data) {
        if (!node.left) {
          return node.left = leaf
        } else {
          addLeaf(node.left, leaf)
        }
      }
      if (leaf.data >= node.data) {
        if (!node.right) {
          return node.right = leaf
        } else {
          addLeaf(node.right, leaf)
        }
      }
    }
    addLeaf(this.tree, leaf)
  }

  has(data) {
    const hasCheck = (node, value) => {
      if (!node) {
        return false
      }
      if (node.data === value) {
        return true
      }
      return value < node.data ? hasCheck(node.left, value) : (hasCheck(node.right, value))
    }
    return hasCheck(this.tree, data)
  }

  find(data) {
    const findValue = (node, value) => {
      if (!node) {
        return null
      }
      if (node.data === value) {
        return node
      }
      return value < node.data ? findValue(node.left, value) : (findValue(node.right, value))
    }
    return findValue(this.tree, data)
  }

  remove(data) {
    const removeDataInTree = (node, data) => {
      if (!node) return null

      if (data < node.data) {
        node.left = removeDataInTree(node.left, data)
        return node
      } else if (data > node.data) {
        node.right = removeDataInTree(node.right, data)
        return node
      } else {
        if (!node.left || !node.right) {
          node = !node.left ? node.right : node.left
          return node
        }

        let maxInLeft = this.max(node.left)
        node.data = maxInLeft
        node.left = removeDataInTree(node.left, maxInLeft)
        return node
      }
    }
    this.tree = removeDataInTree(this.tree, data)
  }

  min(node = this.tree) {
    if (!node.left) {
      return node.data
    }
    return this.min(node.left)
  }

  max(node = this.tree) {
    if (!node.right) {
      return node.data
    }
    return this.max(node.right)
  }
}

module.exports = {
  BinarySearchTree
};