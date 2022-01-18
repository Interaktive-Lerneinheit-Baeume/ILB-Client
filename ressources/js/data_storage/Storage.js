/* eslint-env browser */

// const API_BASE_URL = "http://localhost:8001/api/experiment";
const API_BASE_URL = "https://ilb-server.software-engineering.education";

function makeAPICall(route, method, data) {
  let url = API_BASE_URL + route;
  return new Promise(function(resolve, reject) {
    fetch(url, {
      method: method,
      body: data
    }).then(function(response) {
      return response.json();
    }).then(function(result) {
      resolve(result);
    });
  });
}

function makeAPICallPOST(route, method, dataForAdding, id, dataExisting, typeOfMethode) {
  let url = API_BASE_URL + route;
  let dataFromJSON = getDataFromJSON(dataForAdding, id, dataExisting, typeOfMethode);

  return new Promise(function(resolve, reject) {
    fetch(url, {
      method: method,
      headers: {"Content-Type": "application/json"},
      credentials: "same-origin",
      body: JSON.stringify(dataFromJSON)
    }).then(function(response) {
      return response.json();
    }).then(function(result) {
      resolve(result);
    });
  });
}

function getDataFromJSON(dataForAdding, id, dataExisting, typeOfMethode){

  if(dataExisting.id === id){
    if(typeOfMethode === "postExperiment"){
      dataExisting.name = dataForAdding.name;
      dataExisting.age = dataForAdding.age;
      dataExisting.studentNumber = dataForAdding.studentNumber;
      dataExisting.modus = dataForAdding.modus;
      dataExisting.gender = dataForAdding.gender;
      dataExisting.skills = dataForAdding.skills;
      dataExisting.java_knowledge = dataForAdding.java_knowledge;
      dataExisting.another_languages = dataForAdding.another_languages;
      dataExisting.start_time = dataForAdding.start_time;
    }
    else if(typeOfMethode === "closeExperiment"){
      dataExisting.knowl_zyklusChecked = dataForAdding.knowl_zyklusChecked;
      dataExisting.knowl_binaryTreeChecked = dataForAdding.knowl_binaryTreeChecked;
      dataExisting.knowl_binarySearchTreeChecked = dataForAdding.knowl_binarySearchTreeChecked;
      dataExisting.knowl_arrayCheckboxChecked = dataForAdding.knowl_arrayCheckboxChecked;
      dataExisting.knowl_nodeGraphChecked = dataForAdding.knowl_nodeGraphChecked;
      dataExisting.knowl_2_datastructure_checked = dataForAdding.knowl_2_datastructure_checked;
      
      dataExisting.compr_differenceOfTrees = dataForAdding.compr_differenceOfTrees;
      
      dataExisting.applAnSyn_treeHeightSequence = dataForAdding.applAnSyn_treeHeightSequence;
      dataExisting.applAnSyn_sequencesConstructed = dataForAdding.applAnSyn_sequencesConstructed;
      dataExisting.applAnSyn_treesSelected = dataForAdding.applAnSyn_treesSelected;
      dataExisting.applAnSyn_printMethod = dataForAdding.applAnSyn_printMethod;

      dataExisting.checkedTreesAsCorrect = dataForAdding.checkedTreesAsCorrect;
      dataExisting.counterOfErrorPopUp = dataForAdding.counterOfErrorPopUp;

      dataExisting.end_time = dataForAdding.end_time;
    }
  }
  
  return dataExisting;
}


class Storage {

  pickRandomExperiment(){
    return makeAPICall("s/" + "random", "GET", null);
  }

  getExperiment(id){
    if(id !== undefined && id !==null) {
      return makeAPICall("/" + id, "GET", null);
    }
    else {
      alert("Error 404!");
    }
  }

  postExperiment(id, dataForAdding, dataExisting){
    return makeAPICallPOST("/" + id, "POST", dataForAdding, id, dataExisting, "postExperiment");
  }

  closeExperiment(id, dataForAdding, dataExisting){
    return makeAPICallPOST("/" + id +"/close", "POST", dataForAdding, id, dataExisting, "closeExperiment");
  }

  breakProcess(id) {
    return makeAPICall("/" + id +"/cancel", "POST", null);
  }
}

export default Storage;