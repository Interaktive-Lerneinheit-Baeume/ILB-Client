const labelInRectFontFamily = "Courier New",
  colorOfArrowsAndLabels = "black",
  hellGrayOfNodeInnerColor = "#dfdddd",
  ownGrayStrokeOfNodeColor = "#9b9b9b",
  ownRedStrokeOfUnCorrectNodeColor = "#e74e07",
  hgrayColor = "#acacace6";

class TreePanelController {
  static createNewNodeElement(data, BST) {
    BST.insert(data);
    let currentInsertedNode = BST.getCurrentNode(data);
    return currentInsertedNode;
  }

  static createNewNodeGroupViewingElement(panel, nodeElement, index, radius) {
    let circle = panel.createCircle();
    let label = panel.createLabel();
    let viewingGroup = panel.createGroup();

    let nodeGroupElement = new Object();
    nodeGroupElement.circle = circle;
    nodeGroupElement.label = label;

    nodeGroupElement.circle.setCenterLocationXY(0, 0);
    nodeGroupElement.label.setLocationXY(0, 0);

    this.designOfNode(nodeGroupElement.circle, radius);
    this.designOfLabel(nodeGroupElement.label, nodeElement.data);

    viewingGroup.addElement(nodeGroupElement.circle); //0-Position
    viewingGroup.addElement(nodeGroupElement.label); //1-Position
    return viewingGroup;
  }

  static createNewNodeGroupViewingElementTransparent(panel, nodeElement, index, radius){
    let circle = panel.createCircle();
    let viewingGroup = panel.createGroup();

    let nodeGroupElement = new Object();
    nodeGroupElement.circle = circle;

    nodeGroupElement.circle.setCenterLocationXY(0, 0);

    this.designOfNodeTransparent(nodeGroupElement.circle, radius);

    viewingGroup.addElement(nodeGroupElement.circle); //0-Position
    return viewingGroup;
  }

