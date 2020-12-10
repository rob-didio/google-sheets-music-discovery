/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

let client_id = userProps.getProperty("SPOTIFY_CLIENT_ID"); // Your client id
let client_secret = userProps.getProperty("SPOTIFY_SECRET_ID"); // Your secret
let redirect_uri = userProps.getProperty("SPOTIFY_REDIRECT_URI"); // Your redirect uri

let token = authSpot();

function authSpot() {
  /**
  Implicit Grant authetication with Spotify Web API
  *
  Returns Token as string
  */
  let url = "https://accounts.spotify.com/api/token";
  let params = {
    method: "post",
    headers: {
      Authorization:
        "Basic " + Utilities.base64Encode(`${client_id}:${client_secret}`),
    },
    payload: { grant_type: "client_credentials" },
  };
  let res = UrlFetchApp.fetch(url, params);
  let obj = JSON.parse(res.getContentText());
  let token = obj.access_token;
  return token;
}

/** Code below this line wrtten by Rob DiDio
 */

/**
 * querySpot - Queries spotify using their Web API, used here primarily to get
 * an artist ID
 *
 * @param {*} q - plain text artist name
 * @param {*} type - type of ID we want back ex. "artist"
 */
function querySpot(q, type) {
  let url = `https://api.spotify.com/v1/search?q=${q}&type=${type}&limit=1`;
  let params = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  let res = JSON.parse(UrlFetchApp.fetch(url, params));
  return res;
}

/**
 * artistSpot - Access the Artist Spotify API via an Artist ID,
 *
 * @param {*} id - Spotify Artist ID
 * @param {*} type - data string we want ex. "related-artists"
 */

function artistSpot(id, type) {
  let url = `https://api.spotify.com/v1/artists/${id}/${type}`;
  let params = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  let res = JSON.parse(UrlFetchApp.fetch(url, params));
  return res;
}
