let splashBreak, splashStart, splashEnd, downloadSplash, splash;

// function sendBreakSplash() {
//   splashBreak.classList.remove("hidden");
// }

// function sendEndSplash() {
//   splashEnd.classList.remove("hidden");
// }

// function sendStartSplash() {
//   splashStart.classList.remove("hidden");
// }

// function removeStartSplash() {
//   splashStart.classList.add("hidden");
// }

// function removeBreakSplash() {
//   breakStart.classList.add("hidden");
// }

// function removeEndSplash() {
//   endStart.classList.add("hidden");
// }

// function startDownloadSplash() {
//   downloadSplash.classList.remove("hidden");
// }

// function removeDownloadSplash() {
//   downloadSplash.classList.add("hidden");
// }

class SplashScreen {
  constructor() {
    // splashBreak = document.querySelector(".no_experiment_available");
    // splashStart = document.querySelector(".splash-start .experiment_ended");
    // splashEnd = document.querySelector(".splash-end");
    // downloadSplash = document.querySelector(".splash");
    splash = document.querySelector(".splash");
  }

  getSplash() {
    return splash;
  }

  setWelcomeSplash() {
    splash.querySelector(".splash_welcome").classList.remove("hidden");
  }

  removeWelcomeSplash() {
    splash.querySelector(".splash_welcome").classList.add("hidden");
  }

  setTimeOverSplash() {
    splash.querySelector(".splash_end").classList.remove("hidden");
  }

  removeTimeOverSplash() {
    splash.querySelector(".splash_end").classList.add("hidden");
  }

  removeDownloadSplash() {
    splash.querySelector(".splash_download").classList.add("hidden");
  }

  setDownloadSplash() {
    splash.querySelector(".splash_download").classList.remove("hidden");
  }

  setSplashScreen() {
    splash.classList.remove("hidden");
  }

  removeSplashScreen() {
    splash.classList.add("hidden");
  }

  setNoExperimentAvailableSplash() {
    splash
      .querySelector(".splash_no_experiment_available")
      .classList.remove("hidden");
  }

  removeNoExperimentAvailableSplash() {
    splash
      .querySelector(".splash_no_experiment_available")
      .classList.add("hidden");
  }

  //
  //   breakWholePlattform() {
  //     sendBreakSplash();
  //   }

  //   endWholePlattform() {
  //     sendEndSplash();
  //   }

  //   startWholePlattform() {
  //     sendStartSplash();
  //   }

  //   removeStartSplash() {
  //     removeStartSplash();
  //   }

  //   removeEndSplash() {
  //     removeEndSplash();
  //   }

  //   removeBreakSplash() {
  //     removeBreakSplash();
  //   }

  //   startDownloadSplash() {
  //     startDownloadSplash();
  //   }

  //   removeDownloadSplash() {
  //     removeDownloadSplash();
  //   }
}

export default new SplashScreen();
