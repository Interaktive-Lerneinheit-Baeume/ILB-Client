import Observable from "../../utils/Observable.js";

let panelCodeAlg, panelMainCode,
    myMainCodeGroups = [],
    myCodeAlgGroups = [],
    valueArray = new Array(59, 63, 71, 83, 92, 52, 36, 69, 48, 14);

const labelInRectColor = "#474554",
    labelInRectFontFamily = "Courier New",
    hellBrownColor = "#b3804d99";

function drawTheMainAndNode() {
    let indexOfLablesMainCode = 14;

    var myLabelsMainCode = [];
    var myRectanglesMainCode = [];

    var myLabel = panelMainCode.createLabel();
    var myLabel1 = panelMainCode.createLabel();
    var myLabel2 = panelMainCode.createLabel();
    var myLabel3 = panelMainCode.createLabel();
    var myLabel4 = panelMainCode.createLabel();
    var myLabel5 = panelMainCode.createLabel();
    var myLabel6 = panelMainCode.createLabel();
    var myLabel7 = panelMainCode.createLabel();
    var myLabel8 = panelMainCode.createLabel();
    var myLabel9 = panelMainCode.createLabel();
    var myLabel10 = panelMainCode.createLabel();
    var myLabel11 = panelMainCode.createLabel();
    var myLabel12 = panelMainCode.createLabel();
    var myLabel13 = panelMainCode.createLabel();
    var myLabel14 = panelMainCode.createLabel();
    var myLabel15 = panelMainCode.createLabel();
    var myLabel16 = panelMainCode.createLabel();
    var myLabel17 = panelMainCode.createLabel();
    var myLabel18 = panelMainCode.createLabel();
    var myLabel19 = panelMainCode.createLabel();
    var myLabel20 = panelMainCode.createLabel();
    var myLabel21 = panelMainCode.createLabel();
    var myLabel22 = panelMainCode.createLabel();
    var myLabel23 = panelMainCode.createLabel();
    var myLabel24 = panelMainCode.createLabel();

    myLabelsMainCode[0] = myLabel;
    myLabelsMainCode[1] = myLabel1;
    myLabelsMainCode[2] = myLabel2;
    myLabelsMainCode[3] = myLabel3;
    myLabelsMainCode[4] = myLabel4;
    myLabelsMainCode[5] = myLabel5;
    myLabelsMainCode[6] = myLabel6;
    myLabelsMainCode[7] = myLabel7;
    myLabelsMainCode[8] = myLabel8;
    myLabelsMainCode[9] = myLabel9;
    myLabelsMainCode[10] = myLabel10;
    myLabelsMainCode[11] = myLabel11;
    myLabelsMainCode[12] = myLabel12;
    myLabelsMainCode[13] = myLabel13;
    myLabelsMainCode[14] = myLabel14;
    myLabelsMainCode[15] = myLabel15;
    myLabelsMainCode[16] = myLabel16;
    myLabelsMainCode[17] = myLabel17;
    myLabelsMainCode[18] = myLabel18;
    myLabelsMainCode[19] = myLabel19;
    myLabelsMainCode[20] = myLabel20;
    myLabelsMainCode[21] = myLabel21;
    myLabelsMainCode[22] = myLabel22;
    myLabelsMainCode[23] = myLabel23;
    myLabelsMainCode[24] = myLabel24;

    myLabel.setText("public class Node {");
    myLabel1.setText("  protected int data;");
    myLabel2.setText("  protected Node left;");
    myLabel3.setText("  protected Node right;");
    myLabel4.setText(" ");
    myLabel5.setText("  public Node(int data) {");
    myLabel6.setText("      this.data = data;");
    myLabel7.setText("      this.left = null;");
    myLabel8.setText("      this.right = null;");
    myLabel9.setText("  }");
    myLabel10.setText(" ");
    myLabel11.setText("public static void main(String[] args) {");
    myLabel12.setText("BinarySearchTree bst = new BinarySearchTree ();");
    myLabel13.setText("Node root = new Node ( 59 );");

    for (let index = 1; index < valueArray.length; index++) {

        const element = valueArray[index];
        myLabelsMainCode[indexOfLablesMainCode].setText("bst.insertNodeRecursive ( root, " + element + " );");

        indexOfLablesMainCode += 1;
    }

    myLabel23.setText("}");
    myLabel24.setText("}");



    for (let index = 0; index < myLabelsMainCode.length; index++) {

        const label = myLabelsMainCode[index];
        designLabelsInRect(label);

        var rectangle = panelMainCode.createRectangle();
        rectangle.setWidth(500);
        var newGroup = panelMainCode.createGroup();

        myRectanglesMainCode[index] = rectangle;
        myMainCodeGroups[index] = newGroup;

        rectangle.setLocationXY(0, 0);

        newGroup.addElement(rectangle);
        newGroup.addElement(label);

        let vector = new jsgl.Vector2D(0, 600 / myLabelsMainCode.length * (index));

        newGroup.setLocation(vector);

        if (index == 0 || index == 24) {
            myLabelsMainCode[index].setLocationXY(5, 0);
        }

        if ((index >= 1 && index <= 5) || index == 9 || index == 11 || index == 23) {
            myLabelsMainCode[index].setLocationXY(25, 0);
        }

        if ((index >= 6 && index <= 8) || index == 12 || index == 13 || (index >= 14 && index <= 22)) {
            myLabelsMainCode[index].setLocationXY(45, 0);
        }


        if (index <= 12 || index == 23 || index == 24) {
            panelMainCode.addElement(newGroup);
        }
    }
}


