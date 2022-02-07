import Observable from "../../utils/Observable.js";
import TreePanelController from "../controller_part/TreePanelController.js";
import BinarySearchTree from "../binary_search_tree/BinarySearchTree.js";
import CodeVisualizer from "../visualizers_part/CodeVisualizer.js";

let panelsTrees = [],
  panelCloud = null,
  valueArrOfArrays = [
    [6, 5, 4, 3, 2, 1],
    [4, 6, 5, 3, 1, 2],
    [1, 2, 3, 4, 5, 6],
  ],
  printTreePanel,
  treesSelectionCheckboxesDiv,
  sequenceConstructingTextArea,
  printSequenceTextArea,
  treeHeightTextArea,
  radius = 15;

function drawPrintTreeAndCode() {
  let widthPanel = 300,
    heightPanel = 300,
    angleLocal = 70,
    vertSpaceLocal = 52,
    valueArrayData = [7, 4, 12, 2, 6, 9, 19, 3, 5, 8, 11, 15, 20],
    nodeElementsArray = [];

  let newTree = new BinarySearchTree();

  for (let index = 0; index < valueArrayData.length; index++) {
    const element = valueArrayData[index];

    let newNodeElement = TreePanelController.createNewNodeElement(
      element,
      newTree
    );
    nodeElementsArray.push(newNodeElement);
    let newNodeGroupViewingElement =
      TreePanelController.createNewNodeGroupViewingElement(
        printTreePanel,
        newNodeElement,
        index,
        radius
      );

    let newNodeGroupViewingElementVektor =
      TreePanelController.createNewNodeGroupViewingElementVektor(
        newNodeElement,
        widthPanel,
        heightPanel,
        vertSpaceLocal,
        angleLocal,
        6,
        0.5,
        0.75,
        1
      );

    newNodeGroupViewingElement.setLocation(newNodeGroupViewingElementVektor);

    let circ = newNodeGroupViewingElement.getElementAt(0);
    let label = newNodeGroupViewingElement.getElementAt(1);
    circ.setCenterLocation(newNodeGroupViewingElementVektor);
    label.setLocation(newNodeGroupViewingElementVektor);

    printTreePanel.addElement(circ);
    printTreePanel.addElement(label);
  }

  for (let index = 0; index < nodeElementsArray.length; index++) {
    const element = nodeElementsArray[index];
    let leftTempNode, rightTempNode;

    if (element.left != null && element.right != null) {
      leftTempNode = element.left;
      rightTempNode = element.right;
      TreePanelController.drawArrow(
        printTreePanel,
        element,
        leftTempNode,
        radius
      );
      TreePanelController.drawArrow(
        printTreePanel,
        element,
        rightTempNode,
        radius
      );
    } else if (element.left != null && element.right == null) {
      leftTempNode = element.left;
      TreePanelController.drawArrow(
        printTreePanel,
        element,
        leftTempNode,
        radius
      );
    } else if (element.left == null && element.right != null) {
      rightTempNode = element.right;
      TreePanelController.drawArrow(
        printTreePanel,
        element,
        rightTempNode,
        radius
      );
    } else if (element.left == null && element.right == null) {
    } else {
      console.log("Stimmt etwas nicht richtig!");
    }
  }
}

function drawThreeTrees() {
  let widthPanel = 250,
    heightPanel = 250,
    angleLocalLongestTrees = 63,
    angleLocal = 50,
    vertSpaceLocal = 37,
    outerArrayOfNodes = [[], [], []];

  for (let i = 0; i < valueArrOfArrays.length; i++) {
    const someArray = valueArrOfArrays[i];
    let newTree = new BinarySearchTree();
    let actualPanel = panelsTrees[i];

    for (let index = 0; index < someArray.length; index++) {
      let newNodeElement = TreePanelController.createNewNodeElement(
        someArray[index],
        newTree
      );
      outerArrayOfNodes[i].push(newNodeElement);

      let newNodeGroupViewingElement =
        TreePanelController.createNewNodeGroupViewingElement(
          panelsTrees[i],
          newNodeElement,
          index,
          radius
        );

      let newNodeGroupViewingElementVektor;

      if (i == 0 || i == 2) {
        newNodeGroupViewingElementVektor =
          TreePanelController.createNewNodeGroupViewingElementVektor(
            newNodeElement,
            widthPanel,
            heightPanel,
            vertSpaceLocal,
            angleLocalLongestTrees,
            6,
            1,
            1,
            1
          );
      } else {
        newNodeGroupViewingElementVektor =
          TreePanelController.createNewNodeGroupViewingElementVektor(
            newNodeElement,
            widthPanel,
            heightPanel,
            vertSpaceLocal,
            angleLocal,
            6
          );
      }

      newNodeGroupViewingElement.setLocation(newNodeGroupViewingElementVektor);

      let circ = newNodeGroupViewingElement.getElementAt(0);
      let label = newNodeGroupViewingElement.getElementAt(1);
      circ.setCenterLocation(newNodeGroupViewingElementVektor);
      label.setLocation(newNodeGroupViewingElementVektor);

      actualPanel.addElement(circ);
      actualPanel.addElement(label);
    }
  }

  for (let i = 0; i < valueArrOfArrays.length; i++) {
    const someArray = valueArrOfArrays[i];
    let actualPanel = panelsTrees[i];

    for (let index = 0; index < someArray.length; index++) {
      let newNodeElement = outerArrayOfNodes[i][index];
      let leftTempNode, rightTempNode;

      if (newNodeElement.left != null && newNodeElement.right != null) {
        leftTempNode = newNodeElement.left;
        rightTempNode = newNodeElement.right;
        TreePanelController.drawArrow(
          actualPanel,
          newNodeElement,
          leftTempNode,
          radius
        );
        TreePanelController.drawArrow(
          actualPanel,
          newNodeElement,
          rightTempNode,
          radius
        );
      } else if (newNodeElement.left != null && newNodeElement.right == null) {
        leftTempNode = newNodeElement.left;
        TreePanelController.drawArrow(
          actualPanel,
          newNodeElement,
          leftTempNode,
          radius
        );
      } else if (newNodeElement.left == null && newNodeElement.right != null) {
        rightTempNode = newNodeElement.right;
        TreePanelController.drawArrow(
          actualPanel,
          newNodeElement,
          rightTempNode,
          radius
        );
      } else if (newNodeElement.left == null && newNodeElement.right == null) {
      } else {
      }
    }
  }
}

