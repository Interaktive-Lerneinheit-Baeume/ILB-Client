import TreePanelController from "../controller_part/TreePanelController.js";
import { Observable, Event } from "../../utils/Observable.js";
import BinarySearchTree from "../binary_search_tree/BinarySearchTree.js";
import EventBus from "./../../utils/EventBus.js";
import CodeVisualizer from "./CodeVisualizer.js";

let panelViewing,
  idNumbersViewing = [],
  codeVisualizerViewing,
  selectedMainRow,
  pauseButton,
  startButton,
  speedSlider,
  innerAnimator = null,
  valueArray = new Array(59, 63, 71, 83, 92, 52, 36, 69, 48, 14),
  nodeGroupElements = [],
  nodeElements = [],
  actualNodeGroupElements = [],
  coefficientSpeedTime = 0.5,
  nodeGroupElementLocations = [],
  positionOfMainCode = 13,
  BST,
  currentPlayingAnimation = null,
  widthOfPanel = 560,
  heightOfPanel = 400,
  radius = 20,
  verticalSpacing = 70,
  a = 70,
  xStart = widthOfPanel / 2,
  yStart = radius + radius / 2,
  animatorsWholeTree = [],
  startAnimationIndex = 0,
  indexMainPosition = 0,
  innerIndex = 0,
  counterOfAnimationButtonClicked = 0;

const grayColor = "#acacace6";

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

function continueInnerAnimations(length) {
  if (positionOfMainCode == 22) {
    idNumbersViewing[9].removeAttribute("id");
  }

  if (!(startAnimationIndex >= valueArray.length)) {
    if (
      innerIndex !=
      BST.getCurrentNode(valueArray[startAnimationIndex]).arrayOfVectors.length
    ) {
      innerAnimator = animatorsWholeTree[startAnimationIndex][innerIndex];
      currentPlayingAnimation =
        animatorsWholeTree[startAnimationIndex][innerIndex];

      animateMoveAtLoc(startAnimationIndex);

      innerAnimator.play();
    }
  } else {
    startAnimationIndex = 0;
    innerIndex = 0;
    innerAnimator = animatorsWholeTree[startAnimationIndex][innerIndex];
    ViewingVisualizer.setStartButtonClickable();
    ViewingVisualizer.setPauseButtonUnClickable();
    pauseButton.classList.remove("pause");
  }
}

function prepareForAnimation() {
  for (let index = 0; index < valueArray.length; index++) {
    let nodeElement = TreePanelController.createNewNodeElement(
      valueArray[index],
      BST
    );
    nodeElements[index] = nodeElement;

    let nodeGroupViewingElement =
      TreePanelController.createNewNodeGroupViewingElement(
        panelViewing,
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
        a
      );
    nodeGroupElementLocations[index] = nodeGroupViewingElementVektor;
  }
}

function addOnPanel(nodeGroupViewingElement) {
  panelViewing.addElement(nodeGroupViewingElement);
}

function deleteFromPanel(el) {
  panelViewing.removeElement(el);
}

function startPositionOfNode() {
  let startPositionX = xStart;
  let startPositionY = yStart;
  return new jsgl.Vector2D(startPositionX, startPositionY);
}

