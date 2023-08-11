/**
 * // Definition for a Node.
 * function Node(val, children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

function Node(val, children = []) {
  this.val = val;
  this.children = children;
}

class Codec {
  /**
   * @param {Node|null} root
   * @return {string}
   */
  // Encodes a tree to a single string.
  // serialize = function (root) {
  //   const queue = [root];
  //   let result = "";

  //   while (queue.length) {
  //     const queueSize = queue.length;

  //     for (let i = 0; i < queueSize; i++) {
  //       console.log("queue", queue);
  //       const node = queue.shift();

  //       result += node === null ? "null" : node.val;
  //       if (node === null) {
  //         continue;
  //       }
  //       // console.log('node', node)
  //       if (node.children.length > 0) {
  //         for (let child of node.children) {
  //           if (child) {
  //             queue.push(child);
  //           }
  //         }
  //       } else {
  //         queue.push(null);
  //       }
  //     }
  //     result += "#";
  //   }
  //   console.log("result", result);
  //   return result;
  // };
  /**
   * serialized 1#3,2,4#5,6#null#null#null#null#
   * queue []
   * children 6
   * output: 1#3,2,4#5,6#null#null#null#null#
   */
  // Encodes a tree to a single string.
  serialize = function (root) {
    console.log("root", root);
    if (!root) return null;
    const endLevel = "#";
    const serialized = [root.val, endLevel];
    const queue = [root];

    while (queue.length) {
      const size = queue.length;
      
      for (let i = 0; i < size; i++) {
        const cur = queue.shift();
        if (cur !== null) {
          const children = cur.children;

          if (children.length === 0) {
            serialized.push("null");
          } else {
            for (let idx = 0; idx < children.length; idx++) {
              const child = children[idx];
              serialized.push(child.val);
              // avoid the trailing ,
              if (idx < children.length - 1) {
                serialized.push(",");
              }
              // not pushing null to the queue
              queue.push(child);
            }
          }
          serialized.push("#"); // mark end of children element
        }
      }
    }
    const finalString = serialized.join("");
    return finalString;
  };

  /**
   * @param {string} data
   * @return {Node|null}
   * serialized 1#3,2,4#5,6#null#null#null#null#
   */
  // Decodes your encoded data to tree.
  deserialize = function (data) {
    if (data === null) {
      return null;
    }
    const elements = data.split("#");
    console.log('elements', elements)
    const root = new Node(parseInt(elements[0]));
    const queue = [root];

    for (let i = 1; i < elements.length; i++) {
      const parent = queue.shift();
      const children = elements[i].split(",");
      const childrenList = [];

      if (children.length === 0 && !parent) {
        continue;
      }

      for (const child of children) {
        console.log("child", child);
        if (child === "null" || child.length === 0) continue;
        const newNode = new Node(parseInt(child));
        childrenList.push(newNode);
        queue.push(newNode);
      }
      if (parent) {
        parent.children = childrenList;
      }
    }
    return root;
  };
}

const root = new Node(1);
const node2 = new Node(2);
const node3 = new Node(3);
const node4 = new Node(4);
const node5 = new Node(5);
const node6 = new Node(6);
node3.children.push(node5, node6);
root.children.push(node3, node2, node4);

// Your Codec object will be instantiated and called as such:
codec = new Codec();
const serialized = codec.serialize(root);
console.log("serialized", serialized);
console.log(
  "deserialized",
  JSON.stringify(codec.deserialize(serialized), null, 2)
);
