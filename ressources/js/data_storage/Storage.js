/* eslint-env browser */
const API_BASE_URL = "https://ilb-server.software-engineering.education/api/experiment";

function makeAPICall(route, method, data) {
  let url = API_BASE_URL + route;
  if (data !== null) {
    return new Promise(function (resolve, reject) {
      fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
        body: JSON.stringify(data),
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (result) {
          resolve(result);
        });
    });
  } else {
    return new Promise(function (resolve, reject) {
      fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (result) {
          resolve(result);
        });
    });
  }
}

class Storage {
  pickRandomExperiment() {
    return makeAPICall("s/" + "random", "GET", null);
  }

  getExperiment(id) {
    if (id !== undefined && id !== null) {
      return makeAPICall("/" + id, "GET", null);
    } else {
      // alert("Error 404!");
    }
  }

  closeExperiment(id, dataForAdding) {
    return makeAPICall("/" + id + "/close", "POST", dataForAdding);
  }

  breakProcess(id) {
    return makeAPICall("/" + id + "/cancel", "POST", null);
  }
}

export default Storage;