function drawTheCodeAlg() {
    var myLabelsCodeAlg = [];
    var myRectanglesCodeAlg = [];

    var myLabel = panelCodeAlg.createLabel();
    var myLabel1 = panelCodeAlg.createLabel();
    var myLabel2 = panelCodeAlg.createLabel();
    var myLabel3 = panelCodeAlg.createLabel();
    var myLabel4 = panelCodeAlg.createLabel();
    var myLabel5 = panelCodeAlg.createLabel();
    var myLabel6 = panelCodeAlg.createLabel();
    var myLabel7 = panelCodeAlg.createLabel();
    var myLabel8 = panelCodeAlg.createLabel();
    var myLabel9 = panelCodeAlg.createLabel();
    var myLabel10 = panelCodeAlg.createLabel();
    var myLabel11 = panelCodeAlg.createLabel();
    var myLabel12 = panelCodeAlg.createLabel();
    var myLabel13 = panelCodeAlg.createLabel();

    myLabel.setText("");
    myLabel1.setText("public class BinarySearchTree {");
    myLabel2.setText("");
    myLabel3.setText("private Node insertNodeRecursive(Node head, int data) {");
    myLabel4.setText("  if (head == null) {");
    myLabel5.setText("      return new Node ( data );");
    myLabel6.setText(" } else if (data > head.data) {");
    myLabel7.setText("      head.right = insertNodeRecursive ( head.right, data );");
    myLabel8.setText("  } else if (data <= head.data) {");
    myLabel9.setText("      head.left = insertNodeRecursive ( head.left, data );");
    myLabel10.setText("  }");
    myLabel11.setText("  return head;");
    myLabel12.setText(" }");
    myLabel13.setText("}");

    myLabelsCodeAlg[0] = myLabel;
    myLabelsCodeAlg[1] = myLabel1;
    myLabelsCodeAlg[2] = myLabel2;
    myLabelsCodeAlg[3] = myLabel3;
    myLabelsCodeAlg[4] = myLabel4;
    myLabelsCodeAlg[5] = myLabel5;
    myLabelsCodeAlg[6] = myLabel6;
    myLabelsCodeAlg[7] = myLabel7;
    myLabelsCodeAlg[8] = myLabel8;
    myLabelsCodeAlg[9] = myLabel9;
    myLabelsCodeAlg[10] = myLabel10;
    myLabelsCodeAlg[11] = myLabel11;
    myLabelsCodeAlg[12] = myLabel12;
    myLabelsCodeAlg[13] = myLabel13;


    for (let index = 0; index < myLabelsCodeAlg.length; index++) {
        const label = myLabelsCodeAlg[index];
        designLabelsInRect(label);

        var rectangle = panelCodeAlg.createRectangle();

        var newGroup = panelCodeAlg.createGroup();

        myRectanglesCodeAlg[index] = rectangle;
        myCodeAlgGroups[index] = newGroup;

        rectangle.setLocationXY(0, 0);

        if (index == 1 || index == 13) {
            myLabelsCodeAlg[index].setLocationXY(15, 0);
        }

        if (index == 3 || index == 12) {
            myLabelsCodeAlg[index].setLocationXY(25, 0);
        }

        if (index == 4 || index == 6 || index == 8 || index == 10 || index == 11) {
            myLabelsCodeAlg[index].setLocationXY(45, 0);
        }

        if (index == 5 || index == 7 || index == 9) {
            myLabelsCodeAlg[index].setLocationXY(65, 0);
        }

        newGroup.addElement(rectangle);
        newGroup.addElement(label);

        let vector = new jsgl.Vector2D(0, 500 / myLabelsCodeAlg.length * (index));

        newGroup.setLocation(vector);

        panelCodeAlg.addElement(newGroup);
    }
}

