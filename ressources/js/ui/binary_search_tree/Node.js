class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
    this.parent = null;
    this.pathOfNode = "";
    this.vector = null;
    this.arrayOfVectors = [];
  }
}

export default Node;
