/** google-sheets-music-discovery - A fun way to discover, catalogue, and
 * rate new music through Google Sheets using Apps Script.
 *
 * Rob DiDio - Dec 9th 2020
 * github: https://github.com/rob-didio/google-sheets-music-discovery
 */

const RIYL_MAX = 3;
const LOW_COL = "A";
const HIGH_COL = ":I";

let sheet = SpreadsheetApp.getActiveSheet();
let userProps = PropertiesService.getUserProperties();
let ui = SpreadsheetApp.getUi();

/**getArtistIDs - Grabs Finds Spotify Artist IDs based off
 *   of an artist name, writes to row
 */
function getArtistIDs() {
  // Creates a list of artist objects from rows selected
  let artistList = artistBuild(sheet);
  let artistIDList = [];

  // Gets a JSON of the artist from Spotify
  for (i = 0; i < artistList.length; i++) {
    let artistJSON = querySpot(
      artistList[i].name.split(" ").join("+"),
      "artist"
    );

    // We just add "N/A" if there is no response
    if (
      (artistJSON.artists.items == undefined) |
      (artistJSON.artists.items.length == 0)
    ) {
      artistIDList.push("N/A");
      artistList[i].spotID = "N/A";

      // Adds Spotify ID to respective artist objects
    } else {
      let artistID = artistJSON.artists.items[0].id;
      artistList[i].spotID = artistJSON.artists.items[0].id;
      artistIDList.push(artistID);
    }
  }

  writeRows(artistList);
}

/**riyl - Gets top three similar artists from Spotify Artist ID and writes
 * them to the row
 */
function riyl() {
  let artistList = artistBuild(sheet);
  for (i = 0; i < artistList.length; i++) {
    riyl = getSimilarArtists(artistList[i]);
    artistList[i].riyl1 = riyl[0];
    artistList[i].riyl2 = riyl[1];
    artistList[i].riyl3 = riyl[2];
  }
  writeRows(artistList);
}

/**getSimilarArtists - Query's spotify for the top three related artists
 * using a Spotify ID.
 *
 * @param {*} artist - artist object;
 */
function getSimilarArtists(artist) {
  let riylIn = [];
  if (artist.spotID == "N/A") {
  } else {
    // Gets a JSON of related-artists
    riyl = artistSpot(artist.spotID, "related-artists");
    for (e = 0; e < riyl.artists.length; e++) {
      // There can be hundreds of them so we cap it at RIYL_MAX
      if (e >= RIYL_MAX) {
        break;
      } else {
        riylIn.push(riyl.artists[e].name);
      }
    }
  }
  return riylIn;
}

/**
 * writeRows - Writes full rows of new data to the active range
 *
 * @param {*} data - row of data we are writing.
 */
function writeRows(data) {
  let last_row = sheet.getActiveRange().getLastRow();
  let first_row = last_row - sheet.getActiveRange().getHeight() + 1;
  let j = 0;
  for (t = first_row; t <= last_row; t++) {
    sheet
      .setActiveSelection(LOW_COL + t + HIGH_COL + t)
      .setValues([Object.values(data[j])]);
    j++;
  }
}

function buildArtistRowFull() {
  getArtistIDs();
  riyl();
}

/**
 * atOpen - Trigger for opening. We can't use onOpen since we're accessing UI
 * elements. They out of scope for that simple trigger.
 */
function atOpen() {
  uiUserPropsMenu();
}
