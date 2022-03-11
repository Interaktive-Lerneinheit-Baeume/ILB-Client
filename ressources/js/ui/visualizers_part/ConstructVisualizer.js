import TreePanelController from "../controller_part/TreePanelController.js";
import { Observable, Event } from "../../utils/Observable.js";
import BinarySearchTree from "../binary_search_tree/BinarySearchTree.js";
import CodeVisualizer from "./CodeVisualizer.js";
import EventBus from "./../../utils/EventBus.js";

let BST,
  panelConstructing,
  codeVisualizerConstr,
  idNumbersConstr = [],
  nodeElements = [],
  nodeGroupViewingElements = [],
  nodeElementsTransparent = [],
  actualKindNodesViewingGroups = [],
  actualKindNodesViewingGroupsVektors = [],
  nodeGroupViewingElementsTransparent = [],
  nodeGroupElementLocationsTransparent = [],
  valueArrayTransparent = new Array(
    59,
    63,
    71,
    83,
    92,
    52,
    36,
    69,
    48,
    14,
    81,
    54,
    61,
    53,
    57,
    60,
    62,
    7,
    16
  ),
  nodeGroupElementLocations = [],
  myAnimators = [],
  valueArray = new Array(59, 63, 71, 83, 92, 52, 36, 69, 48, 14),
  widthOfPanel = 560,
  heightOfPanel = 400,
  radius = 20,
  verticalSpacing = 60,
  a = 65,
  xStart = 40,
  yStart = 100,
  selectedMainRow,
  indexMainPosition = 1,
  indexPosition = 0,
  counterOfErrorPopUpLeftNode = 0,
  counterOfErrorPopUpRightNode = 0;

const grayColor = "#acacace6";

