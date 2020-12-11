let client_id = userProps.getProperty("SPOTIFY_CLIENT_ID");
let client_secret = userProps.getProperty("SPOTIFY_SECRET_ID");
let token = getToken();

function getToken() {
  let token;
  if (userProps.getProperty("oauth2.Spotify") != null) {
    token = userProps.getProperty("oauth2.Spotify");
    token = JSON.parse(token);
    token = token.access_token;
  }
  return token;
}

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
      Authorization: `Bearer ${token}`,
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
