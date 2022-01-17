import Observable from "../../utils/Observable.js";
import Node from "./Node.js";

let ifLeft = true;

class BinarySearchTree extends Observable{
    
    constructor() {
        super();
        this.root = null;
    }

    getRootNode() {
        return this.root;
    }

    getIfLeft() {
        return ifLeft;
    }

    getMaxDepth(){
        return this.findDepth(this.getRootNode());
    }

    getCurrentNode(data) {
        return this.search(this.getRootNode(), data);
    }

    getParent(node) {
        return node.parent;
    }

    getPathOfNode(node) {
        return node.pathOfNode;
    }

    getVector(node) {
        return node.vector;
    }

    insert(data) {
        var newNode = new Node(data);
                        
        if(this.root === null) {
            this.root = newNode;
            newNode.parent = null;
            newNode.pathOfNode = "";
        }
        else {
            this.insertNode(this.root, newNode);
        }
    }
 
    insertNode(node, newNode) {
        if(newNode.data < node.data) {
            newNode.pathOfNode += "L";

            if(node.left === null){
                node.left = newNode;
                ifLeft = true;
 
                newNode.parent = node;
            }
            else {
                this.insertNode(node.left, newNode);
            }
        }
        else {
            newNode.pathOfNode += "R";

            if(node.right === null) {
                node.right = newNode;
                ifLeft = false;

                newNode.parent = node;
            }
            else {
                this.insertNode(node.right,newNode);
            }
        }
    }

    search(node, data) {
        if(node === null) {
            return null;
        }    
        else if(data < node.data) {
            return this.search(node.left, data);
        }
        else if(data > node.data) {
            return this.search(node.right, data);
        }
        else {
            return node;
        }
    }

    findDepth(node) {
        if (node == null) {
            return 0;
        }
        else {
            let lDepth = this.findDepth(node.left);
            let rDepth = this.findDepth(node.right);
   
            if (lDepth > rDepth) {
                return (lDepth + 1);
            }
            else {
                return (rDepth + 1);
            }
        }
    }

    isRoot(node) {  //if true - then a root of a tree
        if(node.getParent() === null) {
            return true;
        } else {
            return false;
        }
    }
}

export default BinarySearchTree;