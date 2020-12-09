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

function spotifyClientIDPrompt() {
  var clientId = ui.prompt("Enter your Spotify Client ID");
  userProps.setProperty("SPOTIFY_CLIENT_ID", clientId.getResponseText());
}

function spotifySecretPrompt() {
  var secretId = ui.prompt("Enter your Spotify Secret");
  userProps.setProperty("SPOTIFY_SECRET_ID", secretId.getResponseText());
}

function spotifyRedirectUriPrompt() {
  var redirectUri = ui.prompt("Enter your Spotify Redirect URI");
  userProps.setProperty("SPOTIFY_REDIRECT_URI", redirectUri.getResponseText());
}
