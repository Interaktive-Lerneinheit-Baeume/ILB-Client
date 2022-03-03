import Observable from "../../utils/Observable.js";
import TreePanelController from "../controller_part/TreePanelController.js";
import BinarySearchTree from "../binary_search_tree/BinarySearchTree.js";
import Node from "../binary_search_tree/Node.js";

let panelKnowledge_1,
  panelKnowledge_2,
  valuesForTreeFirst = [16, 23, 41, 35, 89],
  valuesForTreeSecond = [1, 2, 4, 5, 6, 7, 8, 9, 10],
  BST_1,
  nodeElements = [],
  nodeGroupElements = [],
  nodeGroupElementLocations = [],
  widthOfPanel = 350,
  heightOfPanel = 350,
  verticalSpacing = 65,
  radius = 25,
  angle = 55;

function drawOnPanel_1() {
  BST_1 = new BinarySearchTree();

  for (let index = 0; index < valuesForTreeFirst.length; index++) {
    let nodeElement = TreePanelController.createNewNodeElement(
      valuesForTreeFirst[index],
      BST_1
    );
    nodeElements[index] = nodeElement;
    let nodeGroupViewingElement =
      TreePanelController.createNewNodeGroupViewingElement(
        panelKnowledge_1,
        nodeElement,
        index,
        radius
      );
    nodeGroupElements[index] = nodeGroupViewingElement;

    let nodeGroupViewingElementVektor =
      TreePanelController.createNewNodeGroupViewingElementVektor(
        nodeElement,
        widthOfPanel,
        heightOfPanel,
        verticalSpacing,
        angle,
        5,
        1,
        1,
        1
      );
    nodeGroupElementLocations[index] = nodeGroupViewingElementVektor;

    nodeGroupViewingElement.setLocation(nodeGroupElementLocations[index]);

    let circ = nodeGroupViewingElement.getElementAt(0);
    let label = nodeGroupViewingElement.getElementAt(1);
    circ.setCenterLocation(nodeGroupViewingElementVektor);
    label.setLocation(nodeGroupViewingElementVektor);

    panelKnowledge_1.addElement(circ);
    panelKnowledge_1.addElement(label);
  }
  //arrows drawing
  for (let index = 0; index < nodeElements.length; index++) {
    const element = nodeElements[index];
    let leftTempNode, rightTempNode;

    if (element.left != null && element.right != null) {
      leftTempNode = element.left;
      rightTempNode = element.right;
      TreePanelController.drawArrow(
        panelKnowledge_1,
        element,
        leftTempNode,
        radius
      );
      TreePanelController.drawArrow(
        panelKnowledge_1,
        element,
        rightTempNode,
        radius
      );
    } else if (element.left != null && element.right == null) {
      leftTempNode = element.left;
      TreePanelController.drawArrow(
        panelKnowledge_1,
        element,
        leftTempNode,
        radius
      );
    } else if (element.left == null && element.right != null) {
      rightTempNode = element.right;
      TreePanelController.drawArrow(
        panelKnowledge_1,
        element,
        rightTempNode,
        radius
      );
    } else if (element.left == null && element.right == null) {
      //nichts malen
    } else {
      console.log("Stimmt etwas nicht richtig!");
    }
  }
}

