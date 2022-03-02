let splashBreak, splashStart, splashEnd, downloadSplash;

function sendBreakSplash() {
  splashBreak.classList.remove("hidden");
}

function sendEndSplash() {
  splashEnd.classList.remove("hidden");
}

function sendStartSplash() {
  splashStart.classList.remove("hidden");
}

function removeStartSplash() {
  splashStart.classList.add("hidden");
}

function removeBreakSplash() {
  breakStart.classList.add("hidden");
}

function removeEndSplash() {
  endStart.classList.add("hidden");
}

function startDownloadSplash() {
  downloadSplash.classList.remove("hidden");
}

function removeDownloadSplash() {
  downloadSplash.classList.add("hidden");
}

class SplashScreen {
  constructor() {
    splashBreak = document.querySelector(".no_experiment_available");
    splashStart = document.querySelector(".splash-start");
    splashEnd = document.querySelector(".splash-end");
    downloadSplash = document.querySelector(".splash");
  }

  breakWholePlattform() {
    sendBreakSplash();
  }

  endWholePlattform() {
    sendEndSplash();
  }

  startWholePlattform() {
    sendStartSplash();
  }

  removeStartSplash() {
    removeStartSplash();
  }

  removeEndSplash() {
    removeEndSplash();
  }

  removeBreakSplash() {
    removeBreakSplash();
  }

  startDownloadSplash() {
    startDownloadSplash();
  }

  removeDownloadSplash() {
    removeDownloadSplash();
  }
}

export default new SplashScreen();