  static createNewNodeGroupViewingElementVektor(
    currentInsertedNode,
    widthOfPanel,
    heightOfPanel,
    verticalSpacing,
    angle,
    heightOfFirstNode = 5,
    coeff_0 = 0.5,
    coeff_1 = 0.8,
    coeff_2 = 1,
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
        } else if(index == 2){
          angleLocal = coeff_2 * angleHere;
          horizontalSpacing =
            verticalSpacing / Math.tan((angleLocal * Math.PI) / 180);
        }
        else if(index == 3){
          angleLocal = coeff_else * 1.1 * angleHere;
          horizontalSpacing =
            verticalSpacing / Math.tan((angleLocal * Math.PI) / 180);
        }
        else {
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

  static drawArrowForTernaryTree(
    panelKnowledge_2,
    allNodes,
    allNodeGroupElements,
    radius
  ) {
    let arrayOfXY = [];
    let myStroke = this.designStrokeOfArrows();
    let majorLines = [];

    for (let index = 0; index < allNodeGroupElements.length; index++) {
      const element = allNodeGroupElements[index];

      let x = element.getLocation().getX();
      let y = element.getLocation().getY();

      allNodes[index].vector = new jsgl.Vector2D(x, y);

      let innerArray = [];
      innerArray.push(x);
      innerArray.push(y);

      arrayOfXY.push(innerArray);

      majorLines.push(panelKnowledge_2.createLine());
      majorLines[index].setStroke(myStroke);

      panelKnowledge_2.addElement(majorLines[index]);
    }

    majorLines[3].setStartPoint(
      new jsgl.Vector2D(arrayOfXY[0][0], arrayOfXY[0][1] + radius)
    );
    majorLines[3].setEndPoint(
      new jsgl.Vector2D(arrayOfXY[3][0], arrayOfXY[3][1] - radius)
    );

    majorLines[0].setStartPoint(
      new jsgl.Vector2D(arrayOfXY[0][0], arrayOfXY[0][1] + radius)
    );
    majorLines[0].setEndPoint(
      new jsgl.Vector2D(arrayOfXY[3][0], arrayOfXY[3][1] - radius)
    );

    TreePanelController.drawArrow(
      panelKnowledge_2,
      allNodes[2],
      allNodes[0],
      radius
    );
    TreePanelController.drawArrow(
      panelKnowledge_2,
      allNodes[2],
      allNodes[5],
      radius
    );

    TreePanelController.drawArrow(
      panelKnowledge_2,
      allNodes[4],
      allNodes[1],
      radius
    );
    TreePanelController.drawArrow(
      panelKnowledge_2,
      allNodes[4],
      allNodes[7],
      radius
    );

    TreePanelController.drawArrow(
      panelKnowledge_2,
      allNodes[0],
      allNodes[8],
      radius
    );
    TreePanelController.drawArrow(
      panelKnowledge_2,
      allNodes[0],
      allNodes[6],
      radius
    );

    TreePanelController.drawArrow(
      panelKnowledge_2,
      allNodes[0],
      allNodes[3],
      radius
    );
    TreePanelController.drawArrow(
      panelKnowledge_2,
      allNodes[5],
      allNodes[4],
      radius
    );

    majorLines[4].setStartPoint(
      new jsgl.Vector2D(arrayOfXY[5][0], arrayOfXY[5][1] + radius)
    );
    majorLines[4].setEndPoint(
      new jsgl.Vector2D(arrayOfXY[4][0], arrayOfXY[4][1] - radius)
    );

    majorLines[3].setStartPoint(
      new jsgl.Vector2D(arrayOfXY[0][0], arrayOfXY[0][1] + radius)
    );
    majorLines[3].setEndPoint(
      new jsgl.Vector2D(arrayOfXY[3][0], arrayOfXY[3][1] - radius)
    );
  }

  static drawArrow(panel, nodeFrom, nodeTo, radius) {
    let wholeVectorBetweenTwoNodesLength = Math.sqrt(
      Math.pow(nodeFrom.vector.getX() - nodeTo.vector.getX(), 2) +
        Math.pow(nodeFrom.vector.getY() - nodeTo.vector.getY(), 2)
    );
    let gegenKatheteVectorBetweenTwoNodes = Math.abs(
      nodeFrom.vector.getX() - nodeTo.vector.getX()
    );

    let alphaVectorBetweenTwoNodesInRadian =
      gegenKatheteVectorBetweenTwoNodes / wholeVectorBetweenTwoNodesLength;
    let betaInRadian =
      Math.PI -
      (90 * Math.PI) / 180 -
      Math.asin(alphaVectorBetweenTwoNodesInRadian);

    let smallGegenKatheteAlpha =
      radius * Math.sin(alphaVectorBetweenTwoNodesInRadian);
    let smallAnKatheteAlpha =
      radius * Math.cos(alphaVectorBetweenTwoNodesInRadian);

    var myStroke = this.designStrokeOfArrows();

    let majorLine = null;
    let lowerMinorLine = panel.createLine(),
      upperMinorLine = panel.createLine();

    let lengthOfMinorLines = radius / 2;

    let angleUpper = (90 * Math.PI) / 180 - betaInRadian - (20 * Math.PI) / 180;
    let gegenKatheteUpper = Math.sin(angleUpper) * lengthOfMinorLines;
    let anKatheteUpper = Math.cos(angleUpper) * lengthOfMinorLines;

    let restAngle = betaInRadian - (25 * Math.PI) / 180;
    let gegenKathete60 = Math.sin(restAngle) * lengthOfMinorLines;
    let anKathete60 = Math.cos(restAngle) * lengthOfMinorLines;

    if (nodeFrom.left == nodeTo) {
      let yOfSmallAnKatheteYFrom = smallAnKatheteAlpha + nodeFrom.vector.getY();
      let xOfSmallAnKatheteXFrom =
        nodeFrom.vector.getX() - smallGegenKatheteAlpha;

      let yOfSmallAnKatheteYTo = nodeTo.vector.getY() - smallAnKatheteAlpha;
      let xOfSmallAnKatheteXTo = nodeTo.vector.getX() + smallGegenKatheteAlpha;

      let leftNodeFromVector = new jsgl.Vector2D(
        xOfSmallAnKatheteXFrom,
        yOfSmallAnKatheteYFrom
      );
      let leftNodeToVector = new jsgl.Vector2D(
        xOfSmallAnKatheteXTo,
        yOfSmallAnKatheteYTo
      );

      majorLine = panel.createLine();

      majorLine.setStroke(myStroke);
      majorLine.setStartPoint(leftNodeFromVector);
      majorLine.setEndPoint(leftNodeToVector);

      panel.addElement(majorLine);

      let xLowerLine = xOfSmallAnKatheteXTo + anKathete60;
      let yLowerLine = yOfSmallAnKatheteYTo - gegenKathete60;

      let xUpperLine = xOfSmallAnKatheteXTo + gegenKatheteUpper;
      let yUpperLine = yOfSmallAnKatheteYTo - anKatheteUpper;

      let lowerNodeToVector = new jsgl.Vector2D(xLowerLine, yLowerLine);
      let upperNodeToVector = new jsgl.Vector2D(xUpperLine, yUpperLine);

      lowerMinorLine.setStroke(myStroke);
      lowerMinorLine.setEndPoint(lowerNodeToVector);
      lowerMinorLine.setStartPoint(leftNodeToVector);

      upperMinorLine.setStroke(myStroke);
      upperMinorLine.setEndPoint(upperNodeToVector);
      upperMinorLine.setStartPoint(leftNodeToVector);

      panel.addElement(upperMinorLine);
      panel.addElement(lowerMinorLine);
    } else if (nodeFrom.right == nodeTo) {
      let yOfSmallAnKatheteYFrom = smallAnKatheteAlpha + nodeFrom.vector.getY();
      let xOfSmallAnKatheteXFrom =
        nodeFrom.vector.getX() + smallGegenKatheteAlpha;
      let rightNodeFromVector = new jsgl.Vector2D(
        xOfSmallAnKatheteXFrom,
        yOfSmallAnKatheteYFrom
      );

      let yOfSmallAnKatheteYTo = nodeTo.vector.getY() - smallAnKatheteAlpha;
      let xOfSmallAnKatheteXTo = nodeTo.vector.getX() - smallGegenKatheteAlpha;
      let rightNodeToVector = new jsgl.Vector2D(
        xOfSmallAnKatheteXTo,
        yOfSmallAnKatheteYTo
      );

      majorLine = panel.createLine();

      majorLine.setStroke(myStroke);
      majorLine.setStartPoint(rightNodeFromVector);
      majorLine.setEndPoint(rightNodeToVector);

      panel.addElement(majorLine);

      let xLowerLine = xOfSmallAnKatheteXTo - anKathete60;
      let yLowerLine = yOfSmallAnKatheteYTo - gegenKathete60;

      let xUpperLine = xOfSmallAnKatheteXTo - gegenKatheteUpper;
      let yUpperLine = yOfSmallAnKatheteYTo - anKatheteUpper;

      let lowerNodeToVector = new jsgl.Vector2D(xLowerLine, yLowerLine);
      let upperNodeToVector = new jsgl.Vector2D(xUpperLine, yUpperLine);

      lowerMinorLine.setStroke(myStroke);
      lowerMinorLine.setEndPoint(lowerNodeToVector);
      lowerMinorLine.setStartPoint(rightNodeToVector);

      upperMinorLine.setStroke(myStroke);
      upperMinorLine.setEndPoint(upperNodeToVector);
      upperMinorLine.setStartPoint(rightNodeToVector);

      panel.addElement(upperMinorLine);
      panel.addElement(lowerMinorLine);
    } else if (
      (nodeFrom.left == null && nodeFrom.right == null) ||
      nodeTo.parent != null
    ) {
      // für den Fall des ternären Baums
      let yOfSmallAnKatheteYFrom = smallAnKatheteAlpha + nodeFrom.vector.getY();
      let xOfSmallAnKatheteXFrom =
        nodeFrom.vector.getX() + smallGegenKatheteAlpha;
      let rightNodeFromVector = new jsgl.Vector2D(
        xOfSmallAnKatheteXFrom,
        yOfSmallAnKatheteYFrom
      );

      let yOfSmallAnKatheteYTo = nodeTo.vector.getY() - smallAnKatheteAlpha;
      let xOfSmallAnKatheteXTo = nodeTo.vector.getX() - smallGegenKatheteAlpha;
      let rightNodeToVector = new jsgl.Vector2D(
        xOfSmallAnKatheteXTo,
        yOfSmallAnKatheteYTo
      );

      majorLine = panel.createLine();
      majorLine.setStroke(myStroke);
      majorLine.setStartPoint(rightNodeFromVector);
      majorLine.setEndPoint(rightNodeToVector);

      panel.addElement(majorLine);

      let xLowerLine = xOfSmallAnKatheteXTo - anKathete60;
      let yLowerLine = yOfSmallAnKatheteYTo - gegenKathete60;

      let xUpperLine = xOfSmallAnKatheteXTo - gegenKatheteUpper;
      let yUpperLine = yOfSmallAnKatheteYTo - anKatheteUpper;

      let lowerNodeToVector = new jsgl.Vector2D(xLowerLine, yLowerLine);
      let upperNodeToVector = new jsgl.Vector2D(xUpperLine, yUpperLine);

      lowerMinorLine.setStroke(myStroke);
      lowerMinorLine.setEndPoint(lowerNodeToVector);
      lowerMinorLine.setStartPoint(rightNodeToVector);

      upperMinorLine.setStroke(myStroke);
      upperMinorLine.setEndPoint(upperNodeToVector);
      upperMinorLine.setStartPoint(rightNodeToVector);

      panel.addElement(upperMinorLine);
      panel.addElement(lowerMinorLine);
    }
  }

  static biggerThanDraw(panel) {
    let label = panel.createLabel();
    TreePanelController.designOfSymbols(label, ">");
    return label;
  }

  static smallerEqualThanDraw(panel) {
    let label = panel.createLabel();
    TreePanelController.designOfSymbols(label, "<=");
    return label;
  }

  static designRectStroke() {
    var myStroke = new jsgl.stroke.SolidStroke();
    myStroke.setColor(hgrayColor);
    return myStroke;
  }

  static designStrokeOfArrows() {
    var myStroke = new jsgl.stroke.SolidStroke();
    myStroke.setColor(colorOfArrowsAndLabels);
    myStroke.setWeight(2.5);
    myStroke.setEndcapType(jsgl.EndcapTypes.ROUND);
    myStroke.setOpacity(0.85);
    return myStroke;
  }

  static designOfLabel(label, data) {
    label.setHorizontalAnchor(jsgl.HorizontalAnchor.CENTER);
    label.setVerticalAnchor(jsgl.VerticalAnchor.MIDDLE);
    label.setFontSize(14);
    label.setFontFamily(labelInRectFontFamily);
    label.setText(data);
    label.setFontColor(colorOfArrowsAndLabels);
  }

  static designOfSymbols(label, data) {
    label.setHorizontalAnchor(jsgl.HorizontalAnchor.CENTER);
    label.setVerticalAnchor(jsgl.VerticalAnchor.MIDDLE);
    label.setFontSize(15);
    label.setBold(true);
    label.setFontFamily(labelInRectFontFamily);
    label.setText(data);
    label.setFontColor(colorOfArrowsAndLabels);
  }

  static designOfSelectedNode(element, radius = 30) {
    element.getStroke().setWeight(4.7);
    element.getStroke().setColor(hgrayColor);
    element.setRadius(radius);
    element.getFill().setColor(hellGrayOfNodeInnerColor);
  }

  static designOfUncorrectNode(element, radius = 25) {
    element.getStroke().setWeight(4.7);
    element.getStroke().setColor(ownRedStrokeOfUnCorrectNodeColor);
    element.setRadius(radius);
    element.getFill().setColor(hellGrayOfNodeInnerColor);
  }

  static designOfNode(element, radius) {
    element.getStroke().setWeight(3);
    element.getStroke().setColor(ownGrayStrokeOfNodeColor);
    element.setRadius(radius);
    element.getFill().setColor(hellGrayOfNodeInnerColor);
  }

  static designOfNodeTransparent(circle, radius) {
    circle.getStroke().setWeight(3);
    circle.getStroke().setColor(ownGrayStrokeOfNodeColor);
    circle.setRadius(radius);
    // circle.setStroke().EndcapType(jsgl.EndcapTypes.ROUND);
    // circle.getFill().setColor(hellGrayOfNodeInnerColor);
    circle.getStroke().setOpacity(0.3);
  }

  static designEllipse(element) {
    element.getStroke().setWeight(2.5);
    element.getStroke().setColor("black");
    element.setSizeWH(130, 175);
    element.setRotation(90);
    element.getFill().setColor(hgrayColor);
  }
}

export default TreePanelController;