function animateMoving(arrayOfNodeVectors) {
  let arrayOfVectors = arrayOfNodeVectors;

  let tmp = {};
  tmp.startPoint = null;
  tmp.endPoint = null;
  tmp.newLocation = null;
  tmp.direction = null;

  let endVector = null;
  let precursorEndVector = null;

  endVector = arrayOfVectors[innerIndex];

  let groesserAls = TreePanelController.biggerThanDraw(panelViewing);
  let kleinerAls = TreePanelController.smallerEqualThanDraw(panelViewing);

  innerAnimator.addStartListener(function () {
    if (!(startAnimationIndex >= valueArray.length)) {
      if (innerIndex == 0) {
        tmp.startPoint = startPositionOfNode();
      } else {
        tmp.startPoint = arrayOfVectors[innerIndex - 1];
      }

      let firstVectorForAll = nodeGroupElementLocations[0];

      if (startAnimationIndex != 0) {
        if (innerIndex != 0) {
          precursorEndVector = arrayOfVectors[innerIndex - 1];
          let newEqualityVector = new jsgl.Vector2D(
            precursorEndVector.getX(),
            precursorEndVector.getY() - 30
          );

          if (endVector.getX() > precursorEndVector.getX()) {
            //nach rechts
            groesserAls.setLocation(newEqualityVector);
            addOnPanel(groesserAls);
          } else {
            //Knoten soll nach links gehen
            kleinerAls.setLocation(newEqualityVector);
            addOnPanel(kleinerAls);
          }
        } else {
          if (endVector.getX() != 225) {
            precursorEndVector = firstVectorForAll;

            let newEqualityVector = new jsgl.Vector2D(
              precursorEndVector.getX(),
              precursorEndVector.getY() - 30
            );

            if (endVector.getX() > precursorEndVector.getX()) {
              //nach rechts
              groesserAls.setLocation(newEqualityVector);
              addOnPanel(groesserAls);
            } else {
              //Knoten soll nach links gehen
              kleinerAls.setLocation(newEqualityVector);
              addOnPanel(kleinerAls);
            }
          }
        }
      }
      actualNodeGroupElements.push(nodeGroupElements[startAnimationIndex]);

      actualNodeGroupElements[startAnimationIndex].setLocation(tmp.startPoint);
      addOnPanel(actualNodeGroupElements[startAnimationIndex]);

      tmp.endPoint = endVector;
      tmp.direction = tmp.endPoint.subtract(tmp.startPoint);
      let moveSpeed = 0.25;
      moveSpeed = moveSpeed * coefficientSpeedTime;
      var time =
        Math.sqrt(
          tmp.direction.getX() * tmp.direction.getX() +
            tmp.direction.getY() * tmp.direction.getY()
        ) / moveSpeed;
      innerAnimator.setDuration(time);
    }
  });

  innerAnimator.addStepListener(function (t) {
    if (!(startAnimationIndex >= valueArray.length)) {
      tmp.newLocation = new jsgl.Vector2D(
        tmp.startPoint.getX() + t * tmp.direction.getX(),
        tmp.startPoint.getY() + t * tmp.direction.getY()
      );

      if (actualNodeGroupElements.length != 0) {
        actualNodeGroupElements[startAnimationIndex].setLocation(
          tmp.newLocation
        );
      }
    }
  });

  innerAnimator.addEndListener(function () {
    if (startAnimationIndex != 0) {
      if (panelViewing.containsElement(groesserAls)) {
        deleteFromPanel(groesserAls);
      } else if (panelViewing.containsElement(kleinerAls)) {
        deleteFromPanel(kleinerAls);
      }
    }

    if (
      innerIndex != arrayOfVectors.length - 1 &&
      actualNodeGroupElements.length != 0
    ) {
      innerIndex += 1;
      currentPlayingAnimation =
        animatorsWholeTree[startAnimationIndex][innerIndex];
      panelViewing.removeElement(actualNodeGroupElements[startAnimationIndex]);
      actualNodeGroupElements.splice(startAnimationIndex, 1);
    } else {
      startAnimationIndex += 1;
      innerIndex = 0;
      let addedData = valueArray[startAnimationIndex - 1];

      if (startAnimationIndex != 1 && startAnimationIndex != 0) {
        let addedNode = BST.getCurrentNode(addedData);
        let parentOfAddedNode = BST.getParent(addedNode);
        TreePanelController.drawArrow(
          panelViewing,
          parentOfAddedNode,
          addedNode,
          radius
        );
      }

      if (startAnimationIndex == 5) {
        infoAboutWorstCaseRuntime();
      }

      positionOfMainCode += 1;

      if (!(positionOfMainCode >= 23)) {
        indexMainPosition += 1;
        idNumbersViewing[indexMainPosition].style.visibility = "visible";
        selectedMainRow = idNumbersViewing[indexMainPosition];

        selectedMainRow.setAttribute("id", "id_1");
        idNumbersViewing[indexMainPosition - 1].removeAttribute("id");
      }
      if (positionOfMainCode == 22) {
        idNumbersViewing[9].style.visibility = "visible";
      }
    }

    continueInnerAnimations(arrayOfVectors.length);
  });
}

