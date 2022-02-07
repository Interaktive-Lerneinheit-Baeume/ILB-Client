import TreePanelController from "../controller_part/TreePanelController.js";
import { Observable, Event } from "../../utils/Observable.js";
import BinarySearchTree from "../binary_search_tree/BinarySearchTree.js";
import CodeVisualizer from "./CodeVisualizer.js";

let BST,
  panelConstructing,
  codeVisualizerConstr,
  idNumbersConstr = [],
  nodeElements = [],
  nodeGroupElements = [],
  nodeGroupElementLocations = [],
  myAnimators = [],
  valueArray = new Array(59, 63, 71, 83, 92, 52, 36, 69, 48, 14),
  widthOfPanel = 470,
  heightOfPanel = 450,
  radius = 20,
  verticalSpacing = 75,
  a = 65,
  xStart = 50,
  yStart = 100,
  selectedMainRow,
  indexMainPosition = 1,
  indexPosition = 0,
  counterOfErrorPopUp = 0;

const grayColor = "#acacace6";

const Toast = Swal.mixin({
  toast: true,
  position: "top-start",
  showConfirmButton: false,
  timer: 2500,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

function createNewNodeElement(data, BST) {
  BST.insert(data);
  let currentInsertedNode = BST.getCurrentNode(data);

  return currentInsertedNode;
}

function createNewNodeGroupViewingElement(
  panelConstructing,
  nodeElement,
  index,
  radius
) {
  let circle = panelConstructing.createCircle();
  let label = panelConstructing.createLabel();
  let viewingGroup = panelConstructing.createGroup();

  let nodeGroupElement = new Object();
  nodeGroupElement.circle = circle;
  nodeGroupElement.label = label;

  nodeGroupElement.circle.setCenterLocationXY(0, 0);

  TreePanelController.designOfNode(nodeGroupElement.circle, radius);
  TreePanelController.designOfLabel(nodeGroupElement.label, nodeElement.data);

  nodeGroupElement.label.setLocationXY(0, 0);

  viewingGroup.addElement(nodeGroupElement.circle); //0-Position
  viewingGroup.addElement(nodeGroupElement.label); //1-Position
  viewingGroup.setZIndex(3);
  return viewingGroup;
}

function createNewNodeGroupViewingElementVektor(
  currentInsertedNode,
  widthOfPanel,
  heightOfPanel,
  verticalSpacing,
  angle,
  heightOfFirstNode = 5,
  coeff_0 = 0.6,
  coeff_1 = 0.8,
  coeff_else = 1
) {
  let angleHere = angle;
  let angleLocal = angle;

  let lengthOfPath = currentInsertedNode.pathOfNode.length;
  let ownEndPositionY = heightOfPanel / heightOfFirstNode;
  let ownEndPositionX = widthOfPanel / 2;

  let horizontalSpacing =
    verticalSpacing / Math.tan((angleLocal * Math.PI) / 180);

  if (lengthOfPath === 0) {
    let newVec = new jsgl.Vector2D(ownEndPositionX, ownEndPositionY);
    currentInsertedNode.vector = newVec;
    currentInsertedNode.arrayOfVectors.push(newVec);

    return newVec;
  } else {
    let firstVec = new jsgl.Vector2D(ownEndPositionX, ownEndPositionY);
    currentInsertedNode.arrayOfVectors.push(firstVec);

    for (let index = 0; index < lengthOfPath; index++) {
      const currPathLetter = currentInsertedNode.pathOfNode[index];

      if (index == 0) {
        angleLocal = coeff_0 * angleHere;
        horizontalSpacing =
          verticalSpacing / Math.tan((angleLocal * Math.PI) / 180);
      } else if (index == 1) {
        angleLocal = coeff_1 * angleHere;
        horizontalSpacing =
          verticalSpacing / Math.tan((angleLocal * Math.PI) / 180);
      } else {
        angleLocal = coeff_else * angleHere;
        horizontalSpacing =
          verticalSpacing / Math.tan((angleLocal * Math.PI) / 180);
      }

      if (currPathLetter === "R") {
        ownEndPositionY += verticalSpacing;
        ownEndPositionX += horizontalSpacing + 0;
      } else {
        ownEndPositionY += verticalSpacing;
        ownEndPositionX -= horizontalSpacing;
      }

      let hereVector = new jsgl.Vector2D(ownEndPositionX, ownEndPositionY);
      currentInsertedNode.arrayOfVectors.push(hereVector);
    }

    let newVec = new jsgl.Vector2D(ownEndPositionX, ownEndPositionY);

    currentInsertedNode.vector = newVec;
    return newVec;
  }
}

function infoAboutPrecisePosition() {
  Toast.fire({
    icon: "info",
    iconColor: grayColor,
    width: 550,
    title:
      "Positioniere präziser.<br>Der Abstand beträgt circa 2 * Radius des Knotens!",
  });
}

function infoAboutWorstCaseRuntime() {
  Swal.fire({
    position: "top-start",
    icon: "info",
    width: "800 !important",
    iconColor: grayColor,
    heightAuto: false,
    customClass: "swal-runtime",
    confirmButtonColor: grayColor,
    title:
      "<i>Worst-Case-Szenario O(N)</i>: <br>die fünf Knoten mit den Werten 59, 63, 71, 83, 92 des Suchbaums <br>liegen momentan auf einem Suchpfad",
    showConfirmButton: true,
  });
}

var setGroupMoved = function (event) {
  nodeGroupElements[indexPosition].setLocation(
    new jsgl.Vector2D(event.getX(), event.getY())
  );
};

var letMouseDownEvent = function (event) {
  panelConstructing.addMouseMoveListener(setGroupMoved);
};

var letMouseUpEvent = function (ev) {
  panelConstructing.removeMouseMoveListener(setGroupMoved);
  proveTheRightPosition(indexPosition);
};

function iterateNextNodeGroupAndArrows() {
  if (indexPosition === valueArray.length - 1) {
    Toast.fire({
      icon: "success",
      title: "Richtig konstruiert!",
      iconColor: grayColor,
    });
    unsetListenersOnGroupElement(indexPosition);
  }

  if (indexPosition < valueArray.length - 1) {
    unsetListenersOnGroupElement(indexPosition);
    indexPosition += 1;
    continueContructing();
  }
}

function startAnimatorPlaying(index) {
  let tmp = {};
  tmp.startPoint = null;
  tmp.endPoint = null;
  tmp.newLocation = null;
  tmp.direction = null;

  myAnimators[index].addStartListener(function () {
    tmp.startPoint = startPositionAnimation();
    nodeGroupElements[index].setLocation(tmp.startPoint);
    addOnPanel(nodeGroupElements[index]);

    tmp.endPoint = endPositionAnimation();
    tmp.direction = tmp.endPoint.subtract(tmp.startPoint);
    let moveSpeed = 0.25;
    var time =
      Math.sqrt(
        tmp.direction.getX() * tmp.direction.getX() +
          tmp.direction.getY() * tmp.direction.getY()
      ) / moveSpeed;
    myAnimators[index].setDuration(time);
  });

  myAnimators[index].addStepListener(function (t) {
    tmp.newLocation = new jsgl.Vector2D(
      tmp.startPoint.getX() + t * tmp.direction.getX(),
      tmp.startPoint.getY() + t * tmp.direction.getY()
    );
    nodeGroupElements[index].setLocation(tmp.newLocation);
  });

  myAnimators[index].addEndListener(function () {

  });
}

function setListenersOnGroupElement(indexPosition) {
  nodeGroupElements[indexPosition].addMouseDownListener(letMouseDownEvent);
  nodeGroupElements[indexPosition].addMouseUpListener(letMouseUpEvent);
}

function unsetListenersOnGroupElement(indexPosition) {
  nodeGroupElements[indexPosition].removeMouseDownListener(letMouseDownEvent);
  nodeGroupElements[indexPosition].removeMouseUpListener(letMouseUpEvent);
}

function beginConstructing() {
  nodeGroupElements[indexPosition].setLocation(
    nodeGroupElementLocations[indexPosition]
  );
  addOnPanel(nodeGroupElements[indexPosition]);
  indexPosition += 1;
  continueContructing();
}

function continueContructing() {
  startAnimatorPlaying(indexPosition);
  myAnimators[indexPosition].play();

  nodeGroupElements[indexPosition].setLocation(startPositionOfNode());

  TreePanelController.designOfSelectedNode(
    nodeGroupElements[indexPosition].getElementAt(0),
    radius * 1.1
  );
  addOnPanel(nodeGroupElements[indexPosition]);
  
  idNumbersConstr[indexMainPosition].style.visibility = "visible";
  idNumbersConstr[0].style.visibility = "visible";
  idNumbersConstr[1].style.visibility = "visible";
  indexMainPosition += 1;
  selectedMainRow.removeAttribute("id");

  selectedMainRow = idNumbersConstr[indexMainPosition - 1];
  selectedMainRow.setAttribute("id", "id_1");
  setListenersOnGroupElement(indexPosition);
}

function proveTheRightPosition(index) {
  if (index === 0) {
    console.log("Wurzel!");
  } else {
    let parent = BST.getParent(nodeElements[index]);
    let xPosOfParent = parent.vector.getX();

    if (nodeGroupElements[index].getX() > xPosOfParent) {
      if (nodeGroupElementLocations[index].getX() < xPosOfParent) {
        TreePanelController.designOfUncorrectNode(
          nodeGroupElements[index].getElementAt(0)
        );
        Swal.fire({
          title: "Dieser Knoten ist ein linkes Kind von seinem Vaterknoten",
          confirmButtonText: "Alles klar",
          confirmButtonColor: grayColor,
          customClass: "kind_node_info",
          allowOutsideClick: false,
          visible: true,
          allowEscapeKey: false,
          iconColor: grayColor,
        }).then((result) => {
          if (result.isConfirmed) {
            counterOfErrorPopUp += 1;
          }
        });
      } else {
        if (
          Math.abs(
            nodeGroupElementLocations[index].getX() -
              nodeGroupElements[index].getX()
          ) >
          radius * 0.8
        ) {
          infoAboutPrecisePosition();
          TreePanelController.designOfSelectedNode(
            nodeGroupElements[indexPosition].getElementAt(0),
            radius * 1.1
          );
        } else {
          if (
            Math.abs(
              nodeGroupElementLocations[index].getY() -
                nodeGroupElements[index].getY()
            ) <
            radius * 0.7
          ) {
            nodeGroupElements[index].setLocation(
              nodeGroupElementLocations[index]
            );

            let event = new Event("correctPosition");
            BST.notifyAll(event);

            TreePanelController.drawArrow(
              panelConstructing,
              parent,
              nodeElements[index],
              radius
            );
            TreePanelController.designOfNode(
              nodeGroupElements[index].getElementAt(0),
              radius
            );

            if (index == 4) {
              infoAboutWorstCaseRuntime();
            }

            if (indexMainPosition == 10) {
              idNumbersConstr[9].removeAttribute("id");
            }
          } else {
            infoAboutPrecisePosition();
            TreePanelController.designOfSelectedNode(
              nodeGroupElements[indexPosition].getElementAt(0),
              radius * 1.1
            );
          }
        }
      }
    } else {
      if (nodeGroupElementLocations[index].getX() > xPosOfParent) {
        TreePanelController.designOfUncorrectNode(
          nodeGroupElements[index].getElementAt(0)
        );

        Swal.fire({
          title: "Dieser Knoten ist ein rechtes Kind von seinem Vaterknoten",
          confirmButtonText: "Alles klar",
          confirmButtonColor: grayColor,
          allowEscapeKey: false,
          customClass: "kind_node_info",
          showConfirmButton: true,
          allowOutsideClick: false,
          iconColor: grayColor,
        }).then((result) => {
          if (result.isConfirmed) {
            counterOfErrorPopUp += 1;
          }
        });

      } else {
        if (
          Math.abs(
            nodeGroupElementLocations[index].getX() -
              nodeGroupElements[index].getX()
          ) > radius
        ) {
          infoAboutPrecisePosition();
          TreePanelController.designOfSelectedNode(
            nodeGroupElements[indexPosition].getElementAt(0),
            radius * 1.1
          );
        } else {
          if (
            Math.abs(
              nodeGroupElementLocations[index].getY() -
                nodeGroupElements[index].getY()
            ) <
            radius * 0.7
          ) {
            nodeGroupElements[index].setLocation(
              nodeGroupElementLocations[index]
            );

            let event = new Event("correctPosition");
            BST.notifyAll(event);

            TreePanelController.drawArrow(
              panelConstructing,
              parent,
              nodeElements[index],
              radius
            );
            TreePanelController.designOfNode(
              nodeGroupElements[index].getElementAt(0),
              radius
            );
          } else {
            infoAboutPrecisePosition();
            TreePanelController.designOfSelectedNode(
              nodeGroupElements[indexPosition].getElementAt(0),
              radius * 1.1
            );
          }
        }
      }
    }
  }
}

function startPositionOfNode() {
  let startPositionX = xStart;
  let startPositionY = yStart;
  return new jsgl.Vector2D(startPositionX, startPositionY);
}

function startPositionAnimation() {
  return new jsgl.Vector2D(radius, radius);
}

function endPositionAnimation() {
  let startPositionX = xStart;
  let startPositionY = yStart;
  return new jsgl.Vector2D(startPositionX, startPositionY);
}

function addOnPanel(nodeGroupConstructElement) {
  panelConstructing.addElement(nodeGroupConstructElement);
}

function constructTreeInBackground() {
  for (let index = 0; index < valueArray.length; index++) {
    const element = valueArray[index];
    let nodeElement = createNewNodeElement(element, BST);
    nodeElements[index] = nodeElement;

    let nodeGroupViewingElement = createNewNodeGroupViewingElement(
      panelConstructing,
      nodeElement,
      index,
      radius
    );
    nodeGroupElements[index] = nodeGroupViewingElement;

    let nodeGroupConstrElementVektor = createNewNodeGroupViewingElementVektor(
      nodeElement,
      widthOfPanel,
      heightOfPanel,
      verticalSpacing,
      a,
      5,
      0.85,
      0.95,
      1
    );
    nodeGroupElementLocations[index] = nodeGroupConstrElementVektor;

    myAnimators[index] = new jsgl.util.Animator();
  }
}

class ConstructVisualizer extends Observable {
  constructor(el) {
    super();
    BST = new BinarySearchTree();

    this.panelElementConstr =
      document.getElementsByClassName("panel constructing")[0];
    codeVisualizerConstr = new CodeVisualizer(el, "constructing");

    panelConstructing = new jsgl.Panel(this.panelElementConstr);

    idNumbersConstr = document.getElementsByClassName("id-number-constr");

    selectedMainRow = idNumbersConstr[1];
    selectedMainRow.setAttribute("id", "id_1");

    constructTreeInBackground();
    beginConstructing();

    BST.addEventListener("correctPosition", iterateNextNodeGroupAndArrows);
  }

  getAllInfo() {
    return { counterOfErrorPopUp: counterOfErrorPopUp };
  }
}

export default ConstructVisualizer;