const Toast = Swal.mixin({
  toast: true,
  position: "top-start",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

function infoAboutPrecisePosition() {
  Toast.fire({
    icon: "info",
    iconColor: grayColor,
    title: "Positioniere präziser",
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
  nodeGroupViewingElements[indexPosition].setLocation(
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
    for (let index = 0; index < actualKindNodesViewingGroups.length; index++) {
      const element = actualKindNodesViewingGroups[index];
      panelConstructing.removeElement(element);
    }
  }

  if (indexPosition < valueArray.length - 1) {
    unsetListenersOnGroupElement(indexPosition);
    indexPosition += 1;
    continueContructing();
  }

  constructTransparentCircles();
}

function startAnimatorPlaying(index) {
  let tmp = {};
  tmp.startPoint = null;
  tmp.endPoint = null;
  tmp.newLocation = null;
  tmp.direction = null;

  myAnimators[index].addStartListener(function () {
    tmp.startPoint = startPositionAnimation();
    nodeGroupViewingElements[index].setLocation(tmp.startPoint);
    addOnPanel(nodeGroupViewingElements[index]);

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
    nodeGroupViewingElements[index].setLocation(tmp.newLocation);
  });

  myAnimators[index].addEndListener(function () {});
}

function setListenersOnGroupElement(indexPosition) {
  nodeGroupViewingElements[indexPosition].addMouseDownListener(
    letMouseDownEvent
  );
  nodeGroupViewingElements[indexPosition].addMouseUpListener(letMouseUpEvent);
}

function unsetListenersOnGroupElement(indexPosition) {
  nodeGroupViewingElements[indexPosition].removeMouseDownListener(
    letMouseDownEvent
  );
  nodeGroupViewingElements[indexPosition].removeMouseUpListener(
    letMouseUpEvent
  );
}

function beginConstructing() {
  nodeGroupViewingElements[indexPosition].setLocation(
    nodeGroupElementLocations[indexPosition]
  );
  addOnPanel(nodeGroupViewingElements[indexPosition]);
  indexPosition += 1;
  continueContructing();
}

function continueContructing() {
  startAnimatorPlaying(indexPosition);
  myAnimators[indexPosition].play();

  nodeGroupViewingElements[indexPosition].setLocation(startPositionOfNode());

  TreePanelController.designOfSelectedNode(
    nodeGroupViewingElements[indexPosition].getElementAt(0),
    radius * 1.1
  );
  addOnPanel(nodeGroupViewingElements[indexPosition]);

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
  } else {
    let parent = BST.getParent(nodeElements[index]);
    let xPosOfParent = parent.vector.getX();

    if (nodeGroupViewingElements[index].getX() > xPosOfParent) {
      if (nodeGroupElementLocations[index].getX() < xPosOfParent) {
        TreePanelController.designOfUncorrectNode(
          nodeGroupViewingElements[index].getElementAt(0)
        );
        Swal.fire({
          title: "Dieser Knoten ist ein linkes Kind von seinem Vaterknoten",
          confirmButtonText: "Alles klar",
          confirmButtonColor: grayColor,
          customClass: "kind_node_info",
          allowOutsideClick: false,
          allowEscapeKey: false,
          iconColor: grayColor,
        }).then((result) => {
          if (result.isConfirmed) {
            counterOfErrorPopUpLeftNode += 1;

            EventBus.relayEvent(
              new Event("constructingWarningOccurencyLeftNode", {
                time: Date(Date.now()).toString(),
                info: "Dieser Knoten ist ein linkes Kind von seinem Vaterknoten",
                occurency_overall: counterOfErrorPopUpLeftNode,
              })
            );
          }
        });
      } else {
        if (
          Math.abs(
            nodeGroupElementLocations[index].getX() -
              nodeGroupViewingElements[index].getX()
          ) >
          radius * 0.8
        ) {
          infoAboutPrecisePosition();
          TreePanelController.designOfSelectedNode(
            nodeGroupViewingElements[indexPosition].getElementAt(0),
            radius * 1.1
          );
        } else {
          if (
            Math.abs(
              nodeGroupElementLocations[index].getY() -
                nodeGroupViewingElements[index].getY()
            ) <
            radius * 0.8
          ) {
            nodeGroupViewingElements[index].setLocation(
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
              nodeGroupViewingElements[index].getElementAt(0),
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
              nodeGroupViewingElements[indexPosition].getElementAt(0),
              radius * 1.1
            );
          }
        }
      }
    } else {
      if (nodeGroupElementLocations[index].getX() > xPosOfParent) {
        TreePanelController.designOfUncorrectNode(
          nodeGroupViewingElements[index].getElementAt(0)
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
            counterOfErrorPopUpRightNode += 1;

            EventBus.relayEvent(
              new Event("constructingWarningOccurencyRightNode", {
                time: Date(Date.now()).toString(),
                info: "Dieser Knoten ist ein rechtes Kind von seinem Vaterknoten",
                occurency_overall: counterOfErrorPopUpRightNode,
              })
            );
          }
        });
      } else {
        if (
          Math.abs(
            nodeGroupElementLocations[index].getX() -
              nodeGroupViewingElements[index].getX()
          ) > radius
        ) {
          infoAboutPrecisePosition();
          TreePanelController.designOfSelectedNode(
            nodeGroupViewingElements[indexPosition].getElementAt(0),
            radius * 1.1
          );
        } else {
          if (
            Math.abs(
              nodeGroupElementLocations[index].getY() -
                nodeGroupViewingElements[index].getY()
            ) <
            radius * 0.7
          ) {
            nodeGroupViewingElements[index].setLocation(
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
              nodeGroupViewingElements[index].getElementAt(0),
              radius
            );
          } else {
            infoAboutPrecisePosition();
            TreePanelController.designOfSelectedNode(
              nodeGroupViewingElements[indexPosition].getElementAt(0),
              radius * 1.1
            );
          }
        }
      }
    }
  }
}

function constructTransparentCircles() {
  if (nodesPutOnPanel.length !== 9) {
    for (let index = 0; index < actualNodesPutOnPanel.length; index++) {
      const actualNodePutOnPanel = actualNodesPutOnPanel[index];
      for (let i = 0; i < nodesPutOnPanel.length; i++) {
        const nodePutOnPanel = nodesPutOnPanel[i];
        if (
          actualNodePutOnPanel.getLocation().getX() ===
            nodePutOnPanel.getLocation().getX() &&
          actualNodePutOnPanel.getLocation().getY() ===
            nodePutOnPanel.getLocation().getY()
        ) {
          panelConstructing.removeElement(actualNodePutOnPanel);
          actualNodesPutOnPanel.splice(index, 1);
        }
      }
    }
  }

  let bst = new BinarySearchTree(),
    nodeValue,
    actualNodeParent;
  for (let index = 0; index < valueArrayTransparent.length; index++) {
    const element = valueArrayTransparent[index];
    let nodeElement = TreePanelController.createNewNodeElement(element, bst);
    nodeElementsTransparent[index] = nodeElement;
  }

  if (indexPosition === 0) {
    actualNodeParent = bst.getRootNode();
  } else {
    nodeValue = valueArrayTransparent[indexPosition];
    actualNodeParent = bst.getParent(bst.getCurrentNode(nodeValue));
  }

  actualKindNodes = [];
  actualKindNodesViewingGroups = [];
  actualKindNodesViewingGroupsVektors = [];

  if (actualNodeParent.left !== null) {
    actualKindNodes.push(actualNodeParent.left);
  }

  if (actualNodeParent.right !== null) {
    actualKindNodes.push(actualNodeParent.right);
  }

  if (
    actualNodeParent.data === 71 &&
    actualNodeParent.left.data === 69 &&
    nodesPutOnPanel.length > 5
  ) {
    actualKindNodes.push(bst.getCurrentNode(36).left);
    actualKindNodes.push(bst.getCurrentNode(36).right);
  }

  for (let index = 0; index < actualKindNodes.length; index++) {
    const element = actualKindNodes[index];

    actualKindNodesViewingGroups.push(
      TreePanelController.createNewNodeGroupViewingElementTransparent(
        panelConstructing,
        element,
        indexPosition,
        radius
      )
    );

    actualKindNodesViewingGroupsVektors.push(
      TreePanelController.createNewNodeGroupViewingElementVektor(
        element,
        widthOfPanel,
        heightOfPanel,
        verticalSpacing,
        a
      )
    );
  }

  for (let index = 0; index < actualKindNodesViewingGroups.length; index++) {
    const element = actualKindNodesViewingGroups[index];
    element.setLocation(actualKindNodesViewingGroupsVektors[index]);
    addOnPanel(element);
    actualNodesPutOnPanel.push(element);
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
    let nodeElement = TreePanelController.createNewNodeElement(element, BST);
    nodeElements[index] = nodeElement;

    let nodeGroupViewingElement =
      TreePanelController.createNewNodeGroupViewingElement(
        panelConstructing,
        nodeElement,
        index,
        radius
      );
    nodeGroupViewingElements[index] = nodeGroupViewingElement;

    let nodeGroupConstrElementVektor =
      TreePanelController.createNewNodeGroupViewingElementVektor(
        nodeElement,
        widthOfPanel,
        heightOfPanel,
        verticalSpacing,
        a
      );

    nodeGroupElementLocations[index] = nodeGroupConstrElementVektor;

    myAnimators[index] = new jsgl.util.Animator();
  }

  // constructTransparentCircles();
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
    constructTransparentCircles();
    BST.addEventListener("correctPosition", iterateNextNodeGroupAndArrows);
  }

  getAllInfo() {
    return { counterOfErrorPopUp: counterOfErrorPopUp };
  }
}

export default ConstructVisualizer;
