let splash;


class SplashScreen {
  constructor() {
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

}

export default new SplashScreen();