function drawOnPanel_2() {
  let widthOfPanel_2 = 550,
    heightOfPanel_2 = 400;

  let allNodes = [],
    allNodeGroupElements = [],
    circles = [],
    labels = [];

  for (let index = 0; index < valuesForTreeSecond.length; index++) {
    allNodes.push(new Node(valuesForTreeSecond[index]));
    let nodeGroupViewingElement =
      TreePanelController.createNewNodeGroupViewingElement(
        panelKnowledge_2,
        allNodes[index],
        index,
        radius
      );
    allNodeGroupElements[index] = nodeGroupViewingElement;

    let circ = nodeGroupViewingElement.getElementAt(0);
    let label = nodeGroupViewingElement.getElementAt(1);

    circles.push(circ);
    labels.push(label);
  }

  let drawingLevelX = 8;
  let drawingLevelY = 6;

  allNodes[2].right = allNodes[0];
  allNodes[0].parent = allNodes[2];
  allNodes[6].parent = allNodes[0];
  allNodes[8].parent = allNodes[0];
  allNodes[0].right = allNodes[6];
  allNodes[0].left = allNodes[8];

  allNodes[4].parent = allNodes[5];
  allNodes[3].parent = allNodes[0];

  allNodes[5].parent = allNodes[2];
  allNodes[2].left = allNodes[5];

  allNodes[4].right = allNodes[7];
  allNodes[4].left = allNodes[1];

  allNodes[1].parent = allNodes[4];
  allNodes[7].parent = allNodes[4];

  allNodeGroupElements[2].setLocationXY(
    (widthOfPanel_2 / drawingLevelX) * 4,
    (heightOfPanel_2 / drawingLevelY) * 1
  );
  circles[2].setCenterLocationXY(
    (widthOfPanel_2 / drawingLevelX) * 4,
    (heightOfPanel_2 / drawingLevelY) * 1
  );
  labels[2].setLocationXY(
    (widthOfPanel_2 / drawingLevelX) * 4,
    (heightOfPanel_2 / drawingLevelY) * 1
  );
  panelKnowledge_2.addElement(circles[2]);
  panelKnowledge_2.addElement(labels[2]);

  allNodeGroupElements[0].setLocationXY(
    (widthOfPanel_2 / drawingLevelX) * 6,
    (heightOfPanel_2 / drawingLevelY) * 2
  );
  circles[0].setCenterLocationXY(
    (widthOfPanel_2 / drawingLevelX) * 6,
    (heightOfPanel_2 / drawingLevelY) * 2
  );
  labels[0].setLocationXY(
    (widthOfPanel_2 / drawingLevelX) * 6,
    (heightOfPanel_2 / drawingLevelY) * 2
  );
  panelKnowledge_2.addElement(circles[0]);
  panelKnowledge_2.addElement(labels[0]);

  allNodeGroupElements[5].setLocationXY(
    (widthOfPanel_2 / drawingLevelX) * 2,
    (heightOfPanel_2 / drawingLevelY) * 2
  );
  circles[5].setCenterLocationXY(
    (widthOfPanel_2 / drawingLevelX) * 2,
    (heightOfPanel_2 / drawingLevelY) * 2
  );
  labels[5].setLocationXY(
    (widthOfPanel_2 / drawingLevelX) * 2,
    (heightOfPanel_2 / drawingLevelY) * 2
  );
  panelKnowledge_2.addElement(circles[5]);
  panelKnowledge_2.addElement(labels[5]);

  allNodeGroupElements[4].setLocationXY(
    (widthOfPanel_2 / drawingLevelX) * 2,
    (heightOfPanel_2 / drawingLevelY) * 3.2
  );
  circles[4].setCenterLocationXY(
    (widthOfPanel_2 / drawingLevelX) * 2,
    (heightOfPanel_2 / drawingLevelY) * 3.2
  );
  labels[4].setLocationXY(
    (widthOfPanel_2 / drawingLevelX) * 2,
    (heightOfPanel_2 / drawingLevelY) * 3.2
  );
  panelKnowledge_2.addElement(circles[4]);
  panelKnowledge_2.addElement(labels[4]);

  allNodeGroupElements[6].setLocationXY(
    (widthOfPanel_2 / drawingLevelX) * 7,
    (heightOfPanel_2 / drawingLevelY) * 3.2
  );
  circles[6].setCenterLocationXY(
    (widthOfPanel_2 / drawingLevelX) * 7,
    (heightOfPanel_2 / drawingLevelY) * 3.2
  );
  labels[6].setLocationXY(
    (widthOfPanel_2 / drawingLevelX) * 7,
    (heightOfPanel_2 / drawingLevelY) * 3.2
  );
  panelKnowledge_2.addElement(circles[6]);
  panelKnowledge_2.addElement(labels[6]);

  allNodeGroupElements[8].setLocationXY(
    (widthOfPanel_2 / drawingLevelX) * 5,
    (heightOfPanel_2 / drawingLevelY) * 3.2
  );
  circles[8].setCenterLocationXY(
    (widthOfPanel_2 / drawingLevelX) * 5,
    (heightOfPanel_2 / drawingLevelY) * 3.2
  );
  labels[8].setLocationXY(
    (widthOfPanel_2 / drawingLevelX) * 5,
    (heightOfPanel_2 / drawingLevelY) * 3.2
  );
  panelKnowledge_2.addElement(circles[8]);
  panelKnowledge_2.addElement(labels[8]);

  allNodeGroupElements[3].setLocationXY(
    (widthOfPanel_2 / drawingLevelX) * 6,
    (heightOfPanel_2 / drawingLevelY) * 3.2
  );
  circles[3].setCenterLocationXY(
    (widthOfPanel_2 / drawingLevelX) * 6,
    (heightOfPanel_2 / drawingLevelY) * 3.2
  );
  labels[3].setLocationXY(
    (widthOfPanel_2 / drawingLevelX) * 6,
    (heightOfPanel_2 / drawingLevelY) * 3.2
  );
  panelKnowledge_2.addElement(circles[3]);
  panelKnowledge_2.addElement(labels[3]);

  allNodeGroupElements[1].setLocationXY(
    (widthOfPanel_2 / drawingLevelX) * 1,
    (heightOfPanel_2 / drawingLevelY) * 4
  );
  circles[1].setCenterLocationXY(
    (widthOfPanel_2 / drawingLevelX) * 1,
    (heightOfPanel_2 / drawingLevelY) * 4
  );
  labels[1].setLocationXY(
    (widthOfPanel_2 / drawingLevelX) * 1,
    (heightOfPanel_2 / drawingLevelY) * 4
  );
  panelKnowledge_2.addElement(circles[1]);
  panelKnowledge_2.addElement(labels[1]);

  allNodeGroupElements[7].setLocationXY(
    (widthOfPanel_2 / drawingLevelX) * 3,
    (heightOfPanel_2 / drawingLevelY) * 4
  );
  circles[7].setCenterLocationXY(
    (widthOfPanel_2 / drawingLevelX) * 3,
    (heightOfPanel_2 / drawingLevelY) * 4
  );
  labels[7].setLocationXY(
    (widthOfPanel_2 / drawingLevelX) * 3,
    (heightOfPanel_2 / drawingLevelY) * 4
  );
  panelKnowledge_2.addElement(circles[7]);
  panelKnowledge_2.addElement(labels[7]);

  TreePanelController.drawArrowForTernaryTree(
    panelKnowledge_2,
    allNodes,
    allNodeGroupElements,
    radius
  );
}

class QuestionsKnowledgeVisual extends Observable {
  constructor(el) {
    super();
    panelKnowledge_1 = new jsgl.Panel(
      document.querySelector("#panel-knowledge-1")
    );
    panelKnowledge_2 = new jsgl.Panel(
      document.querySelector("#panel-knowledge-2")
    );
    drawOnPanel_1();
    drawOnPanel_2();
  }
}

export default QuestionsKnowledgeVisual;
