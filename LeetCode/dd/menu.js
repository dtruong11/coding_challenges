class Node {
  constructor(key, value, isActive, children = []) {
    this.value = value;
    this.children = children;
    this.isActive = isActive;
    this.key = key;
  }
}

class Menu {
  getModifiedCount(nodeA, nodeB) {
    let count = 0;
    if (!nodeA && !nodeB) {
      return 0;
    }

    if (!this.areNodesEqual(nodeA, nodeB)) {
      count += 1;
    }

    const childrenA = this.getChildrenMap(nodeA);
    const childrenB = this.getChildrenMap(nodeB);

    // go through every child node for a current nodeA and compare it with the child node with the same key for nodeB
    for (const childKey in childrenA) {
      count += this.getModifiedCount(childrenA[childKey], childrenB[childKey]);
    }

    // go through every child node for a current nodeB and compare it with the child node with the same key for nodeA
    // node in B not in A
    for (const childBKey in childrenB) {
      if (!childBKey in childrenA) {
        count += 1;
      }
    }
    return count;
  }

  getChildrenMap(node) {
    const map = {};
    if (!node) return map;
    node.children.forEach((child) => {
      map[child.key] = child;
    });
    return map;
  }

  // need to build a hash map of node and its children for O(1) lookup

  areNodesEqual(nodeA, nodeB) {
    if (!nodeA && !nodeB) return true;
    if ((!nodeA && nodeB) || (nodeA && !nodeB)) return false;
    return (
      nodeA.key === nodeB.key &&
      nodeA.value === nodeB.value &&
      nodeA.isActive === nodeB.isActive
    );
  }
}

const a = new Node("a", 1, true);
const b = new Node("b", 2, true);
const c = new Node("c", 3, true);
const d = new Node("d", 4, true);
const e = new Node("e", 5, true);
const g = new Node("g", 7, true);

a.children.push(b);
a.children.push(c);

b.children.push(d);
b.children.push(e);

c.children.push(g);

const a1 = new Node("a", 1, true);
// const b1 = new Node("b", 2, true);
const c1 = new Node("c", 3, true);
// const d1 = new Node("d", 4, true);
// const e1 = new Node("e", 5, true);
// const f1 = new Node("f", 6, true);
const g1 = new Node("g", 78, true);

// a1.children.push(b1);
a1.children.push(c1);

// b1.children.push(d1);
//b1.children.push(e1);
//b1.children.push(f1);

c1.children.push(g1);

const menu = new Menu();
console.log("total count changed:", menu.getModifiedCount(a, a1));
