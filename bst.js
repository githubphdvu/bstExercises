class Node {
    constructor(val, left = null, right = null) {
        this.val = val
        this.left = left
        this.right = right
    }
}
class BST {
    constructor(root = null) {
        this.root = root
    }
    insert(val) {//iteratively.Insert node with value val.Return tree        
        if (!this.root) {// If tree is empty, insert at the root
            this.root = new Node(val)
            return this
        }
        // Otherwise, find correct spot for new node
        var current = this.root
        while (true) {
            if (val < current.val) {
                if (!current.left) {
                    current.left = new Node(val)
                    return this
                } 
                else current = current.left
            } 
            else if (val > current.val) {
                if (current.right === null) {
                    current.right = new Node(val)
                    return this
                } 
                else current = current.right
            }
        }
    }
    insertRecursively(val, current = this.root) {
        if (!this.root) {
            this.root = new Node(val)
            return this
        }
        if (val < current.val) {
            if (!current.left) {
                current.left = new Node(val)
                return this
            }
            return this.insertRecursively(val, current.left)
        } 
        else {
            if (current.right === null) {
                current.right = new Node(val)
                return this
            }
            return this.insertRecursively(val, current.right)
        }
    }
    find(val) {//iteratively. Find and return node with value val
        let currentNode = this.root
        let found = false
        if (val === currentNode.val) return currentNode
        while (currentNode && !found) {
            if     (val < currentNode.val) currentNode = currentNode.left
            else if(val > currentNode.val) currentNode = currentNode.right
            else found = true
        }
        if (!found) return undefined
        return currentNode
    }
    findRecursively(val, current = this.root) {
        if (!this.root) return undefined
        if (val < current.val) {
            if (!current.left) return undefined
            return this.findRecursively(val, current.left)
        } 
        else if (val > current.val) {
            if (!current.right) return undefined
            return this.findRecursively(val, current.right)
        }
        return current
    }
    dfsPreOrder() {//return array of visited nodes
        let ans = []
        let current = this.root
        function traverse(node) {
            ans.push(node.val)//visit
            node.left && traverse(node.left)// go left if there's a left
            node.right && traverse(node.right)// go right if there's a right
        }
        traverse(current)
        return ans
    }
    dfsInOrder() {
        let ans = []
        let current = this.root
        function traverse(node) {
            node.left && traverse(node.left)
            ans.push(node.val)
            node.right && traverse(node.right)
        }
        traverse(current)
        return ans
    }
    dfsPostOrder() {
        let ans = []
        let current = this.root
        function traverse(node) {
            node.left && traverse(node.left)
            node.right && traverse(node.right)
            ans.push(node.val)
        }
        traverse(current)
        return ans
    }
    bfs() {//return array of visited nodes
        let curr = this.root
        let Q = []//queue (FIFO) for bfs
        let ans = []
        Q.push(curr)
        while (Q.length) {
            curr = Q.shift()
            ans.push(curr.val)
            if (curr.left) Q.push(curr.left)
            if (curr.right)Q.push(curr.right)
        }
        return ans
    }
    remove(val) {//return removed node with value val
        let nodeToRemove = this.root
        let parent
        while (nodeToRemove.val !== val) {
            parent = nodeToRemove
            if (val < nodeToRemove.val) nodeToRemove = nodeToRemove.left
            else nodeToRemove = nodeToRemove.right
        }
        if (nodeToRemove !== this.root) {
            if (!nodeToRemove.left && !nodeToRemove.right) {
                if (parent.left === nodeToRemove) parent.left = null
                else parent.right = null
            } 
            else if (nodeToRemove.left && nodeToRemove.right) {
                let rightParent = nodeToRemove
                let right = nodeToRemove.right
                if (!right.left) {
                    right.left = nodeToRemove.left
                    if (parent.left === nodeToRemove) parent.left = right
                    else parent.right = right
                } 
                else {
                    while (right.left) {
                        rightParent = right
                        right = right.left
                    }
                    if (parent.left === nodeToRemove) parent.left.val = right.val
                    else parent.right.val = right.val
                    if (right.right) rightParent.left = right.right
                    else rightParent.left = null
                }
            } 
            else {
                if (parent.left === nodeToRemove) {
                        if (!nodeToRemove.right) parent.left = nodeToRemove.left
                        else parent.left = nodeToRemove.right
                    } 
                else {
                    if (!nodeToRemove.right) parent.right = nodeToRemove.left
                    else parent.right = nodeToRemove.right
                }
            }
        }
        return nodeToRemove
    }
    isBalanced(current=this.root) {//return true if tree is balanced
        if (!current) return
        return maxDepth(current) - minDepth(current) <= 1
        function minDepth(current) {
            if (current === null) return 0
            return 1 + Math.min(minDepth(current.left), minDepth(current.right))
        }
        function maxDepth(current) {
            if (current === null) return 0
            return 1 + Math.max(maxDepth(current.left), maxDepth(current.right))
        }
    }
    findSecondHighest(current = this.root) {//return 2nd highest value
        if (!this.root || (!this.root.left && !this.root.right)) return //no node or 1 node only
        while (current) {
            if (current.left && !current.right) return this.findSecondHighest(current.left)//Current is largest and has a left subtree and 2nd largest is the largest in that subtree            
            if (current.right && (!current.right.left && !current.right.right)) return current.val//Current is parent of largest and largest has no children so current is 2nd largest
            current = current.right
        }
    }
    dfsInOrderIterative() {
        let cur = this.root
        let stack = []
        let dfs = []
        while (stack.length > 0 || cur) {
            while (cur) {
                stack.push(cur)
                cur = cur.left
            }
            cur = stack.pop()
            if (cur) {
                dfs.push(cur.val)
                cur = cur.right
            }
        }
        return dfs
    }
}
//     7
//    / \
//   3   9
//  / \   \
// 1   5   11
const root=new Node(7,
                new Node(3,
                    new Node(1,null,null),
                    new Node(5,null,null)
                ),
                new Node(9,
                    null,
                    new Node(11,null,null)
                )
    )
const tree=new BST(root)
console.log(tree.find(3))/*Node {
                            val: 3,
                            left: Node { val: 1, left: null, right: null },       
                            right:Node { val: 5, left: null, right: null }   }*/
console.log(tree.find(4))//undefined
console.log(tree.dfsPreOrder()) //[7,3,1,5,9,11]
console.log(tree.dfsInOrder())  //[1,3,5,7,9,11]
console.log(tree.dfsPostOrder())//[1,5,3,11,9,7]
console.log(tree.bfs())         //[7,3,9,1,5,11]
console.log(tree.isBalanced())//true
console.log(tree.findSecondHighest())//9
console.log(tree.dfsInOrderIterative())//[1,3,5,7,9,11]

module.exports = BST