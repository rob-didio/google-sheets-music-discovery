/*
* This sample demonstrates how to configure the library for the Spotify API.
* Instructions on how to generate OAuth credentuals is available here:
* https://developer.spotify.com/documentation/general/guides/authorization-guide/
*/

var CLIENT_ID = userProps.getProperty("SPOTIFY_CLIENT_ID");
var CLIENT_SECRET = userProps.getProperty("SPOTIFY_SECRET_ID");

/**
* Authorizes and makes a request to the Spotify API.
*/
function run() {
  var service = getService();
  if (service.hasAccess()) {
    var url = 'https://api.spotify.com/v1/me';
    var response = UrlFetchApp.fetch(url, {
      headers: {'Authorization': 'Bearer ' + service.getAccessToken()}
    });
    var result = JSON.parse(response.getContentText());
    Logger.log(JSON.stringify(result, null, 2));
  } else {
    var authorizationUrl = service.getAuthorizationUrl();
    ui.alert(`Open the following URL and re-run the script: ${authorizationUrl}`);
  }
}

/**
* Reset the authorization state, so that it can be re-tested.
*/
function reset() {
  getService().reset();
}

/**
* Configures the service.
*/

function getService() {
  return OAuth2.createService('Spotify')
    // Set the endpoint URLs.
    .setAuthorizationBaseUrl('https://accounts.spotify.com/authorize')
    .setTokenUrl('https://accounts.spotify.com/api/token')

    // Set the client ID and secret.
    .setClientId(CLIENT_ID)
    .setClientSecret(CLIENT_SECRET)

    // Set the name of the callback function that should be invoked to complete
    // the OAuth flow.
    .setCallbackFunction('authCallback')
    .setScope('user-library-modify user-modify-playback-state')

    // Set the property store where authorized tokens should be persisted.
    .setPropertyStore(userProps);
}

/**
* Handles the OAuth callback.
*/
function authCallback(request) {
  var service = getService();
  var authorized = service.handleCallback(request);
  if (authorized) {
    return HtmlService.createHtmlOutput('Success!');
  } else {
    return HtmlService.createHtmlOutput('Denied.');
  }
}

/**
 * Logs the redict URI to register.
 */
function logRedirectUri() {
  Logger.log(OAuth2.getRedirectUri());
}