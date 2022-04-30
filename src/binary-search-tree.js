const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootCurrent = null;
  }

  root() {
    return this.rootCurrent;
  }

  add(data) {
    this.rootCurrent = addIn(this.rootCurrent, data);

    function addIn(node, data) {
      if(!node) {
        return new Node(data);
      }

      if(node.data === data) {
        return node;
      }

      if(data < node.data) {
        node.left = addIn(node.left, data);
      } else {
        node.right = addIn(node.right, data);
      }
      return node;
    }
  }

  has(data) {
    return searchIn(this.rootCurrent, data);

    function searchIn(node, data) {
      if(!node) {
        return false;
      }

      if(node.data === data) {
        return true;
      }

      if(data < node.data)  {
        return searchIn(node.left, data);
      } else {
        return searchIn(node.right, data);
      }
    }
  }

  find(data) {
    return this.findIn(this.rootCurrent, data);
    function findIn(node,data) {
      if(!node) {
        return null;
      }
      if(data < node.data) {
        return findIn(node.left, data);
      } else if( node.data < data) {
        return findIn(node.right, data);
      }
      return node;
    }
    
  }

  remove(data) {
    this.rootCurrent = removeIn(this.rootCurrent, data);

    function removeIn(node, data) {
      if(!node) {
        return null;
      }
      if(data < node.data) {
        node.left = removeIn(node.left, data);
        return node;
      } else if(node.data < data) {
        node.right = removeIn(node.right,data);
        return node;
      } else {
        if(!node.left && node.right) {
          return null;
        }
      }
      if(!node.left) {
        node = node.right;
        return node;
      }
      if(!node.right) {
        node = node.left;
        return node;
      }

      let minRight = node.right;
      while(minRight.left) {
        minRight = minRight.left;
      }
      node.data = minRight.data;
      node.right = removeIn(node.right, minRight.data);
      return node;
    }
  }

  min() {
    
    if(!this.rootCurrent) {
      return null;
    }

    let node = this.rootCurrent;
    while(node.left) {
      node = node.left;
    }
    return node.data;
  }

  max() {

    if(!this.rootCurrent) {
      return null;
    }
    
    let node = this.rootCurrent;
    while(node.right) {
      node = node.right;
    }
    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};