class CodeVisualizer extends Observable {

    constructor(el, approach) {
        super();

        if (approach == "constructing") {
            this.panelElementCodeAlg = document.querySelector("#panel-code-alg");
            this.panelElementMainCode = el.querySelector("#panel-main-code-constructing");
        }
        else { //"viewing"
            this.panelElementCodeAlg = document.querySelector("#panel-code-alg");
            this.panelElementMainCode = el.querySelector("#panel-main-code-viewing");
        }

        panelCodeAlg = new jsgl.Panel(this.panelElementCodeAlg);
        panelMainCode = new jsgl.Panel(this.panelElementMainCode);

        drawTheCodeAlg();
        drawTheMainAndNode();
    }

    getCodeAlgGroups() {
        return myCodeAlgGroups;
    }

    getMainCodeGroups() {
        return myMainCodeGroups;
    }

    designSelectedMainCodeGroup(indexPosition, approach = "constructing") {
        let rect = myMainCodeGroups[indexPosition].getElementAt(0);
        let label = myMainCodeGroups[indexPosition].getElementAt(1);
        designSelectedLabelsInRect(label);
        designSelectedRect(rect);

        let panelViewing = new jsgl.Panel(document.querySelector("#panel-main-code-viewing"));
        let panelConstr = new jsgl.Panel(document.querySelector("#panel-main-code-constructing"));

        if (approach == "viewing") {
            panelViewing.addElement(myMainCodeGroups[indexPosition]);
        }
        else {
            panelConstr.addElement(myMainCodeGroups[indexPosition]);
        }
    }

    designUnSelectedMainCodeGroup(indexPosition, approach = "constructing") {

        let panelViewing = new jsgl.Panel(document.querySelector("#panel-main-code-viewing"));
        let panelConstr = new jsgl.Panel(document.querySelector("#panel-main-code-constructing"));

        let rect = myMainCodeGroups[indexPosition].getElementAt(0);
        let label = myMainCodeGroups[indexPosition].getElementAt(1);

        if (approach == "viewing") {
            panelViewing.addElement(myMainCodeGroups[indexPosition]);
        }
        else {
            panelConstr.addElement(myMainCodeGroups[indexPosition]);
        }

        designLabelsInRect(label);
        designRect(rect);
    }



