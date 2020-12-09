/**
 * uiPrompts.js - Everything to do with the dropdown menu in "Add-Ons"
 *
 * Rob DiDio - Dec 9th 2020
 * github - https://github.com/rob-didio/google-sheets-music-discovery
 */

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
        .addItem("Redirect URI", "spotifyRedirectUriPrompt")
    )
    .addToUi();
}

/**
 * spotifyClientIDPrompt - Menu option which saves Spotify Client ID
 * response into userProps
 */
function spotifyClientIDPrompt() {
  var clientId = ui.prompt("Enter your Spotify Client ID");
  userProps.setProperty("SPOTIFY_CLIENT_ID", clientId.getResponseText());
}

/**
 * spotifySecretPrompt - Menu option which saves Spotify Secret
 * response into userProps
 */
function spotifySecretPrompt() {
  var secretId = ui.prompt("Enter your Spotify Secret");
  userProps.setProperty("SPOTIFY_SECRET_ID", secretId.getResponseText());
}

/**
 * spotifyRedirectUriPrompt - Menu option which saves Spotify Redirect URI
 * response into userProps
 */
function spotifyRedirectUriPrompt() {
  var redirectUri = ui.prompt("Enter your Spotify Redirect URI");
  userProps.setProperty("SPOTIFY_REDIRECT_URI", redirectUri.getResponseText());
}