function drawDataInCloud() {
  let cirlcesAndLabels = [];
  let labels = ["X", "A", "C", "S", "E", "R"];
  let newTree = new BinarySearchTree(),
    posX,
    posY;

  for (let index = 0; index < labels.length; index++) {
    let newNodeElement = TreePanelController.createNewNodeElement(
      labels[index],
      newTree
    );
    let newNodeGroupViewingElement =
      TreePanelController.createNewNodeGroupViewingElement(
        panelCloud,
        newNodeElement,
        index,
        radius
      );

    if (index == 0) {
      posX = 70;
      posY = 63;
    }
    if (index == 1) {
      posX = 120;
      posY = 70;
    }
    if (index == 2) {
      posX = 90;
      posY = 107;
    }
    if (index == 3) {
      posX = 130;
      posY = 140;
    }
    if (index == 4) {
      posX = 40;
      posY = 95;
    }
    if (index == 5) {
      posX = 153;
      posY = 100;
    }

    let circ = newNodeGroupViewingElement.getElementAt(0);
    let label = newNodeGroupViewingElement.getElementAt(1);
    circ.setCenterLocation(new jsgl.Vector2D(posX, posY));
    label.setLocation(new jsgl.Vector2D(posX, posY));

    panelCloud.addElement(circ);
    panelCloud.addElement(label);
    panelCloud.addElement(newNodeGroupViewingElement);

    cirlcesAndLabels.push(newNodeElement);
  }
}

function drawCloud() {
  let widthOfPanelCloud = 200,
    heighOfPanelCloud = 200;
  let ellipse = panelCloud.createEllipse();
  TreePanelController.designEllipse(ellipse);
  ellipse.setCenterLocationXY(widthOfPanelCloud / 2, heighOfPanelCloud / 2);
  panelCloud.addElement(ellipse);

  drawDataInCloud();
}

class QuestionsApplAnalysisSynthVisual extends Observable {
  constructor() {
    super();

    treesSelectionCheckboxesDiv = document.querySelector("#statement-checkboxes");

    sequenceConstructingTextArea = document.querySelector("#sequence-constructing");
    printSequenceTextArea = document.querySelector("#print-sequence");
    treeHeightTextArea = document.querySelector("#tree-height-textarea");

    panelsTrees.push(new jsgl.Panel(document.querySelector("#first-tree-panel")));
    panelsTrees.push(new jsgl.Panel(document.querySelector("#sec-tree-panel")));
    panelsTrees.push(new jsgl.Panel(document.querySelector("#third-tree-panel")));

    panelCloud = new jsgl.Panel(document.querySelector("#cloud"));

    printTreePanel = new jsgl.Panel(document.querySelector("#print-tree-panel"));

    drawThreeTrees();
    drawPrintTreeAndCode();
    drawCloud();
  }

  getAllInfo() {
    let treesSelectedChecked = this.getTreesSelectedInfo();

    return {
      applAnSyn_treeHeightSequence: treeHeightTextArea.value,
      applAnSyn_sequencesConstructed: sequenceConstructingTextArea.value,
      applAnSyn_treesSelected: treesSelectedChecked,
      applAnSyn_printMethod: printSequenceTextArea.value,
    };
  }

  getTreesSelectedInfo() {
    let wholeSkillsAsString = "";
    if (treesSelectionCheckboxesDiv.querySelector("#first-statement").checked) {
      wholeSkillsAsString +=
        "Abbildung 2 zeigt möglichen Suchbaum für die zufällig eingefügten Schlüssel";
    }
    if (
      treesSelectionCheckboxesDiv.querySelector("#second-statement").checked
    ) {
      wholeSkillsAsString +=
        "Abbildungen 2 und 3 zeigen möglichen Suchbaum für die zufällig eingefügten Schlüssel";
    }
    if (treesSelectionCheckboxesDiv.querySelector("#third-statement").checked) {
      wholeSkillsAsString +=
        "Alle Abbildungen zeigen möglichen Suchbaum für die zufällig eingefügten Schlüssel";
    }
    if (
      treesSelectionCheckboxesDiv.querySelector("#fourth-statement").checked
    ) {
      wholeSkillsAsString +=
        "Abbildungen 1 und 2 zeigen möglichen Suchbaum für die zufällig eingefügten Schlüssel";
    }

    return wholeSkillsAsString;
  }
}

export default QuestionsApplAnalysisSynthVisual;
