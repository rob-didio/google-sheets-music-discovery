/**
 * uiPrompts.js - Everything to do with the dropdown menu in "Add-Ons"
 *
 * Rob DiDio - Dec 9th 2020
 * github - https://github.com/rob-didio/google-sheets-music-discovery
 */

const SPOTIFY_ID_LEN = 32;

/**
 * uiUserPropsMenu - Makes the menu options
 */
function uiUserPropsMenu() {
  var userPropsMenu = ui
    .createAddonMenu()
    .addSubMenu(
      ui
        .createMenu("Spotify")
        .addItem("Client ID", "spotifyClientIDPrompt")
        .addItem("Secret", "spotifySecretPrompt")
        .addItem("Reset OAuth", "resetAuth")
    )
    .addToUi();
}

/**
 * spotifyClientIDPrompt - Menu option which saves Spotify Client ID
 * response into userProps
 */
function spotifyClientIDPrompt() {
  var clientId = ui.prompt(
    `Enter your Spotify Client ID\n
    Current: ${userProps.getProperty("SPOTIFY_CLIENT_ID")}`
  );
  if (clientId.length === SPOTIFY_ID_LEN) {
    userProps.setProperty("SPOTIFY_CLIENT_ID", clientId.getResponseText());
  } else {
    ui.alert("Client ID entered was the wrong length, please enter again!");
  }
}

/**
 * spotifySecretPrompt - Menu option which saves Spotify Secret
 * response into userProps
 */
function spotifySecretPrompt() {
  var secretId = ui.prompt(`Enter your Spotify Secret\n Current: ${secretId}`);
  if (secretId.length === SPOTIFY_ID_LEN) {
    userProps.setProperty("SPOTIFY_SECRET_ID", secretId.getResponseText());
  } else {
    ui.alert("Secret entered was the wrong length, please enter again!");
  }
}

function resetAuth() {
  reset();
  run();
}
