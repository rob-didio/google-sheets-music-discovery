/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

var client_id = "4454442200fa431090f3055e1b335f83" // Your client id
var client_secret = "c8bd943aaa2b400ba691db78bfb507c6"; // Your secret
var redirect_uri = "https://script.google.com/macros/d/1tDcqtGrY9WZ7GpInWDPhVmIWTzQZ_MIp_ASXqWwNvEhBvgTDQ6SBYbtc/usercallback"; // Your redirect uri

console.log(client_id);

var token = authSpot();

function authSpot(){
  /**
  Implicit Grant authetication with Spotify Web API
  *
  Returns Token as string
  */
  var url = "https://accounts.spotify.com/api/token";
  var params = {
  method: "post",
  headers: {"Authorization" : "Basic " + Utilities.base64Encode(client_id + ":" + client_secret)},
  payload: {grant_type: "client_credentials"},
  };
  var res = UrlFetchApp.fetch(url, params);
  var obj = JSON.parse(res.getContentText());
  var token = obj.access_token;
  return token;
};

function querySpot(q, type){
  /**
  Returns JSON object from Spotify Search API query
  */
  var url = "https://api.spotify.com/v1/search?q="+ q + "&type=" + type + "&limit=1"; 
  var params = {
    headers: {"Accept": "application/json", 
              "Content-Type" : "application/json", 
              "Authorization": "Bearer " + token}
             };
  var res = JSON.parse(UrlFetchApp.fetch(url, params));
  return res;
};

function artistSpot(id, type){
  var url = "https://api.spotify.com/v1/artists/" + id + "/" + type;
  var params = {
    headers: {"Accept": "application/json", 
              "Content-Type" : "application/json", 
              "Authorization": "Bearer " + token}
             };
  var res = JSON.parse(UrlFetchApp.fetch(url, params));
  return res;
};