    static drawCode(printCodePanel, labelTextSize = 14) {

        var myLabelsCodeAlg = [];
        var myRectanglesCodeAlg = [];

        var myLabel = printCodePanel.createLabel();
        var myLabel1 = printCodePanel.createLabel();
        var myLabel2 = printCodePanel.createLabel();
        var myLabel3 = printCodePanel.createLabel();
        var myLabel4 = printCodePanel.createLabel();
        var myLabel5 = printCodePanel.createLabel();
        var myLabel6 = printCodePanel.createLabel();
        var myLabel7 = printCodePanel.createLabel();

        myLabel.setText("private void print(Node root) {             ");
        myLabel1.setText("if(root == null) {");
        myLabel2.setText("return;");
        myLabel3.setText("}");
        myLabel4.setText("print(node.left);");
        myLabel5.setText("System.out.print(node.data);");
        myLabel6.setText("print(node.right);");
        myLabel7.setText("}");

        myLabelsCodeAlg[0] = myLabel;
        myLabelsCodeAlg[1] = myLabel1;
        myLabelsCodeAlg[2] = myLabel2;
        myLabelsCodeAlg[3] = myLabel3;
        myLabelsCodeAlg[4] = myLabel4;
        myLabelsCodeAlg[5] = myLabel5;
        myLabelsCodeAlg[6] = myLabel6;
        myLabelsCodeAlg[7] = myLabel7;

        for (let index = 0; index < myLabelsCodeAlg.length; index++) {
            const label = myLabelsCodeAlg[index];
            designLabelsInRect(label, labelTextSize);

            var rectangle = printCodePanel.createRectangle();

            var newGroup = printCodePanel.createGroup();

            myRectanglesCodeAlg[index] = rectangle;
            myCodeAlgGroups[index] = newGroup;

            rectangle.setLocationXY(0, 0);

            if (index == 0 || index == 7) {
                myLabelsCodeAlg[index].setLocationXY(10, 0);
            }

            if (index == 1 || index == 3 || index == 4 || index == 5 || index == 6) {
                myLabelsCodeAlg[index].setLocationXY(30, 0);
            }

            if (index == 2) {
                myLabelsCodeAlg[index].setLocationXY(50, 0);
            }

            newGroup.addElement(rectangle);
            newGroup.addElement(label);

            let vector = new jsgl.Vector2D(0, 270 / myLabelsCodeAlg.length * (index));

            newGroup.setLocation(vector);

            printCodePanel.addElement(newGroup);
        }
    }
}


function designStrokeForSelectedRect() {
    var myStroke = new jsgl.stroke.SolidStroke();
    myStroke.setColor(hellBrownColor);
    myStroke.setWeight(1.5);
    myStroke.setEndcapType(jsgl.EndcapTypes.ROUND);
    myStroke.setOpacity(0.55);
    return myStroke;
}

function designFillForSelectedRect() {
    var myFill = new jsgl.fill.SolidFill();
    myFill.setColor(hellBrownColor);
    myFill.setOpacity(0.55);
    return myFill;
}

function designStrokeForRect() {
    var myStroke = new jsgl.stroke.SolidStroke();
    myStroke.setOpacity(0);
    myStroke.setEndcapType(jsgl.EndcapTypes.ROUND);
    return myStroke;
}

function designFillForRect() {
    var myFill = new jsgl.fill.SolidFill();
    myFill.setOpacity(0);
    return myFill;
}

function designSelectedLabelsInRect(label) {
    label.setFontSize(16);
}

function designLabelsInRect(label, labelsSize = 16) {
    label.setFontSize(labelsSize);
    label.setFontFamily(labelInRectFontFamily);
    label.setFontColor(labelInRectColor);
}

function designSelectedRect(element) {
    element.setStroke(designStrokeForSelectedRect());
    element.setFill(designFillForSelectedRect());
    element.setSizeWH(500, 30);
}

function designRect(element) {
    element.setStroke(designStrokeForRect());
    element.setFill(designFillForRect());
    element.setSizeWH(400, 30);
}

export default CodeVisualizer;