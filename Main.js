const RIYL_MAX = 3;
const LOW_COL = "A";
const HIGH_COL = ":I";

let sheet = SpreadsheetApp.getActiveSheet();

function getArtistIDs() {
  /** 
  Grabs artist names from col 1 and finds Spotify Artist IDs, writes to Spotify ID col
   *
  BREAK OUT TO HELPER FUNCTIONS
   *
  return None
   */
  let artistList = artistBuild(sheet);
  let artistIDList = [];

  for (i = 0; i < artistList.length; i++) {
    let artistJSON = querySpot(
      artistList[i].name.split(" ").join("+"),
      "artist"
    );

    if (
      (artistJSON.artists.items == undefined) |
      (artistJSON.artists.items.length == 0)
    ) {
      artistIDList.push("N/A");
      artistList[i].spotID = "N/A";
    } else {
      let artistID = artistJSON.artists.items[0].id;
      artistList[i].spotID = artistJSON.artists.items[0].id;
      artistIDList.push(artistID);
    }
  }

  writeRows(artistList);
}

function riyl() {
  /*
  Gets top three similar artists from Spotify Artist ID and adds them to RIYL column
  *
  NOT FINISHED
  *  
  return None
  */
  let artistList = artistBuild(sheet);
  for (i = 0; i < artistList.length; i++) {
    riyl = getSimilarArtists(artistList[i]);
    artistList[i].riyl1 = riyl[0];
    artistList[i].riyl2 = riyl[1];
    artistList[i].riyl3 = riyl[2];
  }
  writeRows(artistList);
}

function getSimilarArtists(artist) {
  let riylIn = [];
  if (artist.spotID == "N/A") {
  } else {
    riyl = artistSpot(artist.spotID, "related-artists");
    for (e = 0; e < riyl.artists.length; e++) {
      if (e >= RIYL_MAX) {
        break;
      } else {
        riylIn.push(riyl.artists[e].name);
      }
    }
  }
  return riylIn;
}

function writeRows(data) {
  /* 
  Writes full rows with new data to the active range
  *  
  return None
  */
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