function animateMoveAtLoc(startAnimationIndex) {
  let currNode = nodeElements[startAnimationIndex];
  let arrayOfNodeVectors = currNode.arrayOfVectors;
  animateMoving(arrayOfNodeVectors);
}

class ViewingVisualizer extends Observable {
  constructor(el) {
    super();
    this.panelElementViewing =
      document.getElementsByClassName("panel viewing")[0];

    codeVisualizerViewing = new CodeVisualizer(el, "viewing");

    startButton = document.querySelector("#start-button");
    pauseButton = document.querySelector("#pause-button");

    idNumbersViewing = document.getElementsByClassName("id-number-viewing");

    ViewingVisualizer.setPauseButtonUnClickable();

    startButton.addEventListener(
      "click",
      this.onViewingStartButtonClick.bind(this)
    );
    pauseButton.addEventListener(
      "click",
      this.onViewingPauseButtonClick.bind(this)
    );

    speedSlider = el.querySelector(".speed-slider");
    speedSlider.addEventListener("change", this.getSpeedValue.bind(this));

    panelViewing = new jsgl.Panel(this.panelElementViewing);

    BST = new BinarySearchTree();
    prepareForAnimation();
  }

  getSpeedValue(ev) {
    coefficientSpeedTime = speedSlider.value / 100;
  }

  onViewingStartButtonClick(ev) {
    ViewingVisualizer.setStartButtonUnClickable();
    this.startViewingAnimation();

    counterOfAnimationButtonClicked += 1;

    EventBus.relayEvent(
      new Event("playAnimationButtonClicked", {
        time: Date(Date.now()).toString(),
        info: "playAnimationButtonClicked",
        occurency_overall: counterOfAnimationButtonClicked,
      })
    );
  }

  onViewingPauseButtonClick(ev) {
    for (let index = 0; index < nodeGroupElementLocations.length; index++) {
      const element = nodeGroupElementLocations[index];
      if (
        actualNodeGroupElements[startAnimationIndex].getLocation().getX() ==
        element.getX()
      ) {
        return;
      }
    }

    if (pauseButton.classList.contains("pause")) {
      pauseButton.classList.remove("pause");
    } else {
      pauseButton.classList.add("pause");
    }

    if (innerAnimator != null && currentPlayingAnimation != undefined) {
      if (innerAnimator.isPlaying()) {
        innerAnimator.pause();
        pauseButton.classList.remove("pause");
      } else {
        innerAnimator.play();
        pauseButton.classList.add("pause");
      }
    }
  }

  static setStartButtonUnClickable() {
    startButton.disabled = true;
  }

  static setStartButtonClickable() {
    startButton.disabled = false;
  }

  static setPauseButtonUnClickable() {
    pauseButton.disabled = true;
  }

  static setPauseButtonClickable() {
    pauseButton.disabled = false;
  }

  startViewingAnimation() {
    indexMainPosition = 0;
    idNumbersViewing[indexMainPosition].style.visibility = "visible";
    idNumbersViewing[indexMainPosition].setAttribute("id", "id_1");
    positionOfMainCode = 13;

    ViewingVisualizer.setPauseButtonClickable();
    pauseButton.classList.add("pause");

    startAnimationIndex = 0;
    innerIndex = 0;

    if (panelViewing.getElementsCount() != 0) {
      for (let index = 0; index < actualNodeGroupElements.length; index++) {
        let el = actualNodeGroupElements[index];
        panelViewing.removeElement(el);
      }
    }

    panelViewing.clear();
    actualNodeGroupElements.splice(0, actualNodeGroupElements.length);
    animatorsWholeTree.splice(0, animatorsWholeTree.length);

    for (let index = 0; index < valueArray.length; index++) {
      let animatorsWholeTreeSingle = [];
      animatorsWholeTree.push(animatorsWholeTreeSingle);
      for (let i = 0; i < nodeElements[index].arrayOfVectors.length; i++) {
        let everyAnimator = new jsgl.util.Animator();
        animatorsWholeTree[index].push(everyAnimator);
      }
    }
    innerAnimator = animatorsWholeTree[startAnimationIndex][innerIndex];

    animateMoveAtLoc(startAnimationIndex);
    innerAnimator.play();
  }
}

export default ViewingVisualizer;
